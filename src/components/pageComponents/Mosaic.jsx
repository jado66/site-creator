import LinkBox from "../LinkBox"
import PictureFrame from "../PictureFrame"

import { useContext, useState, useEffect } from "react"
import {WebContext} from "../../App"

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

    const {webStyle, msgPort, appMethods} = useContext(WebContext)

    const setContent = (content) =>{
        //const \[(.+), .+ use.+
        // set$1(content.$1)
        setLImageUrl(content.lImageUrl)
        setLTitle(content.lTitle)
        setLSubTitle(content.lSubTitle)
        setLLinkText(content.lLinkText)
        setLHref(content.lHref)

        setRImageUrl(content.rImageUrl)

        setRTitle(content.rTitle)
        setRSubTitle(content.rSubTitle)
        setRLinkText(content.rLinkText)
        setRHref(content.rHref)
      } 
    
    const getContent = () =>{
    //const \[(.+), .+ use.+
        //content.$1 = $1
        let content = {}
        content.lImageUrl = lImageUrl
        content.lTitle = lTitle
        content.lSubTitle = lSubTitle
        content.lLinkText = lLinkText
        content.lHref = lHref

        content.rImageUrl = rImageUrl

        content.rTitle = rTitle
        content.rSubTitle = rSubTitle
        content.rLinkText = rLinkText
        content.rHref = rHref
        return content
    }

      
    // Load content
    useEffect(() => {
        if (Object.keys(props.content).length > 0){
        setContent(props.content)
        }
    }, []);

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

    if (webStyle.isMobile){
        return(
        <div className = {"row "+(webStyle.isMobile?"px-2 ":"px-5")} data-no-dnd="true">
            <div className="col">
                <div className = {"row g-0 mb-5" }>
                    <Fade>
                        <div className="row g-0 mb-5">
                            <PictureFrame  
                                 key = {leftPictureFrameID} 
                                id = {leftPictureFrameID} imageUrl = {lImageUrl} setImageUrl = {setLImageUrl} isNested
                            />
                        </div>
                    </Fade>
                    <Fade>
                        <LinkBox 
                            className="row g-0 "
                            key = {leftLinkBoxID} id = {leftLinkBoxID} 
                            title = {lTitle} subTitle = {lSubTitle} linkText = {lLinkText} href = {lHref}
                            setTitle = {setLTitle} setSubTitle = {setLSubTitle} setLinkText = {setLLinkText} setHref = {setLHref}
                        />
                    </Fade>
                </div>
                <div className = {"row g-0"}>
                    <Fade>
                        <div className="row g-0 mb-5">
                            <PictureFrame key = {rightPictureFrameID} 
                                          imageUrl = {rImageUrl} setImageUrl = {setRImageUrl} id = {rightPictureFrameID} isNested/>
                        </div>
                    </Fade>
                    <Fade>
                        <LinkBox 
                            key = {rightLinkBoxID} id = {rightLinkBoxID}
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
                            <PictureFrame  webStyle = {webStyle}  key = {leftPictureFrameID}
                                           imageUrl = {lImageUrl} setImageUrl = {setLImageUrl} id = {leftPictureFrameID} isNested/>
                        </div>
                        <LinkBox 
                            key = {leftLinkBoxID} id = {leftLinkBoxID} 
                            title = {lTitle} subTitle = {lSubTitle} linkText = {lLinkText} href = {lHref}
                            setTitle = {setLTitle} setSubTitle = {setLSubTitle} setLinkText = {setLLinkText} setHref = {setLHref}
                        />
                    </Fade>
                </div>
                <div className = {"col ms-3"}>
                    <Fade>
                        <div className="row g-0 mb-5">
                        <LinkBox 
                            key = {rightLinkBoxID} id = {rightLinkBoxID} 
                            title = {rTitle} subTitle = {rSubTitle} linkText = {rLinkText} href = {rHref}
                            setTitle = {setRTitle} setSubTitle = {setRSubTitle} setLinkText = {setRLinkText} setHref = {setRHref}
                        />
                        </div>
                            <PictureFrame  key = {rightPictureFrameID}
                            imageUrl = {rImageUrl} setImageUrl = {setRImageUrl} id = {rightPictureFrameID} isNested/>
                    </Fade>
                </div>  
            </div>
        )
    }
}