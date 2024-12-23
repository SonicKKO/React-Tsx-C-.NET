using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography; 
using Microsoft.AspNetCore.Identity;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using UsersService.Data;
using UsersService.Models;

namespace UsersService.Services {  
    public class AuthService {
        private readonly string _jwtKey;
        private readonly UsersDbContext _context;
        private readonly PasswordHasher<User> _passwordHasher;

        public AuthService(string jwtKey, UsersDbContext context) {
            _jwtKey = jwtKey;
            _context = context;
            _passwordHasher = new PasswordHasher<User>();
        }

        public string GenerateJwtToken(User user) {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtKey);
            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity(new[] {
                    new Claim(ClaimTypes.Name, user.Username!),
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()!)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public bool RegisterUser(RegisterRequest request) {
            if (_context.Users.Any(u => u.Email == request.Email)) {
                return false;
            }

            var user = new User {
                Username = request.Username,
                Email = request.Email,
            };

            user.PasswordHash = _passwordHasher.HashPassword(user, request.Password!);

            _context.Users.Add(user);
            _context.SaveChanges();
            return true;
        }

        public User? GetUserByEmail(string email) {
            return _context.Users.FirstOrDefault(u => u.Email == email);
        }

        public bool VerifyPasswordHash(string password, string storedHash, User user) {
            var result = _passwordHasher.VerifyHashedPassword(user, storedHash, password);
            return result == PasswordVerificationResult.Success;
        }

        private static string HashPassword(string password) {
            using var hmac = new HMACSHA512();
            var passwordBytes = Encoding.UTF8.GetBytes(password);
            return Convert.ToBase64String(hmac.ComputeHash(passwordBytes));
        }

    }
}
