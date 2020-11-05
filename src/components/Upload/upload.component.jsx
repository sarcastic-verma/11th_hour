import React, {Component} from "react";
import {onFileChange, onUploadSubmission} from "../../controllers/course-controller";

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            courseThumbnail: null,
            resources: [],
            resourcesProgress: 0,
            videosProgress: 0,
            courseThumbnailProgress: 0,
            url: null
        };
    }

    setFiles = (type, newFile) => {
        type === "videos" ?
            this.setState((prevState) => (
                {
                    videos: [...prevState.videos, newFile]
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
                    courseThumbnail: newFile
                }
            ));
    };

    setProgress = (type, progress) => {
        type === "videos" ?
            this.setState(() => (
                {
                    videoProgress: progress
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

    setUrl = (type, url) => {
        this.setState(() => ({url}));
    };

    onComplete = (type) => {
        type === "videos" ?
            this.setState(() => (
                {
                    videos: [],
                    videoProgress: 0
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
        return (
            <div className="center">
                <br/>
                <h2 className="green-text">Upload Course Content</h2>
                <br/>
                <br/>
                <h3>Videos</h3>
                <div className="row">
                    <progress value={this.state.videosProgress} max="100" className="progress"/>
                </div>
                <h3>{this.state.videosProgress} %</h3>
                <br/>
                <div className="file-field input-field">
                    <div className="btn">
                        <input type="file" multiple onChange={e => onFileChange(e, this.setFiles)}/>
                    </div>
                </div>
                <br/>
                <br/>
                {this.state.videos.map((video) => {
                    return <h1 key={video.id}>{`${video.name} `}</h1>
                })}
                <button
                    onClick={async (e) => {
                        await onUploadSubmission(e, this.state.videos, this.setProgress, this.setUrl, this.onComplete);
                    }} className="waves-effect waves-light btn">
                    Upload
                </button>
            </div>
        );
    }
}

export default Upload;