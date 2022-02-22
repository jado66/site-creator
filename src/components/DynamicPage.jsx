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

import Spacer from "./Spacer";

import "bootstrap/dist/css/bootstrap.css";
import { MouseSensor, KeyboardSensor, TouchSensor } from "./Sensorsjs";

import Header from "./pageComponents/Header";
import Navbar from "./pageComponents/Navbar";
import BlogPreview from "./BlogPreview";
import CaptionedPicture from "./pageComponents/CaptionedPicture";
import DynamicForm from "./pageComponents/DynamicForm";
import CardPaymentBlock from "./CardPaymentBlock";
import Mosaic from "./pageComponents/Mosaic";
import Footer from "./pageComponents/Footer";
import VideoFrame from "./pageComponents/VideoFrame";
import SlideShow from "./pageComponents/SlideShow";
import PictureFrame from "./PictureFrame";
import QuickLink from "./QuickLink";
import Paragraph from "./pageComponents/Paragraph";
import ListComparisonTable from "./pageComponents/ListComparisonTable";
import PlanComparison from "./pageComponents/PlanComparison";
import WalkThrough from "./pageComponents/Walkthrough";
import ParagraphBacked from "./pageComponents/ParagraphBacked";
import CountDown from "./pageComponents/CountDown";
import Appointments from "./pageComponents/Appointments";
import PhotoGallery from "./pageComponents/PhotoGallery";
import AdminWrapper from "./wrappers/AdminWrapper";

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
        <div id = "innerSection" className="col justify-items-baseline boxShadow min-vh-100 pb-4 pt-4" style={{backgroundColor:webContext.webStyle.lightAccent}}>

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

