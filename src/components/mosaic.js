import LinkBox from "./linkBox"
import PictureFrame from "./pictureFrame"

export default function Mosaic(props){
    const rightLinkBoxID = `${props.id}-Rl`
    const rightPictureFrameID = `${props.id}-Rp`
    const leftLinkBoxID = `${props.id}-Ll`
    const leftPictureFrameID = `${props.id}-Lp`

    if (props.webStyle.isMobile){
        return(
        <div className = {"row mb-5 px-5"} >
            <div className="col">
                <div className = {"row mb-5"}>
                    <div className="row g-0 mb-5">
                        <PictureFrame  webStyle = {props.webStyle} key = {leftPictureFrameID} id = {leftPictureFrameID} isNested/>
                    </div>
                        <LinkBox key = {leftLinkBoxID} id = {leftLinkBoxID} webStyle = {props.webStyle} adminProps = {props.adminProps}/>
                </div>
                <div className = {"row mb-5"}>
                    <div className="row g-0 mb-5">
                        <PictureFrame webStyle = {props.webStyle} key = {rightPictureFrameID} id = {rightPictureFrameID} isNested/>
                    </div>
                    <LinkBox key = {rightLinkBoxID} id = {rightLinkBoxID} webStyle = {props.webStyle} adminProps = {props.adminProps}/>
                </div>
            </div>
        </div>)
    }
    else{
        return(
            <div className = {"row mb-5 g-0 px-5"} >
                <div className = {"col me-3"}>
                    <div className="row g-0 mb-5 w-100">
                        <PictureFrame  webStyle = {props.webStyle} key = {leftPictureFrameID} id = {leftPictureFrameID} isNested/>
                    </div>
                        <LinkBox key = {leftLinkBoxID} id = {leftLinkBoxID} webStyle = {props.webStyle} adminProps = {props.adminProps}/>
                </div>
                <div className = {"col ms-3"}>
                    <div className="row g-0 mb-5">
                        <LinkBox key = {rightLinkBoxID} id = {rightLinkBoxID} webStyle = {props.webStyle} adminProps = {props.adminProps}/>
                    </div>
                        <PictureFrame webStyle = {props.webStyle} key = {rightPictureFrameID} id = {rightPictureFrameID} isNested/>
                </div>
            </div>
        )
    }
}