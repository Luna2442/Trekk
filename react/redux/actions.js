import * as types from './types';

export function getTrails() {
   return {
        type: types.GET_TRAILS_PENDING
   } 
}

export function searchComplete() {
    return {
         type: types.GET_TRAILS_FULFILLED
    } 
 }