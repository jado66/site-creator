import Navbar from "../components/pageComponents/Navbar";
import { useState } from "react";

export default function AdminLogin(props){
    const [rememberMeCheck,setRememberMeCheck] = useState(false)
  
    const signIn = () =>{
      props.signInCallback(rememberMeCheck);
      alert(`Successfully signed in. ${rememberMeCheck?"You won't have to login next time.":""}`)
    }
  
    const buttonStyle = {
                         backgroundColor:props.webStyle.darkAccent,
                         color:props.webStyle.lightShade
                        }
  
    return(
      <div id = "outerSection" className={props.webStyle.isMobile?" ":" container"}>
        <Navbar {...props} socialMedias = {props.socialMedias} cart = {props.cart}/>
       
        <div id = "innerSection" className="col justify-items-baseline p-5 boxShadow h-100 w-50 m-auto" style={{backgroundColor:props.webStyle.lightAccent}}>
          <div className="form-signin  m-auto">
            <form>
            <h1 className="h3 mb-3 fw-normal text-center">Please Sign In</h1>
  
            <div className="form-floating">
              <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
              <label for="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
              <label for="floatingPassword">Password</label>
            </div>
  
            <div className="text-center">
              <div className="checkbox my-3">
                <label>
                  <input type="checkbox" value="remember-me" checked = {rememberMeCheck} onClick={()=>{setRememberMeCheck(!rememberMeCheck)}}/> Remember me
                </label>
              </div>
              <button onClick={signIn} className="w-50 btn btn-lg" style={buttonStyle} type="submit">Sign in</button>
              <p className="mt-5 mb-3 text-muted">© 2022-2025 Life By LaRae</p>
            </div>
            
            </form>
          </div>
          
        
        
        </div>
      </div>
    )
  }
  