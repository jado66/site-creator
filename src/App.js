import { useState, useEffect, createContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// CSS
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './BootstrapOverrides.css'

// High level components
import WebsiteStyleEditor from "./components/StyleEditor";
import DynamicPage from "./components/DynamicPage";

// Pages
import CheckoutPage from "./pages/checkoutPage";
import AdminPage from "./pages/AdminPage"
import AdminLogin from "./pages/AdminLogin"
import Page404 from "./pages/Page404"


// Data
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
  cart :{},
  promoCodes: {
    test12Free:{type:"Free"},
      testHalfOff:{type:"% Off", value: 50},
      test20Off:{type:"$ Off", value: 20}
  },
  savedData: {},
  msgPort: "",
}

export const WebContext = createContext()

function App() {

  const [webStyle, setWebStyle] = useState({
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
  } )

  const [masterNavData, setMasterNavData] = useState(site_template.masterNavBarData)
  const [socialMedias, setSocialMedias] = useState(site_template.socialMedias)
  const [pages, setPages] = useState(adminDefaults.pages)
  const [promoCodes, setPromoCodes] = useState(adminDefaults.pages)
  const [cart, setCart] = useState({})
  const [msgPort,setMsgPort] = useState("")
  const [savedData, setSavedData] = useState({})
  const componentOptions = ["Product Comparison Table","Walk Through","Product Comparison Cards","Paragraph","Paragraph Backed","Quick Link","Navbar","Header","Footer","Mosaic","Captioned Picture","Video Frame","Slide Show"].sort()
  const flatComponents = ["Navbar","Header","Footer","CountDown","ProductComparisonTable"]

  const appMethods = {
    setWebStyle: (state) => setWebStyle(state),
    setMasterNavData: (state) => setMasterNavData(state),
    setCart: (state) => setCart(state),
    setSocialMedias: (state) => setSocialMedias(state),
    setPages: (state) => setPages(state),
    sendMsgPortMsg:(msg)=> setMsgPort(msg),
    setSavedData: (state) => setSavedData(state),
    setPromoCodes: (state) => setPromoCodes(state),
    
    addToCart: (cartItem) =>{
      // Check if we already have it in the cart
      if (cartItem.name in cart){
        let newCart = {...cart}
        newCart[cartItem.name].quantity += 1
        setCart(newCart)
      }
      else{
        let newCart = {...cart,[cartItem.name]:cartItem}
        setCart(newCart)
      }
    },
  
    removeFromCart: (itemName) =>{
      // Check if we already have it in the cart
      if (itemName in cart){
        let newCart = {...cart}
        delete newCart[itemName]
        setCart(newCart)
      }
    },
  
    setCartItemQuantity: (itemName, quantity) =>{
      // This should only be called if the item already exists in the cart
      if (itemName in cart){
        let newCart = {...cart}
        
        newCart[itemName].quantity = parseInt(quantity)
        
        if (newCart[itemName].quantity === 0){
          delete newCart[itemName]
        }
        setCart(newCart)
        // localStorage.setItem("cart",JSON.stringify(newCart))
      }
      else{
        alert("Error: Item not found in cart")
      }
    }, 

    handlePageNameChange: (index,name) => {
      let newPage = {
        path: pages[index].path,
        name: name
      }
      setPages([...pages.slice(0,index), newPage ,...pages.slice(index+1)]); // Callback to save to storage
    },
  
    handlePagePathChange: (index,path) => {
      let newPage = {
        path: path,
        name: pages[index].name
      }
      setPages([...pages.slice(0,index), newPage ,...pages.slice(index+1)]);
    },
  
    checkIfPageExists: (path) => {
      let pageExists = false
      pages.forEach(page => {
        if (page.path === path){
          pageExists = true;
        }
      })
      return pageExists;
    },
  
    deletePage: (pageName, index) => {
      let sureDelete = prompt(`Are you sure you would like to delete the page ${pageName}? This action is irreversible. Type "YES" to delete this page:`, "");
  
      if (sureDelete === "YES"){
        setPages([...pages.slice(0,index) ,...pages.slice(index+1)]);
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
      
      let newPage = {
          path: path,
        name: name
      }
      setPages([...pages, newPage])
    },
  
    // Social
    handleSocialSiteChange: (index,location) => {
      let newSocialMedia = {
        link: socialMedias[index].link,
        location: location
      }
      setSocialMedias([...socialMedias.slice(0,index), newSocialMedia ,...socialMedias.slice(index+1)]); // Callback to save to storage
    },
  
    handleSocialLinkChange: (index,link) => {
      let newSocialMedia = {
        location: socialMedias[index].location,
        link:link
      }
      setSocialMedias([...socialMedias.slice(0,index), newSocialMedia ,...socialMedias.slice(index+1)]);
    },
  
    deleteSocialMedia: (location, index) => {
      let sureDelete = window.confirm(`Are you sure you would like to your social media link to ${location}`);
  
      if (sureDelete){
        setSocialMedias([...socialMedias.slice(0,index) ,...socialMedias.slice(index+1)]);
      }
    },
  
    addSocialMedia: () => {
      let newSocialMedia = {
        location: "New Link",
        link: "/"
      }

      setSocialMedias([...socialMedias, newSocialMedia]);
    },
    saveWebsite:()=>{
      appMethods.sendMsgPortMsg("save")
    },

    toggleStyleEditor:()=>{
      let newWebstyle = {...webStyle}
      newWebstyle.isShowEditor = !newWebstyle.isShowEditor
      setWebStyle(newWebstyle)
     
    },

    saveComponentData: (pageName,index, data)=>{
      
      let newSavedData = savedData

      if (pageName in newSavedData){
        newSavedData[pageName][index] = data
      }
      else{
        newSavedData[pageName] = {}
        newSavedData[pageName][index] = data
      }
      
      setSavedData(newSavedData)

      // alert(JSON.stringify(newSavedData,null,4))
    }
  }  


  function handleWindowSizeChange() {
    // getWebStyleFromStorage();
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
    if (msgPort == "save"){

      appMethods.sendMsgPortMsg("")

      // alert(newSavedData)

      // if(window.confirm("Would you like to download the website data?")){
      //   var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(newSavedData, null, 4));
      //   var downloadAnchorNode = document.createElement('a');
      //   downloadAnchorNode.setAttribute("href",     dataStr);
      //   downloadAnchorNode.setAttribute("download", "data.json");
      //   document.body.appendChild(downloadAnchorNode); // required for firefox
      //   downloadAnchorNode.click();
      //   downloadAnchorNode.remove();
      // }
     
    }
  }, [msgPort]);

  useEffect(() => {
    // Update the document title using the browser API
    // getIsUserAdmin();
    // setPagesFromStorage();
    setSocialMediasFromStorage();
    setCartFromStorage();
    // getWebStyleFromStorage();
    // setWebStyle({...webStyle,...{colorsUpdated:true}})
    // getBlogCount();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem('site-pages',JSON.stringify(pages))
  // }, [pages]);

  // useEffect(() => {
  //   localStorage.setItem('social-medias',JSON.stringify(socialMedias))
  // }, [socialMedias]);

 

  // const getWebStyleFromStorage = () => {
  //   let newState = {}
    
  //   let stored_lightShade  = localStorage.getItem("webStyle-lightShade");
  //   if (stored_lightShade){
  //     newState.lightShade = stored_lightShade
  //   }

  //   let stored_lightAccent = localStorage.getItem("webStyle-lightAccent");
  //   if (stored_lightAccent){
  //     newState.lightAccent = stored_lightAccent
  //   }
  //   let stored_mainBrandColor = localStorage.getItem("webStyle-mainBrandColor");
  //   if (stored_mainBrandColor){
      
  //     newState.mainBrandColor = stored_mainBrandColor

  //   }
  //   let stored_darkAccent = localStorage.getItem("webStyle-darkAccent");
  //   if (stored_darkAccent){
      
  //     newState.darkAccent = stored_darkAccent

  //   }
  //   let stored_darkShade = localStorage.getItem("webStyle-darkShade");
  //   if (stored_darkShade){
      
  //     newState.darkShade = stored_darkShade

  //   }
  //   // widths
  //   let stored_centerWidth = localStorage.getItem("webStyle-centerWidth");
  //   if (stored_centerWidth){
      
  //     newState.centerWidth = stored_centerWidth

  //   }
  //   let stored_secondCenterWidth = localStorage.getItem("webStyle-secondCenterWidth");
  //   if (stored_secondCenterWidth){
  //     newState.secondCenterWidth = stored_secondCenterWidth

  //   }

  //   let stored_isEditMode = localStorage.getItem("webStyle-isEditMode");
  //   if (stored_isEditMode){
  //     newState.isEditMode = stored_isEditMode === "true"
  //   }

  //   // let stored_isShowEditor = localStorage.getItem("webStyle-isShowEditor");
  //   // if (stored_isShowEditor){
  //   //   newState.isShowEditor = stored_isShowEditor === "true"
  //   // }
    
  //   // let stored_isAdmin = localStorage.getItem("webStyle-isAdmin");
  //   // if (stored_isAdmin){
  //   //   newState.isAdmin = stored_isAdmin === "true"

  //   // }

  //   setWebStyle({...webStyle,...newState})
  // }

  // const setPagesFromStorage = () =>{
  //   let pages = JSON.parse(localStorage.getItem('site-pages'))
  
  //   if (pages){ 
  //     setPages(pages)
  //   }
  // }

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
    // let socialMedias = JSON.parse(localStorage.getItem('social-medias'))
  
    // if (socialMedias){ 
    //   setSocialMedias(socialMedias)
    // }
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


  let routeComponents  = pages.map(({name, path})=> {
    
    let pageTemplate = site_template[name];


    return(
    
    <Route basename="/site-creator" exact path = {path+"/:pathParam?"} key = {name+"Route"}>
      {/* <span>{(webStyle.isAdmin?"True":"False")} + {(webStyle.isShowEditor?"True":"False")}</span> */}
      {webStyle.isAdmin && webStyle.isShowEditor &&
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
     
  )

  

  return (
    <WebContext.Provider value = {
        {
          webStyle: webStyle,
          socialMedias: socialMedias,
          masterNavData: masterNavData,
          pages: pages,
          promoCodes: promoCodes,
          cart: cart, 
          msgPort: msgPort,
          savedData: savedData, 
          flatComponents: flatComponents,
          componentOptions: componentOptions,

          appMethods: appMethods
        }
      }>
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
              <Page404 cart = {cart} cartCallbacks = {cartCallbacks} pages = {pages} pageCallbacks = {pageCallbacks} socialMedias = {socialMedias} webStyle = {webStyle}/>
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