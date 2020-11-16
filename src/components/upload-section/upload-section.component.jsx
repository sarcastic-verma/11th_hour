import {onFileChange} from "../../controllers/course-controller";
import React, {Component} from "react";


export default class UploadSection extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {title, progress, emptyFiles, displayables, setFiles} = this.props;
        return <div>
            <h1>Upload {title}</h1>
            <div className="row">
                <progress value={progress} max="100" className="progress"/>
            </div>
            <h3>{progress} %</h3>
            <br/>
            <div className="file-field input-field">
                <div className="btn">
                    {title !== "course thumbnail" ?
                        <input type="file" multiple
                               onChange={e => onFileChange(e, title, setFiles)} accept ={title === 'lectures'?"video/*":"application/pdf"}
                               onClick={() => {
                                   emptyFiles(title);
                               }
                               }/> :
                        <input type="file" onChange={e => onFileChange(e, title, setFiles)} accept="image/*"/>}
                </div>
            </div>
            <br/>
            <br/>
            {displayables ?
                displayables.map((displayable) => {
                    return <h3 key={displayable.id}>{`${displayable.name} `}</h3>
                }) : <div/>
            }
        </div>
    };
}