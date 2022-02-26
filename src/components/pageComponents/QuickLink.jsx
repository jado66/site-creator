import EditableLink from "../EditableLink"
import {WebContext} from "../../App"
import {useContext, useState} from 'react'


export default function QuickLink(props){


  const { webStyle } = useContext(WebContext);

  const [linkText, setLinkText] = useState(`New Link`)
  const [href, setHref] = useState("")

  return <div data-no-dnd="true" className="ps-4"

              style={{position:"relative",width:"50%",margin:"auto", border:`2px solid ${webStyle.darkShade}`,
              backgroundColor:webStyle.lightShade, padding:"5px 0px", margin:"5px auto", borderRadius:"10px"}}>
    <EditableLink id = {props.id} linkText = {linkText} href = {href} setLinkText = {setLinkText} setHref = {setHref }  />

  </div>
} 