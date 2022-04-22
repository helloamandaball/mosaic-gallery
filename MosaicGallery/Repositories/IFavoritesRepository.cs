using MosaicGallery.Models;
using System.Collections.Generic;

namespace MosaicGallery.Repositories
{
    public interface IFavoritesRepository
    {
        List<Favorites> GetAllFavsByUser(int userProfileId);
        void AddToFavs(Favorites favorites);
        void DeleteFromFavs(int galleryId);
    }
}