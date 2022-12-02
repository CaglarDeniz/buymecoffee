import './InvestorDetailView.css';


function InvestorDetailViewBlueArea(props){
    let industry_string = " ";
    props.investor.industry.forEach( (each_industry) =>{
        industry_string += "    " + each_industry +  "   ," ;
    });
    industry_string = industry_string.slice(0,industry_string.length-1);

    let startup_string = " ";
    props.investor.oldStartups.forEach( (each_startup) => {
        startup_string += "    " + each_startup + "    ";
    });

    return (
        <div className="blue-area">
            <h5 className="box_i-text">Industry</h5>
            <h5 className='invest-details'>{industry_string}</h5>
            <h5 className="box_i-text">Bio</h5>
            <h5 className='invest-details'>{props.investor.bio}</h5>
            <h5 className="box_i-text">Email</h5>
            <h5 className='invest-details'>{props.investor.email}</h5>
            <h5 className="box_i-text">Amount</h5>
            <h5 className='invest-details'>{props.investor.amount}</h5>
            <h5 className="box_i-text">Startups</h5>
            <h5 className='invest-details'>{startup_string}</h5>
            <button className="pitch-coffee" onClick={() => window.location = 'mailto:np.js409@gmail.com'}>Pitch Me Your Coffee</button>
        </div>

    );

}

export default InvestorDetailViewBlueArea;