using System;
using Microsoft.AspNetCore.Http;

namespace Domain.Dtos
{
    public class PhotoToAddURLRequest
    {      
        public string Url { get; set; }
        public string Description { get; set; }
    }
}