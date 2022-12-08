import {Navigate} from "react-router-dom";

export function redirectInvestor(component,cookies){

	console.log(cookies);
	
	if(cookies === undefined || !('papaya' in cookies)){
		console.log("no cookies set")
		return <Navigate to="/login"/>
	}

	else if(cookies['papaya']===0){// is investor, not see other investor pages
		console.log("Going to projects");
		return <Navigate to="/projects" />
	}
	else {
		return component;
	}
}

export function redirectDeveloper(component,cookies){
	console.log(cookies);

	if(cookies === undefined|| !('papaya' in cookies)){
		return <Navigate to="/login"/>
	}

	else if(cookies['papaya']===1){// is developer, not see other project pages
		console.log("Going to investors");
		return <Navigate to="/investors" />
	}
	else {
		return component;
	}
}

export function redirectNotLoggedIn(component,cookies){
	
	console.log(cookies);

	if( cookies === undefined||  !('papaya' in cookies)){
		return <Navigate to="/login"/>
	}

	else{
		return component
	}

}

export function deleteCookies(){
	document.cookie = undefined;
}

