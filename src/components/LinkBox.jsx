import ContentEditable from 'react-contenteditable'
import EditableLink from './EditableLink';

import React, { useContext, useEffect } from "react"
import {WebContext} from "../App"

export default function LinkBox(props){
  const contentEditable1 = React.createRef();
  const contentEditable2 = React.createRef();
  
    const { webStyle } = useContext(WebContext);

  const setTitle = evt => {
    props.setTitle(evt.target.value);
    // localStorage.setItem(this.props.id+'-h2',evt.target.value);
  };

  const setSubTitle = evt => {
    props.setSubTitle(props.subTitle);
    // localStorage.setItem(this.props.id+'-h3',evt.target.value);
  };



  return(
    <div className={"p-3 boxShadow"} style={{backgroundColor: webStyle.lightShade}}>
      <ContentEditable
        style={{color: webStyle.darkShade}}
        innerRef={contentEditable1}
        html={props.title} // innerHTML of the editable div
        disabled={! webStyle.isEditMode}       // use true to disable editing
        onChange={setTitle} // handle innerHTML change
        tagName='h2' // Use a custom HTML tag (uses a div by default)
      />
      <ContentEditable
        className='apply-font-secondary'
        style={{color: webStyle.darkShade}}
        innerRef={contentEditable2}
        html={props.subTitle} // innerHTML of the editable div
        disabled={! webStyle.isEditMode}       // use true to disable editing
        onChange={setSubTitle} // handle innerHTML change
        tagName='h3' // Use a custom HTML tag (uses a div by default)
      />
      <EditableLink 
        id = {props.id+"-link"} 
        linkText = {props.linkText} href = {props.href} setLinkText = {props.setLinkText} setHref = {props.setHref}
      />
      </div>)
  
};