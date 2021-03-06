import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPalette, faArrowsAltH, faFont,faTimes, faSave, faSortUp, faPlus, faUserCog, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare, faTwitter, faInstagram, faYoutube, faTiktok, faDiscord, faEtsy, faGithub, faImdb, faLinkedinIn,faPatreon, faPinterestP, faReddit, faShopify, faSpotify, faSoundcloud, faSnapchatGhost } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import FontPicker from "font-picker-react";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { Menu, MenuItem, MenuButton, MenuHeader,
         MenuDivider, FocusableItem, SubMenu} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import {
  Link
} from "react-router-dom";

// import { Tooltip } from './../bootstrap.esm.min.js'
// import { Tooltip } from 'bootstrap/dist/js/bootstrap.esm'


import {WebContext} from "../App"

export default function WebsiteStyleEditor(props) {
    
  const { webStyle, pages, socialMedias, appMethods, promoCodes } = useContext(WebContext);
  // const [webStyle, setWebStyles] = useState(webStyle)

  const componentMapping = {
      Email: faEnvelope,
      Facebook: faFacebookSquare,
      Twitter: faTwitter,
      Instagram: faInstagram,
      Youtube: faYoutube,
      Tiktok: faTiktok,
      Discord: faDiscord,
      Etsy: faEtsy,
      Github: faGithub,
      Imdb: faImdb,
      LinkedinIn: faLinkedinIn,
      Patreon: faPatreon,
      Pinterest: faPinterestP,
      Reddit: faReddit,
      Shopify: faShopify,
      Spotify: faSpotify,
      Soundcloud: faSoundcloud,
      Snapchat: faSnapchatGhost
    };
  
  

  const handleFontChange = (name,font) =>{
    // localStorage.setItem('webStyle-'+name,font.family);
    appMethods.setWebStyle(
      {
        ...webStyle,
        [name]: font.family
      }
    )
  } 

  const handleInputChange = (e) => {
    // webStyle.lightShade = e.target.value;
    // localStorage.setItem('webStyle-'+e.target.name,e.target.value);
    appMethods.setWebStyle(
      {
        ...webStyle,
        [e.target.name]: e.target.value
      }
    )
  }


  const handleCheckBox = (e,name) => {
    appMethods.setWebStyle(
      {
        ...webStyle,
        [name]: !webStyle[name]
      }
    )    
  }

  const invertColors = () =>{
    appMethods.setWebStyle(
      {
        ...webStyle,
        lightShade: webStyle.darkShade,
        lightAccent: webStyle.darkAccent,
        darkAccent: webStyle.lightAccent,
        darkShade: webStyle.lightShade
      }
    )    
   
  }


const socialMediaSelectOptions = [
  <option>Facebook</option>,
  <option>Twitter</option>,
  <option>Instagram</option>,
  <option>Youtube</option>,
  <option>Tiktok</option>,
  <option>Discord</option>,
  <option>Etsy</option>,
  <option>Github</option>,
  <option>Imdb</option>,
  <option>LinkedinIn</option>,
  <option>Patreon</option>,
  <option>PinterestP</option>,
  <option>Reddit</option>,
  <option>Shopify</option>,
  <option>Spotify</option>,
  <option>Soundcloud</option>,
  <option>Snapchat</option>]

  let pageMenus = pages.map(({name, path},index)=> 
  (
    <SubMenu label={name}>
          <FocusableItem>Name: <input type={"text"} value={name} onChange = {(e)=>{appMethods.handleNameChange(index,e.target.value)}} name = {"homePageName"} style = {{width:"90px", borderWidth:"0px 0px 1px 0px",background:"none"}} /></FocusableItem>
          <FocusableItem>Path: <input type={"text"} value={path} onChange = {(e)=>{appMethods.handlePathChange(index,e.target.value)}} name = {"homePageName"} style = {{width:"90px", borderWidth:"0px 0px 1px 0px",background:"none"}} /></FocusableItem>
          <MenuItem><Link to={path}>Visit Page</Link></MenuItem>
          <MenuDivider />
          <MenuItem><a onClick={()=>{appMethods.deletePage(name,index)}}>Delete Page</a></MenuItem>
    </SubMenu>
  ))

  let socialMediaLinks = socialMedias.map(({location, link},index)=> 
  (
    <SubMenu label={location}>
          <FocusableItem>Site: <select onChange = {(e)=>{appMethods.handleSocialSiteChange(index,e.target.value)}} value={location}>{socialMediaSelectOptions}</select></FocusableItem>
          <FocusableItem>link: <input type={"text"} value={link} onChange = {(e)=>{appMethods.handleSocialLinkChange(index,e.target.value)}} name = {"homePageName"} style = {{width:"90px", borderWidth:"0px 0px 1px 0px",background:"none"}} /></FocusableItem>
          <MenuItem><Link to={link}>Visit Link</Link></MenuItem>
          <MenuDivider />
          <MenuItem><a onClick={()=>{appMethods.deleteSocialMedia(location,index)}}>Delete Link</a></MenuItem>
    </SubMenu>
  ))

  let promoCodeMenus = Object.keys(promoCodes).map((code,index)=>{
    

    return (
      <SubMenu label={code}>
        <FocusableItem>
          <div className="input-group">
            <span className="input-group-text">Code</span>
            <input type="text" className="form-control" placeholder="Promo Code" value={code}/>
          </div>
        </FocusableItem>
        <FocusableItem>
          <div className="input-group">
            <span className="input-group-text">Type</span>
            <select className="form-select" aria-label="Default select example" value={promoCodes[code].type}>
              <option selected style={{display:"none"}}>Pick A Type</option>
              <option>% Off</option>
              <option>$ Off</option>
              <option>Free</option>
            </select>
          </div>
        </FocusableItem>
        {promoCodes[code].value &&
            <FocusableItem>
            <div className="input-group">
              <span className="input-group-text">Value</span>
              <input type="number" className="form-control" value={promoCodes[code].value}/>
            </div>
          </FocusableItem>
        }
      </SubMenu>
    )
  })

  // isEditMode: false,
  // isShowEditor: true,
  // : false,
  let showRibbonClass = (webStyle.isAdmin && webStyle.isShowEditor? "" :"hidden")

  // if (webContext.isAdminPage){
  //   showRibbonClass = ""
  // }

  return (
    
    <div className={"nav nav-fill container-fluid border-bottom border-dark g-0 bg-light  "+showRibbonClass} style={{position: "sticky",top: 0, alignSelf: "flex-start",zIndex:999}} >
      {/* <Menu className="nav-item dropdown" menuButton={<MenuButton className={"styleEditorIcon dropdown-toggle"}><FontAwesomeIcon   icon={faFont} /></MenuButton>} transition>
          <MenuHeader>Text</MenuHeader>
          <MenuDivider />
          <SubMenu label={"Primary Font"}>
            <FontPickerDropDown label = {"Primary Front"} apiKey="AIzaSyAO8Spvo1FBck07lXRuKVmtoMs_MRI1HhQ" 
                              activeFontFamily={webStyle.secondaryFont} pickerId="primary"
                              // onChange={(nextFont) => handleFontChange("primaryFont",nextFont)}
                              />
          </SubMenu>
          <SubMenu label={"Secondary Font"}>
            <FocusableItem className={"apply-font-secondary"}>
              <FontPicker
                apiKey="AIzaSyAO8Spvo1FBck07lXRuKVmtoMs_MRI1HhQ"
                activeFontFamily={webStyle.secondaryFont}
                pickerId="secondary"
                onChange={(nextFont) => handleFontChange("secondaryFont",nextFont)}
              />
            </FocusableItem>
          </SubMenu>
          
          <MenuItem>Font Base Size</MenuItem>
      </Menu> */}
      <div className={"row m-auto w-100 "} style={{zIndex:2}}>
        <div className={"col text-center "+(webStyle.isMobile?"mx-1 g-0":"mx-4")}>
          <Menu className="nav-item dropdown" menuButton={<MenuButton className={"styleEditorIcon dropdown-toggle font-shrink-md m-0"}><FontAwesomeIcon   icon={faPalette} /></MenuButton>} transition>
            <MenuHeader>Colors</MenuHeader>
            <MenuDivider />
            <FocusableItem><input type={"color"} value ={webStyle.lightShade} name = {"lightShade"} onChange = {handleInputChange}
            style = {{border:"none",background:"none",width:"50px",height:"40px",padding:"0"}} />-  Background Color</FocusableItem>
            <FocusableItem><input type={"color"} value ={webStyle.lightAccent} onChange = {handleInputChange} name = {"lightAccent"} style = {{border:"none",background:"none",width:"50px",height:"40px",padding:"0"}} /> -  Primary Accent</FocusableItem>
            <FocusableItem><input type={"color"} value ={webStyle.mainBrandColor} onChange = {handleInputChange} name = {"mainBrandColor"} style = {{border:"none",background:"none",width:"50px",height:"40px",padding:"0"}} /> -  Main Brand Color</FocusableItem>
            <FocusableItem><input type={"color"} value ={webStyle.darkAccent} onChange = {handleInputChange} name = {"darkAccent"} style = {{border:"none",background:"none",width:"50px",height:"40px",padding:"0"}} /> - Secoondary Accent</FocusableItem>
            <FocusableItem><input type={"color"} value ={webStyle.darkShade} onChange = {handleInputChange} name = {"darkShade"} style = {{border:"none",background:"none",width:"50px",height:"40px",padding:"0"}} /> - Secondary Shade (Font) </FocusableItem>
            <FocusableItem><button onClick={invertColors}>Invert Color Scheme</button> </FocusableItem>

          </Menu>
        </div>
        <div className={"col text-center "+(webStyle.isMobile?"mx-1 g-0":"mx-4")}>
            {/* Admin Menu */}
          <Menu className="nav-item dropdown" menuButton={<MenuButton className={"styleEditorIcon dropdown-toggle font-shrink-md m-0"}><FontAwesomeIcon  icon={faUserCog} /></MenuButton>} transition>
            <FocusableItem className="form-check">
            <input className="form-check-input me-2" type={"checkbox"} checked = {webStyle.isEditMode} onClick={(evt)=>{handleCheckBox(evt,"isEditMode")}} />
            <label className="form-check-label" >Admin Edit Mode</label> 
            </FocusableItem>
            <FocusableItem className="form-check">
            <input className="form-check-input me-2" type={"checkbox"} checked = {webStyle.isShowEditor} onClick={(evt)=>{handleCheckBox(evt,"isShowEditor")}} />
            <label className="form-check-label" >Show Admin Editor</label> 
            </FocusableItem>
            <MenuItem><Link to={"/admin"}>Visit Admin Page</Link></MenuItem>
          </Menu>
        </div>
      
        <div className={"col text-center "+(webStyle.isMobile?"mx-1 g-0":"mx-4")}>
          {/* Pages Menu */}
          <Menu className="nav-item dropdown" menuButton={<MenuButton className={"styleEditorIcon dropdown-toggle font-shrink-md m-0"}><FontAwesomeIcon  icon={faFile} /></MenuButton>} transition>
            <MenuHeader>Your Website Pages</MenuHeader>
            {pageMenus}
            <MenuButton className={"styleEditorSubmenuIcon "} onClick = {()=>appMethods.addPage()}><FontAwesomeIcon  icon={faPlus} /></MenuButton>
            <MenuDivider />
            <SubMenu label={"Checkout Page"}>
              <MenuItem><Link to={"/checkout"}>Visit Page</Link></MenuItem>
            </SubMenu>
            <SubMenu label={"Admin Page"}>
              <MenuItem><Link to={"/admin"}>Visit Admin Page</Link></MenuItem>
            </SubMenu>

          </Menu>
        </div>
        <div className={"col text-center "+(webStyle.isMobile?"mx-1 g-0":"mx-4")}>
          {/* Socials Pages */}
          <Menu className="nav-item dropdown " menuButton={<MenuButton className={"styleEditorIcon dropdown-toggle font-shrink-md m-0"}><FontAwesomeIcon  icon={faTwitter} /></MenuButton>} transition>
            <MenuHeader>Your Social Media Links</MenuHeader>
            {socialMediaLinks}
            <MenuButton className={"styleEditorSubmenuIcon"} onClick = {()=>appMethods.addSocialMedia()}><FontAwesomeIcon  icon={faPlus} /></MenuButton>
          </Menu>
        </div>
        <div className={"col text-center "+(webStyle.isMobile?"mx-1 g-0":"mx-4")}>
            {/* Shop Page */}
          <Menu className="nav-item dropdown" menuButton={<MenuButton className={"styleEditorIcon dropdown-toggle font-shrink-md m-0"}><FontAwesomeIcon  icon={faShoppingBag} /></MenuButton>} transition>
            <SubMenu label={"Promo Codes"}>
            {promoCodeMenus}
            <MenuItem className = "justify-content-center"><a onClick={()=>{alert("Add Promo Code")}}><FontAwesomeIcon icon={faPlus}/></a></MenuItem>
            </SubMenu>
          </Menu>
        </div>
        
        <div className={"col text-center "+(webStyle.isMobile?"mx-1 g-0":"mx-4")}>
          {/* Socials Pages */}
          <MenuButton className={"styleEditorIcon font-shrink-md m-0"} onClick = {()=>appMethods.saveWebsite()}><FontAwesomeIcon  icon={faSave} /></MenuButton>

        </div>
        <div className={"col text-center "+(webStyle.isMobile?"mx-1 g-0":"mx-4")}>
          {/* Socials Pages */}
          <MenuButton className={"styleEditorIcon font-shrink-md m-0"} onClick = {()=>{appMethods.toggleStyleEditor()}}><FontAwesomeIcon  icon={faTimes} /></MenuButton>

        </div>
      </div>
    
    </div>
    
  );

}



  
function FontPickerDropDown(props){
  const [searchParams, setSearchParams] = useState("")


  const filterFonts = (font) =>{
    let fontLower = font.family.toLowerCase()
    let result = fontLower.startsWith("r")
    return result
    
  }

  return(
      <div>
        <input value={searchParams} onChange={(evt)=>{setSearchParams(evt.target.value)}}/>
        <span>{searchParams}  </span>
                  
     
        <FontPicker
          apiKey="AIzaSyAO8Spvo1FBck07lXRuKVmtoMs_MRI1HhQ"
          activeFontFamily={props.activeFontFamily}
          pickerId={props.pickerId}
          // onChange={props.onChange}
          filter={(font) => {filterFonts(font)}}
        />
        </div>
  )
}

