import React, {Component} from "react";
import UploadSection from "../upload-section/upload-section.component";
import FormInput from "../form-input/form-input.component";
import {addCourseToFirestore} from "../../controllers/course-controller";
import {firestore} from "../../firebase-config/firebase.utils";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectCollegeId, selectInstructorId, selectInstructorName} from "../../redux/user/user-selectors";

class Upload extends Component {
    constructor(props) {
        super(props);

        this.state = {

            lectures: [],
            courseThumbnail: [],
            resources: [],
            resourcesProgress: 0,
            lecturesProgress: 0,
            courseThumbnailProgress: 0,
            price: '',
            description: '',
            title: '',
            subject: '',
        };
    }

    emptyFiles = (type) => {
        type === "lectures" ?
            this.setState((prevState) => (
                {
                    lectures: []
                }
            ))
            : type === "resources" ?
            this.setState((prevState) => (
                {
                    resources: []
                }
            ))
            : this.setState(() => (
                {
                    courseThumbnail: []
                }
            ));
    }
    setFiles = (type, newFile) => {
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

    setProgress = (type, progress) => {
        type === "lectures" ?
            this.setState(() => (
                {
                    lecturesProgress: progress
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
    onComplete = (type) => {
        // type === "lectures" ?
        //     this.setState(() => (
        //         {
        //             lectures: [],
        //             lecturesProgress: 0
        //         }
        //     ))
        //     : type === "resources" ?
        //     this.setState(() => (
        //         {
        //             resources: [],
        //             resourcesProgress: 0
        //         }
        //     ))
        //     : this.setState(() => (
        //         {
        //             courseThumbnail: [],
        //             thumbnailProgress: 0
        //         }
        //     ));
    }

    render() {
        const {price, title, description, subject} = this.state;
        const {collegeId, instructorId, instructorName} = this.props;
        return <div className="center">
            <FormInput
                type='number'
                name='price'
                value={price}
                min={100}
                onChange={(e) => {
                    e.persist();

                    this.setState(() => (
                        {
                            price: e.target.value
                        }
                    ));
                }}
                label='Price'
                required
            />
            <FormInput
                type='text'
                name='title'
                value={title}
                onChange={(e) => {
                    e.persist();
                    this.setState(() => (
                        {
                            title: e.target.value
                        }
                    ));
                }}
                label='Title'
                required
            />
            <FormInput
                type='text'
                name='subject'
                value={subject}
                onChange={(e) => {
                    e.persist();
                    this.setState(() => (
                        {
                            subject: e.target.value
                        }
                    ));
                }}
                label='Subject'
                required
            />
            <FormInput
                type='text'
                name='description'
                value={description}

                onChange={(e) => {
                    e.persist();

                    this.setState(() => (
                        {
                            description: e.target.value
                        }
                    ));
                }}
                label='Description'
                required
            />
            <br/>
            <h2 className="green-text">Upload Course Content</h2>
            <br/>
            <UploadSection title={"lectures"} progress={this.state.lecturesProgress} displayables={this.state.lectures}
                           setFiles={this.setFiles}
                           emptyFiles={this.emptyFiles}/>
            <br/>
            <UploadSection title={"resources"} progress={this.state.resourcesProgress}
                           displayables={this.state.resources} setFiles={this.setFiles}
                           emptyFiles={this.emptyFiles}/>
            <br/>
            <UploadSection title={"course thumbnail"} progress={this.state.courseThumbnailProgress}
                           displayables={this.state.courseThumbnail} setFiles={this.setFiles}
                           emptyFiles={this.emptyFiles}/>
            <button
                onClick={async (e) => {
                    e.preventDefault();
                    if (this.state.lectures.length === 0 || this.state.resources.length === 0 || this.state.courseThumbnail.length === 0) {
                        alert("Please fill all the fields");
                    } else {
                        let ref = firestore.collection("courses").doc();
                        const courseId = ref.id;

                        await addCourseToFirestore(title, parseInt(price), description, subject, courseId, collegeId, instructorId, instructorName, this.state.lectures, this.state.resources, this.state.courseThumbnail, this.setProgress, this.onComplete,);
                    }
                }} className="waves-effect waves-light btn">
                Upload
            </button>
        </div>

    }
}

const mapStateToProps = createStructuredSelector({
    collegeId: selectCollegeId,
    instructorName: selectInstructorName,
    instructorId: selectInstructorId,
});

export default connect(mapStateToProps)(Upload);