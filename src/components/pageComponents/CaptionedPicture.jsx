import PictureFrame from "../PictureFrame"
import { useState, useContext, useRef, useEffect } from "react"
import { WebContext } from "../../App"
import ContentEditable from "react-contenteditable"

export default function CaptionedPicture(props){
    const pictureFrameID = `${props.id}-rightPictureFrame`
    
    const {webStyle, msgPort, appMethods} = useContext(WebContext)

    const [imageUrl, setImageUrl] = useState("")
    const [caption, setCaption] = useState("Caption for the picture")
    const contentEditable = useRef(null)

    const setContent = (content) =>{
        setImageUrl(content.imageUrl)
      } 
    
      const getContent = () =>{
        let content = {}
        content.imageUrl = imageUrl
       
        return content
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
        <div className = {"row"} data-no-dnd = "true" style = {{paddingTop:"40px", paddingBottom:"40px",justifyContent:"center",flex: 1,width:"100%"}}>
            <div className = {"col"} style={{width:"100%"}}>
            <PictureFrame webStyle = {props.webStyle} key = {pictureFrameID} id = {pictureFrameID}/>
            <ContentEditable
                className=''
                style={{color:webStyle.darkShade}}
                spellCheck = "false"
                innerRef={contentEditable}
                html={caption} // innerHTML of the editable div
                disabled={!webStyle.isEditMode}      // use true to disable editing
                onChange={(evt)=>{setCaption(evt.target.value)}} // handle innerHTML change
                tagName='p' // Use a custom HTML tag (uses a div by default)
                /> 
            </div>
        </div>

    )
}