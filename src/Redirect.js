import {Navigate} from "react-router-dom";

export function redirectInvestor(component,cookies){
	
	if(cookies === undefined || cookies === ""){
		return <Navigate to="/login"/>
	}

	else if(cookies.slice(cookies.length - 1) === "0"){// is investor, not see other investor pages
		console.log("Going to projects");
		return <Navigate to="/projects" />
	}
	else {
		return component;
	}
}

export function redirectDeveloper(component,cookies){
	if(cookies === undefined|| cookies === ""){
		return <Navigate to="/login"/>
	}

	else if(cookies.slice(cookies.length - 1) === "1"){// is developer, not see other project pages
		console.log("Going to investors");
		return <Navigate to="/investors" />
	}
	else {
		return component;
	}
}

export function redirectNotLoggedIn(component,cookies){

	if( cookies === undefined|| cookies === ""){
		return <Navigate to="/login"/>
	}

	else{
		return component
	}

}

export function deleteCookies(){
	document.cookie = undefined;
}

