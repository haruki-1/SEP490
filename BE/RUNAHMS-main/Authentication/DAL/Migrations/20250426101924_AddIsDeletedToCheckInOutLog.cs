using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddIsDeletedToCheckInOutLog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("4b7b0200-70f9-416a-9a3f-29ccab0deec4"),
                columns: new[] { "CreatedAt", "LastModifiedAt", "PasswordHash" },
                values: new object[] { new DateTime(2025, 4, 26, 17, 19, 23, 696, DateTimeKind.Utc).AddTicks(1408), new DateTime(2025, 4, 26, 17, 19, 23, 696, DateTimeKind.Utc).AddTicks(1419), "$2a$11$5jTDdf1eqky49/RV/L4ZR.O2Z/w8UVxWQ6dn5FhN5QqmXu/QDJF7C" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("a85f272f-353e-4ff6-be2b-a15f1e7c0c47"),
                columns: new[] { "CreatedAt", "LastModifiedAt", "PasswordHash" },
                values: new object[] { new DateTime(2025, 4, 26, 17, 19, 24, 24, DateTimeKind.Utc).AddTicks(725), new DateTime(2025, 4, 26, 17, 19, 24, 24, DateTimeKind.Utc).AddTicks(742), "$2a$11$bCb6qmuNMCCYhwFM7WdG7OSxVA.KG4Lp2xv9mxDuNP2lRtHcCImB." });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("d87b4b72-609b-4979-b758-7771481da883"),
                columns: new[] { "CreatedAt", "LastModifiedAt", "PasswordHash" },
                values: new object[] { new DateTime(2025, 4, 26, 17, 19, 23, 403, DateTimeKind.Utc).AddTicks(7983), new DateTime(2025, 4, 26, 17, 19, 23, 403, DateTimeKind.Utc).AddTicks(7993), "$2a$11$JthqCA9fI2lF.gHReWjSFO02rjMi5jDNUmzvfK1na55yyBp7SFAXC" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
        }
    }
}
