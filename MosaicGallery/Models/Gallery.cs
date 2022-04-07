using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace MosaicGallery.Models
{
    public class Gallery
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        [DisplayName("Image URL")]
        public string ImageLocation { get; set; }

        public string CreateDateTime { get; set; }

        [DisplayName("Category")]
        public int CategoryId { get; set; }

        //public Category Category { get; set; }

        [DisplayName ("Creator")]
        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }
    }
}
