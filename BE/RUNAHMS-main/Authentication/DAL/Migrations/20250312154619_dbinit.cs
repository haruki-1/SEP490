﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DAL.Migrations
{
    /// <inheritdoc />
    public partial class dbinit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Amenity",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    isDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Amenity", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Facility",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    CreateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Facility", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Voucher",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Code = table.Column<string>(type: "nvarchar(6)", maxLength: 6, nullable: false),
                    Discount = table.Column<double>(type: "float", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    QuantityUsed = table.Column<int>(type: "int", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    isDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Voucher", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    Address = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    BirhDay = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Gender = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Avatar = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    CitizenID = table.Column<int>(type: "int", maxLength: 100, nullable: true),
                    PasswordHash = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    IsEmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    RoleId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifiedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Booking",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CheckInDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CheckOutDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    UnitPrice = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReasonCancel = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    isDeleted = table.Column<bool>(type: "bit", nullable: false),
                    UserID = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Booking", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Booking_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EmailConfirmationTokens",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Token = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    ExpirationDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmailConfirmationTokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmailConfirmationTokens_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "HomeStay",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MainImage = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    OpenIn = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Standar = table.Column<int>(type: "int", nullable: false),
                    isDeleted = table.Column<bool>(type: "bit", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    City = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    isBooked = table.Column<bool>(type: "bit", nullable: false),
                    CheckInTime = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    CheckOutTime = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    UserID = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HomeStay", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HomeStay_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Post",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Location = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    ReasonReject = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    PublishDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    isDeleted = table.Column<bool>(type: "bit", nullable: false),
                    UserID = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Post", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Post_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "RefreshTokens",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Token = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    ExpirationDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshTokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RefreshTokens_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserVoucher",
                columns: table => new
                {
                    UserID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    VoucherID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    isUsed = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserVoucher", x => new { x.UserID, x.VoucherID });
                    table.ForeignKey(
                        name: "FK_UserVoucher_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UserVoucher_Voucher_VoucherID",
                        column: x => x.VoucherID,
                        principalTable: "Voucher",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Transactions",
                columns: table => new
                {
                    ID = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BookingID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PaymentLink = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transactions", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Transactions_Booking_BookingID",
                        column: x => x.BookingID,
                        principalTable: "Booking",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Calendar",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,4)", precision: 18, scale: 4, nullable: false),
                    HomeStayID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BookingID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    isDeleted = table.Column<bool>(type: "bit", nullable: false),
                    IsBooked = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Calendar", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Calendar_Booking_BookingID",
                        column: x => x.BookingID,
                        principalTable: "Booking",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Calendar_HomeStay_HomeStayID",
                        column: x => x.HomeStayID,
                        principalTable: "HomeStay",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "FeedBack",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Rating = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    isDeleted = table.Column<bool>(type: "bit", nullable: false),
                    UserID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    HomeStayID = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeedBack", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FeedBack_HomeStay_HomeStayID",
                        column: x => x.HomeStayID,
                        principalTable: "HomeStay",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_FeedBack_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "HomestayAmenity",
                columns: table => new
                {
                    AmenityId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    HomeStayID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    isDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HomestayAmenity", x => new { x.HomeStayID, x.AmenityId });
                    table.ForeignKey(
                        name: "FK_HomestayAmenity_Amenity_AmenityId",
                        column: x => x.AmenityId,
                        principalTable: "Amenity",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_HomestayAmenity_HomeStay_HomeStayID",
                        column: x => x.HomeStayID,
                        principalTable: "HomeStay",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "HomeStayFacility",
                columns: table => new
                {
                    HomeStayID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FacilityID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HomeStayFacility", x => new { x.HomeStayID, x.FacilityID });
                    table.ForeignKey(
                        name: "FK_HomeStayFacility_Facility_FacilityID",
                        column: x => x.FacilityID,
                        principalTable: "Facility",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_HomeStayFacility_HomeStay_HomeStayID",
                        column: x => x.HomeStayID,
                        principalTable: "HomeStay",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "HomeStayImage",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    HomeStayID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    isDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HomeStayImage", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HomeStayImage_HomeStay_HomeStayID",
                        column: x => x.HomeStayID,
                        principalTable: "HomeStay",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "CommentPost",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    CommontDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PostID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ParrentID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    isDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommentPost", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CommentPost_CommentPost_ParrentID",
                        column: x => x.ParrentID,
                        principalTable: "CommentPost",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CommentPost_Post_PostID",
                        column: x => x.PostID,
                        principalTable: "Post",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CommentPost_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PostImage",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    PostID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    isDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostImage", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PostImage_Post_PostID",
                        column: x => x.PostID,
                        principalTable: "Post",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Admin" },
                    { 2, "Manager" },
                    { 3, "User" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Address", "Avatar", "BirhDay", "CitizenID", "CreatedAt", "Email", "FullName", "Gender", "IsDeleted", "IsEmailConfirmed", "LastModifiedAt", "PasswordHash", "Phone", "RoleId" },
                values: new object[,]
                {
                    { new Guid("4b7b0200-70f9-416a-9a3f-29ccab0deec4"), "Bình Thủy, Cần Thơ", null, null, null, new DateTime(2025, 3, 12, 22, 46, 19, 297, DateTimeKind.Utc).AddTicks(4140), "staff@gmail.com", "staff", null, false, true, new DateTime(2025, 3, 12, 22, 46, 19, 297, DateTimeKind.Utc).AddTicks(4150), "$2a$11$wV2G5K9MAtIFJX39HWQbxuCBaDn2X8BqtYNCXDuyVMewnzQLE/CuS", "0987654123", 2 },
                    { new Guid("a85f272f-353e-4ff6-be2b-a15f1e7c0c47"), "Phong Điền, Cần Thơ", null, null, null, new DateTime(2025, 3, 12, 22, 46, 19, 421, DateTimeKind.Utc).AddTicks(2562), "user@gmail.com", "user", null, false, true, new DateTime(2025, 3, 12, 22, 46, 19, 421, DateTimeKind.Utc).AddTicks(2572), "$2a$11$CV2y4gVuzulOPezDgP1sw.nIVxbW0cqmz.A1lYrE5yiKuuRG/r7L2", "0987654312", 3 },
                    { new Guid("d87b4b72-609b-4979-b758-7771481da883"), "Ninh Kiều, Cần Thơ", null, null, null, new DateTime(2025, 3, 12, 22, 46, 19, 179, DateTimeKind.Utc).AddTicks(2517), "admin@gmail.com", "admin", null, false, true, new DateTime(2025, 3, 12, 22, 46, 19, 179, DateTimeKind.Utc).AddTicks(2528), "$2a$11$ICPnFykYdqMborU8/pTgbO8IT2Hw8V3lXOoKX/OxMaL5KbT8627eu", "0987654321", 1 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Booking_UserID",
                table: "Booking",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_Calendar_BookingID",
                table: "Calendar",
                column: "BookingID");

            migrationBuilder.CreateIndex(
                name: "IX_Calendar_HomeStayID",
                table: "Calendar",
                column: "HomeStayID");

            migrationBuilder.CreateIndex(
                name: "IX_CommentPost_ParrentID",
                table: "CommentPost",
                column: "ParrentID");

            migrationBuilder.CreateIndex(
                name: "IX_CommentPost_PostID",
                table: "CommentPost",
                column: "PostID");

            migrationBuilder.CreateIndex(
                name: "IX_CommentPost_UserID",
                table: "CommentPost",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_EmailConfirmationTokens_UserId",
                table: "EmailConfirmationTokens",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_FeedBack_HomeStayID",
                table: "FeedBack",
                column: "HomeStayID");

            migrationBuilder.CreateIndex(
                name: "IX_FeedBack_UserID",
                table: "FeedBack",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_HomeStay_UserID",
                table: "HomeStay",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_HomestayAmenity_AmenityId",
                table: "HomestayAmenity",
                column: "AmenityId");

            migrationBuilder.CreateIndex(
                name: "IX_HomeStayFacility_FacilityID",
                table: "HomeStayFacility",
                column: "FacilityID");

            migrationBuilder.CreateIndex(
                name: "IX_HomeStayImage_HomeStayID",
                table: "HomeStayImage",
                column: "HomeStayID");

            migrationBuilder.CreateIndex(
                name: "IX_Post_UserID",
                table: "Post",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_PostImage_PostID",
                table: "PostImage",
                column: "PostID");

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_UserId",
                table: "RefreshTokens",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_BookingID",
                table: "Transactions",
                column: "BookingID");

            migrationBuilder.CreateIndex(
                name: "IX_Users_RoleId",
                table: "Users",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserVoucher_VoucherID",
                table: "UserVoucher",
                column: "VoucherID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Calendar");

            migrationBuilder.DropTable(
                name: "CommentPost");

            migrationBuilder.DropTable(
                name: "EmailConfirmationTokens");

            migrationBuilder.DropTable(
                name: "FeedBack");

            migrationBuilder.DropTable(
                name: "HomestayAmenity");

            migrationBuilder.DropTable(
                name: "HomeStayFacility");

            migrationBuilder.DropTable(
                name: "HomeStayImage");

            migrationBuilder.DropTable(
                name: "PostImage");

            migrationBuilder.DropTable(
                name: "RefreshTokens");

            migrationBuilder.DropTable(
                name: "Transactions");

            migrationBuilder.DropTable(
                name: "UserVoucher");

            migrationBuilder.DropTable(
                name: "Amenity");

            migrationBuilder.DropTable(
                name: "Facility");

            migrationBuilder.DropTable(
                name: "HomeStay");

            migrationBuilder.DropTable(
                name: "Post");

            migrationBuilder.DropTable(
                name: "Booking");

            migrationBuilder.DropTable(
                name: "Voucher");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Roles");
        }
    }
}
