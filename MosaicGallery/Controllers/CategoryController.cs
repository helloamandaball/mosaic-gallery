using Microsoft.AspNetCore.Mvc;
using System;
using MosaicGallery.Models;
using MosaicGallery.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MosaicGallery.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        public CategoryController(ICategoryRepository categoryRepository)
        {

            _categoryRepository = categoryRepository;
        }

        // GET ALL CATEGORIES
        // GET: api/<CategoryController>
        [HttpGet]
        public IActionResult GetAllCategories()
        {

            return Ok(_categoryRepository.GetAllCategories());
        }

        // GET SINGLE CATEGORY BY ID
        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var category = _categoryRepository.GetCategoryById(id);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        // ADD A CATEGORY
        // POST api/<CategoryController>
        [HttpPost]
        public IActionResult Post(Category category)
        {
            _categoryRepository.Add(category);
            return NoContent();
        }

        // UPDATE A SINGLE CATEGORY
        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Category category)
        {
            if (id != category.Id)
            {
                return BadRequest();
            }
            _categoryRepository.UpdateCategory(category);
            return NoContent();
        }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _categoryRepository.Delete(id);
            return NoContent();
        }
    }
}
