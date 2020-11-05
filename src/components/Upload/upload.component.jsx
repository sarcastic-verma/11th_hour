import React from "react";
import UploadSection from "../upload-section/upload-section.component";

const Upload = () => {
    return (
        <div className="center">
            <br/>
            <h2 className="green-text">Upload Course Content</h2>
            <br/>
            <UploadSection title={"lectures"}/>
            <br/>
            <UploadSection title={"resources"}/>
            <br/>
            <UploadSection title={"course thumbnail"}/>
        </div>
    );
}

export default Upload;