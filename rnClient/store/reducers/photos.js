import PhotoAdd from "../../models/photoAdd"
import PhotoLike from "../../models/photoLikes"
import { ADD_LIKE, ADD_UNLIKE, SET_LIKES, ADD_PHOTO} from "../actions/photos"

const initialState = {
    photos: [],
    likedPhotos: []
}

export default (state = initialState, action) => {

    switch (action.type) {
        case ADD_PHOTO:
            return{
                photos: state.photos.concat(photoAdd)
            }
        case SET_LIKES:
            return {
                likedPhotos: action.likes.map((li) => 
                 new PhotoLike(
                     li.LikerId,
                     li.PhotoId,
                     li.DateLiked
                 )),
            };
        case ADD_LIKE:
            const photoLike = new PhotoLike(
                action.photos.LikerId,
                action.photos.PhotoId,
                action.photos.DateLiked
            );
            return {
                ...state, 
                photos: state.photos.concat(photoLike)
            }
            case ADD_UNLIKE:
            return {
                ...state, 
                photos: state.photos
            }
            default:
                return state;

    }
    

}