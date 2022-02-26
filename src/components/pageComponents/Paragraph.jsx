import {useContext } from "react";

import QuillComponent from "../QuillComponent"

import {WebContext} from "../../App"

export default function Paragraph(props) {
    const { webStyle } = useContext(WebContext);

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
    <div className={webStyle.isMobile?"px-3 ":" px-5"} data-no-dnd="true" style={{color:webStyle.darkShade}}>
      <QuillComponent className = "paragraph" id ={props.id} content = {props.content} />
    </div>
          )
};
