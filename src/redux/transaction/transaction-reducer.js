const initialState = {
    currentTransaction: null
}

const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SOME_TRANSACTION_SHIT':
            return {
                ...state,
                currentTransaction: action.payload
            }
        default:
            return state;
    }
};

export default transactionReducer;