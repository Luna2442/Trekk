import { combineReducers } from 'redux'

import trails from './trails-reducer'
import hikes from './hikes-reducer'

export default combineReducers ({
    trails: trails,
    hikes: hikes
})