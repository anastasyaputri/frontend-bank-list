const INITIAL_STATE = {
    txnDetail : {}
}

const AllReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "TXNDETAIL":
            return { ...state, txnDetail: action.payload }
        default:
            return state
    }
}

export default AllReducers;