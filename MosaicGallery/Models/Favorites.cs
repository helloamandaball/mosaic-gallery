using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace MosaicGallery.Models
{
    public class Favorites
    {
        public int Id { get; set; }
        public int GalleryId { get; set; }
        public string CreateDateTime { get; set; }

        [DisplayName("Creator")]
        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }
    }
}