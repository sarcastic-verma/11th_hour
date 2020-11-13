import {onFileChange} from "../../controllers/course-controller";
import React, {Component} from "react";


export default class UploadSection extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {title, progress, displayables, setFiles} = this.props;
        return <div>
            <h3>Upload {title}</h3>
            <div className="row">
                <progress value={progress} max="100" className="progress"/>
            </div>
            <h3>{progress} %</h3>
            <br/>
            <div className="file-field input-field">
                <div className="btn">
                    {title !== "course thumbnail" ?
                        <input type="file" multiple onChange={e => onFileChange(e, title, setFiles)}/> :
                        <input type="file" onChange={e => onFileChange(e, title, setFiles)}/>}
                </div>
            </div>
            <br/>
            <br/>
            {displayables ?
                displayables.map((displayable) => {
                    return <h1 key={displayable.id}>{`${displayable.name} `}</h1>
                }) : <div/>
            }
        </div>
    };
}