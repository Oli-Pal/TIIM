import PhotoLike from "../../models/photoLikes"
import { ADD_LIKE, ADD_UNLIKE } from "../actions/photos"

const initialState = {
    photos: []
}

export default (state = initialState, action) => {

    switch (action.type) {
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
    }
}