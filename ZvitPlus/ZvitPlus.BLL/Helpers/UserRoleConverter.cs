using System.Text.Json;
using System.Text.Json.Serialization;
using ZvitPlus.DAL.Enums;

namespace ZvitPlus.BLL.Helpers
{
    public class UserRoleConverter : JsonConverter<UserRole>
    {
        public override UserRole Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            var stringValue = reader.GetString();
            return Enum.Parse<UserRole>(stringValue!);
        }

        public override void Write(Utf8JsonWriter writer, UserRole value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value.ToString());
        }
    }
}
