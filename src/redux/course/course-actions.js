import CourseTypes from "./course-types";

export const setAllCourses = course => ({
    type: CourseTypes.SET_ALL_COURSES,
    payload: course
})