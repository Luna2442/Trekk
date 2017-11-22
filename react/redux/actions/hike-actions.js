import * as types from '../types'

export function getHikes(promise){
    return {
        type: types.GET_HIKES,
        payload: promise
    }
}

export function selectHike(id){
    return {
        type: types.SELECT_HIKE,
        payload: id
    }
}
