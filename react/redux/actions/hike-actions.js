import * as types from '../types'

export function getHikes(promise){
    return {
        type: types.GET_HIKES,
        payload: promise
    }
}