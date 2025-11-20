using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ZvitPlus.DAL.Migrations
{
    /// <inheritdoc />
    public partial class _20112025353 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "users",
                keyColumn: "id",
                keyValue: new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
                column: "password_hash",
                value: "$2a$11$5yuDi3v5GgNM3DKDGxNHrO3zFdcRIGWr/AJoUlouW4huxuvuKIGYK");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "users",
                keyColumn: "id",
                keyValue: new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
                column: "password_hash",
                value: "$2a$11$VItJx2dEyqoR2dtqcYxBkuK0OGD1VLD1Q6yYAEZ9rXy8jzvRw7D6K");
        }
    }
}
