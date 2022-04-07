using MosaicGallery.Models;
using System.Collections.Generic;

namespace MosaicGallery.Repositories
{
    public interface IGalleryRepository
    {
        List<Gallery> GetAll();
        List<Gallery> GetAllByUser(int userProfileId);
        Gallery GetById(int id);
        Gallery GetUsersSingleGalleryById(int id, int userProfileId);

        void Add(Gallery gallery);
        void Update(Gallery gallery);
        void Delete(int galleryId);
    }
}