using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using User_Management.Data;
using User_Management.Model;

namespace User_Management.Repository
{
    public class UserRepository
    {
        private readonly AppDbContext appDbContext;

        public UserRepository(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public async Task AddUser(User user)
        {
            await appDbContext.Set<User>().AddAsync(user);
            await appDbContext.SaveChangesAsync();
        }

        public async Task<List<User>> GetAllUser()
        {
            return await appDbContext.Users.ToListAsync();
        }

        public async Task<User> GetUserById(int id)
        {
           return await appDbContext.Users.FindAsync(id);
        }

        public async Task UserUpdate(int id,User model)
        {
            var userUp = await appDbContext.Users.FindAsync(id);
            if (userUp == null)
            {
                throw new Exception("User not found");
            }
            userUp.FirstName = model.FirstName;
            userUp.LastName = model.LastName;
            userUp.Email = model.Email;
            userUp.PhoneNo = model.PhoneNo;
            userUp.DateofBorth = model.DateofBorth;
            userUp.State = model.State;
            userUp.City = model.City;
            userUp.Gender = model.Gender;
            await appDbContext.SaveChangesAsync();
        }

        public async Task DeleteUSer(int id)
        {
            var userDelete = await appDbContext.Users.FindAsync(id);
            if (userDelete == null)
            {
                throw new Exception("User not found");
            }
            appDbContext.Users.Remove(userDelete);
            await appDbContext.SaveChangesAsync();
        }

        public async Task<PaginatedList<User>> GetPagination(int pageNumber, int pageSize , string searchQuery = "")
        {
            var query = appDbContext.Users.AsQueryable();

            if (!string.IsNullOrEmpty(searchQuery))
            {
                query = query.Where(p => p.FirstName.Contains(searchQuery) ||
                                         p.LastName.Contains(searchQuery) ||
                                         p.Email.Contains(searchQuery) ||
                                         p.PhoneNo.Contains(searchQuery) ||
                                         p.State.Contains(searchQuery) ||
                                         p.City.Contains(searchQuery));
            }

            var usersList = await query.Skip((pageNumber - 1) * pageSize)
                                      .Take(pageSize)
                                      .ToListAsync();

            var totalCount = await query.CountAsync();

            return new PaginatedList<User>(usersList, totalCount, pageNumber, pageSize);
        }
    }

    public class PaginatedList<T> : List<T>
    {
        public int PageIndex { get; private set; }
        public int TotalPages { get; private set; }
        public int TotalCount { get; private set; }

        public PaginatedList(List<T> items, int count, int pageIndex, int pageSize)
        {
            PageIndex = pageIndex;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            TotalCount = count;
            AddRange(items);
        }

        public bool HasPreviousPage => PageIndex > 1;
        public bool HasNextPage => PageIndex < TotalPages;
    }
}
