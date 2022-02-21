// import React, { useEffect, useState } from 'react';
// import ContentEditable from 'react-contenteditable'

// export default function Header(props){
//     const [headerValue, setHeaderValue] = useState("Life By LaRae")
//     var inputProps = {}

//     useEffect( () => {
//         // Anything in here is fired on component mount.
//         // var myStorage = window.localStorage;
//         const storedHeader = localStorage.getItem(props.id);
//         alert(props.id+": "+storedHeader)
//      }, []);

//     if (props.userIsAdmin && ! props.viewAsNormalUser){
//         inputProps.contentEditable = "true"
//     }
    
//     return(
//     <div {...inputProps}  className="title" style = {{width:`${props.webStyle.centerWidth}%`, margin:"auto",backgroundColor:props.webStyle.lightAccent}}>
//         ID:{props.id}<h2 style = {{margin:"0", padding: "20px 0px", color:props.webStyle.darkShade}} contentEditable spellCheck={false}>{headerValue}</h2>
//     </div>)
// }

import React, { useEffect, useState, useContext } from "react";

// const webContext = useContext(WebContext);


import ContentEditable from 'react-contenteditable'
import QuillComponent from "./quillComponent"

import {WebContext} from "../App"

export default function Paragraph(props) {
  const webContext = useContext(WebContext);

  // useEffect(() => {
  //   if (props.template){
  //     setHtml(props.template.content)

  //   }
  //   // else{
  //   //   const storedText = localStorage.getItem(this.props.id);


  //   //   if (storedText){
  //   //       this.setState({html: storedText})
  //   //   }
  //   //   // Set header to page name on new render
      
  //   //   else if (this.props.index === 0){
  //   //     this.setState({html: `<p>${this.props.pageName}</p>`})
  //   //   }
  //   // }
  // }, []);


    


   
  


  return(
    <div className={webContext.webStyle.isMobile?"px-3 ":" px-5"} >
        <QuillComponent className = "paragraph"  webStyle = {webContext.webStyle} id ={props.id} content = {props.content} />

        {/* <ContentEditable 
          spellCheck = "false"
          innerRef={this.contentEditable}
          html={this.state.html} // innerHTML of the editable div
          disabled={!this.props.webStyle.isEditMode}       // use true to disable editing
          onChange={this.handleChange} // handle innerHTML change
          tagName='p'
          /> */}
      </div>
          )
};


//<h2 style = {{margin:"0", padding: "20px 0px", color:props.webStyle.darkShade}} contentEditable spellCheck={false}>{headerValue}</h2>