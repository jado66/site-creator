import LinkBox from "./linkBox"
import PictureFrame from "./pictureFrame"

import { useContext, useState, useEffect } from "react"
import {WebContext} from "../App"

import Fade from 'react-reveal/Fade';

export default function Mosaic(props){
    const [lImageUrl, setLImageUrl] = useState("")

    const [lTitle, setLTitle] = useState("Title")
    const [lSubTitle, setLSubTitle] = useState("SubTitle")
    const [lLinkText, setLLinkText] = useState(`New Link`)
    const [lHref, setLHref] = useState("")

    const [rImageUrl, setRImageUrl] = useState("")

    const [rTitle, setRTitle] = useState("Title")
    const [rSubTitle, setRSubTitle] = useState("SubTitle")
    const [rLinkText, setRLinkText] = useState(`New Link`)
    const [rHref, setRHref] = useState("")

    const rightLinkBoxID = `${props.id}-Rl`
    const rightPictureFrameID = `${props.id}-Rp`
    const leftLinkBoxID = `${props.id}-Ll`
    const leftPictureFrameID = `${props.id}-Lp`

    const webContext = useContext(WebContext);

    useEffect(() => {
        if (webContext.msgPort == "save"){
    
          const componentData = { 
            name: props.componentName,
            id: props.id,
            content: {
                lImageUrl:lImageUrl,
                lTitle:lTitle,
                lSubTitle:lSubTitle,
                lLinkText:lLinkText,
                lHref:lHref,
                rImageUrl:rImageUrl,
                rTitle:rTitle,
                rSubTitle:rSubTitle,
                rLinkText:rLinkText,
                rHref:rHref,
            }
          }
    
          webContext.saveComponentData(props.pageName,props.index,componentData)
        }
      }, [webContext.msgPort]);


    if (webContext.webStyle.isMobile){
        return(
        <div className = {"row "+(webContext.webStyle.isMobile?"px-2 ":"px-5")} data-no-dnd="true">
            <div className="col">
                <div className = {"row g-0"}>
                    <Fade>
                        <div className="row g-0 mb-5">
                            <PictureFrame  
                                webStyle = {webContext.webStyle} content = {props.content.lPicContent} key = {leftPictureFrameID} 
                                id = {leftPictureFrameID} imageUrl = {lImageUrl} setImageUrl = {setLImageUrl} isNested
                            />
                        </div>
                    </Fade>
                    <Fade>
                        <LinkBox 
                            key = {leftLinkBoxID} id = {leftLinkBoxID} content = {props.content.lLinkBoxContent}
                            title = {lTitle} subTitle = {lSubTitle} linkText = {lLinkText} href = {lHref}
                            setTitle = {setLTitle} setSubTitle = {setLSubTitle} setLinkText = {setLLinkText} setHref = {setLHref}
                        />
                    </Fade>
                </div>
                <div className = {"row mb-5 g-0"}>
                    <Fade>
                        <div className="row g-0 mb-5">
                            <PictureFrame webStyle = {webContext.webStyle} content = {props.content.rPicContent} key = {rightPictureFrameID} 
                                          imageUrl = {rImageUrl} setImageUrl = {setRImageUrl} id = {rightPictureFrameID} isNested/>
                        </div>
                    </Fade>
                    <Fade>
                        <LinkBox 
                            key = {rightLinkBoxID} id = {rightLinkBoxID} content = {props.content.rLinkBoxContent}
                            title = {rTitle} subTitle = {rSubTitle} linkText = {rLinkText} href = {rHref}
                            setTitle = {setRTitle} setSubTitle = {setRSubTitle} setLinkText = {setRLinkText} setHref = {setRHref}
                        />
                    </Fade>
                </div>
            </div>
        </div>)
    }
    else{
        return(
            <div className = {"row g-0 px-5"} data-no-dnd="true">
                <div className = {"col me-3"}>
                    <Fade>
                        <div className="row g-0 mb-5 w-100">
                            <PictureFrame  webStyle = {webContext.webStyle}  content = {props.content.lPicContent} key = {leftPictureFrameID}
                                           imageUrl = {lImageUrl} setImageUrl = {setLImageUrl} id = {leftPictureFrameID} isNested/>
                        </div>
                        <LinkBox 
                            key = {leftLinkBoxID} id = {leftLinkBoxID} content = {props.content.lLinkBoxContent}
                            title = {lTitle} subTitle = {lSubTitle} linkText = {lLinkText} href = {lHref}
                            setTitle = {setLTitle} setSubTitle = {setLSubTitle} setLinkText = {setLLinkText} setHref = {setLHref}
                        />
                    </Fade>
                </div>
                <div className = {"col ms-3"}>
                    <Fade>
                        <div className="row g-0 mb-5">
                        <LinkBox 
                            key = {rightLinkBoxID} id = {rightLinkBoxID} content = {props.content.rLinkBoxContent}
                            title = {rTitle} subTitle = {rSubTitle} linkText = {rLinkText} href = {rHref}
                            setTitle = {setRTitle} setSubTitle = {setRSubTitle} setLinkText = {setRLinkText} setHref = {setRHref}
                        />
                        </div>
                            <PictureFrame webStyle = {webContext.webStyle} content = {props.content.rPicContent} key = {rightPictureFrameID}
                            imageUrl = {rImageUrl} setImageUrl = {setRImageUrl} id = {rightPictureFrameID} isNested/>
                    </Fade>
                </div>  
            </div>
        )
    }
}