import { useParams } from "react-router";

function InvestorDetailView(props) {
    let params = useParams();
    console.log("params", params)
    return (
        <div className="container-wrap">
            <div className="userlogin-navbar"></div>
            <h1>hello  investor detail view {params.projectId}</h1>
        </div>
    );
}

export default InvestorDetailView