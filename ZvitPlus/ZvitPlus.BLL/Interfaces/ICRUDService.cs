using ZvitPlus.BLL.Interfaces.DTOs;

namespace ZvitPlus.BLL.Interfaces
{
    public interface ICRUDService<TCreate, TUpdate, TRead, TEntityMarker>
        where TCreate : ICreateDTO, TEntityMarker
        where TUpdate : IUpdateDTO, TEntityMarker
        where TRead : IReadDTO, TEntityMarker
    {
        Task<TRead> AddAsync(TCreate dto);
        Task<TRead> UpdateAsync(TUpdate dto);
        Task<TRead> GetByIdAsync(Guid id);
        Task<IEnumerable<TRead>> GetPaginatedAsync(int page, int itemsPerPage);
        Task DeleteAsync(Guid id);
    }
}
