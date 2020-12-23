import React from 'react';
import Header from "../../components/header/header.component";
import {
    selectUploadedCoursesId
} from '../../redux/user/user-selectors';
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {getCoursesByIds} from "../../controllers/course-controller";
import {selectAllCourses} from "../../redux/course/course-selector";
import CourseCard from "../../components/course-card/course-card.component";

const MyUploads = ({uploadedCoursesId, courses}) => {
    const uploadedCourses = getCoursesByIds(courses, uploadedCoursesId);
    return (
        <div>
            <Header/>
            <div className='my-uploads'>
                {uploadedCourses.length === 0 ? <h1>No uploaded courses</h1> : uploadedCourses.forEach((course) =>
                    <h1>{course.title}</h1>
                )}
            </div>
        </div>)
};

const mapStateToProps = createStructuredSelector({
    uploadedCoursesId: selectUploadedCoursesId,
    courses: selectAllCourses
});

export default connect(mapStateToProps)(MyUploads);
