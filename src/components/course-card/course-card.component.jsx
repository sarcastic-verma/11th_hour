import React from "react";

function CourseCard({course}) {
    console.log(course);
    return (
        <div className="Card">
            <h1>{course.title}</h1>
        </div>
    );
}

export default CourseCard;