import './DeveloperDetailView.css';

function DeveloperDetailViewContent(props) {
    let industry_string = " ";
    props.developer.industry.forEach( (each_industry) =>{
        industry_string += "    " + each_industry +  "   ," ;
    });
    industry_string = industry_string.slice(0,industry_string.length-1);

    return (
        <div className="blue-area">
            <h5 className="box_dev-text">Industry</h5>
            <h5 className='dev-details'>{industry_string}</h5>
            <h5 className="box_dev-text">Bio</h5>
            <h5 className='dev-details'>{props.developer.bio}</h5>
            <h5 className="box_dev-text">Email</h5>
            <h5 className='dev-details'>{props.developer.email}</h5>
        </div>

    );

}

export default DeveloperDetailViewContent;