import {createSelector} from 'reselect';

const selectCourses = state => state.courses;

export const selectAllCourses = createSelector(
    [selectCourses],
    user => user.courses
);