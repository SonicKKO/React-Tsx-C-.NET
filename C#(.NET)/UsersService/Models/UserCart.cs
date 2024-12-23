// namespace UsersService.Models {
//     public class User {
//         public int Id { get; set; }
//         public string? Username { get; set; }
//         public string? Email { get; set; }
//         public string? PasswordHash { get; set; }
//     }

// } 
namespace UsersService.Models {
    public class UserCart {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public Guid ItemId { get; set; }
        public int Quantity { get; set; }
        public DateTime CreateATt { get; set; } = DateTime.UtcNow;
    }
}