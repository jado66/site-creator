import React from "react";
import { useState } from "react";
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

export default class WebsiteStyleEditor extends React.Component {
    constructor(props) {
      super(props);
      this.state = {...props.webStyle,
                    showRibbon:true,
                    isMinimized:true
                  }

      this.componentMapping = {
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

      // const tooltipRef = useRef();  

    }


 

    handleFontChange = (name,font) =>{
      localStorage.setItem('webStyle-'+name,font.family);
      this.setState({
          [name]: font.family
        });

      this.props.updateWebStyles(this.state)
    }
  
    handleInputChange = (e) => {
      // this.state.lightShade = e.target.value;
      localStorage.setItem('webStyle-'+e.target.name,e.target.value);
      this.setState({
          [e.target.name]: e.target.value
      });

      this.props.updateWebStyles(this.state)
    }

    handleCheckBox = (e,name) => {
      // this.state.lightShade = e.target.value;
      // localStorage.setItem('webStyle-'+!this.state[name);
      this.setState(function(previousState) {
        localStorage.setItem('webStyle-'+name,!previousState[name]);
        return {
          [name]: !previousState[name]
        };
      },()=>{
        this.props.updateWebStyles(this.state)
      });
      
    }

    invertColors = () =>{
      this.setState({
        lightShade: this.state.darkShade,
        lightAccent: this.state.darkAccent,
        darkAccent: this.state.lightAccent,
        darkShade: this.state.lightShade
      }, function() {
        this.props.updateWebStyles(this.state)
      })
    }

    render() {

      let socialMediaSelectOptions = [
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

        let pages = this.props.pages.map(({name, path},index)=> 
        (
          <SubMenu label={name}>
                <FocusableItem>Name: <input type={"text"} value={name} onChange = {(e)=>{this.props.pageCallbacks.handleNameChange(index,e.target.value)}} name = {"homePageName"} style = {{width:"90px", borderWidth:"0px 0px 1px 0px",background:"none"}} /></FocusableItem>
                <FocusableItem>Path: <input type={"text"} value={path} onChange = {(e)=>{this.props.pageCallbacks.handlePathChange(index,e.target.value)}} name = {"homePageName"} style = {{width:"90px", borderWidth:"0px 0px 1px 0px",background:"none"}} /></FocusableItem>
                <MenuItem><Link to={path}>Visit Page</Link></MenuItem>
                <MenuDivider />
                <MenuItem><a onClick={()=>{this.props.pageCallbacks.deletePage(name,index)}}>Delete Page</a></MenuItem>
          </SubMenu>
        ))

        let socialMediaLinks = this.props.socialMedias.map(({location, link},index)=> 
        (
          <SubMenu label={location}>
                <FocusableItem>Site: <select onChange = {(e)=>{this.props.socialMediaCallbacks.handleSocialSiteChange(index,e.target.value)}} value={location}>{socialMediaSelectOptions}</select></FocusableItem>
                <FocusableItem>link: <input type={"text"} value={link} onChange = {(e)=>{this.props.socialMediaCallbacks.handleSocialLinkChange(index,e.target.value)}} name = {"homePageName"} style = {{width:"90px", borderWidth:"0px 0px 1px 0px",background:"none"}} /></FocusableItem>
                <MenuItem><Link to={link}>Visit Link</Link></MenuItem>
                <MenuDivider />
                <MenuItem><a onClick={()=>{this.props.socialMediaCallbacks.deleteSocialMedia(location,index)}}>Delete Link</a></MenuItem>
          </SubMenu>
        ))

        let promoCodes = Object.keys(this.props.promoCodes).map((code,index)=>{
          

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
                  <select className="form-select" aria-label="Default select example" value={this.props.promoCodes[code].type}>
                    <option selected style={{display:"none"}}>Pick A Type</option>
                    <option>% Off</option>
                    <option>$ Off</option>
                    <option>Free</option>
                  </select>
                </div>
              </FocusableItem>
              {this.props.promoCodes[code].value &&
                 <FocusableItem>
                 <div className="input-group">
                   <span className="input-group-text">Value</span>
                   <input type="number" className="form-control" value={this.props.promoCodes[code].value}/>
                 </div>
               </FocusableItem>
              }
            </SubMenu>
          )
        })

        // isEditMode: false,
        // isShowEditor: true,
        // : false,
        let showRibbonClass = (this.props.webStyle.isAdmin && this.props.webStyle.isShowEditor? "" :"hidden")

        if (this.props.isAdminPage){
          showRibbonClass = ""
        }

        return (
          
          <div className={"nav nav-fill container-fluid border-bottom border-dark g-0"+showRibbonClass} style={{position: "sticky",top: 0, alignSelf: "flex-start",zIndex:999,...this.props.style}} >
            {/* <Menu className="nav-item dropdown" menuButton={<MenuButton className={"styleEditorIcon dropdown-toggle"}><FontAwesomeIcon   icon={faFont} /></MenuButton>} transition>
                <MenuHeader>Text</MenuHeader>
                <MenuDivider />
                <SubMenu label={"Primary Font"}>
                  <FontPickerDropDown label = {"Primary Front"} apiKey="AIzaSyAO8Spvo1FBck07lXRuKVmtoMs_MRI1HhQ" 
                                    activeFontFamily={this.state.secondaryFont} pickerId="primary"
                                    // onChange={(nextFont) => this.handleFontChange("primaryFont",nextFont)}
                                    />
                </SubMenu>
                <SubMenu label={"Secondary Font"}>
                  <FocusableItem className={"apply-font-secondary"}>
                    <FontPicker
                      apiKey="AIzaSyAO8Spvo1FBck07lXRuKVmtoMs_MRI1HhQ"
                      activeFontFamily={this.state.secondaryFont}
                      pickerId="secondary"
                      onChange={(nextFont) => this.handleFontChange("secondaryFont",nextFont)}
                    />
                  </FocusableItem>
                </SubMenu>
                
                <MenuItem>Font Base Size</MenuItem>
            </Menu> */}
            <div className={"row m-auto w-100 "+(this.props.isAdminPage?"":" bg-light")} style={{zIndex:2}}>
              <div className={"col text-center "+(this.props.webStyle.isMobile?"mx-1 g-0":"mx-4")}>
                <Menu className="nav-item dropdown" menuButton={<MenuButton className={"styleEditorIcon dropdown-toggle font-shrink-md m-0"}><FontAwesomeIcon   icon={faPalette} /></MenuButton>} transition>
                  <MenuHeader>Colors</MenuHeader>
                  <MenuDivider />
                  <FocusableItem><input type={"color"} value ={this.state.lightShade} name = {"lightShade"} onChange = {this.handleInputChange}
                  style = {{border:"none",background:"none",width:"50px",height:"40px",padding:"0"}} />-  Background Color</FocusableItem>
                  <FocusableItem><input type={"color"} value ={this.state.lightAccent} onChange = {this.handleInputChange} name = {"lightAccent"} style = {{border:"none",background:"none",width:"50px",height:"40px",padding:"0"}} /> -  Primary Accent</FocusableItem>
                  <FocusableItem><input type={"color"} value ={this.state.mainBrandColor} onChange = {this.handleInputChange} name = {"mainBrandColor"} style = {{border:"none",background:"none",width:"50px",height:"40px",padding:"0"}} /> -  Main Brand Color</FocusableItem>
                  <FocusableItem><input type={"color"} value ={this.state.darkAccent} onChange = {this.handleInputChange} name = {"darkAccent"} style = {{border:"none",background:"none",width:"50px",height:"40px",padding:"0"}} /> - Secoondary Accent</FocusableItem>
                  <FocusableItem><input type={"color"} value ={this.state.darkShade} onChange = {this.handleInputChange} name = {"darkShade"} style = {{border:"none",background:"none",width:"50px",height:"40px",padding:"0"}} /> - Secondary Shade (Font) </FocusableItem>
                  <FocusableItem><button onClick={this.invertColors}>Invert Color Scheme</button> </FocusableItem>

                </Menu>
              </div>
              <div className={"col text-center "+(this.props.webStyle.isMobile?"mx-1 g-0":"mx-4")}>
                 {/* Admin Menu */}
                <Menu className="nav-item dropdown" menuButton={<MenuButton className={"styleEditorIcon dropdown-toggle font-shrink-md m-0"}><FontAwesomeIcon  icon={faUserCog} /></MenuButton>} transition>
                  <FocusableItem className="form-check">
                  <input className="form-check-input me-2" type={"checkbox"} checked = {this.props.webStyle.isEditMode} onClick={(evt)=>{this.handleCheckBox(evt,"isEditMode")}} />
                  <label className="form-check-label" >Admin Edit Mode</label> 
                  </FocusableItem>
                  <FocusableItem className="form-check">
                  <input className="form-check-input me-2" type={"checkbox"} checked = {this.props.webStyle.isShowEditor} onClick={(evt)=>{this.handleCheckBox(evt,"isShowEditor")}} />
                  <label className="form-check-label" >Show Admin Editor</label> 
                  </FocusableItem>
                  <MenuItem><Link to={"/admin"}>Visit Admin Page</Link></MenuItem>
                </Menu>
              </div>
            
              <div className={"col text-center "+(this.props.webStyle.isMobile?"mx-1 g-0":"mx-4")}>
                {/* Pages Menu */}
                <Menu className="nav-item dropdown" menuButton={<MenuButton className={"styleEditorIcon dropdown-toggle font-shrink-md m-0"}><FontAwesomeIcon  icon={faFile} /></MenuButton>} transition>
                  <MenuHeader>Your Website Pages</MenuHeader>
                  {pages}
                  <MenuButton className={"styleEditorSubmenuIcon "} onClick = {()=>this.props.pageCallbacks.addPage()}><FontAwesomeIcon  icon={faPlus} /></MenuButton>
                  <MenuDivider />
                  <SubMenu label={"Checkout Page"}>
                    <MenuItem><Link to={"/checkout"}>Visit Page</Link></MenuItem>
                  </SubMenu>
                  <SubMenu label={"Admin Page"}>
                    <MenuItem><Link to={"/admin"}>Visit Admin Page</Link></MenuItem>
                  </SubMenu>

                </Menu>
              </div>
              <div className={"col text-center "+(this.props.webStyle.isMobile?"mx-1 g-0":"mx-4")}>
                 {/* Shop Page */}
                <Menu className="nav-item dropdown" menuButton={<MenuButton className={"styleEditorIcon dropdown-toggle font-shrink-md m-0"}><FontAwesomeIcon  icon={faShoppingBag} /></MenuButton>} transition>
                  <SubMenu label={"Promo Codes"}>
                  {promoCodes}
                  <MenuItem className = "justify-content-center"><a onClick={()=>{alert("Add Promo Code")}}><FontAwesomeIcon icon={faPlus}/></a></MenuItem>
                  </SubMenu>
                </Menu>
              </div>
              <div className={"col text-center "+(this.props.webStyle.isMobile?"mx- g-0":"mx-4")}>
                {/* Socials Pages */}
                <Menu className="nav-item dropdown " menuButton={<MenuButton className={"styleEditorIcon dropdown-toggle font-shrink-md m-0"}><FontAwesomeIcon  icon={faTwitter} /></MenuButton>} transition>
                  <MenuHeader>Your Social Media Links</MenuHeader>
                  {socialMediaLinks}
                  <MenuButton className={"styleEditorSubmenuIcon"} onClick = {()=>this.props.socialMediaCallbacks.addSocialMedia()}><FontAwesomeIcon  icon={faPlus} /></MenuButton>
                </Menu>
              </div>
            </div>
          
          </div>
          
        );
      
    }
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

