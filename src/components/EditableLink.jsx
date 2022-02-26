import React, {useContext, useEffect, useState} from 'react'
import {
  Link
} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {faPencilAlt,  faCheck} from '@fortawesome/free-solid-svg-icons'
import {WebContext} from "../App"

export default function EditableLink(props){
  
  const [mode, setMode] = useState("link")
  const [tempLinkText, setTempLinkText] = useState(props.linkText)
  const [tempHref, setTempHref] = useState(props.href)
  const [showButtons, setShowButtons] = useState(false);
  
  const webContext = useContext(WebContext);

  const handleLinkHTMLChange = evt => {
    setTempLinkText(evt.target.value);
  };
  const handleLinkHrefChange = evt => {
    setTempHref(evt.target.value);
  };

  const saveLinkEdits = () =>{      
    let newLinkText = tempLinkText
    let newHref = tempHref

    if (newLinkText === ""){
      newLinkText = props.linkText
    }

    if (newHref === ""){
      newHref = props.href
    }

    props.setHref(newHref)
    props.setLinkText(newLinkText) //this retrieves the string inside > <
    setMode("link")
  }

  const changeToEditMode = () => {
    props.setLinkText(props.linkText)
    props.setHref(props.href)
    setMode("edit")
  }

  const setButtonsVisibility = (showButtons) => {
    setShowButtons(showButtons)
  }

    return(
      <div onMouseEnter={() => setButtonsVisibility(true)} onMouseLeave={() => {setButtonsVisibility(false)}}>
        {mode == "edit" ?
        <div className='relative-div'>
            <div className={"col relative-r"} style={{color:webContext.webStyle.darkShade}}>
                <FontAwesomeIcon className="icon-link" icon={ faCheck} onClick = {saveLinkEdits}/>
            </div>
            <div className="row">
              <div className='col-5'>
                <div className="input-group ">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon3">Text:</span>
                  </div>
                  <input type="text" className="form-control" onChange={handleLinkHTMLChange} value={tempLinkText}/>
                </div>
              </div>
              <div className='col-5'>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon3">href:</span>
                  </div>
                  <input type="text" className="form-control" onChange={handleLinkHrefChange} value={tempHref}/>
                </div>
              </div>
            </div> 
          </div>
          :
          <div className='relative-div' >
              {showButtons && webContext.webStyle.isEditMode && <div className={"col floatOnTopNoHeight"} style={{color:webContext.webStyle.darkShade, right:"0", justifyContent:"center",height:""}}>
                  <FontAwesomeIcon className="icon-link" icon={ faPencilAlt} onClick = {changeToEditMode}/>
              </div>}
              <Link style={{color:webContext.webStyle.darkShade}} to={props.href}>{props.linkText}</Link>
          </div>
          }
      </div>
      )
};

