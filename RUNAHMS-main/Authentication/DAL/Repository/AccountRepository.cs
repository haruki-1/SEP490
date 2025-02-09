using API.Utils;
using DAL;
using GraduationAPI_EPOSHBOOKING.IRepository;
using GraduationAPI_EPOSHBOOKING.Model;
using GraduationAPI_EPOSHBOOKING.Ultils;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Identity.Client;
using Microsoft.IdentityModel.Tokens;
using System.Net;
using System.Reflection.Metadata.Ecma335;
using System.Security.Principal;
using System.Text.RegularExpressions;
#pragma warning disable // tắt cảnh báo để code sạch hơn

namespace GraduationAPI_EPOSHBOOKING.Repository
{
    public class AccountRepository : IAccountRepository
    {
        private readonly DBContext db;
        private readonly IWebHostEnvironment environment;
        private readonly IConfiguration configuration;
        public AccountRepository(DBContext _db, IWebHostEnvironment _environment, IConfiguration configuration)
        {
            this.db = _db;
            this.environment = _environment;
            this.configuration = configuration;
        }

        public ResponseMessage RegisterManagerAccount(Account account, String fullName)
        {
            String role = "Manager";
            var addRole = db.roles.FirstOrDefault(x => x.Name.Equals(role));
            var checkEmailAlready = db.accounts.FirstOrDefault(email => email.Email.Equals(account.Email));
            var checkPhone = db.accounts.FirstOrDefault(x => x.Phone.Equals(account.Phone));
            if (checkEmailAlready != null)
            {
                return new ResponseMessage { Success = false, Data = checkEmailAlready.Email, Message = "Email is already exists. Please login!", StatusCode = (int)HttpStatusCode.AlreadyReported };
            }

            else if (checkPhone != null)
            {
                return new ResponseMessage { Success = false, Data = checkPhone.Phone, Message = "Phone is already exists. Please login!", StatusCode = (int)HttpStatusCode.AlreadyReported };
            }
            else
            {
                if (account != null && !fullName.IsNullOrEmpty())
                {
                    Profile addProfile = new Profile
                    {
                        fullName = fullName,
                    };
                    db.profiles.Add(addProfile);
                    Account addAccount = new Account
                    {
                        Email = account.Email,
                        Password = Ultils.Utils.HashPassword(account.Password),
                        Phone = account.Phone,
                        Role = addRole,
                        Profile = addProfile,
                        IsActive = false
                    };
                    db.accounts.Add(addAccount);
                    db.SaveChanges();
                    String otp = Ultils.Utils.sendMail(account.Email);
                    return new ResponseMessage { Success = true, Data = new { addAccount = addAccount, OTP = otp }, Message = "Successfully", StatusCode = (int)HttpStatusCode.OK };
                }
                return new ResponseMessage { Success = false, Data = account, Message = "Register Fail", StatusCode = (int)HttpStatusCode.BadRequest };
            }

        }
        public ResponseMessage ActiveAccount(String email)
        {
            String emailParten = @"^[^\s@]+@[^\s@]+\.[^\s@]+$";
            Regex regex = new Regex(emailParten);
            if (regex.IsMatch(email))
            {
                var checkEmail = db.accounts.FirstOrDefault(x => x.Email.Equals(email));
                if (checkEmail != null)
                {
                    checkEmail.IsActive = true;
                    db.accounts.Update(checkEmail);
                    db.SaveChanges();
                    return new ResponseMessage { Success = true, Data = checkEmail, Message = "Your account has been activated", StatusCode = (int)HttpStatusCode.OK };
                }
                else
                {
                    return new ResponseMessage { Success = false, Data = checkEmail, Message = "Data not found", StatusCode = (int)HttpStatusCode.NotFound };
                }
            }
            return new ResponseMessage { Success = false, Data = email, Message = "Email is not in correct format. Please re-enter for example: Eposh@eposh.com" };
        }

        public ResponseMessage LoginWithNumberPhone(String phone)
        {
            string phoneRegex = @"^(?:\+84|0)([3|5|7|8|9])+([0-9]{8})$";
            Regex regex = new Regex(phoneRegex);
            string roleName = "Customer";
            var role = db.roles.FirstOrDefault(x => x.Name.Equals(roleName));

            if (regex.IsMatch(phone))
            {
                var checkPhone = db.accounts
                                   .Include(p => p.Profile)
                                   .Include(r => r.Role)
                                   .FirstOrDefault(x => x.Phone.Equals(phone));
                if (checkPhone != null)
                {
                    var responseData = new
                    {
                        AccountID = checkPhone.AccountID,
                        Email = checkPhone.Email ?? null,
                        Phone = checkPhone.Phone ?? null,
                        Role = checkPhone.Role?.Name ?? null,
                        FullName = checkPhone.Profile?.fullName ?? null,
                        BirthDay = checkPhone.Profile?.BirthDay ?? null,
                        Gender = checkPhone.Profile?.Gender ?? null,
                        Address = checkPhone.Profile?.Address ?? null,
                        Avatar = checkPhone.Profile?.Avatar ?? null
                    };
                    var token = JWTHandler.GenerateJWT(checkPhone, configuration["JWT:SecretKey"]);
                    return new ResponseMessage { Success = true, Data = responseData, Token = token, Message = "Successfully", StatusCode = (int)HttpStatusCode.OK };
                }
                if (checkPhone != null && checkPhone.IsActive == false)
                {
                    return new ResponseMessage { Success = false, Data = checkPhone, Token = "", Message = "Your account has been permanently blocked", StatusCode = (int)HttpStatusCode.Forbidden };
                }
                else
                {
                    Profile addProfile = new Profile
                    {
                        fullName = Ultils.Utils.GenerateRandomString()
                    };
                    db.profiles.Add(addProfile);
                    Account addAccount = new Account
                    {
                        Phone = phone,
                        Profile = addProfile,
                        IsActive = true,
                        Role = role
                    };
                    db.accounts.Add(addAccount);
                    db.SaveChanges();
                    var responseData = new
                    {
                        AccountID = addAccount.AccountID,
                        Email = addAccount.Email ?? null,
                        Phone = addAccount.Phone ?? null,
                        Role = addAccount.Role?.Name ?? null,
                        FullName = addAccount.Profile?.fullName ?? null,
                        BirthDay = addAccount.Profile?.BirthDay ?? null,
                        Gender = addAccount.Profile?.Gender ?? null,
                        Address = addAccount.Profile?.Address ?? null,
                        Avatar = addAccount.Profile?.Avatar ?? null
                    };
                    var token = JWTHandler.GenerateJWT(addAccount, configuration["JWT:SecretKey"]);
                    return new ResponseMessage { Success = true, Data = responseData, Token = token, Message = "Successfully", StatusCode = (int)HttpStatusCode.OK };
                }
            }
            return new ResponseMessage { Success = false, Data = phone, Message = "Phone is not in correct format. Please re-enter for example: 0123456789", StatusCode = (int)HttpStatusCode.BadRequest };
        }
        public ResponseMessage Register(string email, string password, string fullName, string phone)
        {
            if (db.accounts.Any(a => a.Email == email))
            {
                return new ResponseMessage
                {
                    Success = false,
                    Message = "Email is already exists. Please login!",
                    StatusCode = (int)HttpStatusCode.AlreadyReported
                };
            }
            var checkPhone = db.accounts.FirstOrDefault(x => x.Phone.Equals(phone));
            if (checkPhone != null)
            {
                return new ResponseMessage { Success = false, Data = checkPhone.Email, Message = "Phone is already exists. Please login!", StatusCode = (int)HttpStatusCode.AlreadyReported };
            }

            string hashedPassword = Utils.HashPassword(password);
            var account = new Account
            {
                Email = email,
                Password = hashedPassword,
                IsActive = false,
                Phone = phone,
                Role = db.roles.FirstOrDefault(r => r.Name == "User")
            };
            var profile = new Profile
            {
                fullName = fullName
            };

            account.Profile = profile;
            db.accounts.Add(account);
            db.SaveChanges();
            String otp = Ultils.Utils.sendMail(account.Email);
            return new ResponseMessage
            {
                Success = true,
                Message = "Registration Successfully",
                StatusCode = (int)HttpStatusCode.OK,
                Data = new { Account = account, otp = otp }
            };
        }

        public ResponseMessage UpdateNewPassword(string email, string newPassword)
        {
            var getAccount = db.accounts.FirstOrDefault(account => account.Email.Equals(email));
            if (getAccount != null)
            {
                getAccount.Password = Ultils.Utils.HashPassword(newPassword);
                db.accounts.Update(getAccount);
                db.SaveChanges();
                return new ResponseMessage { Success = true, Data = getAccount, Message = "Successfully", StatusCode = (int)HttpStatusCode.OK };
            }
            return new ResponseMessage { Success = false, Data = email, Message = "Email Does not exitst", StatusCode = (int)HttpStatusCode.NotFound };

        }

        public ResponseMessage ChangePassword(int accountId, string oldPassword, string newPassword)
        {
            var account = db.accounts.FirstOrDefault(a => a.AccountID == accountId);

            if (account == null)
            {
                return new ResponseMessage
                {
                    Success = false,
                    Message = "Account not found",
                    StatusCode = (int)HttpStatusCode.NotFound
                };
            }

            string hashedOldPassword = Ultils.Utils.HashPassword(oldPassword);
            if (account.Password != hashedOldPassword)
            {
                return new ResponseMessage
                {
                    Success = false,
                    Message = "Old password is incorrect",
                    StatusCode = (int)HttpStatusCode.BadRequest
                };
            }

            string hashedNewPassword = Ultils.Utils.HashPassword(newPassword);
            account.Password = hashedNewPassword;

            db.SaveChanges();

            return new ResponseMessage
            {
                Success = true,
                Message = "Password changed successfully",
                Data = account,
                StatusCode = (int)HttpStatusCode.OK
            };
        }

        public ResponseMessage UpdateProfileByAccount(int accountID, String email, String phone, Profile profile, IFormFile avatar)
        {
            try
            {
                var getAccount = db.accounts.Include(p => p.Profile).FirstOrDefault(account => account.AccountID == accountID);
                if (getAccount == null)
                {
                    return new ResponseMessage { Success = false, Data = null, Message = "Data not found", StatusCode = (int)HttpStatusCode.NotFound };
                }
                if (avatar == null)
                {
                    getAccount.Email = email;
                    getAccount.Phone = phone;
                    getAccount.Profile.fullName = profile.fullName;
                    getAccount.Profile.BirthDay = profile.BirthDay;
                    getAccount.Profile.Gender = profile.Gender;
                    getAccount.Profile.Address = profile.Address;
                    getAccount.Profile.Avatar = profile.Avatar;
                    db.accounts.Update(getAccount);
                    db.SaveChanges();
                    return new ResponseMessage { Success = true, Data = getAccount, Message = "Successfully", StatusCode = (int)HttpStatusCode.OK };
                }
                else
                {
                    getAccount.Email = email;
                    getAccount.Phone = phone;
                    getAccount.Profile.fullName = profile.fullName;
                    getAccount.Profile.BirthDay = profile.BirthDay;
                    getAccount.Profile.Gender = profile.Gender;
                    getAccount.Profile.Address = profile.Address;
                    getAccount.Profile.Avatar = Utils.SaveImage(avatar, environment);
                    db.accounts.Update(getAccount);
                    db.SaveChanges();
                    return new ResponseMessage { Success = true, Data = getAccount, Message = "Successfully", StatusCode = (int)HttpStatusCode.OK };

                }

            }
            catch (Exception ex)
            {
                return new ResponseMessage { Success = false, Data = ex, Message = "Internal Server Error", StatusCode = (int)HttpStatusCode.InternalServerError };

            }

        }

        public ResponseMessage GetProfileByAccountId(int accountId)
        {
            var account = db.accounts
                            .Include(a => a.Profile)
                            .Include(Role => Role.Role)
                            .FirstOrDefault(a => a.AccountID == accountId);

            if (account == null)
            {
                return new ResponseMessage
                {
                    Success = false,
                    Message = "Account not found",
                    StatusCode = (int)HttpStatusCode.NotFound
                };
            }

            if (account == null)
            {
                return new ResponseMessage
                {
                    Success = false,
                    Message = "Profile not found",
                    StatusCode = (int)HttpStatusCode.NotFound
                };
            }

            return new ResponseMessage
            {
                Success = true,
                Data = account,
                Message = "Profile retrieved successfully",
                StatusCode = (int)HttpStatusCode.OK
            };
        }

     

        public ResponseMessage Login(String text, String password)
        {
            var passwordMD5 = Ultils.Utils.HashPassword(password);
            string secretkey = configuration["JWT:SecretKey"];
            var checkAccount = db.accounts
                                 .Include(profile => profile.Profile)
                                 .Include(Role => Role.Role)
                                 .Include(hotel => hotel.HomeStays)
                                 .FirstOrDefault(x => x.Email.Equals(text) && x.Password.Equals(passwordMD5) || x.Phone.Equals(text) && x.Password.Equals(passwordMD5));
            if (checkAccount != null && checkAccount.IsActive == true)
            {
                var token = JWTHandler.GenerateJWT(checkAccount, secretkey);
                return new ResponseMessage { 
                    Success = true,
                    Data = new { Role = checkAccount.Role.Name, Token = token },
                    Message = "Successfully", 
                    StatusCode = (int)HttpStatusCode.OK };
            }
            else
            {
                return new ResponseMessage { 
                    Success = false, 
                    Message = "Login Fail", 
                    StatusCode = (int)(HttpStatusCode.NotFound) 
                };
            }

        }

        public ResponseMessage GoogleLogin(string email, string userName, string avatar)
        {
            var check = db.accounts
                          .Include(role => role.Role)
                          .Include(hotel => hotel.HomeStays)
                          .FirstOrDefault(x => x.Email.Equals(email));

            if (check != null && check.IsActive == false)
            {
                return new ResponseMessage { Success = false, Data = check, Token = "", Message = "Your account has been permanently blocked", StatusCode = (int)HttpStatusCode.Forbidden };
            }

            if (check != null)
            {   
                var token = JWTHandler.GenerateJWT(check, configuration["JWT:SecretKey"]);
                return new ResponseMessage
                {
                    Success = true,
                    Data = new { Role = check.Role.Name, Token = token },
                    Message = "Successfully",
                    StatusCode = (int)HttpStatusCode.OK
                };       
        }
            else
            {
                String RoleName = "Customer";
                var role = db.roles.FirstOrDefault(x => x.Name.Equals(RoleName));
                Profile createProfile = new Profile
                {
                    fullName = userName,
                    Avatar = avatar
                };
                db.profiles.Add(createProfile);
                Account createAccount = new Account
                {
                    Email = email,
                    Profile = createProfile,
                    IsActive = true,
                    Role = role
                };
                db.accounts.Add(createAccount);
                db.SaveChanges();
                var token = JWTHandler.GenerateJWT(createAccount, configuration["JWT:SecretKey"]);
            
                return new ResponseMessage
                {
                    Success = true,
                    Data = new { Role = check.Role.Name, Token = token },
                    Message = "Successfully",
                    StatusCode = (int)HttpStatusCode.OK
                };
            }
        }
        }
    }

    