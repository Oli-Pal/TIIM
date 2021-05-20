using System.Threading;
using System.Threading.Tasks;

//generic co by kodu nie klepać bo sobie dziedziczę i nie musze adda remova itp robić tylko geta sobie robie

namespace Application.Repos
{
    public interface IGenericRepo<T> where T : class
    {
        Task AddAsync(T entity, CancellationToken cancellationToken = default);
        Task RemoveAsync(T entity);
        Task UpdateAsync(T entity);
        Task<bool> SaveAllAsync();
    }
}