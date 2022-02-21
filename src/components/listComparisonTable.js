import React from 'react'
import { useState, useEffect, useContext } from 'react'
import ContentEditable from 'react-contenteditable'
import ListItemEditable from './listItemEditable'
import ButtonEditable from './buttonEditable'
import QuillComponent from './quillComponent'

import {WebContext} from "../App"

export default function ListComparisonTable (props){

    const [packagePlanCount, setPackagePlanCount] = useState(3)
    const [content,setContent] = useState([null,null,null])

    const webContext = useContext(WebContext);

    useEffect(() => {
        if (props.content){
            // alert(JSON.stringify(props.content.html))
            setContent(props.content)
          }
      }, []);


   

    return(
        <div className="row row-cols-1 row-cols-md-3 mb-3 text-center px-5">
            <PackagePlan content = {content[0]} webStyle = {webContext.webStyle} id = {props.id+"-1"}/>
            <PackagePlan content = {content[1]} webStyle = {webContext.webStyle} id = {props.id+"-2"}/>
            <PackagePlan content = {content[2]} webStyle = {webContext.webStyle} id = {props.id+"-3"}/>
        </div>
      )
};


function PackagePlan(props){
    const [header,setHeader] = useState("Package Name")
    const [price,setPrice] = useState("$250")
    const contentEditable = [React.createRef(),React.createRef()] // Header, Price, Button
    const [htmlContent,setHtmlContent] = useState(null)


    const handleHeaderChange = (value) => {
        setHeader(value);
        localStorage.setItem(props.id+"-header",value);
      };

    const handlePriceChange = (value) => {
        setPrice(value);
        localStorage.setItem(props.id+"-price",value);
    };

    useEffect(() => {
        if (props.content){
            // alert(JSON.stringify(props.content.html))
            setHeader(props.content.header)
            setPrice(props.content.price)
            setHtmlContent(props.content.bodyContent)
          }

      }, [props.content]);

    useEffect(() => {
        if (props.content){
            // alert(JSON.stringify(props.content.html))
            setHeader(props.content.header)
            setPrice(props.content.price)
          }


        const storedHeader = localStorage.getItem(props.id+'-header');
        const storedPrice = localStorage.getItem(props.id+'-price');    
    
        if (storedHeader){
            setHeader(storedHeader)
        }
        
        if (storedPrice){
            setPrice(storedPrice)
        }
      }, []);

    return(
        <div className="col">
            <div className="card mb-4 rounded-3 boxShadow" style={{backgroundColor:props.webStyle.darkAccent}}>
            <div className="card-header py-3">
                <ContentEditable
                    style={{color:props.webStyle.lightShade}}
                    className="my-0 fw-normal"
                    spellCheck = "false"
                    innerRef={contentEditable[0]}
                    html={header} // innerHTML of the editable div
                    disabled={!props.webStyle.isEditMode}      // use true to disable editing
                    onChange={(evt)=>{handleHeaderChange(evt.target.value)}} // handle innerHTML change
                    tagName='h4'/>
            </div>
            <div className="card-body rounded-bottom" style={{backgroundColor:props.webStyle.lightShade}}>
                {/* <h1 className="card-title pricing-card-title">$250</h1> */}
                <ContentEditable
                    style={{color:props.webStyle.darkShade}}
                    className="card-title pricing-card-title"
                    spellCheck = "false"
                    innerRef={contentEditable[1]}
                    html={price} // innerHTML of the editable div
                    disabled={!props.webStyle.isEditMode}      // use true to disable editing
                    onChange={(evt)=>{handlePriceChange(evt.target.value)}} // handle innerHTML change
                    tagName='h1'/>
                <ul className="list-unstyled mt-3 mb-4">
                    
                <QuillComponent mini = {true} webStyle = {props.webStyle} id ={props.id} content = {htmlContent}/>
            
                </ul>
                <ButtonEditable webStyle = {props.webStyle} className={"w-100 btn btn-lg "} style = {{backgroundColor:props.webStyle.darkAccent, color: props.webStyle.lightShade}} callback = {()=>{alert("he he")}}/>
               
                {/* <button type="button" className="w-100 btn btn-lg btn-outline-dark">Sign Up</button> */}
            </div>
            </div>
        </div>
    )
}