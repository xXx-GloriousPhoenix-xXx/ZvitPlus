namespace ZvitPlus.DAL.Interfaces
{
    public interface IBasicCRUD<T>
    {
        Task<T?> GetByIdAsync(Guid id);
        Task<IEnumerable<T>> GetPaginatedAsync(int page, int itemsPerPage);
        Task<Guid?> AddAsync(T entity);
        Task<bool> UpdateAsync(T entity);
        Task<bool> DeleteAsync (Guid id);
    }
}
