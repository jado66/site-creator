
import Paragraph from './Paragraph'
import { useContext } from 'react';
import { WebContext } from '../../App';

export default function ParagraphBacked(props){
    const { webStyle } = useContext(WebContext);

    return(
      <div className='px-5' data-no-dnd="true">
        <div className="row boxShadow g-0 p-5" style={{backgroundColor:webStyle.lightShade}}>

          <Paragraph {...props}/>
        </div>
        </div>

            )
  
};

//<h2 style = {{margin:"0", padding: "20px 0px", color:props.webStyle.darkShade}} contentEditable spellCheck={false}>{headerValue}</h2>