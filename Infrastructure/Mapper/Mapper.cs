using System;
using System.Collections.Generic;
using Domain.Dtos;
using Application.Mapper;
using Domain.Entities;

namespace Infrastructure.Mappers
{
    public class Mapper : IMapper
    {
        public void MapUserToRegisterToAppUserEntity(UserToRegisterRequest source, out AppUser destination)
        {
            destination = new AppUser()
            {
                City = source.City.ToLower(),
                Email = source.Email.ToLower(),
                UserName = source.UserName.ToLower(),
                FirstName = source.FirstName.ToLower(),
                LastName = source.LastName.ToLower(),
                BirthDate = source.BirthDate
            };
        }

        public void MapAppUserEntityToUserDetailResponse(AppUser source, out UserDetailResponse destination)
        {
            destination = new UserDetailResponse
            {
                Id = source.Id,
                Email = source.Email,
                UserName = source.UserName,
                Description = source.Description,
                City = source.City,
                FirstName = source.FirstName,
                LastName = source.LastName,
                BirthDate = source.BirthDate,
                JoinDate = source.JoinDate
            };
        }

        public void MapAppUserEntityToUserDetailResponse(IEnumerable<AppUser> sources, out IEnumerable<UserDetailResponse> destinations)
        {
            var list = new List<UserDetailResponse>();

            destinations = list;

            if (sources is null)
            {
                return;
            }

            foreach (var source in sources)
            {
                list.Add(new UserDetailResponse
                {
                    Id = source.Id,
                    Email = source.Email,
                    UserName = source.UserName,
                    Description = source.Description,
                    City = source.City,
                    FirstName = source.FirstName,
                    LastName = source.LastName,
                    BirthDate = source.BirthDate,
                    JoinDate = source.JoinDate
                });
            }
        }

         public void MapPhotoEntityToPhotoToReturnResponse(IEnumerable<Photo> sources, out IEnumerable<PhotoToReturnResponse> destinations)
        {
            var list = new List<PhotoToReturnResponse>();

            destinations = list;

            if (sources is null)
            {
                return;
            }

            foreach (var source in sources)
            {
                list.Add(new PhotoToReturnResponse
                {
                    Id = source.Id,
                    Url = source.Url,
                    Description = source.Description,
                    DateAdded = source.DateAdded,
                    UserId = source.UserId,
                    UserUserName = source.User.UserName,
                    UserFirstName = source.User.FirstName,
                    UserLastName = source.User.LastName,
                    UserPhotoUrl = source.User.MainPhotoUrl
                });
            }
        }

        //  public void MapPhotoLikeRequestToPhotoLikeEntity(PhotoLikeRequest source, out PhotoLike destination)
        // {
        //     destination = new PhotoLike()
        //     {
        //         LikerId = source.UserId,
        //         PhotoId = source.PhotoId
        //     };
        // }

        // public void MapPhotoLikeEntityToLikerResponse(IEnumerable<PhotoLike> source, out IEnumerable<LikerResponse> destination)
        // {
        //     var list = new List<LikerResponse>();

        //     destination = list;

        //     if (source is null)
        //     {
        //         return;
        //     }

        //     foreach (var like in source)
        //     {
        //         var user = like.Liker;

        //         list.Add(new LikerResponse
        //         {
        //             Id = user.Id,
        //             Email = user.Email,
        //             UserName = user.UserName,
        //             MainPhotoUrl = user.MainPhotoUrl,
        //             FirstName = user.FirstName,
        //             LastName = user.LastName
        //         });
        //     }
        // }

        // public void MapCommentToAddRequestToCommentEntity(CommentToAddRequest source, out Comment destination)
        // {
        //     destination = new Comment()
        //     {
        //         PhotoId = source.PhotoId,
        //         Content = source.Content
        //     };
        // }

        // public void MapCommentEntityToCommentResponse(IEnumerable<Comment> source, out IEnumerable<CommentResponse> destination)
        // {
        //     var list = new List<CommentResponse>();

        //     destination = list;

        //     if(source is null)
        //     {
        //          return;
        //     }

        //     foreach(var comment in source)
        //     {
        //         var user = comment.User;

        //         list.Add(new CommentResponse
        //         {
        //             Content = comment.Content,
        //             DateAdded = comment.DateAdded,
        //             Id = comment.Id,
        //             UserFirstName = user.FirstName,
        //             UserLastName = user.LastName,
        //             UserMainPhotoUrl = user.MainPhotoUrl,
        //             UserUserName = user.UserName
        //         });
        //     }
        // }

    }
}