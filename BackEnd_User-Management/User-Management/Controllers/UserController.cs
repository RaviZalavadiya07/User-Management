using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using User_Management.Model;
using User_Management.Repository;

namespace User_Management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserRepository userRepository;

        public UserController(UserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        [HttpPost ("addUser")]
        public async Task<ActionResult> AddUser([FromBody]User model)
        {
            await this.userRepository.AddUser(model);
            return Ok();
        }


        [HttpGet("getAllUser")]
        public async Task<ActionResult> GetAllUserList()
        {
            var userlist = await this.userRepository.GetAllUser();
            return Ok(userlist);   
        }


        [HttpGet ("getUserById/{id}")]
        public async Task<ActionResult> GetUserById([FromRoute] int id)
        {
            var User = await this.userRepository.GetUserById(id);
            return Ok(User);

        }

        [HttpPut ("updateUserByID/{id}")]

        public async Task<ActionResult> UserUpdate([FromRoute] int id , [FromBody] User model)
        {
            await this.userRepository.UserUpdate(id, model);
            return Ok();
        }

        [HttpDelete ("deleteUserById/{id}")]
        public async Task<ActionResult> DeleteUser([FromRoute] int id)
        {
            await this.userRepository.DeleteUSer(id);
            return Ok();    
        }


        [HttpGet ("getPagination")]
        public async Task<ActionResult> GetPagination(int pageNumber = 1, int pageSize = 5, string searchQuery = "")
        {
            var result = await this.userRepository.GetPagination(pageNumber, pageSize, searchQuery);
            return Ok(result);
        }
    }
}
