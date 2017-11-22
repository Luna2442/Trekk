import * as types from '../types';

const initialState = {
    trailsLoading: false,
    searchedTrails: []
}

export default function reducer(state = initialState, action){
    switch (action.type) {
        case types.GET_TRAILS:
            return {
                ...state,
                trailsLoading: true
            }
        case types.GET_TRAILS_PENDING:
            return {
                ...state,
                trailsLoading: true
            }
        case types.GET_TRAILS_REJECTED:
            return {
                ...state,
                trailsLoading: false
            }
        case types.GET_TRAILS_FULFILLED:
            return {
                trailsLoading: false,
                searchedTrails: action.payload.results
            }
        case types.CLEAR_TRAILS:
            return {
                trailsLoading: true,
                searchedTrails: []
            }
        default:
            return state
    }
}