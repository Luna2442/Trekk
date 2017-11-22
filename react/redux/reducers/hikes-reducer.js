import * as types from '../types';

const initialState = {
    hikesLoading: false,
    myHikes: []
}

export default function reducer(state = initialState, action){
    switch (action.type) {
        case types.GET_HIKES:
            return {
                ...state,
                hikesLoading: true
            }
        case types.GET_HIKES_PENDING:
            return {
                ...state,
                hikesLoading: true
            }
        case types.GET_HIKES_REJECTED:
            return {
                ...state,
                hikesLoading: false
            }
        case types.GET_HIKES_FULFILLED:
            return {
                hikesLoading: false,
                myHikes: action.payload
            }
        default:
            return state
    }
}