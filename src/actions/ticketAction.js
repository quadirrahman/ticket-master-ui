import axios from '../config/axios'

export const setTicket = (ticket) => {
    return {type: 'SET_TICKET', payload: ticket}
}

export const setAllTickets = (tickets) => {
    return {type: 'SET_ALL_TICKETS', payload: tickets}
}

export const updateTicket = (updatedTicket) => {
    return {type: 'UPDATE_TICKET', payload: updatedTicket}
}

export const deleteTicket = (deletedTicket) => {
    return {type: 'DELETE_TICKET', payload: deletedTicket}
}

export const startGetAllTickets = () => {
    return (dispatch) => {
        axios.get('/tickets', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response=> {
                console.log(response.data)
                dispatch(setAllTickets(response.data))
            })

    }
}

export const startUpdateTicket = (id, priority) => {
    return (dispatch) => {
        axios.put(`/ticketss/${id}`, {priority}, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response=>{
                dispatch(updateTicket(response.data))
            })
            .catch(err=>{
                alert(err.message)
            })
    }
}


export const startCreateTicket = (formData) => {
    console.log(formData)
        return (dispatch)=> {
            axios.post('/tickets', formData, {
                headers: {
                    'x-auth': localStorage.getItem('authToken')
                }
            })
                .then(response=>{
                    dispatch(setTicket(response.data))
                })
                .catch(err=>{
                    alert(err)
                })
        }
}

export const startDeleteTicket = (id) => {
    return (dispatch)=>{
        axios.delete(`/tickets/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response=>{
                dispatch(deleteTicket(response.data))
            })
    }
}

