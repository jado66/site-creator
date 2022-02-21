import React, {useState, useEffect, useContext} from 'react'
import ContentEditable from 'react-contenteditable'

import {WebContext} from "../App"

import Fade from 'react-reveal/Fade';

export default function Header(props){
  
    const contentEditable = React.createRef();
    const [html, setHtml] = useState(`Header`);
    
    const webContext = useContext(WebContext);

    useEffect(() => {
      if (props.content){
        setHtml(props.content.headerHtml);
      }
  
      const storedHeader = localStorage.getItem(props.id);
  
      if (storedHeader){
        setHtml(storedHeader)
      }
      // Set header to page name on new render
      
      else if (props.index === 0){
        setHtml(props.pageName)
      }
    }, []);

    useEffect(() => {
      if (webContext.msgPort == "save"){
  
        const componentData = { 
          name: props.componentName,
          id: props.id,
          content: {
            html:html
          }
        }
  
        webContext.saveComponentData(props.pageName,props.index,componentData)
      }
    }, [webContext.msgPort]);

    const handleChange = (evt) => {
      setHtml(evt.target.value);
      localStorage.setItem(props.id,evt.target.value);
    };
    return(

      <div className="px-5 text-center " >
        <ContentEditable
          className='apply-font-primary mb-0'
          style={{color:webContext.webStyle.darkShade}}
          spellCheck = "false"
          innerRef={contentEditable}
          html={html} // innerHTML of the editable div
          disabled={!webContext.webStyle.isEditMode}      // use true to disable editing
          onChange={handleChange} // handle innerHTML change
          tagName='h1' // Use a custom HTML tag (uses a div by default)
          /> 
      
      </div>

      )
  };

  


  


 

//<h2 style = {{margin:"0", padding: "20px 0px", color:props.webStyle.darkShade}} contentEditable spellCheck={false}>{headerValue}</h2>