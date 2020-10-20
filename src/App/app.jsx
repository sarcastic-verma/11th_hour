import React from 'react';
import CourseCard from '../Components/Course-Card/course-card.component.jsx';
import './app.scss';
import Upload from "../Components/Upload-Component/upload-component.component";

function App() {
    return (
        <div className="App">
            <h1> Shit added!! </h1>
            <CourseCard title="popOS"/>
            <Upload/>
        </div>
    );
}

export default App;
