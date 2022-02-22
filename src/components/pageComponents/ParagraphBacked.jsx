
import Paragraph from './Paragraph'

export default function ParagraphBacked(props){
  
    return(
      <div className='px-5' data-no-dnd="true">
        <div className="row boxShadow g-0 p-5" style={{backgroundColor:this.props.webStyle.lightShade}}>

          <Paragraph {...props}/>
        </div>
        </div>

            )
  
};

//<h2 style = {{margin:"0", padding: "20px 0px", color:props.webStyle.darkShade}} contentEditable spellCheck={false}>{headerValue}</h2>