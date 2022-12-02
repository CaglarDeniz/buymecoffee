import { useParams } from "react-router";
import InvestorDetailHeader from "./components/InvestorDetailViewHeader";
import './components/InvestorDetailView.css';
import InvestorDetailViewBlueArea from "./components/InvestorDetailViewBlueArea";

function InvestorDetailView(props) {
    let params = useParams();
    console.log("params", params)
    const tempInvestor = {name: "Kevin O'Leary", email: "kevin@leary.com", industry: ["Technology", "Creative"], bio: "ENTREPRENEUR IN THE FIELD OF TECHNOLOGY", amount: 1000000, oldStartups: ["Startup1","Startup2", "Startup3"], photolink:""}
    return (
        <div className="investdet-wrap">
            <InvestorDetailHeader name={tempInvestor.name} />
            <InvestorDetailViewBlueArea id= {params.investorId} investor={tempInvestor} />
        </div>
    );
}

export default InvestorDetailView