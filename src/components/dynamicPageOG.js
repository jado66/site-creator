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
import { MouseSensor, KeyboardSensor } from "./Sensors";

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

import { useState, useEffect } from "react";


export default function DynamicPage(props) {
    
    const componentMapping = {
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

        
        const [components,setComponents] = useState([])
        const sensors = useSensors(useSensor(MouseSensor));


        // if (props.template){
        //     alert(JSON.stringify(props.template))
        // }


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
    
    

    // addComponentAtIndex(index,componentName){ // Need to be replaced with list of objects or they will get rerendered
        
    //     let newComponent = {}
    //     newComponent.name = componentName;
    //     newComponent.id = this.generateKey(componentName,index)
        
    //     let newComponentList = [...this.state.components.slice(0,index),newComponent,...this.state.components.slice(index)]

    //     this.setState({components:newComponentList});

    //     localStorage.setItem(props.pageName+'-componentList',JSON.stringify(newComponentList));
    // }
 
    // deleteComponent(index){
    //     if (window.confirm(`Are you sure you want to delete this ${this.state.components[index].name.toLowerCase()} component?`)){
    //         let newComponentList = [...this.state.components.slice(0,index),...this.state.components.slice(index+1)]

    //         this.setState({components:newComponentList});
    
    //         localStorage.setItem(props.pageName+'-componentList',JSON.stringify(newComponentList));
    //     }

       
    // }

    // addSelected(id){
    //     setSelectedComponents([...selectedComponents, id]);
    // };
    //   const removeSelected = (id) => {
    //     try {
    //       const idIndex = selectedComponents.indexOf(id);
    //       alert(`Removing ${id} at index ${idIndex}`);
    //       setSelectedComponents([...selectedComponents.splice(idIndex, 1)]);
    //     } catch (error) {
    //       alert("Error in removedSelected function:" + error);
    //     }
    //   };
 
   

    const generateKey = (componentName, index) => {
        return `${props.pageName}-${componentName}-${ index }${ String(new Date().getTime()).slice(-3) }`;
    }

    const handleDragEnd = (event) => {
        const { active, over } = event;
    
        if (active.id !== over.id) {
          // alert(active.data.current.sortable.index);
          // alert(over.data.current.sortable.index);
    
          const oldIndex = active.data.current.sortable.index;
          const newIndex = over.data.current.sortable.index;
    
          // alert(
          //   `Old ${newIndex}, new ${oldIndex}, ${JSON.stringify(componentIndexMap)}`
          // );
          setComponents( arrayMove(components, oldIndex, newIndex))
        
         
        }
      }
    

        let pageComponents = []

        // alert(this.state.componentNames)

        // let callbacks = {
        //     deleteComponent: this.deleteComponent.bind(this), 
        //     // moveComponentUp: this.moveComponentUp.bind(this),
        //     // moveComponentDown: this.moveComponentDown.bind(this),
        //     addComponentAtIndex: this.addComponentAtIndex.bind(this)
        // }

        components.forEach((component, index) => {
           
            let content = null
            try{
                content = props.template[index].content
            }
            catch{

            }

        
            const Component = componentMapping[component.name];

           
            let newComponent = <AdminWrapper
                key={component.id+"admin"}
                id={component.id+"admin"}
                // addSelected={addSelected}
                // removeSelected={removeSelected}
                // order = {el.or}
                className={"py-3 "}
            >
                <Component cart = {props.cart} cartCallbacks = {props.cartCallbacks} webStyle = {props.webStyle} key={component.id} id = {component.id} pages = {props.pages} pageCallbacks = {props.pageCallbacks} isMobile = {props.isMobile}
                                    index = {index} pageName = {props.pageName} socialMedias = {props.socialMedias} socialMediaCallbacks = {props.socialMediaCallbacks} content = {content} style={{ cursor: "auto"}}/> 
            </AdminWrapper>
            // let newComponent = <AdminComponentWrapper key ={component.id+"-admin"} index = {index} componentCount = {this.state.components.length} webStyle = {props.webStyle}
            //                                           callbacks = {callbacks} componentOptions = {props.componentOptions} isNavbar = {component.name == "Navbar"}>
            //                              <Component cart = {props.cart} cartCallbacks = {props.cartCallbacks} webStyle = {props.webStyle} key={component.id} id = {component.id} pages = {props.pages} pageCallbacks = {props.pageCallbacks} isMobile = {props.isMobile}
            //                                        index = {index} pageName = {props.pageName} socialMedias = {props.socialMedias} socialMediaCallbacks = {props.socialMediaCallbacks} content = {content}/>
            //                     </AdminComponentWrapper>
            pageComponents.push(newComponent)
            pageComponents.push(<Spacer key={component.id+"spacer"} />)
        });

        // alert(JSON.stringify(pageComponents))



        return (
            <div className="min-vh-100" style={{backgroundColor:props.webStyle.lightShade}}>    
    
                
                    
                <div id = "outerSection" className={"min-vh-100"+(props.webStyle.isMobile?" ":" container")}>
                
                    <div id = "innerSection" className="col justify-items-baseline boxShadow min-vh-100 py-4" style={{backgroundColor:props.webStyle.lightAccent}}>

                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                        >
                        <SortableContext
                            items={components}
                            strategy={verticalListSortingStrategy}
                        >
                        {/* <div id = "mainSection" style={{width:props.isMobile?"100%":`${props.webStyle.secondCenterWidth}%`,margin:"auto"}}> Includes everything inside the margin */}
                            {pageComponents}
                        </SortableContext>
                    </DndContext>
                        {/* {this.componentMapping.Navbar} */}
                    </div>
                </div>
        </div>
        );
    }
  
 
// class AdminComponentWrapper extends React.Component {
//     constructor(props) {
//         super(props);
//         this.children = props.children;

//         this.setButtonsVisibility = this.setButtonsVisibility.bind(this);
//         this.openAddComponentAbove = this.openAddComponentAbove.bind(this)
//         this.openAddComponentBelow = this.openAddComponentBelow.bind(this)
//         this.addNewComponent = this.addNewComponent.bind(this)
//         this.scroll = this.scroll.bind(this)

//         this.state = {
//             areButtonsVisible: false,
//             areAboveOptionsVisible: false,
//             areBelowOptionsVisible: false,
//             newComponentIndex:-1,
//             callbacks: props.callbacks,
//             componentOptions: props.componentOptions,
//             height: 100,
//             optionsXPos: 0
//         };

//         this.domRef = React.createRef()
//         this.optionsRef = React.createRef()
//         this.adminProps = props.adminProps

//         this.t = undefined
//         this.start = 100
//         this.repeatLeftScroll = this.repeatLeftScroll.bind(this)
//         this.repeatRightScroll = this.repeatRightScroll.bind(this)
//         this.onMouseUp = this.onMouseUp.bind(this)
//         this.onMouseDown = this.onMouseDown.bind(this)
        

//       }

//     onMouseDown(rightScroll) {
//         if (rightScroll)
//            this.repeatRightScroll()
//         else   
//             this.repeatLeftScroll()
 
//     }
//     onMouseUp() {
//         clearTimeout(this.t)
//         this.start = 100
//       }

//     setButtonsVisibility(showButtons){
//         if (props.webStyle.isAdmin)
//             this.setState({areButtonsVisible: showButtons})
//     }
//     openAddComponentAbove(){
//         // alert("Open above")
//         this.setState({areAboveOptionsVisible:true,areBelowOptionsVisible:false,newComponentIndex:props.index})
//     }
    
//     openAddComponentBelow(){
//         this.setState({areBelowOptionsVisible:true,areAboveOptionsVisible:false,newComponentIndex:props.index+1})
//     }

//     closeAddComponents(){
//         this.setState({areBelowOptionsVisible:false,areAboveOptionsVisible:false,newComponentIndex:props.index})
//     }
    
//     addNewComponent(componentName){
//         // alert(`Add at index ${this.state.index}`)
//         this.state.callbacks.addComponentAtIndex(this.state.newComponentIndex,componentName)
//         // Not sure if this does anything to do a rerender
//         this.setState({
//             areButtonsVisible: false,
//             areAboveOptionsVisible: false,
//             areBelowOptionsVisible: false,
//             newComponentIndex:-1})
//         this.onMouseUp();

//     }  

//     componentDidMount(){
//         try{
//             this.setState({height:this.domRef.current.clientHeight})
//         }
//         catch{
            
//         }
//     }
       
//     repeatLeftScroll() {
//         this.scroll(false)
//         this.t = setTimeout(this.repeatLeftScroll, this.start)
//         this.start = this.start / 2
//       }


//     repeatRightScroll() {
//         this.scroll(true)
//         this.t = setTimeout(this.repeatRightScroll, this.start)
//         this.start = this.start / 2
//       }

//     scroll(scrollRight){

//         if(!this.optionsRef.current) {
//             alert("no ref")
//             return
//         }
//         else{
//             const scrollLeft = this.optionsRef.current.scrollLeft
//             this.optionsRef.current.scrollLeft = scrollLeft + (scrollRight?-3:3)

//         }

//         // window.scrollTo(bcr.left - bcr.width/2, bcr.top - bcr.height/2);// this.optionsRef.current.scrollLeft = this.optionsRef.scrollLeft+(scrollRight?10:-10); 
//     }

//     render() {

//         let buttonClass = this.state.areButtonsVisible ? "" :"hidden"//
 
//         // buttonClass = "hidden"
//         let options = this.state.componentOptions.map((option) => (
//             <button className="btn btn-light btn-outline-secondary my-1 col" key ={option} onClick = {()=>{this.addNewComponent(option)}}>{option}</button>
//             ))

//         // options.push(
//         //     <button c key ={"deleteButton"} onClick = {()=>{this.closeAddComponents()}}>X</button>
//         // )

//         const buttonStyle = {backgroundColor:props.webStyle.lightShade,color:props.webStyle.darkShade}

//         const optionButtons = <div ref={this.optionsRef} style={{width:"85%", whiteSpace:"nowrap"}} className="py-0 g-0 overflow-auto no-scroll">
//                                 {options}    
//                             </div>

//     if (props.webStyle.isEditMode){
//         return ( 
//             <div ref={this.domRef} className="adminWrapper relative-div" style={{marginLeft:"-3em",marginBottom:"-.1em",paddingBottom:".1em",paddingLeft:"3em",marginRight:"-3em",paddingRight:"3em"}} 
//                  onMouseEnter={() => this.setButtonsVisibility(true)} onMouseLeave={() => {this.setButtonsVisibility(false)}} > 
//                  {/* onBlur={(e) => {this.closeAddComponents()}} */}
//                 {/* Above component */}
//                 {/* <span>{this.state.height}</span> */}
//                 {this.state.areAboveOptionsVisible && 
//                     <div className = {"relative-b row"} >
//                         <div className="row g-0 w-75 mx-auto" style={{zIndex:2}}>
//                             <div style={{display:"flex", flexDirection:"row"}} >
//                                 <button style={{width:"5%"}} className="btn btn-light btn-outline-secondary my-1 g-0" onClick={()=>{this.closeAddComponents()}}>{"X"}</button>
//                                 <button style={{width:"5%"}} className="btn btn-light btn-outline-secondary my-1 g-0" onMouseUp={()=>{this.onMouseUp()}} onMouseDown={()=>{this.onMouseDown(true)}}>{"<"}</button>
//                                 {optionButtons}
//                                 <button style={{width:"5%"}} className="btn btn-light btn-outline-secondary my-1 g-0" onMouseUp={()=>{this.onMouseUp()}} onMouseDown={()=>{this.onMouseDown(false)}}>{">"}</button>
//                             </div>
//                         </div>
//                     </div> 
//                 }
//                 {this.children}
//                 {this.state.areBelowOptionsVisible && 
//                 <div className = {"relative-b row"} >
//                     <div className="row g-0 w-75 mx-auto" style={{zIndex:2}}>
//                         <div style={{display:"flex", flexDirection:"row"}} >
//                             <button style={{width:"5%"}} className="btn btn-light btn-outline-secondary my-1 g-0" onClick={()=>{this.closeAddComponents()}}>{"X"}</button>
//                             <button style={{width:"5%"}} className="btn btn-light btn-outline-secondary my-1 g-0" onMouseUp={()=>{this.onMouseUp()}} onMouseDown={()=>{this.onMouseDown(true)}}>{"<"}</button>
//                             {optionButtons}
//                             <button style={{width:"5%"}} className="btn btn-light btn-outline-secondary my-1 g-0" onMouseUp={()=>{this.onMouseUp()}} onMouseDown={()=>{this.onMouseDown(false)}}>{">"}</button>
//                         </div>
//                     </div>
//                 </div> 
//                 }

//                 {this.state.height>150?
//                     <div className={"adminStuff relative-r text-centered " + buttonClass} style={{right:props.webStyle.isMobile?"1em":"0em"}}>
//                         {/* If the component is large height wise */}
                    
//                         <div className="col px-2" style={{width:"5em"}}>
//                             {/* <span>{props.webStyle.isMobile?"M":"D"}</span> */}
                            

                           
//                             <div >
//                                 <div className={"btn-group-vertical boxShadow row g-0"} role="group" >
                                    
//                                     <button type="button" className="btn text-nowrap rounded-0" style={buttonStyle}  onClick = {this.openAddComponentAbove}>
//                                         +<FontAwesomeIcon className="align-middle " style={buttonStyle} icon={faCaretDown} rotation={180}/>
//                                     </button>
//                                     <button type="button" className="btn " style={buttonStyle} onClick = {()=>{this.state.callbacks.moveComponentUp(props.index)}}><FontAwesomeIcon  icon={faAngleDoubleUp}/></button>
//                                 </div>
//                             </div>
//                             <div className="boxShadow " style={{position:"absolute",top:"6em"}}>
//                                 {/*   */}
//                                 <button type="button " style={buttonStyle} className="btn text-nowrap rounded-0"  onClick = {()=>{this.state.callbacks.deleteComponent(props.index)}}>
//                                     <FontAwesomeIcon className="align-middle "  icon={faTrashAlt}/>
//                                 </button>
//                             </div>
//                             <div >
//                                 <div className={"btn-group-vertical boxShadow row g-0"} style={{position:"absolute",bottom:"2em"}} role="group" >
//                                     <button type="button" style={buttonStyle} className="btn text-nowrap rounded-0"  onClick = {this.openAddComponentBelow}>
//                                         +<FontAwesomeIcon className="align-middle "  icon={faCaretDown}/>
//                                     </button>
//                                     <button type="button" className="btn"  style={buttonStyle} onClick = {()=>{this.state.callbacks.moveComponentDown(props.index)}}>
//                                         <FontAwesomeIcon  icon={faAngleDoubleDown}/></button>
//                                 </div>
//                             </div>
                            
                            

//                             {/*  */}
//                             {/*  */}


//                         </div>
//                     </div>
//                     :
//                     <div className={"adminStuff " + buttonClass + (props.isNavbar?" relative-b":" relative-b")} >
//                         <div className = "justify-content-evenly w-100 row g-0"  onClick={()=>{"admin"}}>
//                             {/* <span>{props.webStyle.isMobile?"M":"D"}</span> */}
//                             <div className="btn-group boxShadow" role="group" style={{width:"5em", zIndex:999}}  onClick={()=>{"admin"}}>
//                                 {props.index != 0 &&<button type="button" className="btn " style={buttonStyle} onClick = {()=>{this.state.callbacks.moveComponentUp(props.index)}}><FontAwesomeIcon  icon={faAngleDoubleUp}/></button>}
//                                 <button type="button" className="btn text-nowrap " style={buttonStyle}  onClick = {this.openAddComponentAbove}>
//                                     +<FontAwesomeIcon className="align-middle " style={buttonStyle} icon={faCaretDown} rotation={180}/>
//                                 </button>
//                                 {/* <button type="button" className="btn btn-secondary">Right</button> */}
//                             </div>
//                             <div className="btn-group boxShadow" style={{width:"5em"}} role="group"  onClick={()=>{"admin"}}>
//                                 <button type="button" style={buttonStyle} className="btn text-nowrap"  onClick = {()=>{this.state.callbacks.deleteComponent(props.index)}}>
//                                     <FontAwesomeIcon className="align-middle "  icon={faTrashAlt}/>
//                                 </button>
//                                 <button type="button" style={buttonStyle} className="btn text-nowrap"  onClick = {this.openAddComponentBelow}>
//                                     +<FontAwesomeIcon className="align-middle "  icon={faCaretDown}/>
//                                 </button>
//                                 <button type="button" className="btn"  style={buttonStyle} onClick = {()=>{this.state.callbacks.moveComponentDown(props.index)}}>
//                                     <FontAwesomeIcon  icon={faAngleDoubleDown}/></button>
//                                 {/* <button type="button" className="btn btn-secondary">Right</button> */}
//                             </div>
//                         </div>    
//                     </div>}

//                 <div className={"relative-l col text-centered"  + buttonClass}>
//                     {/* <div className="row">
//                         <span >Hi</span>
//                     </div> */}
//                     {/* <div className="row">
//                         {props.index != 0 && <button  className = {"btn "} onClick = {this.openAddComponentAbove}>Add <FontAwesomeIcon   icon={faSortUp} /></button>}
//                     </div> */}
//                 </div>
//             </div>
        
//             // <div className = {"col"} onMouseEnter={() => this.setButtonsVisibility(true)} onMouseLeave={() => {this.setButtonsVisibility(false);this.closeAddComponents()}}>
//             //     {/* Above component */}
//             //     {this.state.areAboveOptionsVisible && <div className = {"row component-options"}>{options}</div> }
//             //         {/* To the right of component */}
//             //         <div className = {"row w-100"} style={{position:"relative"}}>
//             //             {this.children}
//             //             <div className = {"col floatOnTopRight hidden"}>
//             //                 <div style={{height:"100%",display:"flex",flexDirection:"column",justifyContent:"baseline",zIndex:999}}>
//             //                     {/* {props.index != 0 && <button  className = {buttonClass} onClick = {this.openAddComponentAbove}>Add <FontAwesomeIcon   icon={faSortUp} /></button>} */}
    
//             //                     <div className = {"row"}>
//             //                         <button  className = {buttonClass} onClick = {this.openAddComponentAbove}>Add <FontAwesomeIcon   icon={faSortUp} /></button>
//             //                         {props.index != 0 && <button  className = {buttonClass} onClick = {()=>{this.state.callbacks.moveComponentUp(props.index)}}>Move <FontAwesomeIcon   icon={faSortUp} /></button>}
//             //                     </div>
                                
//             //                     <div className = {"row"}>
//             //                     <button  className = {buttonClass} onClick = {()=>{this.state.callbacks.deleteComponent(props.index)}}>Delete</button >
//             //                     <button  className = {buttonClass} onClick = {this.closeAddComponents}>X</button >
//             //                     </div>
                                
//             //                     <div className = {"row"}>
//             //                         <button  className = {buttonClass} onClick = {this.openAddComponentBelow}>Add <FontAwesomeIcon   icon={faSortDown} /></button>
    
//             //                         {props.index != props.componentCount - 1 && <button  className = {buttonClass} onClick = {()=>{this.state.callbacks.moveComponentDown(props.index)}}>Move <FontAwesomeIcon   icon={faSortDown} /></button>}
//             //                     </div>
//             //                 </div>
//             //             </div>
//             //     </div>
//             //     {/* Below component */}
//             //     {this.state.areBelowOptionsVisible && <div className = {"row component-options"}>{options}</div>}
            
//             //   </div>
//         )
//     }
//     else{
//         return (<div>{this.children}</div>)
//     }
    

//     };
// }

function Spacer(props) {
    const [isShowBar, showBar] = useState(false);
    return (
      <div
        className="g-0 row align-content-center "
        style={{ height: "2em" }}
        onMouseEnter={() => showBar(true)}
        onMouseLeave={() => {
          showBar(false);
        }}
      >
        <hr
          className="m-0 p-0 w-75 mx-auto bg-primary"
          style={{ height: "4px", display: isShowBar ? "" : "none" }}
        />
      </div>
    );
  }