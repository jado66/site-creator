
import Navbar from "../components/pageComponents/Navbar";
import WebsiteStyleEditor from "../components/StyleEditor";
import EditableLineGraph from "../components/EditableLineGraph";
import Product from "../components/Product";

export default function AdminPage(props){
  
    const buttonStyle = {
                         backgroundColor:props.webStyle.darkAccent,
                         color:props.webStyle.lightShade
                        }
  
    const retrieveIgInsights = async () => {
      const response = await fetch(`https://graph.facebook.com/v12.0/318170626/insights?metric=impressions&period=days_28&since=1501545600&until=1502493720&access_token=IGQVJWUnR4bFkxSW9ZAdHMwX294bVZArMEdfcWtvVmtadTgyVHRXMzRlZAHBnVzZATRVRCemo3dlZAFWk5GdGlqY05BanlNXzVWWTRaZA2xMVmRTRnNvWWZAHMkNwOHhpSTlTRWIxQW9pUUtDRU5hY3dZAOUNhaAZDZD`,
        {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
        });
      
      return response.json(); // parses JSON response into native JavaScript objects
    };
  
    return(
      <div id = "outerSection" className="container ">
        <Navbar cart = {props.cart} {...props} socialMedias = {props.socialMedias}/>
        <h2 className="text-center mb-4">Admin Editor Tools</h2>
        <WebsiteStyleEditor isAdminPage = {false} webStyle = {props.webStyle} updateWebStyles = {props.updateWebStyles} showStyleEditor = {props.showStyleEditor}
                                      showStyleEditor = {()=>{}} minimizeStyleEditor = {()=>{}} expandStyleEditor = {()=>{}} isAdminPage = {true} style = {{backgroundColor:"white"}}
                                      socialMedias = {props.socialMedias} socialMediaCallbacks = {props.socialMediaCallbacks} pages = {props.pages} pageCallbacks = {props.pageCallbacks}
                                      promoCodes = {props.promoCodes}/>
          
        <div id = "innerSection" className="col justify-items-baseline p-5 boxShadow" style={{backgroundColor:props.webStyle.lightAccent}}>
          
          <div className="text-center">
          <h2>Hi LaRae! Welcome to your site!</h2>
          
          
          <div>
            <input className="btn m-3" style={buttonStyle} type = {"button"} value = {"Create New Blog Post"} />
            <input className="btn m-3" style={buttonStyle} type = {"button"} value = {"Send New Email"}/>
            <input className="btn m-3" style={buttonStyle} type = {"button"} value = {"Edit Website Styles"} />
            <input className="btn m-3" style={buttonStyle} type = {"button"} value = {"Get IG Insights"}
              onClick={()=>{retrieveIgInsights().then(response => alert(JSON.stringify(response)))}} />
            <input onClick={props.logOutCallback} className="btn m-3" style={buttonStyle} type = {"button"} value = {"Log Out"} />
  
            {/* <label>profilePage_318170626</label> */}
  
            
  
            {/* <Link to = "/" onClick = {props.viewAsNormalUserCallback}>View Site As Non-Admin</Link> */}
  
            <div className={"row"}>
              <div className={"col  py-3"}>
                {/* <h3>IG Analytics</h3> */}
                  <div className="m-auto ">
                    <EditableLineGraph webStyle = {props.webStyle} />
                  </div>
                
              </div>
              <div className={"col py-3"}>
                {/* <h3>Discovery Call Schedule</h3> */}
                <Product cartCallbacks = {props.cartCallbacks} webStyle = {props.webStyle} />
              </div>
  
            </div>
          </div>
        </div>
        </div>
      </div>
    )
  }