using System;
using System.Threading;
using System.Threading.Tasks;
using Domain.Dtos;
using Application.Repos;
using Application.Services;
using Domain.Exceptions;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

using PhotoEntity = Domain.Entities.Photo;

namespace Application.Functions.Photo.Commands
{
    public class AddPhotoURLCommandHandler : IRequestHandler<AddPhotoURLCommand, Unit>
    {
        private readonly IPhotoRepo _photoRepo;


        public AddPhotoURLCommandHandler(IPhotoRepo photoRepo)
        {
            _photoRepo = photoRepo ?? throw new ArgumentNullException(nameof(photoRepo));
        }

        public async Task<Unit> Handle(AddPhotoURLCommand request, CancellationToken cancellationToken)
        {


            var photoToAdd = CreatePhotoEntity(request);

            var result = await AddPhotoToDatabaseAsync(photoToAdd);

            return result;
        
        }

        private PhotoEntity CreatePhotoEntity( AddPhotoURLCommand request)
        {
            var photoEntity = new PhotoEntity();

            photoEntity.Url = request.Photo.Url;
            photoEntity.Description = request.Photo.Description;
            photoEntity.UserId = request.UserId;

            return photoEntity;
        }

        private async Task<Unit> AddPhotoToDatabaseAsync(PhotoEntity photoToAdd)
        {
            await _photoRepo.AddAsync(photoToAdd);

            if (await _photoRepo.SaveAllAsync())
            {
                return await Task.FromResult(Unit.Value);   
            }

            throw new DatabaseException("Error occured while updating database.");
        }

        
    }
}