import {createSelector} from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
    [selectUser],
    user => user.currentUser
);

export const selectInstructorName = createSelector(
    [selectCurrentUser],
    user => user.name,
);

export const selectInstructorId = createSelector(
    [selectCurrentUser],
    user => user.id,
);

export const selectUploadedCoursesId = createSelector(
    [selectCurrentUser],
    user => user.myUploadedCourses,
);

export const selectCollegeId = createSelector(
    [selectCurrentUser],
    user => user.collegeId,
);