import React, {useState, useEffect} from "react";
import ReactQuill from 'react-quill';
import '../quill.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons'
import ReactHtmlParser from 'react-html-parser'; 
import QuillToolbar from "./quillToolbar.js";


// Modules object for setting up the Quill editor
export const modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      save: ()=>{alert("hello")},
    }
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true
  }
};

// Formats objects for setting up the Quill editor
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block"
];

export default function QuillComponent(props){
    const [html, setHtml] = useState({ value: 'Text..' });
    const [edit, setEdit] = useState(false);
    const [isShowButtons, showButtons] = useState(false)

    useEffect(() => {
      const storedState =JSON.parse(localStorage.getItem(props.id+'-quill'));
      
      // alert(storedState)
      if (props.content){
        // alert(JSON.stringify(props.content.html))
        setHtml({ value: props.content.html})
      }
      else if (storedState){
        setHtml({ value: storedState })
      }

    }, []);

    const handleChange = value => {
      setHtml({ value });
      localStorage.setItem(props.id+"-quill",JSON.stringify(value));
    };
    return (
      <div className="text-editor mb-5 " onMouseEnter={() => {showButtons(true)}} onMouseLeave={() => {showButtons(false)}}>
        {edit?
        <div >
          <QuillToolbar check checkCallback = {()=>{setEdit(false)}} clipboardCallback = {() => {navigator.clipboard.writeText(html.value)}}/>
          <ReactQuill
            className="px-3"
            theme="snow"
            value={html.value}
            onChange={handleChange}
            placeholder={"Write something awesome..."}
            modules={modules}
            formats={formats}
          />
        </div>:
        <div className="relative-div px-3" onMouseEnter={() => {showButtons(true)}} onMouseLeave={() => {showButtons(false)}}>
          {true&& <div className="relative-r">
            <FontAwesomeIcon icon = {faPencilAlt} onClick={()=>{setEdit(true)}}/>
          </div>}
          <div>{ ReactHtmlParser (html.value) } </div>
          
        </div>}
      </div>
        
    );
  };





// Undo and redo functions for Custom Toolbar
function saveEdits() {
  alert("Save Edits")
}


