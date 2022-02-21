import ContentEditable from 'react-contenteditable'
import EditableLink from './editableLink';

import React, { useContext, useEffect } from "react"
import {WebContext} from "../App"

export default function LinkBox(props){
  const contentEditable1 = React.createRef();
  const contentEditable2 = React.createRef();
  
  const webContext = useContext(WebContext);

  const setTitle = evt => {
    props.setTitle(evt.target.value);
    // localStorage.setItem(this.props.id+'-h2',evt.target.value);
  };

  const setSubTitle = evt => {
    props.setSubTitle(props.subTitle);
    // localStorage.setItem(this.props.id+'-h3',evt.target.value);
  };

  useEffect(() => {
    if (props.content){
      props.setTitle(props.content.title)
      props.setSubTitle(props.content.subTitle)
    }
  }, []);


  return(
    <div className={"p-3 boxShadow"} style={{backgroundColor: webContext.webStyle.lightShade}}>
      <ContentEditable
        style={{color: webContext.webStyle.darkShade}}
        innerRef={contentEditable1}
        html={props.title} // innerHTML of the editable div
        disabled={! webContext.webStyle.isEditMode}       // use true to disable editing
        onChange={setTitle} // handle innerHTML change
        tagName='h2' // Use a custom HTML tag (uses a div by default)
      />
      <ContentEditable
        className='apply-font-secondary'
        style={{color: webContext.webStyle.darkShade}}
        innerRef={contentEditable2}
        html={props.subTitle} // innerHTML of the editable div
        disabled={! webContext.webStyle.isEditMode}       // use true to disable editing
        onChange={setSubTitle} // handle innerHTML change
        tagName='h3' // Use a custom HTML tag (uses a div by default)
      />
      <EditableLink 
        content ={props.content.linkTxtContent} id = {props.id+"-link"} 
        linkText = {props.lLinkText} href = {props.lHref} setLinkText = {props.setLinkText} setHref = {props.setHref}
      />
      </div>)
  
};