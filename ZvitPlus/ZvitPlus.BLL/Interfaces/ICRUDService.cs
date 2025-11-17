using ZvitPlus.BLL.Interfaces.DTOs;

namespace ZvitPlus.BLL.Interfaces
{
    public interface ICRUDService<TCreate, TUpdate, TRead, TEntityMarker>
        where TCreate : ICreateDTO, TEntityMarker
        where TUpdate : IUpdateDTO, TEntityMarker
        where TRead : IReadDTO, TEntityMarker
    {
        Task<TRead> CreateAsync(TCreate dto);
        Task<TRead> UpdateAsync(TUpdate dto);
        Task<TRead> ReadByIdAsync(Guid id);
        Task<IEnumerable<TRead>> ReadPaginatedAsync(int page, int itemsPerPage);
        Task DeleteByIdAsync(Guid id);
    }
}
