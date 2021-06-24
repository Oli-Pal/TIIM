using System;
using Domain.Dtos;
using MediatR;

namespace Application.Functions.Photo.Commands
{
    public class AddPhotoURLCommand : IRequest
    {
         public Guid UserId { get; set; }
        public PhotoToAddURLRequest Photo { get; set; }
        
    }
}