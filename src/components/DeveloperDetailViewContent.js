import './DeveloperDetailView.css';
import DeveloperProjectDetails from './DeveloperProjectDetails';
import {useState, useEffect} from 'react';

function DeveloperDetailViewContent(props) {
    // let industry_string = " ";
    // props.developer.industry.forEach( (each_industry) =>{
    //     industry_string += "    " + each_industry +  "   ," ;
    // });
    // industry_string = industry_string.slice(0,industry_string.length-1);
    const [industry_devArray, setMainIndustry] = useState([]);
    useEffect( () => {
        setMainIndustry(props.developer.industry);
    }, [props.developer.industry]);

    return (
        <div className="devwhite-area">
            <h5 className="box_dev-text">Industry</h5>
            {industry_devArray?.map((indus) => {
            return <h5 key={indus}>{indus}</h5>;
            })}
            <h5 className="box_dev-text">Bio</h5>
            <h5 className='dev-details'>{props.developer.bio}</h5>
            <h5 className="box_dev-text">Email</h5>
            <h5 className='dev-details'>{props.developer.email}</h5>
            <h4 className="box_dev-text">MY PROJECTS</h4>
            <DeveloperProjectDetails />
        </div>

    );

}

export default DeveloperDetailViewContent;