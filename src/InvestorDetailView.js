import { useParams } from "react-router";
import InvestorDetailHeader from "./components/InvestorDetailViewHeader";
import './components/InvestorDetailView.css';
import InvestorDetailViewBlueArea from "./components/InvestorDetailViewBlueArea";
import axios from 'axios';
import {useEffect, useState} from 'react';
import BackendURL from "./BackendURL";

function InvestorDetailView(props) {
    let params = useParams();
    //console.log("params", params);
    const [curr_Investor, setInvestor] = useState({});

    let investorEndpoint = BackendURL + '/api/investor/';

    useEffect (() => {
        axios.get(investorEndpoint+params.investorId).then( (res) =>{
            setInvestor(res.data.data[0]);
        }).catch (function(rejected){
            console.log(rejected);
            alert('Investor not found for this ID');
        });
    }, [setInvestor, investorEndpoint, params.investorId]);
 
   //const tempInvestor = {name: "Kevin O'Leary", email: "kevin@leary.com", industry: ["Technology", "Creative"], bio: "ENTREPRENEUR IN THE FIELD OF TECHNOLOGY", amount: 1000000, oldStartups: ["Startup1","Startup2", "Startup3"], photolink:""}
    return (
        <div className="investdet-wrap">
            <InvestorDetailHeader name={curr_Investor.name} photolink={curr_Investor.photoLink} />
            <InvestorDetailViewBlueArea id= {curr_Investor._id} investor={curr_Investor} /> 
        </div>
    );
}

export default InvestorDetailView;
