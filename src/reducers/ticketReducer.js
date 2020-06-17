const ticketInitialState = []

const ticketReducer = (state = ticketInitialState, action) => {
    switch(action.type) {
        case 'SET_TICKET' : {
            return state.concat(action.payload)
        }
        case 'SET_ALL_TICKETS': {
            return [].concat(action.payload)
        }
        case 'UPDATE_TIKCET' : {
            for(let i = 0 ; i < state.length; i++) {
                if(state[i]._id == action.payload._id) {
                    state[i].email = action.payload.email
                }
            }
            return state
         }
         case 'DELETE_TIKCET' : {
            for(let i = 0 ; i < state.length; i++) {
                if(state[i]._id == action.payload._id) {
                    state[i] = {} 
                }
            }
            return state
         }

        default: {
            return state
        }
    }
}
export default ticketReducer