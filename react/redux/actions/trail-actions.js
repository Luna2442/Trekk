import * as types from '../types';

export function getTrails(promise) {
    return {
         type: types.GET_TRAILS,
         payload: promise
    } 
 }

 export function clearTrails(){
     return {
         type: types.CLEAR_TRAILS
     }
 }