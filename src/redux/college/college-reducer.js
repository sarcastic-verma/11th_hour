const initialState = {
    currentCollege: null
}

const collegeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SOME_COLLEGE_SHIT':
            return {
                ...state,
                currentCollege: action.payload
            }
        default:
            return state;
    }
};

export default collegeReducer;