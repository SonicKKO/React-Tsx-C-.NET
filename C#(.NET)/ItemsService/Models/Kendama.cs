
using MongoDB.Bson;

namespace ItemsService.Models {
    public class Kendama {
        public string Id { get; set; } = null!;
        public string Name { get; set; } = null!;
        public decimal Price { get; set; }
        public string Category { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string ImageUrl { get; set; } = null!;
        public string ImageUrlHover { get; set; } = null!;
        public List<string>? Wood { get; set; }
        public List<string>? Colour { get; set; }
        public List<string>? Brand { get; set; }
        public List<string>? PaintType { get; set; }
    }

    
}
