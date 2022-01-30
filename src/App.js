import React, { useState, useEffect, useCallback } from "react";
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

const site_tempate = {
  pages: [
          {
            name:"Site Creator",
            path:"/"
          },
          {
            name:"How It Works",
            path:"/how-it-works"
          }, 
          {
            name:"Need Help",
            path:"/need-help"
          },
          {
            name:"Getting Started",
            path:"/getting-started"
          },
          {
            name:"Contact",
            path:"/contact"
          }
        ],
  ["Site Creator"]: [
      { 
        name: "Header",
        id: `Site Creator-Header-0-589`,
        content: { headerHtml: "React Site Creator" }
      },
      {
        name: "Navbar",
        id: `Site Creator-Navbar-1-469 `,
        content: {}
      },
      {
        name: "Paragraph",
        id: `Site Creator-Paragraph-2-381`,
        content: { html: `<h2>This website creator is a <strong>FREE</strong> tool built just for you! Create your own website complete with all the necessary components to build a successful blog, portfolio, or business site.</h2>
                          <h2>
                          <br>
                          </h2>
                          <h2>You can use this website creator for <strong>FREE </strong>for personal or commercial use.* You only have to buy a domain name for your site and pay for hosting service, and unfortunately we can't provide you with either.</h2>
                          <h2>
                          <br>
                          </h2>
                          <h2>If you would like help getting your website up and running with a domain name, business email, and this software, we are more than willing to help. Go to the <a href="need-help" rel="noopener noreferrer"  style="color: rgb(29, 146, 178);">Need Help</a>
                          <span style="color: rgb(255, 255, 255);"> </span>page to get some professional assistance.</h2>
                          <br>`
                  
                      },
      },
      {
        name: "Mosaic",
        id: `Site Creator-Mosiac-3-387`,
        content: {
          lPicContent: {src:"test.png"},
          lLinkBoxContent:{
            title:"Get Your Own Site",
            subTitle:"Pay Us Nothing",
            linkTxtContent:{
              txt:"These are the steps",
              href:"getting-started"
            }
          },
          rPicContent: {src:"test2.png"},
          rLinkBoxContent:{
            title:"Everything Is Editable",
            subTitle:"Try editing this website",
            linkTxtContent:{
              txt:"This tutorial explains how.",
              href:"how-it-works"
            }
          }
        }
      },
      {
        name: "PlanComparison",
        id: `Site Creator-PlanComparison-4-984`,
        content: {
          colCount: 3,
          tablesHeaders: [
            "Wix Pro\n$27 / Month",
            "WordPress Business\n$25 / Month",
            "React Site Creator\n*100% Free"
          ],
          rowGroupCount: 2,
          rowGroups: [4, 4],
          rowComparisons: [
            {
              header: "Components",
              rowChecks: [false, false, false]
            },
            {
              header: "Calender",
              rowChecks: [true, true, true]
            },
            {
              header: "Email List",
              rowChecks: [true, true, true]
            },
            {
              header: "Socials Analytics",
              rowChecks: [false, false, true]
            },
            {
              header: "Modern Web Technology**",
              rowChecks: [false, false, true]
            },
            {
              header: "Instant Changes",
              rowChecks: [false, false, true]
            },
            {
              header: "Free To Use ***",
              rowChecks: [false, false, true]
            },
            {
              header: "Add your own",
              rowChecks: [false, true, true]
            }
          ],
          caption: `* We don't provide domain names or web hosting (neither are free but it will still cheaper than the alternatives). Go to the "Get Your Own" page to get some pointers.\`+
                              ** Wix and Wordpress are built using PHP which was created in 1994. We rely primarily on React which was released almost 2 decades later
                              *** Wix and Wordpress are both "Free to use" but expect to pay for any necessary features.`.replace(
            /\n +/g,
            "\n"
          )
        }
    
      },
      {
        name: "Footer",
        id: `Site Creator-Footer-5-${ String(new Date().getTime()).slice(-3) }`,
      }
  ],
  ["Getting Started"]: [
    {
      name: "Header",
      id: `Getting Started-Header-0-654`,
      type: "h1",
      content: { headerHtml: "React Site Creator" }
    },
    {
      name: "Navbar",
      id: `Getting Started-Navbar-1-891`,
      content: {}
    },
    {
      name: "WalkThrough",
      id: `Getting Started-WalkThrough-2-886`,
      content: {
        pagePath:"getting-started",
        links: [],
        html: `<h1 id ="Prerequisites-h1">Prerequisites</h1>
                <p><strong>TLDR: </strong>To start, you need a website hosting provider and a domain name. While there are free options they probably won't work for a business and other websites.</p>
                <br>
                <p>React Site Creator is a completely free software (for private and most commercial uses) but there are a couple of items required to set up and deploy the site creator. This walkthrough will guide you through start to finish.</p>
                <h2 id = "HostingOptions-h2">Hosting Options</h2>
                    <p>In order for people to visit the website it needs to be hosted. There are many different options when it comes to website hosting including a few free options (although they might not fit your needs).</p>
            
                    <h3 id = "GitHubPages-h3">GitHub Pages</h3>
                        <p>For hobbyists or STEM professionals, GitHub provides free website hosting through <a href="https://pages.github.com/" target="_blank">GitHub Pages</a>. This website is hosted on GitHub Pages but will eventually move to its own site when necessary.</p><h4>GitHub Pages is Static Only</h4><p>* Please note that GitHub Pages can only deploy client-side websites. Because a server-side computer is not involved, users will <strong>not</strong> be able to modify anything permanently on the page. This means users will not be able to send you any information. </p>
                        <br>
                        <p>- For example if a blog component has comments enabled, users will be able to comment, but there comments will only be visible to them.</p><h3>Hosting Providers</h3><p>For a business website, or any situation where users need to be able to modify the data (make an appointment, post a comment), you will a hosting service that provides a server.</p><br><p>Do some research and pick a provider that best suites your needs. You can expect to pay anywhere from $10-$100+ a month to have you site hosted (the price will depend on the amount of traffic the website will have and the additional features and functionality offered).  Here are some references to aid in your search:</p>
                        <ul>
                            <li><a href="https://www.pcmag.com/picks/the-best-web-hosting-services" target="_blank">The Best Web Hosting Services</a></li>
                            <li><a href="https://www.websitebuilderexpert.com/web-hosting/comparisons/" target="_blank">Web Hosting Comparison</a></li>
                        </ul>
                        <br>
                        <p>After you have selected and started a hosting plan you need to get a domain name for your site.</p>
                        <br>
                <h2 id = "ObtainADomain-h2">Obtain a Domain</h2>
                    <p>If you have chosen to host your site through a free web-hosting service (again, this is probably not a good option for businesses), you may have a subdomain (ex. GitHubPages gives you a free subdomain at &lt;Username&gt; .github.io/&lt;WebsiteName&gt;/)</p>
                    <br>
                    <p>If do not have a subdomain provided for you, you need to rent a domain/lease a domain name. There are plenty of providers that offer essentially the same service. You really can't go wrong so long as you stick to a known brand. Google <a href="https://domains.google/" target="_blank">offers</a> domain names at around $12 a year. </p>
                    <br>
              <h1 id = "SetUp-h1">Set Up</h1>
                <h2 id = "InstallNode.Js-h2">Install Node.js</h2>
                <p>To download React-Site-Creator you will need to first download <a href = "https://nodejs.org/en/download/">Node.js</a>. Node.Js comes with Node package manager (npm) which is where we can pull the code for the React Site Creator.</p>
                <h2 id = "CloneSiteCreator-h2">Download and Configure the React-Site-Creator</h2>
                    <p>The next steps are dependent on how you want your website configured. There are two different versions of the application: the first is for static websites, and the second is for dynamic websites.</p>
                    <br>
                    <h3>Static or Dynamic?</h3>
                        <p>A static website is one which a user can't change. They may be able to interact with widgets, click buttons, etc., but they won't be to change the website for another user.</p> 
                        <br>
                        <p>Dynamic websites, on the otherhand, allow for users to manipulate the website. To illustrate the difference, the following examples are only implementable on dynamic sites</p>
                        <ul>
                            <li>Users to write comments on blog posts</li>
                            <li>Users blocking out specific appointment times</li>
                            <li>Having a limit on shop items (i.e. item is sold out)</li> 
                        </ul>
                        <br>
                        <p>If you are still unsure, go with the dynamic website because you won't be limited to static only components.</p>
                    <h3>Static Website</h3>
                        <p>If your are going with a dynamic site skip this step. </p> 
                        <br>
                        <p>Open a terminal on your computer.</p>
                        <code>git clone https://github.com/jado66/site-creator.git</code>
                        <code>npm start</code>
                    <h3>Dynamic Website</h3>
                      <br>
                      <p>Open a terminal on your computer.</p>
                      <code>git clone https://github.com/jado66/site-creator.git</code>
                      <code>npm start</code>
              <h1 id = "CustomizeYourWebsite-h1">Customize Your Website</h1>
                  <p>Everything is customizable. To edit make sure you are logged in.</p>
                  <p>Everything is customizable. To edit make sure you are logged in.</p>
      


              `
        
      }
    },
    {
      name: "Footer",
      id: `Getting Started-Footer-5-298`,
      content: { }
    }
  ],
  ["How It Works"]: [
    { 
      // Header:Header,
      // // Subheader,
      // Footer:Footer,
      // Mosaic:Mosaic,
      // Navbar:Navbar,
      // VideoFrame:VideoFrame,
      // CardPaymentBlock:CardPaymentBlock,
      // DynamicForm:DynamicForm,
      // BlogPreview:BlogPreview,
      // CaptionedPicture,CaptionedPicture,
      // SlideShow:SlideShow,
      // PictureFrame:PictureFrame,
      // QuickLink:QuickLink,
      // Paragraph:Paragraph,
      // ListComparisonTable:ListComparisonTable,
      // PlanComparison:PlanComparison,

      name: "Header",
      id: `How It Works-Header-0-${ String(new Date().getTime()).slice(-3) }`,
      content: { headerHtml: "React Site Creator" }
    },
    {
      name: "Navbar",
      id: `How It Works-Navbar-1-${ String(new Date().getTime()).slice(-3) }`,
      content: {}
    },
    {
      name: "WalkThrough",
      id: `How It Works-WalkThrough-2-886`,
      content: {
        pagePath:"how-it-works",
        links: [],
        html: `<h1>Everything Is Customizable</h1>
        <p>Literally everything is customizable to some degree or another. Go ahead and try and edit something. You should be able to just click on text and start typing. Other components may have a pencil icon that will toggle editing. </p>
        <p>If you can't edit anything you probably have edit mode turned off.</p>
        <h2>Admin Edit Mode</h2>
        <p>To begin customizing the website first ensure that edit mode is on. If you can click on the page header "How It Works" and change it to whatever you would like, then you are in edit mode. Congrats! Go ahead and skip to the next section. If not, you will need to go to your admin landing page. Go ahead and change the browser url to /&lt;your-site-name&gt;/admin. This page is called jado66.github.io/site-creator so my final url will look like this:</p>
        <pre class="ql-syntax" spellcheck="false">https://jado66.github.io/site-creator/admin</pre>
        <p>When you hit enter you'll be prompted with a login page (if you haven't logged in before). Sign in by whatever method you prefer and check "Remember Me" if this is your personal computer. </p><p>You should immediately see the editor ribbon under the "Admin Editor Tools" header. Go ahead and click the on the admin controls.</p>
        <p> It looks like this:    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAoCAYAAAC8cqlMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMmSURBVGhD1Vm9dtowFHZ5AXiCwNRsZmq7kanZoEs6kicInZoNtnQqeQLSFyhZSjfSF2g74S2dYGs78QbO/cSVjxz92AYZw3fOd64sS7Kk+6MrCLbB4+OfeDgaxZ2zs7jRaMRUJSSex7e3Md5vWh4o/v77H/cvL8XEs4h2aE/lw8LPX7/jZqulTdhFtEc/Kh8GYCrShIoS/Q7G1NrttjbBIuT+1WIyudMmtg15nOpQ1C9srFQrbNveWKav1FgasYgWXPID3+OpcC4kWkRc8gPf46lwLuSY4FxI2A655Ae+x8uNY3L2TDSbTW1C2zAMQ8jqcCwH4guWTmA3o2j7iEP9A+qf61vA/OFHsujmyUlwevoyd18nYNv1ej21w3mJfnl9gzNljd1uD9IPRBpf0F/QvkgaP58/aGOAnU4H0h/Exarf1z5kItoVvVjtbSESMJXP47H4gDQ5SDyjPsuU5E1TagvPuDq77jy4RvNCk/aVZ9TqdRnlIhn2YPAhaV/ppe3rdJqa2K6U1wNnWIMKEXYjylrX67Woo47B+4uLzHA4vb+PF4tNtktRJ3jz+pXog91cLZei3hdoc8wLge1+urkJZrNvXJMGqTTo9no49YktIVerFXEp5PfZLFk4QOoXZwFs/Pz8Lde6Qf7GY664xg7yHy4pgA2S8E2BPGY1HI4gE2BTOb2xMhXVYEa7/shgoxpd4Jx8wGm8uhpAakAf04GMOi1y9XrvtIa+iOiiHoy288J1eJoWr2pC3EewKps/+AD8hZxd7CxXGSEDggkIMi7UYFLX1x/5sRyQCcDWM5M/l0ZkBLSCbaxUPvcRmxm7fMR06qNucvdl08fmeJ4pkCtqUepBMgG0lBWEkL7s/HNoHsJ8SVqd3ERMLm/qIp1ee+Gbqmn5ujqrZE2bX/ok76yA71xL/S1Ae1kGVa2odxqUi2gJAUG2x4GohvRUw7KICCN9BRILkOEWz0hNTKe3JPxA3kcAtJcmJZHqUCY57FphCwapXMqCGlLsfQHZAxajagZ/nsrnncDq3TvV0CpNxjYXPuuygQHQ2GWjZRHffZ6DYWGS+bQVBE9ClNr0DLkDwwAAAABJRU5ErkJggg=="></p>
        <p>Make sure that "Admin Edit Mode" is checked. If you would like to see the editor ribbon while you make edits click the "Show Admin Editor" checkbox.</p>
        <p>Now go and have fun!</p>
        <h2>Dynamic Pages</h2>
        <p>Your site should come with a few pre-defined pages. You can change each pages name, the path, and add or delete pages as you like.</p>
        <p>To do so, go to the editor ribbon (see the previous step if it isn't at the top of the page) and click on the pages menu. </p>
        <p>It looks like this:    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAoCAYAAADpE0oSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFESURBVFhH7ZjNbYMwFIBfsgCcktzYIGzABqETMEXaG0zDBskpyY1b2xPdgFvbE0xA3gPrSQRjOYlxVcmf9ORf+GxDLGIg3j8+2zh+aTH7dIRh2KZZRnk1JMXEeNAAvn9+KS9nt4tHF5kKlXyBwQ2e5wF2FiU9yrKEpmlEaQzd73S+wGa9ItcAHmEURdLRqRDXcCRJMihTTM2cO5gQU52unBtNiQkdOTeYFBNTckw7uNK0mJDJ0zRrl5iZlTzPFygXpZ7j8dClPBJDM9aK2Wc8xdPiIAhE7j4GOxcuGxRFMdphVNDP4+11D1VViRo5sh2O1/2RZ6zL7bvwf5/xozixNZzYGk5sDSe2hhNbw4mt8Wfiweet7/uwvfOPuS5f+Hlb13WXpwOAWY8ipqJzznX4ogrh7E9+aBS4BKNOpoLuTY5eCnAFGmNf8DBo/xoAAAAASUVORK5CYII="></p>
        <p>In the pages menu you will a submenu for each of your websites pages. In each submenu you will be able to change either the name or path of the page. There is also a link to the page and a delete option. </p>
        <blockquote>Pro tip: It might be difficult if to try and change the page you are currently on. This is because with each key press the page will be re-rendered under and updated with a new name or new path. To avoid this, simply navigate to another page on your site and then return after making modifications. </blockquote>
        <p>In addition to your website pages you will find submenus for the Checkout Page and your Admin page. For the time being these submenus only have links to visit the pages. </p>
        <p>To add pages simply press the "<strong>+</strong>" button and give your new page a name and a path. Make sure that each page has a unique name and path.</p>
        <p>You might expect a new page to be automatically added to your navigation bar, however, this is not the case. </p>
        <h2>Editing The Navigation bar</h2>
        <p>The navigation bar, a.k.a. the navbar, operates independent of your sites pages. This is behavior is intentional to allow for pages to be separated from the main website content (some examples we'll be given later on) and to allow for external links to be added to the navbar.  </p>
        <p>While in edit mode, the positioning of the links can be modified by hovering the mouse cursor over each link. You will notice edit buttons appear on both sides of the link. The "<strong>+</strong>" button will insert a link on either the left or the right side of the link, while the double arrowed buttons, "<strong>&gt;</strong>", will swap the link's position with its neighbor.   </p>
        <p>To edit the link names, or to delete links, move your cursor to the anywhere on the navbar and you will see a pencil icon. When clicked on all of the links will become editable. You can edit both the link text and the link path much like the pages.</p>
        <blockquote>Pro tip: Make sure all external links start with "https://". If the paths start with "/" they will be internal links and will direct you and users to a page in the website, which may or may not exist. </blockquote>
        <p><br></p>`
      }
    },
    {
      name: "Footer",
      id: `Site Creator-Footer-5-${ String(new Date().getTime()).slice(-3) }`,
    }
],
};

function App() {

  

  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [viewAsNormalUser, setViewAsNormalUser] = useState(false);
  const [isShowEditor, showWebsiteStyleEditor] = useState(true)
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  
  const [promoCodes,setPromoCodes] = useState(
    { 
      test12Free:{type:"Free"},
      testHalfOff:{type:"% Off", value: 50},
      test20Off:{type:"$ Off", value: 20}
    }
  )

  const [webStyle,setWebStyle] = useState(
    {
      siteName: "React Site-Creator",
      isMobile: window.innerWidth <= 991,
      isEditMode: true,
      isShowEditor: true,
      isAdmin: true,
      // Website colors
      lightShade: "#EEE4E8",
      lightAccent: "#4BB2B9",
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
      }
    )

  const [pages,setPages] = useState(site_tempate.pages)
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

  const templates = {
    "Home":["Header","Navbar","Mosaic","BlogPreview"],
    "Blog":["Header","Navbar"],
    "Partnerships":["Header","Navbar"],
    "Coaching":["Header","Navbar"]
  }

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

  const updateWebStyle = (key,value) =>{
    
  }

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

    let stored_isShowEditor = localStorage.getItem("webStyle-isShowEditor");
    if (stored_isShowEditor){
      newState.isShowEditor = stored_isShowEditor === "true"
    }
    
    let stored_isAdmin = localStorage.getItem("webStyle-isAdmin");
    if (stored_isAdmin){
      newState.isAdmin = stored_isAdmin === "true"

    }

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
    forceUpdate()
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
    setUserIsAdmin(true)
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

  const hideWebsiteStyleEditor = () => {
    showWebsiteStyleEditor(false)
  }

  let componentOptions = ["PlanComparison","WalkThrough","ListComparisonTable","Paragraph","ParagraphBacked","QuickLink","PictureFrame","Navbar","Header","Footer","Mosaic","DynamicForm","CardPaymentBlock","CaptionedPicture","BlogPreview","VideoFrame","SlideShow"]

  // const routes = []
  // pageNames.forEach((name, index) => { 
    // let template = checkForTemplate(name);
  // let newPath = pageUrls[index]
  let routeComponents  = pages.map(({name, path})=> {
    
    let pageTemplate = site_tempate[name];


    return(
    
    <Route basename="/site-creator" exact path = {path} key = {name+"Route"}>
      {webStyle.isAdmin && webStyle.isShowEditor &&
      <WebsiteStyleEditor webStyle = {webStyle} updateWebStyles = {updateWebStyles} closeStyleEditor = {hideWebsiteStyleEditor}  
                          showStyleEditor = {()=>{}} minimizeStyleEditor = {()=>{}} expandStyleEditor = {()=>{}} promoCodes = {promoCodes}
                          socialMedias = {socialMedias} socialMediaCallbacks = {socialMediaCallbacks} pages = {pages} pageCallbacks = {pageCallbacks}/>
      }         
      <DynamicPage  webStyle = {webStyle} userIsAdmin = {userIsAdmin} viewAsNormalUser = {viewAsNormalUser} key = {name+"Page"} pageName = {name}
                    pages = {pages} pageCallbacks = {pageCallbacks} socialMedias = {socialMedias} socialMediaCallbacks = {socialMediaCallbacks}
                    cart = {cart} cartCallbacks = {cartCallbacks} template = {pageTemplate}
                    defaultComponentList = { ["Header","Navbar"]} componentOptions = {componentOptions}
                    updateWebStyles = {updateWebStyles} closeStyleEditor = {hideWebsiteStyleEditor} showStyleEditor = {isShowEditor}/>
    </Route>)}
     
    // routes.push(newRoute)
  )
  // alert(routes.length)

  

  return (
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
              <CheckoutPage promoCodes = {promoCodes} cart = {cart} cartCallbacks = {cartCallbacks} userIsAdmin = {userIsAdmin} pages = {pages} pageCallbacks = {pageCallbacks} socialMedias = {socialMedias} webStyle = {webStyle}/>
          </Route>
          <Route>
            <HeaderView cart = {cart} cartCallbacks = {cartCallbacks} userIsAdmin = {userIsAdmin} pages = {pages} pageCallbacks = {pageCallbacks} socialMedias = {socialMedias} webStyle = {webStyle}/>
              {/* <AdminPage  webStyle = {webStyle} viewAsNormalUserCallback = {() => {setViewAsNormalUser(true)}} showWebsiteStyleEditor = {() => {showWebsiteStyleEditor(true)}}/> */}
          </Route>
        </Switch>
        {/* </Fade> */}
      </Router>

    </div>
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
    <div id = "outerSection" className="container ">
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
      <WebsiteStyleEditor isAdminPage = {false} webStyle = {props.webStyle} updateWebStyles = {props.updateWebStyles} closeStyleEditor = {props.closeStyleEditor} showStyleEditor = {props.showStyleEditor}
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