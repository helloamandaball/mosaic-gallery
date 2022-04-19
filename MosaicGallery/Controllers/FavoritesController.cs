using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MosaicGallery.Repositories;
using MosaicGallery.Models;

namespace MosaicGallery.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritesController : ControllerBase
    {
        private readonly IFavoritesRepository _favoritesRepository;

        public FavoritesController(IFavoritesRepository favoritesRepository)
        {
            _favoritesRepository = favoritesRepository;
        }

        // GET ALL FAVORITES OF THE CURRENT USER
        // GET: api/<FavoritesController>
        [HttpGet]
        public IActionResult GetAllFavsByUser(int userProfileId)
        {
            return Ok(_favoritesRepository.GetAllFavsByUser(userProfileId));
        }

        // ADD TO FAVORITES
        // POST api/<FavoritesController>
        [HttpPost]
        public IActionResult Post(Favorites favorites)
        {
            _favoritesRepository.AddToFavs(favorites);
            return NoContent();
        }

        // DELETE FROM FAVORITES
        // DELETE api/<FavoritesController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int galleryId)
        {
            _favoritesRepository.DeleteFromFavs(galleryId);
            return NoContent();
        }
    }
}
