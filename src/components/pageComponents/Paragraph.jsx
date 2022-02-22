import {useContext } from "react";

import QuillComponent from "../QuillComponent"

import {WebContext} from "../../App"

export default function Paragraph(props) {
  const webContext = useContext(WebContext);

  // useEffect(() => {
  //   if (props.template){
  //     setHtml(props.template.content)

  //   }
  //   // else{
  //   //   const storedText = localStorage.getItem(this.props.id);


  //   //   if (storedText){
  //   //       this.setState({html: storedText})
  //   //   }
  //   //   // Set header to page name on new render
      
  //   //   else if (this.props.index === 0){
  //   //     this.setState({html: `<p>${this.props.pageName}</p>`})
  //   //   }
  //   // }
  // }, []);

  return(
    <div className={webContext.webStyle.isMobile?"px-3 ":" px-5"} data-no-dnd="true" >
      <QuillComponent className = "paragraph"  webStyle = {webContext.webStyle} id ={props.id} content = {props.content} />
    </div>
          )
};
