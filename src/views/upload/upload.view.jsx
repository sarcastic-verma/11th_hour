import React from 'react';
import Upload from "../../components/Upload/upload.component";
// import './upload.styles.scss';
import Header from "../../components/header/header.component";

const UploadPage = () => (
    <div>
        <Header/>
        <div className='upload-page'>
            {/*<Directory />*/}       
            <Upload/>
        </div>
    </div>
);

export default UploadPage;
