using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddCheckInOutTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "isDeleted",
                table: "FeedBack",
                newName: "IsReply");

            migrationBuilder.AddColumn<Guid>(
                name: "BookingID",
                table: "FeedBack",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "CheckInOutLogs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BookingId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ActionType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ActionTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CheckInOutLogs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Refunds",
                columns: table => new
                {
                    RefundID = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Status = table.Column<bool>(type: "bit", nullable: false),
                    TransactionID = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Refunds", x => x.RefundID);
                    table.ForeignKey(
                        name: "FK_Refunds_Transactions_TransactionID",
                        column: x => x.TransactionID,
                        principalTable: "Transactions",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "TTLockAccount",
                columns: table => new
                {
                    TTLockID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TTLockUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HomeStayID = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TTLockAccount", x => x.TTLockID);
                    table.ForeignKey(
                        name: "FK_TTLockAccount_HomeStay_HomeStayID",
                        column: x => x.HomeStayID,
                        principalTable: "HomeStay",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "CheckInOutImages",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LogId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CheckInOutImages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CheckInOutImages_CheckInOutLogs_LogId",
                        column: x => x.LogId,
                        principalTable: "CheckInOutLogs",
                        principalColumn: "Id");
                });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("4b7b0200-70f9-416a-9a3f-29ccab0deec4"),
                columns: new[] { "CreatedAt", "LastModifiedAt", "PasswordHash" },
                values: new object[] { new DateTime(2025, 4, 26, 17, 15, 33, 559, DateTimeKind.Utc).AddTicks(4544), new DateTime(2025, 4, 26, 17, 15, 33, 559, DateTimeKind.Utc).AddTicks(4564), "$2a$11$TYpUMR5dKO53CYR8gqoQ7.Ymk0F6r25kssFp0hDNjPHUKIcYTTori" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("a85f272f-353e-4ff6-be2b-a15f1e7c0c47"),
                columns: new[] { "CreatedAt", "LastModifiedAt", "PasswordHash" },
                values: new object[] { new DateTime(2025, 4, 26, 17, 15, 33, 856, DateTimeKind.Utc).AddTicks(1372), new DateTime(2025, 4, 26, 17, 15, 33, 856, DateTimeKind.Utc).AddTicks(1385), "$2a$11$F3pP9W4qqgswOTvvyM0tgOxrP3A3xoaso2Z7IeK1FmqbEQD.Ds/cO" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("d87b4b72-609b-4979-b758-7771481da883"),
                columns: new[] { "CreatedAt", "LastModifiedAt", "PasswordHash" },
                values: new object[] { new DateTime(2025, 4, 26, 17, 15, 33, 287, DateTimeKind.Utc).AddTicks(2487), new DateTime(2025, 4, 26, 17, 15, 33, 287, DateTimeKind.Utc).AddTicks(2495), "$2a$11$YGqvgaY2dBgjOLgnL.JFguVzJ73jZZx7sIZbRSBIsdxkHpu95G3Z." });

            migrationBuilder.CreateIndex(
                name: "IX_FeedBack_BookingID",
                table: "FeedBack",
                column: "BookingID");

            migrationBuilder.CreateIndex(
                name: "IX_CheckInOutImages_LogId",
                table: "CheckInOutImages",
                column: "LogId");

            migrationBuilder.CreateIndex(
                name: "IX_Refunds_TransactionID",
                table: "Refunds",
                column: "TransactionID");

            migrationBuilder.CreateIndex(
                name: "IX_TTLockAccount_HomeStayID",
                table: "TTLockAccount",
                column: "HomeStayID");

            migrationBuilder.AddForeignKey(
                name: "FK_FeedBack_Booking_BookingID",
                table: "FeedBack",
                column: "BookingID",
                principalTable: "Booking",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FeedBack_Booking_BookingID",
                table: "FeedBack");

            migrationBuilder.DropTable(
                name: "CheckInOutImages");

            migrationBuilder.DropTable(
                name: "Refunds");

            migrationBuilder.DropTable(
                name: "TTLockAccount");

            migrationBuilder.DropTable(
                name: "CheckInOutLogs");

            migrationBuilder.DropIndex(
                name: "IX_FeedBack_BookingID",
                table: "FeedBack");

            migrationBuilder.DropColumn(
                name: "BookingID",
                table: "FeedBack");

            migrationBuilder.RenameColumn(
                name: "IsReply",
                table: "FeedBack",
                newName: "isDeleted");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("4b7b0200-70f9-416a-9a3f-29ccab0deec4"),
                columns: new[] { "CreatedAt", "LastModifiedAt", "PasswordHash" },
                values: new object[] { new DateTime(2025, 3, 24, 15, 57, 9, 208, DateTimeKind.Utc).AddTicks(1118), new DateTime(2025, 3, 24, 15, 57, 9, 208, DateTimeKind.Utc).AddTicks(1125), "$2a$11$2xO0FRB/IHFU8EsSr/AdSePlBP1DuBFY4NwB/td8uw5OdEShhH9/O" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("a85f272f-353e-4ff6-be2b-a15f1e7c0c47"),
                columns: new[] { "CreatedAt", "LastModifiedAt", "PasswordHash" },
                values: new object[] { new DateTime(2025, 3, 24, 15, 57, 9, 321, DateTimeKind.Utc).AddTicks(7596), new DateTime(2025, 3, 24, 15, 57, 9, 321, DateTimeKind.Utc).AddTicks(7605), "$2a$11$HK5OB2q3yWht5T/ZkS8duebwPtDdLoVJxJi5POfxa4if1M5isaxra" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("d87b4b72-609b-4979-b758-7771481da883"),
                columns: new[] { "CreatedAt", "LastModifiedAt", "PasswordHash" },
                values: new object[] { new DateTime(2025, 3, 24, 15, 57, 9, 92, DateTimeKind.Utc).AddTicks(3606), new DateTime(2025, 3, 24, 15, 57, 9, 92, DateTimeKind.Utc).AddTicks(3613), "$2a$11$3mOFvu3LMGL2vkWzril6nep94IwZQzY/VOoXFnIuLM4duI8.WyCz." });
        }
    }
}
