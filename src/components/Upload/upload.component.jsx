import React, {Component} from "react";
import {handleUpload} from "../../controllers/course-controller";
import {connect} from "react-redux";


class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
        };
    }

    handleChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({image}));
        }
    };

    render() {
        return (
            <div className="center">
                <br/>
                <h2 className="green-text">Upload Course Content</h2>
                <br/>
                <br/>
                <div className="row">
                    <progress value={this.props.progress} max="100" className="progress"/>
                </div>
                <br/>
                <br/>
                <br/>
                <div className="file-field input-field">
                    <div className="btn">
                        <span>File</span>
                        <input type="file" onChange={this.handleChange}/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text"/>
                    </div>
                </div>
                <button
                    onClick={async () => {
                        await handleUpload(this.state.image)
                    }}
                    className="waves-effect waves-light btn"
                >
                    Upload
                </button>
                <br/>
                <br/>
                <img
                    src={this.props.url || "https://via.placeholder.com/400x300"}
                    alt="Uploaded Images"
                    height="300"
                    width="400"
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    progress: state.upload.progress,
    url :state.upload.url
});

export default connect(mapStateToProps)(Upload);