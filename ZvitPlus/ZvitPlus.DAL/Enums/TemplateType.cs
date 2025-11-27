using System.Text.Json.Serialization;

namespace ZvitPlus.DAL.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum TemplateType
    {
        Unset,
        Invoice,
        Contract,
        Report,
        Letter,
        Form,
        Certificate
    }
}
