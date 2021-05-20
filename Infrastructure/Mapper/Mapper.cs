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

    }
}