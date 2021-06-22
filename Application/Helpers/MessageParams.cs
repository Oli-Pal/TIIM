using System;

namespace Application.Helpers
{
    public class MessageParams : PaginationParams
    {
        
        public Guid Username { get; set; }
        public string Container { get; set; } = "Unread";
    }
}