using System;
using System.Collections.Generic;
using Domain.Dtos;
using Domain.Entities;

namespace Application.Mapper
{    public interface IMapper
    {
        void MapAppUserEntityToUserDetailResponse(AppUser source, out UserDetailResponse destination);
        void MapUserToRegisterToAppUserEntity(UserToRegisterRequest source, out AppUser destination);
        void MapAppUserEntityToUserDetailResponse(IEnumerable<AppUser> sources, out IEnumerable<UserDetailResponse> destinations);
        void MapFollowEntityToFollowerDetailResponse(IEnumerable<Follow> sources, out IEnumerable<UserDetailResponse> destinations);
        void MapFollowEntityToFolloweeDetailResponse(IEnumerable<Follow> sources, out IEnumerable<UserDetailResponse> destinations);
        void MapUserToUpdateRequestToAppUserEntity(UserToUpdateRequest source, ref AppUser destination);
    }
}