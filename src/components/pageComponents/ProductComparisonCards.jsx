import React from 'react'
import { useState, useEffect, useContext } from 'react'
import ContentEditable from 'react-contenteditable'
import ListItemEditable from '../ListItemEditable'
import ButtonEditable from '../ButtonEditable'
import QuillComponent from '../QuillComponent'

import {WebContext} from "../../App"

export default function ProductComparisonCards (props){

    const [packagePlans, setPackagePlans] = useState(
      [
        {
          header: "Product 1",
          price: "$ Price",
          htmlContent: "Description",
        },
        {
          header: "Product 2",
          price: "$ Price",
          htmlContent: "Description",
        },
        {
          header: "Product 3",
          price: "Price",
          htmlContent: "Description",
        }
     ]
    )
    const [packagePlanCount, setPackagePlanCount] = useState(3)
    const [contentData,setContentData] = useState([null,null,null])

    function handleValueChange(index, valueName, value) {
      setPackagePlans((prevData) => {
        let newData = [...prevData];
  
        newData[index][valueName] = value;
  
        return newData;
      });
    }

    const {webStyle, msgPort, appMethods} = useContext(WebContext)

    const setContent = (content) =>{
        //const \[(.+), .+ use.+
        // set$1(content.$1)
        setPackagePlanCount(content.packagePlanCount)
        setContentData(content.content)
        setPackagePlans(content.packagePlans)
      } 
    
      const getContent = () =>{
        //const \[(.+), .+ use.+
        //content.$1 = $1
        
        let content = {}
        content.contentData = contentData
        content.packagePlanCount = packagePlanCount
        content.packagePlans = packagePlans
        return (content)
      }
    
       // Load content
        useEffect(() => {
            if (Object.keys(props.content).length > 0){
              setContent(props.content)
            }
        }, []);
    
      // Save data
      useEffect(() => {
        if (msgPort == "save"){
          const componentData = { 
            name: props.componentName,
            id: props.id,
            content: getContent()
          }
          appMethods.saveComponentData(props.pageName,props.index,componentData)
        }
      }, [msgPort]);


   

    return(
        <div className="row row-cols-1 row-cols-md-3 mb-3 text-center px-5">
            <PackagePlan data = {packagePlans[0]} webStyle = {webStyle} id = {props.id+"-1"} index = {0} handleValueChange = {handleValueChange}/>
            <PackagePlan data = {packagePlans[1]} webStyle = {webStyle} id = {props.id+"-2"} index = {1} handleValueChange = {handleValueChange}/>
            <PackagePlan data = {packagePlans[2]} webStyle = {webStyle} id = {props.id+"-3"} index = {2} handleValueChange = {handleValueChange}/>
        </div>
      )
};


function PackagePlan(props){
    
    const contentEditable = [React.createRef(),React.createRef()] // Header, Price, Button

    const setHeader = (val) => {props.handleValueChange(props.index,"header",val)}
    const setPrice = (val) => {props.handleValueChange(props.index,"price",val)}
    const setHtmlContent = (val) => {props.handleValueChange(props.index,"html",val)}

    return(
        <div className="col">
            <div className="card mb-4 rounded-3 boxShadow" style={{backgroundColor:props.webStyle.darkAccent}}>
            <div className="card-header py-3">
                <ContentEditable
                    style={{color:props.webStyle.lightShade}}
                    className="my-0 fw-normal"
                    spellCheck = "false"
                    innerRef={contentEditable[0]}
                    html={props.data.header} // innerHTML of the editable div
                    disabled={!props.webStyle.isEditMode}      // use true to disable editing
                    onChange={(evt)=>{setHeader(evt.target.value)}} // handle innerHTML change
                    tagName='h4'/>
            </div>
            <div className="card-body rounded-bottom" style={{backgroundColor:props.webStyle.lightShade}}>
                {/* <h1 className="card-title pricing-card-title">$250</h1> */}
                <ContentEditable
                    style={{color:props.webStyle.darkShade}}
                    className="card-title pricing-card-title"
                    spellCheck = "false"
                    innerRef={contentEditable[1]}
                    html={props.data.price} // innerHTML of the editable div
                    disabled={!props.webStyle.isEditMode}      // use true to disable editing
                    onChange={(evt)=>{setPrice(evt.target.value)}} // handle innerHTML change
                    tagName='h1'/>
                <ul className="list-unstyled mt-3 mb-4">
                    
                <QuillComponent mini = {true} webStyle = {props.webStyle} id ={props.id} content = {{html:props.data.html}}/>
            
                </ul>
                <ButtonEditable webStyle = {props.webStyle} className={"w-100 btn btn-lg "} style = {{backgroundColor:props.webStyle.darkAccent, color: props.webStyle.lightShade}} callback = {()=>{alert("he he")}}/>
               
                {/* <button type="button" className="w-100 btn btn-lg btn-outline-dark">Sign Up</button> */}
            </div>
            </div>
        </div>
    )
}