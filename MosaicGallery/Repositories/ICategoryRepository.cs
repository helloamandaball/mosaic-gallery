using MosaicGallery.Models;
using System.Collections.Generic;

namespace MosaicGallery.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAllCategories();
        Category GetCategoryById(int id);
        void Add(Category category);
        void Delete(int id);
        void UpdateCategory(Category category);
    }
}