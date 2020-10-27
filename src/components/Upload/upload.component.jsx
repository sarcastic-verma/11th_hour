import React, {Component} from "react";
import {onFileChange, onUploadSubmission} from "../../controllers/course-controller";

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            progress: 0,
            url: null
        };
    }

    setFile = (newFile) => {
        this.setState((state) => {
            return {
                files: [...state.files, newFile]
            }
        });
    };

    setProgress = (progress) => {
        this.setState((prevState) => ({
                progress: progress,
            }
        ));
    };

    setUrl = (url) => {
        this.setState(() => ({url}));
    };

    onComplete = () => {
        this.setState((prevState) => (
            {
                files: [],
                progress: 0
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
                <div className="row">
                    <progress value={this.state.progress} max="100" className="progress"/>
                </div>
                <h3>{this.state.progress} %</h3>
                <br/>
                <br/>
                <br/>
                <div className="file-field input-field">
                    <div className="btn">
                        <span>File</span>
                        <br/>
                        <br/>
                        <input type="file" multiple onChange={e => onFileChange(e, this.setFile)}/>
                    </div>
                </div>
                <br/>
                <br/>
                {this.state.files.map((file) => {
                    return <h1 key={file.id}>{`${file.name} `}</h1>
                })}
                <button
                    onClick={async (e) => {
                        await onUploadSubmission(e, this.state.files, this.setProgress, this.setUrl, this.onComplete);
                    }} className="waves-effect waves-light btn">
                    Upload
                </button>
            </div>
        );
    }
}

export default Upload;