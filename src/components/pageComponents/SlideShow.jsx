import { useState } from "react";
import PictureFrame from "../PictureFrame";

export default function SlideShow(props){
    
    const [pictureIndex, setPictureIndex] = useState(0)
    const [pictureCount, setPictureCount] = useState(3)
    

    const nextSlide = (direction) => {
        if(direction < 0 && pictureIndex > 0){
            setPictureIndex(pictureIndex-1)
         }
        if(direction > 0 && pictureIndex < pictureCount-1){
            setPictureIndex(pictureIndex+1)
         }
    }

    const numbertext = {color: "white", fontSize: "large", padding: "8px 12px", position: "absolute",
                        top: 25, left:15, zIndex:1,fontWeight: "bold"} 
    const arrow = {cursor: "pointer", position: "absolute", top: "50%", width: "auto", padding: "16px", marginTop: "-35px", 
                    color: "white", fontWeight: "bold", fontSize: "x-large", borderRadius: "0 3px 3px 0", userSelect: "none", zIndex:1}
            
    return(
        <div className="g-0 mb-5">
            {pictureIndex >0 && 
                <a style={{...arrow,left:15}} onClick = {()=>{nextSlide(-1)}}>&#10094;</a>}
            {pictureIndex < pictureCount - 1 && 
                <a style={{...arrow,right:15}} onClick = {()=>{nextSlide(1)}}>&#10095;</a>}
            {pictureIndex == pictureCount - 1 && 
                <a style={{...arrow,right:15}} onClick = {()=>{nextSlide(1)}}>&#x002B;</a>}
            <div className="numberText" style={numbertext}>{pictureIndex+1} / {pictureCount}</div>
            <PictureFrame webStyle = {props.webStyle} key = {`${props.id}-P${pictureIndex}`} id = {`${props.id}-P${pictureIndex}`}
                           /> 
        </div>
        )
    
}