using Microsoft.AspNetCore.Mvc;
using UsersService.Models;
using UsersService.Services;

namespace UsersService.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase {
        private readonly AuthService _authService;

        public AuthController(AuthService authService) {
            _authService = authService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request) {
            var user = _authService.GetUserByEmail(request.Email!);
            if (user == null || !_authService.VerifyPasswordHash(request.Password!, user.PasswordHash!, user))
                return Unauthorized("Invalid email or password");

            var token = _authService.GenerateJwtToken(user);
                return Ok(new { Token = token });
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest request) {
            if (request == null || string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password)) {
                return BadRequest("Invalid registration request");
            }

            var result = _authService.RegisterUser(request);
            if (!result) {
                return Conflict("User with this email already exists"); 
            }

            return Ok("User registered successfully");
        }
    }
}
