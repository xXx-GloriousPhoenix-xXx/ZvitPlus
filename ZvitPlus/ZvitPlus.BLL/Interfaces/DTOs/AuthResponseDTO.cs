namespace ZvitPlus.BLL.Interfaces.DTOs
{
    public interface IAuthResponseDTO : IDTO
    {
        Guid UserId { get; set;  }
        string Token { get; set; }
    }
}
