using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MosaicGallery.Repositories;
using MosaicGallery.Models;

namespace MosaicGallery.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GalleryController : ControllerBase
    {

        private readonly IGalleryRepository _galleryRepository;

        public GalleryController( IGalleryRepository galleryRepository)
        {
            _galleryRepository = galleryRepository;
        }

        // GET ALL GALLERIES
        // GET: api/<GalleryController>
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_galleryRepository.GetAll());
        }

        // GET ALL GALLERIES OF THE CURRENT USER
        [HttpGet("mygalleries")]
        public IActionResult GetAllGalleriesByCurrentUser(int userProfileId)
        {
            return Ok(_galleryRepository.GetAllByUser(userProfileId));
        }

        // GET SINGLE GALLERY BY ID
        // GET api/<GalleryController>/5
        [HttpGet("{id}")]
        public IActionResult GetASingleGallery(int id)
        {
            var gallery = _galleryRepository.GetById(id);
            if (gallery == null)
            {
                return NotFound();
            }
            return Ok(gallery);
        }

        // GET A SINGLE GALLERY OF THE CURRENT USER'S BY ID
        [HttpGet("mygallery/{id}")]
        public IActionResult GetASingleGalleryByCurrentUser(int id, int userId)
        {
            var post = _galleryRepository.GetUsersSingleGalleryById(id, userId);

            if (post == null)
            {
                return NotFound();
            }

            return Ok(post);
        }

        // ADD A GALLERY
        // POST api/<GalleryController>
        [HttpPost]
        public IActionResult Post(Gallery gallery)
        {
            _galleryRepository.Add(gallery);
            //return CreatedAtAction("Get", new { id = gallery.Id }, gallery);
            return NoContent();
        }

        // UPDATE A SINGLE GALLERY
        // PUT api/<GalleryController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Gallery gallery)
        {
            if (id != gallery.Id)
            {
                return BadRequest();
            }
            _galleryRepository.Update(gallery);
            return NoContent();
        }

        // DELETE A SINGLE GALLERY
        // DELETE api/<GalleryController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _galleryRepository.Delete(id);
            return NoContent();
        }

        // GET ALL GALLERIES WITH COMMENTS
        //[HttpGet("GetWithComments")]
        //public IActionResult GetWithComments()
        //{
        //    var posts = _galleryRepository.GetAllWithComments();
        //    return Ok(posts);
        //}

        //GET SINGLE GALLERY BY ID WITH COMMENTS
        //[HttpGet("/GetGalleryIdWithComments/{id}")]
        //public IActionResult GetPostIdWithComments(int id)
        //{
        //    var gallery = _galleryRepository.GetGalleryIdWithComments(id);
        //    if (gallery == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(gallery);
        //}
    }
}
