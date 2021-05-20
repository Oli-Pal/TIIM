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

        public void MapFollowEntityToFollowerDetailResponse(IEnumerable<Follow> sources, out IEnumerable<UserDetailResponse> destinations)
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
                    Id = source.Follower.Id,
                    Email = source.Follower.Email,
                    UserName = source.Follower.UserName,
                    Description = source.Follower.Description,
                    City = source.Follower.City,
                    FirstName = source.Follower.FirstName,
                    LastName = source.Follower.LastName,
                    BirthDate = source.Follower.BirthDate,
                    JoinDate = source.Follower.JoinDate
                });
            }
        }

        public void MapFollowEntityToFolloweeDetailResponse(IEnumerable<Follow> sources, out IEnumerable<UserDetailResponse> destinations)
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
                    Id = source.Followee.Id,
                    Email = source.Followee.Email,
                    UserName = source.Followee.UserName,
                    Description = source.Followee.Description,
                    City = source.Followee.City,
                    FirstName = source.Followee.FirstName,
                    LastName = source.Followee.LastName,
                    BirthDate = source.Followee.BirthDate,
                    JoinDate = source.Followee.JoinDate
                });
            }
        }

        public void MapUserToUpdateRequestToAppUserEntity(UserToUpdateRequest source, ref AppUser destination)
        {
            destination.Email = source.Email;
            destination.UserName = source.UserName;
            destination.Description = source.Description;
            destination.City = source.City;
            destination.FirstName = source.FirstName;
            destination.LastName = source.LastName;
            destination.BirthDate = source.BirthDate;
        }

    }
}