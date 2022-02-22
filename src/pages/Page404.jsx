import {
  useLocation 
} from "react-router-dom";

import Navbar from "../components/pageComponents/Navbar";

export default function Page404(props) {
    const location = useLocation();
    const pageList = props.pages.map(({name, path})=> (<p>- {name}: {path}</p>))
    console.log(location.pathname);
  
    const pageNameArr = location.pathname.slice(1).split(/[\-\_]/g)
  
    for (let i = 0; i < pageNameArr.length; i++) {
      pageNameArr[i] = pageNameArr[i][0].toUpperCase() + pageNameArr[i].substr(1);
    }
  
    const pageName = pageNameArr.join(" ");
  
    return (
      <div id = "outerSection" className="container ">
          <div id = "innerSection" className="col justify-items-baseline p-5 boxShadow h-100" style={{backgroundColor:props.webStyle.lightAccent}}>
            <Navbar cart = {props.cart} {...props} socialMedias = {props.socialMedias}/>
            <div >
              <h3>• The page <span style={{fontWeight:"bolder"}}>{location.pathname}</span> does not exist within this website.</h3>
              
  
              <button className="btn btn-secondary" onClick={()=>{props.pageCallbacks.addPage(pageName,location.pathname)}}>Create New Page</button>
  
              <h4>The following pages are included in the website:</h4>
              <ul >
                {pageList}
              </ul>
  
              <h4>To change page names and paths please see the page menu in the admin edit section.</h4>
            </div>
          </div>
      </div>
        
  
       
      )
  }