import {onFileChange, onUploadSubmission} from "../../controllers/course-controller";
import React, {Component} from "react";


export default class UploadSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lectures: [],
            courseThumbnail: [],
            resources: [],
            resourcesProgress: 0,
            lecturesProgress: 0,
            courseThumbnailProgress: 0,
            url: null
        };
    }

    setFiles = (newFile) => {
        const type = this.props.title;
        type === "lectures" ?
            this.setState((prevState) => (
                {
                    lectures: [...prevState.lectures, newFile]
                }
            ))
            : type === "resources" ?
            this.setState((prevState) => (
                {
                    resources: [...prevState.resources, newFile]
                }
            ))
            : this.setState(() => (
                {
                    courseThumbnail: [newFile]
                }
            ));
    };

    setProgress = (progress) => {
        const type = this.props.title;
        type === "lectures" ?
            this.setState(() => (
                {
                    lectureProgress: progress
                }
            ))
            : type === "resources" ?
            this.setState(() => (
                {
                    resourcesProgress: progress
                }
            ))
            : this.setState(() => (
                {
                    courseThumbnailProgress: progress,
                }
            ));
    };

    setUrl = (url) => {
        // const type = this.props.title;
        this.setState(() => ({url}));
    };

    onComplete = () => {
        const type = this.props.title;
        type === "lectures" ?
            this.setState(() => (
                {
                    lectures: [],
                    lectureProgress: 0
                }
            ))
            : type === "resources" ?
            this.setState(() => (
                {
                    resources: [],
                    resourcesProgress: 0
                }
            ))
            : this.setState(() => (
                {
                    courseThumbnail: null,
                    thumbnailProgress: 0
                }
            ));
    }

    render() {
        const {title} = this.props;
        return <div>
            <h3>Upload {title}</h3>
            <div className="row">
                <progress value={title === "lectures" ?
                    this.state.lecturesProgress
                    : title === "resources" ?
                        this.state.resourcesProgress
                        : this.state.courseThumbnailProgress} max="100" className="progress"/>
            </div>
            <h3>{title === "lectures" ?
                this.state.lecturesProgress
                : title === "resources" ?
                    this.state.resourcesProgress
                    : this.state.courseThumbnailProgress} %</h3>
            <br/>
            <div className="file-field input-field">
                <div className="btn">
                    {title !== "course thumbnail" ?
                        <input type="file" multiple onChange={e => onFileChange(e, this.setFiles)}/> :
                        <input type="file" onChange={e => onFileChange(e, this.setFiles)}/>}
                </div>
            </div>
            <br/>
            <br/>
            {title === "lectures" ?
                this.state.lectures.map((lecture) => {
                    return <h1 key={lecture.id}>{`${lecture.name} `}</h1>
                })
                : title === "resources" ?
                    this.state.resources.map((resource) => {
                        return <h1 key={resource.id}>{`${resource.name} `}</h1>
                    })
                    :this.state.courseThumbnail.map((courseThumbnail) => {
                        return <h1 key={courseThumbnail.id}>{`${courseThumbnail.name} `}</h1>
                    })
            }
            <button
                onClick={async (e) => {
                    let files;
                    title === "lectures" ?
                        files = this.state.lectures
                        : title === "resources" ?
                        files = this.state.resources
                        : files = this.state.courseThumbnail;
                    await onUploadSubmission(e, files, title, this.setProgress, this.setUrl, this.onComplete);
                }} className="waves-effect waves-light btn">
                Upload
            </button>
        </div>
     };
}