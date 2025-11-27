using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ZvitPlus.DAL.Migrations
{
    /// <inheritdoc />
    public partial class _271120251145 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_reports_templates_template_id",
                table: "reports");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_templates_author_id",
                table: "templates");

            migrationBuilder.CreateIndex(
                name: "IX_templates_author_id",
                table: "templates",
                column: "author_id");

            migrationBuilder.AddForeignKey(
                name: "FK_reports_templates_template_id",
                table: "reports",
                column: "template_id",
                principalTable: "templates",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_reports_templates_template_id",
                table: "reports");

            migrationBuilder.DropIndex(
                name: "IX_templates_author_id",
                table: "templates");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_templates_author_id",
                table: "templates",
                column: "author_id");

            migrationBuilder.AddForeignKey(
                name: "FK_reports_templates_template_id",
                table: "reports",
                column: "template_id",
                principalTable: "templates",
                principalColumn: "author_id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
