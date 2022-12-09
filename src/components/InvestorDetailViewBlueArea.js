import './InvestorDetailView.css';
import {useState, useEffect} from 'react';

function InvestorDetailViewBlueArea(props){
   
    const [industry_Array, setMainIndustry] = useState([]);
    const [startup_Array, setStartups] = useState([]);
   
    useEffect( () => {
        setMainIndustry(props.investor.industry);
    }, [props.investor.industry]);

    useEffect( () => {
        setStartups(props.investor.oldStartups);
    }, [props.investor.oldStartups]);

    return (
        <div className="blue_inv-area">
            <h5 className="box_i-text">Industry</h5>
            {industry_Array?.map((indus) => {
            return <h5 key={indus}>{indus}</h5>;
            })}
            <h5 className="box_i-text">Bio</h5>
            <h5 className='invest-details'>{props.investor.bio}</h5>
            <h5 className="box_i-text">Email</h5>
            <h5 className='invest-details'>{props.investor.email}</h5>
            <h5 className="box_i-text">Amount</h5>
            <h5 className='invest-details'>{props.investor.amount}</h5>
            <h5 className="box_i-text">Startups</h5>
            {startup_Array?.map((startup) => {
            return <h5 key={startup}>{startup}</h5>;
            })}
            <button className="pitch-coffee" onClick={() => window.location = `mailto:${props.investor.email}`}>Pitch Me Your Coffee</button>
        </div>

    );

}

export default InvestorDetailViewBlueArea;