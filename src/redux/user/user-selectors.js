import {createSelector} from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
    [selectUser],
    user => user.currentUser
);

export const selectInstructorName = createSelector(
    [selectUser],
    user => user.name,
);

export const selectInstructorId = createSelector(
    [selectUser],
    user => user.userId,
);

export const selectCollegeId = createSelector(
    [selectUser],
    user => user.collegeId,
);