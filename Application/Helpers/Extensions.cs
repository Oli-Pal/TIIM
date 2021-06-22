using System;
using System.Security.Claims;
using System.Text.Json;
using Microsoft.AspNetCore.Http;

namespace Application.Helpers
{
    public static class Extensions
    {
        public static Guid GetUserId(this ClaimsPrincipal user)
        {
            if (user is null)
            {
                return Guid.Empty;
            }

            return Guid.Parse(user.FindFirst(ClaimTypes.NameIdentifier).Value);
        }

        public static void AddPaginationHeader(this HttpResponse response, int currentPage, 
            int itemsPerPage, int totalItems, int totalPages)
        {
            var paginationHeader = new PaginationHeader(currentPage, itemsPerPage, totalItems, totalPages);
            
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            
            response.Headers.Add("Pagination", JsonSerializer.Serialize(paginationHeader, options));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}