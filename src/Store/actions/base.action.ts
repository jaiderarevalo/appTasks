export const handlePending = (state:any,action:any)=>{
    state.loading = true
}

export const handleFulfilled = (state:any,action:any)=>{
    state.loading = false
}

export const handleRejected = (state:any,action:any)=>{
    state.loading = false
}