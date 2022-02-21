import { useState, useEffect, useContext } from "react";

import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";

import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
  snapCenterToCursor,
} from '@dnd-kit/modifiers';

import "bootstrap/dist/css/bootstrap.css";
import { MouseSensor, KeyboardSensor } from "./Sensors";

import Header from "./header";
import Navbar from "./navbar";
import BlogPreview from "./blogPreview";
import CaptionedPicture from "./captionedPicture";
import DynamicForm from "./dynamicForm";
import CardPaymentBlock from "./cardPaymentBlock";
import Mosaic from "./mosaic";
import Footer from "./footer";
import VideoFrame from "./videoFrame";
import SlideShow from "./slideShow";
import PictureFrame from "./pictureFrame";
import QuickLink from "./quickLink";
import Paragraph from "./paragraph";
import ListComparisonTable from "./listComparisonTable";
import PlanComparison from "./planComparison";
import EmailSender from "./emailSender"
import WalkThrough from "./walkthrough";
import ParagraphBacked from "./paragraphBacked";
import CountDown from "./countDown";
import Appointments from "./appointments";
import PhotoGallery from "./photoGallery";
import AdminWrapper from "./AdminWrapper";

import {WebContext} from "../App"

export default function DynamicPage(props) {
  const [components, setComponents] = useState([]);

  const sensors = useSensors(useSensor(MouseSensor));

  const [selectedComponents, setSelectedComponents] = useState([]);

  const addSelected = (id) => {
    setSelectedComponents([...selectedComponents, id]);
  };
  const removeSelected = (id) => {
    try {
      const idIndex = selectedComponents.indexOf(id);
      // alert(`Removing ${id} at index ${idIndex}`);
      setSelectedComponents([...selectedComponents.splice(idIndex, 1)]);
    } catch (error) {
      alert("Error in removedSelected function:" + error);
    }
  };

  const webContext = useContext(WebContext);

  const componentMap = {
    Header:Header,
    Footer:Footer,
    Mosaic:Mosaic,
    Navbar:Navbar,
    VideoFrame:VideoFrame,
    CardPaymentBlock:CardPaymentBlock,
    DynamicForm:DynamicForm,
    BlogPreview:BlogPreview,
    CaptionedPicture,CaptionedPicture,
    SlideShow:SlideShow,
    PictureFrame:PictureFrame,
    QuickLink:QuickLink,
    Paragraph:Paragraph,
    ParagraphBacked:ParagraphBacked,
    ListComparisonTable:ListComparisonTable,
    PlanComparison:PlanComparison,
    WalkThrough:WalkThrough,
    CountDown:CountDown,
    Appointments:Appointments,
    EmailSender:EmailSender,
    PhotoGallery:PhotoGallery
  
  };

  useEffect(() => {
        
    if(props.template){
        const components = props.template;
       
        setComponents(components)
    
    }
    else{
        
        let components = []
        for (var i = 0; i < props.defaultComponentList.length; i++){
            components.push(
                {
                    name: props.defaultComponentList[i],
                    id: generateKey(props.defaultComponentList[i],i)
                })
        }
        setComponents(components)

    }

  },[]);

  let pagecomponents = [];

  components.forEach((el, index) => {

    let content = null
    try{
        content = props.template[index].content
    }
    catch{

    }

    const Component = componentMap[el.name];
    pagecomponents.push(
      <AdminWrapper
        key={el.id}
        isFlat ={webContext.flatComponents.includes(el.name)}
        id={el.id}
        addSelected={addSelected}
        removeSelected={removeSelected}
        // order = {el.or}
        className={"py-3 "}
      >
        <Component key={el.id + "c"} id={el.id + "c"} index = {index} pageName = {props.pageName} 
                   content = {content} componentName = {el.name} style={{ cursor: "auto"}}/> 
            
      </AdminWrapper>
    );

    if (index !== components.length-1){
      pagecomponents.push(<Spacer />);
    }
  });

  return (
    <div>
      {" "}
      {/* style={{backgroundColor:this.props.webStyle.lightShade}} */}
      <div id = "outerSection" className={"min-vh-100"+(webContext.webStyle.isMobile?" ":" container")}>
        <div id = "innerSection" className="col justify-items-baseline boxShadow min-vh-100 pb-4" style={{backgroundColor:webContext.webStyle.lightAccent}}>

          <DndContext
            sensors={sensors}
            modifiers = {[restrictToVerticalAxis]}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={components}
              strategy={verticalListSortingStrategy}
            >
              {/* <span className="mt-5 bg-warning">{JSON.stringify(webContext.webStyle)}</span> */}

              {pagecomponents}
            </SortableContext>
          </DndContext>
          {/* <span>Selected: {JSON.stringify(selectedComponents)}</span> */}
        </div>

      </div>
      {/* <span>
        {JSON.stringify(webContext.savedData,null,4)}
      </span> */}
    </div>
  );

  function generateKey(componentName, index){
    return `${props.pageName}-${componentName}-${ index }${ String(new Date().getTime()).slice(-3) }`;
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    // alert("drag ends")

    if (active.id !== over.id) {
      // alert(active.data.current.sortable.index);
      // alert(over.data.current.sortable.index);

      const oldIndex = active.data.current.sortable.index;
      const newIndex = over.data.current.sortable.index;

      // alert(
      //   `Old ${newIndex}, new ${oldIndex}, ${JSON.stringify(componentIndexMap)}`
      // );

      setComponents((components) => {
        return arrayMove(components, oldIndex, newIndex);
      });
    }
  }
}

function Spacer(props) {
  const [isShowBar, showBar] = useState(false);
  const [isShowButtons, setShowButtons] = useState(false)

  const webContext = useContext(WebContext);

  let options = webContext.componentOptions.map((option) => (
    <button className="btn btn-light btn-outline-secondary my-1 col mx-1" key ={option} onClick = {()=>{alert("Add option")}}>{option}</button>
    ))

  const optionButtons = <div style={{whiteSpace:"nowrap"}} className="py-0 g-0 overflow-auto no-scroll">
                          {options}    
                        </div>
    

  return (
    <div
      className="g-0 row align-content-center "
      style={{ height: (isShowButtons?"1.5em":".5em") }}
      onMouseEnter={() => 
        showBar(true)
      }
      onMouseLeave={() => {
        showBar(false);
      }}
      onClick={() => {
        setShowButtons(!isShowButtons);
      }}
      // onFocus
    >
      {isShowButtons?
        <div
          className="m-0 p-0 w-75 mx-auto rounded rounded-pill" style={{backgroundColor:"rgb(13, 110, 253,.25)"}}
        >
          <div >
            <div className="row g-0 w-75 mx-auto" style={{zIndex:2, opacity:"1"}}>
                <div style={{display:"flex", flexDirection:"row"}} >
                    {/* <button style={{width:"5%"}} className="btn btn-light btn-outline-secondary my-1 g-0" onClick={()=>{this.closeAddComponents()}}>{"X"}</button> */}
                    {/* <button style={{width:"5%"}} className="btn btn-light btn-outline-secondary my-1 g-0" onMouseUp={()=>{this.onMouseUp()}} onMouseDown={()=>{this.onMouseDown(true)}}>{"<"}</button> */}
                    {optionButtons}
                    {/* <button style={{width:"5%"}} className="btn btn-light btn-outline-secondary my-1 g-0" onMouseUp={()=>{this.onMouseUp()}} onMouseDown={()=>{this.onMouseDown(false)}}>{">"}</button> */}
                </div>
            </div>
        </div> 
        </div>

      :
      <hr
        className="m-0 p-0 w-75 mx-auto bg-primary"
        style={{ height: "4px", display: isShowBar ? "" : "none" }}
      />
      }
    </div>
  );
}
