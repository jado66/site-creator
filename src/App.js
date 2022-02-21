import React, { useState, useEffect, useCallback, useContext, createContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation 
} from "react-router-dom";
import './App.css';

import 'bootstrap/dist/css/bootstrap.css';
import './BootstrapOverrides.css'
import BlogBanner from "./components/blogBanner";
import ViewPostPage from "./pages/viewBlogPostPage";
// import Image from "./components/image";
import WebsiteStyleEditor from "./components/styleEditor";

import CoachingPage from "./pages/coachingPage";
import AdvertisingPage from "./pages/advertisingPage";
import CreatePostPage from "./pages/createBlogPostPage";
// import AdminPage from "./pages/adminPage";
import AboutPage from "./pages/aboutPage";
import ModelingPage from "./pages/modelingPage"
import Header from "./components/header";
import DynamicPage from "./components/dynamicPage";
import Mosaic from "./components/mosaic";
import Blog from "./pages/blogPage";
import TestPage from "./pages/testPage";
import Navbar from "./components/navbar";
import CheckoutPage from "./pages/checkoutPage";

import EditableLineGraph from "./components/editableLineGraph";
import Product from "./components/product";




import {site_template} from "./websiteVersions/current"

const adminDefaults = { //These are just the values, functions are added in the App component
  webStyle: {
    siteName: "React Site-Creator",
    isMobile: window.innerWidth <= 991,
    isEditMode: true,
    isShowEditor: true,
    isAdmin: true,
    // Website colors
    lightShade: "#EEE4E8",
    lightAccent: "#8BF6FD",
    mainBrandColor: "#1D92B2",
    darkAccent: "#1F4C57" ,
    darkShade: "#1C191E",
    // colorsUpdated: false,
    // widths
    centerWidth:60,
    secondCenterWidth:90,
    // page names
    primaryFont:"Merienda",
    secondaryFont:""
  },
  pages:site_template.pages,
  socialMedias:[
    {
      location  :"Github",
      link:"https://github.com/jado66/site-creator"
    },
    {
      location  :"LinkedinIn",
      link:"https://www.linkedin.com/in/jadonerwin/"
    }
  ],
  cart :{},
  promoCodes: {
    test12Free:{type:"Free"},
      testHalfOff:{type:"% Off", value: 50},
      test20Off:{type:"$ Off", value: 20}
  },
  savedData: {},
  msgPort: "",
  componentOptions: ["PlanComparison","WalkThrough","ListComparisonTable","Paragraph","ParagraphBacked","QuickLink","PictureFrame","Navbar","Header","Footer","Mosaic","DynamicForm","CardPaymentBlock","CaptionedPicture","BlogPreview","VideoFrame","SlideShow"],
  flatComponents : ["Navbar","Header","Footer","CountDown","PlanComparison"]
}

export const WebContext = createContext(adminDefaults)

function App() {
  const [appContext, setAppContext] = useState({
    ...adminDefaults,
    setWebStyles: (state) => {
      setAppContext(prevState => ({
        ...prevState,
        webStyle: state,
      }))
    },
    setCart: (state) => {
      setAppContext(prevState => ({
        ...prevState,
        cart: state,
      }))
    },
    setSocialMedias: (state) =>{
      setAppContext(prevState => ({
        ...prevState,
        socialMedias: state,
      }))
    },
    setPages: (state) =>{
      setAppContext(prevState => ({
        ...prevState,
        pages: state,
      }))
    },
    sendMsgPortMsg:(msg)=>{
      setAppContext(prevState => ({
      ...prevState,
      msgPort: msg,
    }))
    },
    setSavedData: (state) =>{
      setAppContext(prevState => ({
        ...prevState,
        savedData: state,
      }))
    },
    addToCart: (cartItem) =>{
      // Check if we already have it in the cart
      if (cartItem.name in appContext.cart){
        let newCart = {...appContext.cart}
        newCart[cartItem.name].quantity += 1
        appContext.setCart(newCart)
      }
      else{
        let newCart = {...appContext.cart,[cartItem.name]:cartItem}
        appContext.setCart(newCart)
      }
    },
  
    removeFromCart: (itemName) =>{
      // Check if we already have it in the cart
      if (itemName in appContext.cart){
        let newCart = {...appContext.cart}
        delete newCart[itemName]
        appContext.setCart(newCart)
      }
    },
  
    setCartItemQuantity: (itemName, quantity) =>{
      // This should only be called if the item already exists in the cart
      if (itemName in appContext.cart){
        let newCart = {...appContext.cart}
        
        newCart[itemName].quantity = parseInt(quantity)
        
        if (newCart[itemName].quantity === 0){
          delete newCart[itemName]
        }
        appContext.setCart(newCart)
        // localStorage.setItem("cart",JSON.stringify(newCart))
      }
      else{
        alert("Error: Item not found in cart")
      }
    }, 

    handlePageNameChange: (index,name) => {
      let newPage = {}
      appContext.setPages( arr => {
        newPage.path = arr[index].path;
        newPage.name = name;
     
        return [...arr.slice(0,index), newPage ,...arr.slice(index+1)]}
        ); // Callback to save to storage
    },
  
    handlePagePathChange: (index,path) => {
      let newPage = {}
      appContext.setPages( arr => {
        newPage.path = path;
        newPage.name = arr[index].name;
     
        return [...arr.slice(0,index), newPage ,...arr.slice(index+1)]}
        );
    },
  
    checkIfPageExists: (path) => {
      let pageExists = false
      appContext.pages.forEach(page => {
        if (page.path === path){
          pageExists = true;
        }
      })
      return pageExists;
    },
  
    deletePage: (pageName, index) => {
      let sureDelete = prompt(`Are you sure you would like to delete the page ${pageName}? This action is irreversible. Type "YES" to delete this page:`, "");
  
      if (sureDelete === "YES"){
        appContext.setPages( arr => {     
          return [...arr.slice(0,index) ,...arr.slice(index+1)]}
          );
      }
    },
  
    addPage: (name,path) => {
      // alert("New Page")
      if (!name){
        name = "New Page"
      }
      if (!path){
        path = "/new-page"
      }
      
      let newPage = {}
      appContext.setPages( arr => {
        newPage.path = path;
        newPage.name = name;
     
        return [...arr, newPage]}
        );
    },
  
    // Social
    handleSocialSiteChange: (index,location) => {
      let newSocialMedia = {}
      appContext.setSocialMedias( arr => {
        newSocialMedia.link = arr[index].link;
        newSocialMedia.location = location;
     
        return [...arr.slice(0,index), newSocialMedia ,...arr.slice(index+1)]}
        ); // Callback to save to storage
    },
  
    handleSocialLinkChange: (index,link) => {
      let newSocialMedia = {}
      appContext.setSocialMedias( arr => {
        newSocialMedia.location = arr[index].location;
        newSocialMedia.link = link;
  
     
        return [...arr.slice(0,index), newSocialMedia ,...arr.slice(index+1)]}
        );
    },
  
    deleteSocialMedia: (location, index) => {
      let sureDelete = window.confirm(`Are you sure you would like to your social media link to ${location}`);
  
      if (sureDelete){
        appContext.setSocialMedias( arr => {     
          return [...arr.slice(0,index) ,...arr.slice(index+1)]}
          );
      }
    },
  
    addSocialMedia: () => {
      let newSocialMedia = {}
      appContext.setSocialMedias( arr => {
        newSocialMedia.location = "New Link";
        newSocialMedia.link = "/";
     
        return [...arr, newSocialMedia]}
        );
    },
    saveWebsite:()=>{
      appContext.sendMsgPortMsg("save")
    },
    toggleStyleEditor:()=>{
      let newWebstyle = {...appContext.webStyle}
      newWebstyle.isShowEditor = !newWebstyle.isShowEditor

      setAppContext(prevState => ({
        ...prevState,
        webStyle: newWebstyle,
      }))
    },
    saveComponentData: (pageName,index, data)=>{
      
      let newSavedData = appContext.savedData

      if (pageName in newSavedData){
        newSavedData[pageName][index] = data
      }
      else{
        newSavedData[pageName] = {}
        newSavedData[pageName][index] = data
      }
      
      appContext.setSavedData(newSavedData)

      alert(JSON.stringify(newSavedData,null,4))
    }
  })
  
  const [promoCodes,setPromoCodes] = useState(
    { 
      test12Free:{type:"Free"},
      testHalfOff:{type:"% Off", value: 50},
      test20Off:{type:"$ Off", value: 20}
    }
  )

  const [webStyle,setWebStyle] = useState(adminDefaults.webStyle)

  const [pages,setPages] = useState(site_template.pages)
  const [socialMedias,setSocialMedias] = useState([
    {
      location  :"Github",
      link:"https://github.com/jado66/site-creator"
    },
    {
      location  :"LinkedinIn",
      link:"https://www.linkedin.com/in/jadonerwin/"
    }
  ])

  const [cart,setCart] = useState({})

  function handleWindowSizeChange() {
    getWebStyleFromStorage();
    const isMobile = window.innerWidth <= 991
    setWebStyle({...webStyle, isMobile:isMobile})


  }

  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  useEffect(() => {
    if (appContext.msgPort == "save"){

      appContext.sendMsgPortMsg("")
    }
  }, [appContext.msgPort]);

  useEffect(() => {
    // Update the document title using the browser API
    getIsUserAdmin();
    setPagesFromStorage();
    setSocialMediasFromStorage();
    setCartFromStorage();
    getWebStyleFromStorage();
    // setWebStyle({...webStyle,...{colorsUpdated:true}})
    // getBlogCount();
  }, []);

  useEffect(() => {
    localStorage.setItem('site-pages',JSON.stringify(pages))
  }, [pages]);

  useEffect(() => {
    localStorage.setItem('social-medias',JSON.stringify(socialMedias))
  }, [socialMedias]);

 

  const getWebStyleFromStorage = () => {
    let newState = {}
    
    let stored_lightShade  = localStorage.getItem("webStyle-lightShade");
    if (stored_lightShade){
      newState.lightShade = stored_lightShade
    }

    let stored_lightAccent = localStorage.getItem("webStyle-lightAccent");
    if (stored_lightAccent){
      newState.lightAccent = stored_lightAccent
    }
    let stored_mainBrandColor = localStorage.getItem("webStyle-mainBrandColor");
    if (stored_mainBrandColor){
      
      newState.mainBrandColor = stored_mainBrandColor

    }
    let stored_darkAccent = localStorage.getItem("webStyle-darkAccent");
    if (stored_darkAccent){
      
      newState.darkAccent = stored_darkAccent

    }
    let stored_darkShade = localStorage.getItem("webStyle-darkShade");
    if (stored_darkShade){
      
      newState.darkShade = stored_darkShade

    }
    // widths
    let stored_centerWidth = localStorage.getItem("webStyle-centerWidth");
    if (stored_centerWidth){
      
      newState.centerWidth = stored_centerWidth

    }
    let stored_secondCenterWidth = localStorage.getItem("webStyle-secondCenterWidth");
    if (stored_secondCenterWidth){
      newState.secondCenterWidth = stored_secondCenterWidth

    }

    let stored_isEditMode = localStorage.getItem("webStyle-isEditMode");
    if (stored_isEditMode){
      newState.isEditMode = stored_isEditMode === "true"
    }

    // let stored_isShowEditor = localStorage.getItem("webStyle-isShowEditor");
    // if (stored_isShowEditor){
    //   newState.isShowEditor = stored_isShowEditor === "true"
    // }
    
    // let stored_isAdmin = localStorage.getItem("webStyle-isAdmin");
    // if (stored_isAdmin){
    //   newState.isAdmin = stored_isAdmin === "true"

    // }

    setWebStyle({...webStyle,...newState})
  }

  const setPagesFromStorage = () =>{
    let pages = JSON.parse(localStorage.getItem('site-pages'))
  
    if (pages){ 
      setPages(pages)
    }
  }

  const setCartFromStorage = () => {
    // This stays as a local storage item
    let storedCart = JSON.parse(localStorage.getItem("cart"))
    if (storedCart){
      // storedCart = {}
      setCart(storedCart)
    }
  }

  const addToCart = (cartItem) =>{
    // Check if we already have it in the cart
    if (cartItem.name in cart){
      let newCart = {...cart}
      newCart[cartItem.name].quantity += 1
      setCart(newCart)
      localStorage.setItem("cart",JSON.stringify(newCart))

    }
    else{
      let newCart = {...cart,[cartItem.name]:cartItem}
      setCart(newCart)
      localStorage.setItem("cart",JSON.stringify(newCart))
    }
  }

  const removeFromCart = (itemName) =>{
    // Check if we already have it in the cart
    if (itemName in cart){
      let newCart = {...cart}
      delete newCart[itemName]
      setCart(newCart)
    }
  }

  const setCartItemQuantity = (itemName, quantity) =>{
    // This should only be called if the item already exists in the cart
    if (itemName in cart){
      let newCart = {...cart}
      
      newCart[itemName].quantity = parseInt(quantity)
      
      if (newCart[itemName].quantity === 0){
        delete newCart[itemName]
      }
      setCart(newCart)
      localStorage.setItem("cart",JSON.stringify(newCart))
    }
    else{
      alert("Error: Item not found in cart")
    }
  }

  const setSocialMediasFromStorage = () =>{
    let socialMedias = JSON.parse(localStorage.getItem('social-medias'))
  
    if (socialMedias){ 
      setSocialMedias(socialMedias)
    }
  }

  const handlePageNameChange = (index,name) => {
    let newPage = {}
    setPages( arr => {
      newPage.path = arr[index].path;
      newPage.name = name;
   
      return [...arr.slice(0,index), newPage ,...arr.slice(index+1)]}
      ); // Callback to save to storage
  }

  const handlePagePathChange = (index,path) => {
    let newPage = {}
    setPages( arr => {
      newPage.path = path;
      newPage.name = arr[index].name;
   
      return [...arr.slice(0,index), newPage ,...arr.slice(index+1)]}
      );
  }

  const checkIfPageExists = (path) => {
    let pageExists = false
    pages.forEach(page => {
      if (page.path === path){
        pageExists = true;
      }
    })
    return pageExists;
  }

  const deletePage = (pageName, index) => {
    let sureDelete = prompt(`Are you sure you would like to delete the page ${pageName}? This action is irreversible. Type "YES" to delete this page:`, "");

    if (sureDelete === "YES"){
      setPages( arr => {     
        return [...arr.slice(0,index) ,...arr.slice(index+1)]}
        );
    }
  }

  const addPage = (name,path) => {
    // alert("New Page")
    if (!name){
      name = "New Page"
    }
    if (!path){
      path = "/new-page"
    }
    
    let newPage = {}
    setPages( arr => {
      newPage.path = path;
      newPage.name = name;
   
      return [...arr, newPage]}
      );
  }

  // Social
  const handleSocialSiteChange = (index,location) => {
    let newSocialMedia = {}
    setSocialMedias( arr => {
      newSocialMedia.link = arr[index].link;
      newSocialMedia.location = location;
   
      return [...arr.slice(0,index), newSocialMedia ,...arr.slice(index+1)]}
      ); // Callback to save to storage
  }

  const handleSocialLinkChange = (index,link) => {
    let newSocialMedia = {}
    setSocialMedias( arr => {
      newSocialMedia.location = arr[index].location;
      newSocialMedia.link = link;

   
      return [...arr.slice(0,index), newSocialMedia ,...arr.slice(index+1)]}
      );
  }

  const deleteSocialMedia = (location, index) => {
    let sureDelete = window.confirm(`Are you sure you would like to your social media link to ${location}`);

    if (sureDelete){
      setSocialMedias( arr => {     
        return [...arr.slice(0,index) ,...arr.slice(index+1)]}
        );
    }
  }

  const addSocialMedia = () => {
    let newSocialMedia = {}
    setSocialMedias( arr => {
      newSocialMedia.location = "New Link";
      newSocialMedia.link = "/";
   
      return [...arr, newSocialMedia]}
      );
  }

  const cartCallbacks = {
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    setCartItemQuantity: setCartItemQuantity
  }

  const pageCallbacks = {
    addPage: addPage,
    deletePage: deletePage,
    handleNameChange: handlePageNameChange,
    handlePathChange: handlePagePathChange,
    checkIfPageExists: checkIfPageExists
  }

  const socialMediaCallbacks = {
    addSocialMedia: addSocialMedia,
    deleteSocialMedia: deleteSocialMedia,
    handleSocialSiteChange: handleSocialSiteChange,
    handleSocialLinkChange: handleSocialLinkChange,
  }

  const updateWebStyles = (state) => {
    setWebStyle({...webStyle,
                 ...state})
    // forceUpdate()
    // alert("tests")
  }

  // const updateBlogCount = () => {
  //   getBlogCount();
  // }

  const getIsUserAdmin = async () => {
    // Get IP address for ADMIN rights
    // const response = await fetch('https://geolocation-db.com/json/');
    // const data = await response.json();
    // setUserIsAdmin(data.IPv4 === "108.51.21.72")
    // setUserIsAdmin(true)
    // alert(data.IPv4 === "108.51.21.72")
  }

  // const getBlogCount = async () => {
  //   // Get IP address for ADMIN rights
  //   const response = await fetch('http://localhost:9000/getBlogCount');
  //   const count = await response.text();

  //   setBlogCount(parseInt(count))
  // }
  // const checkForTemplate = (pageName) => {
  //   if (pageName in templates){
  //     return templates[pageNames]
  //   }
  //   else {
  //     return ["Header","Navbar"]
  //   }
  // }


  let componentOptions = ["PlanComparison","WalkThrough","ListComparisonTable","Paragraph","ParagraphBacked","QuickLink","PictureFrame","Navbar","Header","Footer","Mosaic","DynamicForm","CardPaymentBlock","CaptionedPicture","BlogPreview","VideoFrame","SlideShow"]

  // const routes = []
  // pageNames.forEach((name, index) => { 
    // let template = checkForTemplate(name);
  // let newPath = pageUrls[index]
  let routeComponents  = pages.map(({name, path})=> {
    
    let pageTemplate = site_template[name];


    return(
    
    <Route basename="/site-creator" exact path = {path+"/:pathParam?"} key = {name+"Route"}>
      {/* <span>{(appContext.webStyle.isAdmin?"True":"False")} + {(appContext.webStyle.isShowEditor?"True":"False")}</span> */}
      {appContext.webStyle.isAdmin && appContext.webStyle.isShowEditor &&
      <WebsiteStyleEditor webStyle = {webStyle} updateWebStyles = {updateWebStyles}   
                          showStyleEditor = {()=>{}} minimizeStyleEditor = {()=>{}} expandStyleEditor = {()=>{}} promoCodes = {promoCodes}
                          socialMedias = {socialMedias} socialMediaCallbacks = {socialMediaCallbacks} pages = {pages} pageCallbacks = {pageCallbacks}/>
      }         
      <DynamicPage  webStyle = {webStyle} key = {name+"Page"} pageName = {name}
                    pages = {pages} pageCallbacks = {pageCallbacks} socialMedias = {socialMedias} socialMediaCallbacks = {socialMediaCallbacks}
                    cart = {cart} cartCallbacks = {cartCallbacks} template = {pageTemplate}
                    defaultComponentList = { ["Header","Navbar"]} componentOptions = {componentOptions}
                    updateWebStyles = {updateWebStyles} />
    </Route>)}
     
    // routes.push(newRoute)
  )
  // alert(routes.length)

  

  return (
    <WebContext.Provider value = {appContext}>
      <div className="App" style={{minHeight:"100vh", overflowX: "hidden",}}>
        {/* <span>{webStyle.isMobile?"M":"D"}</span> */}

        <Router basename="/site-creator">
          {/* <Navbar webStyle = {webStyle}/> */}
          {/* <Fade> */}
            <Switch>
            {routeComponents}
            <Route path="/admin">
              { webStyle.isAdmin?
                <AdminPage
                          cart = {cart} cartCallbacks = {cartCallbacks} 
                          promoCodes = {promoCodes}
                          updateWebStyles = {updateWebStyles} pages = {pages} pageCallbacks = {pageCallbacks} 
                          socialMedias = {socialMedias} webStyle = {webStyle} logOutCallback = {()=>{setWebStyle(prevState => ({
                            ...prevState,
                            isEditMode: false,
                            isAdmin: false,
                        }))}}/>
                :
                <AdminLogin cart = {cart} updateWebStyles = {updateWebStyles} pages = {pages} pageCallbacks = {pageCallbacks} 
                            socialMedias = {socialMedias} webStyle = {webStyle} signInCallback = {(rememberMe)=>{ 
                              if (rememberMe){
                                localStorage.setItem('webStyle-isAdmin',"true");
                              }
                              setWebStyle(prevState => ({
                                                          ...prevState,
                                                          isAdmin: true,
                                                      }))}} />
              }
            </Route>
            <Route path="/checkout">
                <CheckoutPage promoCodes = {promoCodes} cart = {cart} cartCallbacks = {cartCallbacks} pages = {pages} pageCallbacks = {pageCallbacks} socialMedias = {socialMedias} webStyle = {webStyle}/>
            </Route>
            <Route>
              <HeaderView cart = {cart} cartCallbacks = {cartCallbacks} pages = {pages} pageCallbacks = {pageCallbacks} socialMedias = {socialMedias} webStyle = {webStyle}/>
                {/* <AdminPage  webStyle = {webStyle} viewAsNormalUserCallback = {() => {setViewAsNormalUser(true)}} showWebsiteStyleEditor = {() => {showWebsiteStyleEditor(true)}}/> */}
            </Route>
          </Switch>
          {/* </Fade> */}
        </Router>

      </div>
    </WebContext.Provider>
  );
}

export default App;

function AdminLogin(props){
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

function AdminPage(props){
  
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

function HeaderView(props) {
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
/*
 <Route path="/test">
              { <TestPage/> 
              <DynamicPage  webStyle = {webStyle} userIsAdmin = {userIsAdmin} viewAsNormalUser = {viewAsNormalUser}
                            defaultComponentList = { ["Header","Navbar","Mosaic","Header","Mosaic","BlogPreview"]}  componentOptions = {["Navbar","Header","Mosaic","DynamicForm","CardPaymentBlock","BlogPreview"]}
                               updateWebStyles = {updateWebStyles} closeStyleEditor = {hideWebsiteStyleEditor} showStyleEditor = {isShowEditor}/>
          </Route>
          <Route path="/blog-post/:id" component = {ViewPostPage}/>
          <Route path="/">
          <DynamicPage  webStyle = {webStyle} userIsAdmin = {userIsAdmin} viewAsNormalUser = {viewAsNormalUser}
                            defaultComponentList = { ["Header","Navbar","Mosaic","Header","Mosaic","BlogPreview"]}  componentOptions = {["Navbar","Header","Mosaic","DynamicForm","CardPaymentBlock","BlogPreview"]}
                               updateWebStyles = {updateWebStyles} closeStyleEditor = {hideWebsiteStyleEditor} showStyleEditor = {isShowEditor}/>
          </Route>
          
*/