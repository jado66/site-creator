import { useState, useContext } from "react";
import DynamicForm from "./dynamicForm";
import QuillComponent from "./quillComponent";

import {WebContext} from "../App"


export default function EmailSender(props) {
    const webContext = useContext(WebContext);


    return (
    <div className="mb-4 px-5 mt-3 text-start" >
        <div className="g-0 boxShadow" style={{backgroundColor:webContext.webStyle.lightShade}}>
            <QuillComponent className = "paragraph px-3 pt-3"  webStyle = {webContext.webStyle} id ={props.id} content = {props.content} />      
            
            <DynamicForm emailSendor/>
        </div>
    </div>
  );
}
