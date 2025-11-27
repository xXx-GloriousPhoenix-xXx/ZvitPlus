using System.Text.Json.Serialization;

namespace ZvitPlus.DAL.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum UserRole
    {
        Guest,
        User,
        Moderator,
        Administrator
    }
}
