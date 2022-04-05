using MosaicGallery.Models;

namespace MosaicGallery.Repositories
{
    public interface IUserRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByEmail(string email);
    }
}