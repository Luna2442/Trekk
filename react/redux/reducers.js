import * as types from './types';

const initialState = {
    trailsLoading: false
}

export default function reducer(state = initialState, action){
    switch (action.type) {
        case types.GET_TRAILS:
            return {
                trailsLoading: true
            }
        case types.GET_TRAILS_PENDING:
            return {
                trailsLoading: true
            }
        case types.GET_TRAILS_FAILED:
            return {
                trailsLoading: false
            }
        case types.GET_TRAILS_COMPLETED:
            return {
                trailsLoading: false
            }
        default:
            return state
    }
}