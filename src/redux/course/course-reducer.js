const initialState = {
    currentCourse: null
}

const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SOME_COURSE_SHIT':
            return {
                ...state,
                currentCourse: action.payload
            }
        default:
            return state;
    }
};

export default courseReducer;