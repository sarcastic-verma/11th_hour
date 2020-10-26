import React from "react";

function CourseCard(props) {
    return (
        <div className="Card">
            <h1>{props.title}</h1>
        </div>
    );
}

export default CourseCard;