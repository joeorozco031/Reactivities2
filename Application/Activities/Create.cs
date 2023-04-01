using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest{
            
            public Activity Activity { get; set; }

        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context){
                _context = context;

            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // We don't need to use the AddAsync method because we just need to add the data to memory.
                // The SaveChangeAsync will make the changes to the database
                
                _context.Activities.Add(request.Activity);

                await _context.SaveChangesAsync();

                return Unit.Value;   // return Unit (object from Mediatr that tells api controller that task is complete; nothing else)
            }
        }
    }
}