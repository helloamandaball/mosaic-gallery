using System.ComponentModel.DataAnnotations;

namespace MosaicGallery.Models
{
    public class UserType
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string Name { get; set; }

        public static int ADMIN_ID => 1;
        public static int CREATOR_ID => 2;
    }
}