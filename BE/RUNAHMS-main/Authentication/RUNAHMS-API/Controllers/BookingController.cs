﻿using System;
using BusinessObject.DTO;
using BusinessObject.Entities;
using BusinessObject.Interfaces;
using BusinessObject.Shares;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;



namespace RUNAHMS_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController(IBookingRepository _bookingRepository,
                                   IRepository<Voucher> _voucherRepository,
                                   IUserRepository _userRepository,
                                   IRepository<HomeStay> _homeStayRepository,
                                   IEmailSender _emailSender,
                                   IConfiguration _configuration,
                                   IRepository<Calendar> _calendarRepository) : ControllerBase
    {
        [HttpGet("history")]
        public async Task<IActionResult> GetBookingHistory([FromHeader(Name = "X-User-Id")] Guid userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
                return NotFound(new { Message = "User not found" });

            var bookings = await _bookingRepository.GetHistory(userId);

            if (!bookings.Any())
                return Ok(new { Message = "No booking history found." });

            var bookingHistory = bookings.Select(b => new
            {
                BookingID = b.Id,
                CheckInDate = b.CheckInDate.ToString("dd/MM/yyyy HH:mm"),
                CheckOutDate = b.CheckOutDate.ToString("dd/MM/yyyy HH:mm"),
                TotalPrice = b.TotalPrice.ToString("C", new System.Globalization.CultureInfo("vi-VN")),
                Status = b.Status
            }).OrderByDescending(b => b.CheckInDate).ToList();

            return Ok(bookingHistory);
        }
        [HttpPost("create")]
        public async Task<IActionResult> CreateBooking(
    [FromHeader(Name = "X-User-Id")] Guid userId,
    [FromBody] BookingDTO bookingDTO)
        {
            if (bookingDTO == null || !bookingDTO.Calenders.Any())
                return BadRequest(new { Message = "Invalid booking data" });

            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
                return NotFound(new { Message = "User not found" });

            var calendars = await _calendarRepository.FindAsync(c =>
                bookingDTO.Calenders.Select(bc => bc.CalenderID).Contains(c.Id));

            if (!calendars.Any())
                return BadRequest(new { Message = "No valid calendar slots found" });

            var homeStay = await _homeStayRepository.GetByIdAsync(calendars.First().HomeStayID);
            if (homeStay == null)
                return BadRequest(new { Message = "HomeStay not found" });

            if (calendars.Any(c => c.BookingID != null))
                return BadRequest(new { Message = "Some selected dates are already booked" });

            var sortedDates = calendars.Select(c => c.Date).OrderBy(d => d).ToList();
            var firstDate = sortedDates.First();
            var lastDate = sortedDates.Last();

            DateTime checkInDate = firstDate.Date.Add(TimeSpan.Parse(homeStay.CheckInTime));
            DateTime checkOutDate = lastDate.AddDays(1).Date.Add(TimeSpan.Parse(homeStay.CheckOutTime));

            if (firstDate == lastDate)
                checkOutDate = firstDate.Date.AddDays(1).Add(TimeSpan.Parse(homeStay.CheckOutTime));

            decimal totalPrice = calendars.Sum(c => c.Price);

            if (!string.IsNullOrEmpty(bookingDTO.VoucherCode))
            {
                var vouchers = await _voucherRepository.GetAllAsync();
                var voucher = vouchers.FirstOrDefault(v =>
                    v.Code == bookingDTO.VoucherCode && DateUtility.GetCurrentDateTime() >= v.StartDate && DateUtility.GetCurrentDateTime() <= v.EndDate);

                if (voucher == null)
                    return BadRequest(new { Message = "Invalid or expired voucher" });

                decimal discountAmount = totalPrice * ((decimal)voucher.Discount / 100);
                totalPrice -= discountAmount;
            }

            var booking = new Booking
            {
                Id = Guid.NewGuid(),
                CheckInDate = checkInDate,
                CheckOutDate = checkOutDate,
                TotalPrice = totalPrice,
                UnitPrice = totalPrice / (checkOutDate - checkInDate).Days,
                Status = "Pending",
                UserID = userId
            };

            foreach (var calendar in calendars)
            {
                calendar.BookingID = booking.Id;
            }

            await _bookingRepository.AddAsync(booking);
            await _calendarRepository.SaveAsync();
            await _bookingRepository.SaveAsync();

            if (!bookingDTO.IsOnline)
            {
                string url = _configuration["Base:Url"] ?? string.Empty;
                string confirmUrl = $"{url}/api/booking/confirm?bookingId={booking.Id}";

                string emailContent = $@"
        <p>Xin chào {user.FullName},</p>
        <p>Chi tiết đặt phòng:</p>
        <ul>
            <li><b>Check-in:</b> {booking.CheckInDate:dd/MM/yyyy HH:mm}</li>
            <li><b>Check-out:</b> {booking.CheckOutDate:dd/MM/yyyy HH:mm}</li>
            <li><b>Tổng tiền:</b> {booking.TotalPrice.ToString("C", new System.Globalization.CultureInfo("vi-VN"))}</li>
        </ul>
        <br>Click vào link để xác nhận đặt phòng: <a href='{confirmUrl}'>Xác nhận</a><br>
        <p>Chúng tôi mong được phục vụ bạn trong tương lai!</p>";

                await _emailSender.SendEmailAsync(user.Email, "Confirm Booking", emailContent);
            }

            return Ok(new
            {
                Message = "Booking created successfully!",
                BookingID = booking.Id,
                IsOnline = bookingDTO.IsOnline,
                CheckInDate = checkInDate,
                CheckOutDate = checkOutDate
            });
        }

        [HttpGet("confirm")]
        public async Task<IActionResult> ConfirmBooking([FromQuery] Guid bookingId)
        {
            var booking = await _bookingRepository.GetByIdAsync(bookingId);
            if (booking == null)
                return NotFound(new { Message = "Booking not found" });

            booking.Status = "Confirmed";
            await _bookingRepository.SaveAsync();

            return Ok(new { Message = "Booking confirmed successfully!" });
        }
        [HttpPost("cancel")]
        public async Task<IActionResult> CancelBooking([FromQuery] Guid bookingId)
        {
            var booking = await _bookingRepository.GetByIdAsync(bookingId);
            if (booking == null)
                return NotFound(new { Message = "Booking not found" });

            if (booking.Status == "Paid")
                return BadRequest(new { Message = "Cannot cancel a paid booking" });

            if (booking.Status == "Canceled")
                return BadRequest(new { Message = "Booking is already canceled" });

            if ((booking.CheckInDate - DateTime.UtcNow).TotalDays < 1)
                return BadRequest(new { Message = "Cannot cancel less than 1 day before check-in" });

            var user = await _userRepository.GetByIdAsync(booking.UserID);
            if (user == null)
                return NotFound(new { Message = "User not found" });

            string baseUrl = _configuration["Base:Url"] ?? string.Empty;
            string confirmCancelUrl = $"{baseUrl}/api/booking/confirm-cancel?bookingId={booking.Id}";

            string emailContent = $@"
    <p>Xin chào {user.FullName},</p>
    <p>Bạn đã yêu cầu hủy đặt phòng. Vui lòng nhấn vào link bên dưới để xác nhận:</p>
    <p><a href='{confirmCancelUrl}'>Xác nhận hủy đặt phòng</a></p>
        <p>Chi tiết đặt phòng:</p>
        <ul>
            <li><b>Check-in:</b> {booking.CheckInDate:dd/MM/yyyy HH:mm}</li>
            <li><b>Check-out:</b> {booking.CheckOutDate:dd/MM/yyyy HH:mm}</li>
            <li><b>Tổng tiền:</b> {booking.TotalPrice.ToString("C", new System.Globalization.CultureInfo("vi-VN"))}</li>
        </ul>
    <p>Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email.</p>";

            await _emailSender.SendEmailAsync(user.Email, "Confirm Booking Cancellation", emailContent);

            return Ok(new { Message = "Cancellation request sent. Please check your email to confirm." });
        }


        [HttpGet("confirm-cancel")]
        public async Task<IActionResult> ConfirmCancelBooking([FromQuery] Guid bookingId)
        {
            var booking = await _bookingRepository.GetByIdAsync(bookingId);
            if (booking == null)
                return NotFound(new { Message = "Booking not found" });

            if (booking.Status == "Canceled")
                return BadRequest(new { Message = "Booking is already canceled" });

            booking.Status = "Canceled";

            var calendars = await _calendarRepository.FindAsync(c => c.BookingID == bookingId);
            foreach (var calendar in calendars)
            {
                calendar.BookingID = null;
            }

            await _calendarRepository.SaveAsync();
            await _bookingRepository.SaveAsync();

            return Ok(new { Message = "Booking successfully canceled!" });
        }
        [HttpPut("confirm-booking-status")]
        public async Task<IActionResult> ConfirmBookingStatus([FromQuery] Guid bookingID)
        {
            var getBooking = await _bookingRepository.GetByIdAsync(bookingID);
            if (getBooking != null && getBooking.Status.Equals("Booked"))
            {

                getBooking.Status = "Payment Completed";
                await _bookingRepository.UpdateAsync(getBooking);
                await _bookingRepository.SaveAsync();
                return Ok(new { Message = "Update Booking Status Success" });
            }

            return NotFound();
        }

        
        }
    }

