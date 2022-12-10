import './DeveloperDetailView.css';
import DeveloperProjectDetails from './DeveloperProjectDetails';
//import {useState, useEffect} from 'react';

function DeveloperDetailViewContent(props) {
  
    return (
        <div className="devwhite-area">
            <h5 className="box_dev-text">Industry</h5>
            {props.developer.industry?.map((indus) => {
            return <h5 className='dev-details' key={indus}>{indus}</h5>;
            })}
            <h5 className="box_dev-text">Bio</h5>
            <h5 className='dev-details'>{props.developer.bio}</h5>
            <h5 className="box_dev-text">Email</h5>
            <h5 className='dev-details'>{props.developer.email}</h5>
            <h4 className="box_dev-text">MY PROJECTS</h4>
            <DeveloperProjectDetails projectList = {props.developer.projectId}/>
        </div>

    );

}

export default DeveloperDetailViewContent;