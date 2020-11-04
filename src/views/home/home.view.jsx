import React from 'react';
import './home.styles.scss';
import studyillus from "../../assets/studyillus.png";
import homedesign from "../../assets/home-design.svg";
import Header from "../../components/header/header.component";

  const HomePage = () => {
  return ( 
  <div className='homepage'>
    <Header/>
      {/*<Directory />*/}
      {/* <Searchbar/> */}
      <h1 className = "title"> 11th Hour </h1>
      <div className = "maintext">
        <h1>Didn't study for your exam? <br></br> We got you covered.</h1> <br></br>
        <h1> College-specific courses, right here.</h1>
      </div>
      {/* <h1 className = "title"> 11th Hour </h1> */}
      <img className = "studyillus" src = {studyillus} alt = "studyillustration"/>
      <img className= "home-design" src = {homedesign} alt = "studydesign" />  
  </div>
  );
}

export default HomePage;
