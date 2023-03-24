using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    // this controller is derived by BaseApiController which already has api attributes and route

    public class ActivitiesController : BaseApiController
    {
        
        private readonly DataContext _context;
        
        public ActivitiesController(DataContext context)
        {
            _context = context;
            
        }

        [HttpGet] //api/activitites

        public async Task<ActionResult<List<Activity>>> GetActivities() {
            return await _context.Activities.ToListAsync();
        }

        [HttpGet("{id}")]  //api/activities/abcdefg
        public async Task<ActionResult<Activity>> GetActivity(Guid id) {
            return await _context.Activities.FindAsync(id);
        }

    }
}