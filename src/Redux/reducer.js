import * as _ from "lodash";
import { ADD_DIRECTORY_WINDOW, REMOVE_DIRECTORY_WINDOW, OPEN_CLOSE_TERMINAL, CHANGE_ACTIVE_PROJECT, OPEN_CLOSE_RECORD } from "./actions"

const initialState = {
    active_windows:[],
    terminal_open: false,
    record_open: false,
    active_project: null,
    active_song:"heart.m4a",
}

function brainReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_DIRECTORY_WINDOW:
            if(!state.active_windows.includes(action.id)) {
                let new_active_windows = Object.assign([], state.active_windows);
                new_active_windows.push(action.id)
                return Object.assign({}, state, {
                    active_windows: new_active_windows,
                })
            }
            return Object.assign({}, state)
        case REMOVE_DIRECTORY_WINDOW:
            let new_active_windows = Object.assign([], state.active_windows);
            new_active_windows = new_active_windows.filter(w => w !== action.id)
             return Object.assign({}, state, {
                 active_windows: new_active_windows,
              })
        case OPEN_CLOSE_TERMINAL:
            return Object.assign({}, state, {
                terminal_open: !state.terminal_open,
            })
        case OPEN_CLOSE_RECORD:
            console.log("In reducer open close record")
            console.log(!state.record_open)
            let open = !state.record_open
            return Object.assign({}, state, {
                record_open: open,
            })
        case CHANGE_ACTIVE_PROJECT:
            return Object.assign({}, state, {
                active_project: action.project,
            })
        default:
            return state
    }
}
export default brainReducer;