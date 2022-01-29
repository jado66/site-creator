import Header from "./header";
import Navbar from "./navbar";
import BlogPreview from "./blogPreview";
import CaptionedPicture from "./captionedPicture";
import React from "react";
import DynamicForm from "./dynamicForm";
import CardPaymentBlock from "./cardPaymentBlock";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faSortDown, faThList, faCaretDown, faPlus, faAngleDoubleUp, faAngleDoubleDown, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Mosaic from "./mosaic";
import WebsiteStyleEditor from "./styleEditor";
import Footer from "./footer";
import VideoFrame from "./videoFrame";
import SlideShow from "./slideShow";
import PictureFrame from "./pictureFrame";
import QuickLink from "./quickLink";
import Paragraph from "./paragraph";
import ListComparisonTable from "./listComparisonTable";
import PlanComparison from "./planComparison";
import { faCaretSquareDown, faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import WalkThrough from "./walkthrough";
import ParagraphBacked from "./paragraphBacked";


export default class DynamicPage extends React.Component {
    constructor(props) {
        super(props);
    
        this.componentMapping = {
            Header:Header,
            // Subheader,
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
            WalkThrough:WalkThrough
            // Gallery,
            // NewsletterSignup,
            // BlogFeedAppointments,
            // IGGallery,
            // BlogWYSIWYG,
            // CommentLikesHandler,
            // PriceHierarchyTable,
            // BasicShop,
            // Services,
            // Appointments,
            // Mall,
            // PaymentManager,
            // ContactForm,
            // AdminActionsDashboard ,
            // IGAnalytics,
            // EmailSender
          };
 
        
        this.componentOptions = props.componentOptions;
        this.pageType = props.pageType;
        this.inAdminMode = props.inAdminMode;

        // this.generateKey = this.generateKey.bind(this)

        this.swapComponents = this.swapComponents.bind(this)
        
        let components = []

        // if (this.props.template){
        //     alert(JSON.stringify(this.props.template))
        // }

        
        this.state = {
            pageName: this.pageType,
            components : components,
            isStyleEditorMinimized: false,
            showStyleEditor: false,
        };


        this.addComponentAtIndex = this.addComponentAtIndex.bind(this);
        this.minimizeStyleEditor = this.minimizeStyleEditor.bind(this);
    }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.webStyle !== this.props.webStyle) {
    //         if(!equal(this.props, prevProps)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
    //         {
    //         //   alert("hi")
    //         }
    //     }
    //   }
    componentDidMount(){
        // let components = null// JSON.parse(localStorage.getItem(this.props.pageName+'-componentList'))
    
        // if (components){
        //     this.setState({components: components})
        // }
        // else{
        if(this.props.template){
            const components = this.props.template;
            // else{
            //     components = []
            //     for (var i = 0; i < this.props.defaultComponentList.length; i++){
            //         components.push(
            //             {
            //                 name: this.props.defaultComponentList[i],
            //                 id: this.generateKey(this.props.defaultComponentList[i],i)
            //             })
            //     }
            // } 

           
            this.setState({components: components})
        
        }
        else{
            
            let components = []
            for (var i = 0; i < this.props.defaultComponentList.length; i++){
                components.push(
                    {
                        name: this.props.defaultComponentList[i],
                        id: this.generateKey(this.props.defaultComponentList[i],i)
                    })
            }
            this.setState({components: components})

        }
            // localStorage.setItem(this.props.pageName+'-componentList',JSON.stringify(components));
        
      }
 
    minimizeStyleEditor(){
        this.setState({showStyleEditor:false})
    }

    expandStyleEditor(){
        this.setState({showStyleEditor:true})
    }

    addComponentAtIndex(index,componentName){ // Need to be replaced with list of objects or they will get rerendered
        
        let newComponent = {}
        newComponent.name = componentName;
        newComponent.id = this.generateKey(componentName,index)
        
        let newComponentList = [...this.state.components.slice(0,index),newComponent,...this.state.components.slice(index)]

        this.setState({components:newComponentList});

        localStorage.setItem(this.props.pageName+'-componentList',JSON.stringify(newComponentList));
    }
 
    deleteComponent(index){
        if (window.confirm(`Are you sure you want to delete this ${this.state.components[index].name.toLowerCase()} component?`)){
            let newComponentList = [...this.state.components.slice(0,index),...this.state.components.slice(index+1)]

            this.setState({components:newComponentList});
    
            localStorage.setItem(this.props.pageName+'-componentList',JSON.stringify(newComponentList));
        }

       
    }
 
    moveComponentUp(index){
        if (index != 0){
            this.swapComponents(index,index-1)
        }
        else{
            alert("Cant move the first element up")
        }
    }
 
    moveComponentDown(index){
        if (index != this.state.components.length-1){
            this.swapComponents(index,index+1)
        }
        else{
            alert("Cant move the first element up")
        }
    }
 
    swapComponents(indexA,indexB){
        let newComponentList = [...this.state.components];
        let tempComponent = {...this.state.components[indexB]};

        newComponentList[indexB] = {...newComponentList[indexA]};
        newComponentList[indexA] = tempComponent
 
        this.setState({components:newComponentList});



        localStorage.setItem(this.props.pageName+'-componentList',JSON.stringify(newComponentList));
    }

    generateKey = (componentName, index) => {
        return `${this.props.pageName}-${componentName}-${ index }${ String(new Date().getTime()).slice(-3) }`;
    }
    // reindexComponents(){
    //     for
    // }

    render() {

        let pageComponents = []

        // alert(this.state.componentNames)

        let callbacks = {
            deleteComponent: this.deleteComponent.bind(this), 
            moveComponentUp: this.moveComponentUp.bind(this),
            moveComponentDown: this.moveComponentDown.bind(this),
            addComponentAtIndex: this.addComponentAtIndex.bind(this)
        }

        this.state.components.forEach((component, index) => {
           
            let content = null
            try{
                content = this.props.template[index].content
            }
            catch{

            }

        
            const Component = this.componentMapping[component.name];
            let newComponent = <AdminComponentWrapper key ={component.id+"-admin"} index = {index} componentCount = {this.state.components.length} webStyle = {this.props.webStyle}
                                                      callbacks = {callbacks} componentOptions = {this.props.componentOptions} isNavbar = {component.name == "Navbar"}>
                                         <Component cart = {this.props.cart} cartCallbacks = {this.props.cartCallbacks} webStyle = {this.props.webStyle} key={component.id} id = {component.id} pages = {this.props.pages} pageCallbacks = {this.props.pageCallbacks} isMobile = {this.props.isMobile}
                                                   index = {index} pageName = {this.props.pageName} socialMedias = {this.props.socialMedias} socialMediaCallbacks = {this.props.socialMediaCallbacks} content = {content}/>
                                </AdminComponentWrapper>
            pageComponents.push(newComponent)
        });

        // alert(JSON.stringify(pageComponents))
 
        return (
            <div  style={{backgroundColor:this.props.webStyle.lightShade}}>    
    
                
                    
                <div id = "outerSection" className="container">
                    <div id = "innerSection" className="col justify-items-baseline boxShadow h-100 py-4" style={{backgroundColor:this.props.webStyle.lightAccent}}>

                    {/* <div id = "mainSection" style={{width:this.props.isMobile?"100%":`${this.props.webStyle.secondCenterWidth}%`,margin:"auto"}}> Includes everything inside the margin */}
                        {pageComponents}
                        {/* {this.componentMapping.Navbar} */}
                    </div>
                </div>
        </div>
        );
    }
  }
 
class AdminComponentWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.children = props.children;

        this.setButtonsVisibility = this.setButtonsVisibility.bind(this);
        this.openAddComponentAbove = this.openAddComponentAbove.bind(this)
        this.openAddComponentBelow = this.openAddComponentBelow.bind(this)
        this.addNewComponent = this.addNewComponent.bind(this)
        this.scroll = this.scroll.bind(this)

        this.state = {
            areButtonsVisible: false,
            areAboveOptionsVisible: false,
            areBelowOptionsVisible: false,
            newComponentIndex:-1,
            callbacks: props.callbacks,
            componentOptions: props.componentOptions,
            height: 100,
            optionsXPos: 0
        };

        this.domRef = React.createRef()
        this.optionsRef = React.createRef()
        this.adminProps = props.adminProps

        this.t = undefined
        this.start = 100
        this.repeatLeftScroll = this.repeatLeftScroll.bind(this)
        this.repeatRightScroll = this.repeatRightScroll.bind(this)
        this.onMouseUp = this.onMouseUp.bind(this)
        this.onMouseDown = this.onMouseDown.bind(this)
        

      }

    onMouseDown(rightScroll) {
        if (rightScroll)
           this.repeatRightScroll()
        else   
            this.repeatLeftScroll()
 
    }
    onMouseUp() {
        clearTimeout(this.t)
        this.start = 100
      }

    setButtonsVisibility(showButtons){
        if (this.props.webStyle.isAdmin)
            this.setState({areButtonsVisible: showButtons})
    }
    openAddComponentAbove(){
        // alert("Open above")
        this.setState({areAboveOptionsVisible:true,areBelowOptionsVisible:false,newComponentIndex:this.props.index})
    }
    
    openAddComponentBelow(){
        this.setState({areBelowOptionsVisible:true,areAboveOptionsVisible:false,newComponentIndex:this.props.index+1})
    }

    closeAddComponents(){
        this.setState({areBelowOptionsVisible:false,areAboveOptionsVisible:false,newComponentIndex:this.props.index})
    }
    
    addNewComponent(componentName){
        // alert(`Add at index ${this.state.index}`)
        this.state.callbacks.addComponentAtIndex(this.state.newComponentIndex,componentName)
        // Not sure if this does anything to do a rerender
        this.setState({
            areButtonsVisible: false,
            areAboveOptionsVisible: false,
            areBelowOptionsVisible: false,
            newComponentIndex:-1})
        this.onMouseUp();

    }  

    componentDidMount(){
        try{
            this.setState({height:this.domRef.current.clientHeight})
        }
        catch{
            
        }
    }
       
    repeatLeftScroll() {
        this.scroll(false)
        this.t = setTimeout(this.repeatLeftScroll, this.start)
        this.start = this.start / 2
      }


    repeatRightScroll() {
        this.scroll(true)
        this.t = setTimeout(this.repeatRightScroll, this.start)
        this.start = this.start / 2
      }

    scroll(scrollRight){

        if(!this.optionsRef.current) {
            alert("no ref")
            return
        }
        else{
            const scrollLeft = this.optionsRef.current.scrollLeft
            this.optionsRef.current.scrollLeft = scrollLeft + (scrollRight?-3:3)

        }

        // window.scrollTo(bcr.left - bcr.width/2, bcr.top - bcr.height/2);// this.optionsRef.current.scrollLeft = this.optionsRef.scrollLeft+(scrollRight?10:-10); 
    }

    render() {

        let buttonClass = this.state.areButtonsVisible ? "" :"hidden"
 
        // buttonClass = "hidden"
        let options = this.state.componentOptions.map((option) => (
            <button className="btn btn-light btn-outline-secondary my-1 col" key ={option} onClick = {()=>{this.addNewComponent(option)}}>{option}</button>
            ))

        // options.push(
        //     <button c key ={"deleteButton"} onClick = {()=>{this.closeAddComponents()}}>X</button>
        // )

        const buttonStyle = {backgroundColor:this.props.webStyle.lightShade,color:this.props.webStyle.darkShade}

        const optionButtons = <div ref={this.optionsRef} style={{width:"85%", whiteSpace:"nowrap"}} className="py-0 g-0 overflow-auto no-scroll">
                                {options}    
                            </div>

    if (this.props.webStyle.isEditMode){
        return ( 
            <div ref={this.domRef} className="adminWrapper relative-div" style={{marginLeft:"-3em",marginBottom:"-.1em",paddingBottom:".1em",paddingLeft:"3em",marginRight:"-3em",paddingRight:"3em"}} 
                 onMouseEnter={() => this.setButtonsVisibility(true)} onMouseLeave={() => {this.setButtonsVisibility(false)}} > 
                 {/* onBlur={(e) => {this.closeAddComponents()}} */}
                {/* Above component */}
                {/* <span>{this.state.height}</span> */}
                {this.state.areAboveOptionsVisible && 
                    <div className = {"relative-t row"} >
                        <div className="row g-0 w-75 mx-auto" style={{zIndex:2}}>
                            <div style={{display:"flex", flexDirection:"row"}} >
                                <button style={{width:"5%"}} className="btn btn-light btn-outline-secondary my-1 g-0" onClick={()=>{this.closeAddComponents()}}>{"X"}</button>
                                <button style={{width:"5%"}} className="btn btn-light btn-outline-secondary my-1 g-0" onMouseUp={()=>{this.onMouseUp()}} onMouseDown={()=>{this.onMouseDown(true)}}>{"<"}</button>
                                {optionButtons}
                                <button style={{width:"5%"}} className="btn btn-light btn-outline-secondary my-1 g-0" onMouseUp={()=>{this.onMouseUp()}} onMouseDown={()=>{this.onMouseDown(false)}}>{">"}</button>
                            </div>
                        </div>
                    </div> 
                }
                {this.children}
                {this.state.areBelowOptionsVisible && 
                <div className = {"relative-b row"} >
                    <div className="row g-0 w-75 mx-auto" style={{zIndex:2}}>
                        <div style={{display:"flex", flexDirection:"row"}} >
                            <button style={{width:"5%"}} className="btn btn-light btn-outline-secondary my-1 g-0" onClick={()=>{this.closeAddComponents()}}>{"X"}</button>
                            <button style={{width:"5%"}} className="btn btn-light btn-outline-secondary my-1 g-0" onMouseUp={()=>{this.onMouseUp()}} onMouseDown={()=>{this.onMouseDown(true)}}>{"<"}</button>
                            {optionButtons}
                            <button style={{width:"5%"}} className="btn btn-light btn-outline-secondary my-1 g-0" onMouseUp={()=>{this.onMouseUp()}} onMouseDown={()=>{this.onMouseDown(false)}}>{">"}</button>
                        </div>
                    </div>
                </div> 
                }

                {this.state.height>150 ?
                    <div className={"adminStuff relative-r text-centered " + buttonClass} >
                        {/* If the component is large height wise */}
                    
                        <div className="col px-2" style={{width:"5em"}}>
                            {/* <span>{this.props.webStyle.isMobile?"M":"D"}</span> */}
                            <div className={this.props.webStyle.isMobile?"btn-group-vertical boxShadow":"btn-group boxShadow"} role="group" >
                                <button type="button" className="btn text-nowrap rounded-0" style={buttonStyle}  onClick = {this.openAddComponentAbove}>
                                    +<FontAwesomeIcon className="align-middle " style={buttonStyle} icon={faCaretDown} rotation={180}/>
                                </button>
                                <button type="button" className="btn " style={buttonStyle} onClick = {()=>{this.state.callbacks.moveComponentUp(this.props.index)}}><FontAwesomeIcon  icon={faAngleDoubleUp}/></button>
                                {/* <button type="button" className="btn btn-secondary">Right</button> */}
                            </div>
                            <div className="boxShadow " style={{position:"absolute",top:"4em"}}>
                                <button type="button " style={buttonStyle} className="btn text-nowrap rounded-0"  onClick = {()=>{this.state.callbacks.deleteComponent(this.props.index)}}>
                                    <FontAwesomeIcon className="align-middle "  icon={faTrashAlt}/>
                                </button>
                            </div>
                            
                            <div className={this.props.webStyle.isMobile?"btn-group-vertical boxShadow":"btn-group boxShadow"} style={{position:"absolute",bottom:"2em"}} role="group" >
                                <button type="button" style={buttonStyle} className="btn text-nowrap rounded-0"  onClick = {this.openAddComponentBelow}>
                                    +<FontAwesomeIcon className="align-middle "  icon={faCaretDown}/>
                                </button>
                                <button type="button" className="btn"  style={buttonStyle} onClick = {()=>{this.state.callbacks.moveComponentDown(this.props.index)}}>
                                    <FontAwesomeIcon  icon={faAngleDoubleDown}/></button>
                                {/* <button type="button" className="btn btn-secondary">Right</button> */}
                            </div>
                        </div>
                    </div>
                    :
                    <div className={"adminStuff w-80 " + buttonClass + (this.props.isNavbar?" relative-b":" relative-b")}>
                        <div className = "justify-content-between w-100 row g-0"  onClick={()=>{"admin"}}>
                            {/* <span>{this.props.webStyle.isMobile?"M":"D"}</span> */}
                            <div className="btn-group boxShadow" role="group" style={{width:"5em", zIndex:999}}  onClick={()=>{"admin"}}>
                                {this.props.index != 0 &&<button type="button" className="btn " style={buttonStyle} onClick = {()=>{this.state.callbacks.moveComponentUp(this.props.index)}}><FontAwesomeIcon  icon={faAngleDoubleUp}/></button>}
                                <button type="button" className="btn text-nowrap " style={buttonStyle}  onClick = {this.openAddComponentAbove}>
                                    +<FontAwesomeIcon className="align-middle " style={buttonStyle} icon={faCaretDown} rotation={180}/>
                                </button>
                                {/* <button type="button" className="btn btn-secondary">Right</button> */}
                            </div>
                            <div className="btn-group boxShadow" style={{width:"5em"}} role="group"  onClick={()=>{"admin"}}>
                                <button type="button" style={buttonStyle} className="btn text-nowrap"  onClick = {()=>{this.state.callbacks.deleteComponent(this.props.index)}}>
                                    <FontAwesomeIcon className="align-middle "  icon={faTrashAlt}/>
                                </button>
                                <button type="button" style={buttonStyle} className="btn text-nowrap"  onClick = {this.openAddComponentBelow}>
                                    +<FontAwesomeIcon className="align-middle "  icon={faCaretDown}/>
                                </button>
                                <button type="button" className="btn"  style={buttonStyle} onClick = {()=>{this.state.callbacks.moveComponentDown(this.props.index)}}>
                                    <FontAwesomeIcon  icon={faAngleDoubleDown}/></button>
                                {/* <button type="button" className="btn btn-secondary">Right</button> */}
                            </div>
                        </div>    
                    </div>}

                <div className={"relative-l col text-centered"  + buttonClass}>
                    {/* <div className="row">
                        <span >Hi</span>
                    </div> */}
                    {/* <div className="row">
                        {this.props.index != 0 && <button  className = {"btn "} onClick = {this.openAddComponentAbove}>Add <FontAwesomeIcon   icon={faSortUp} /></button>}
                    </div> */}
                </div>
            </div>
        
            // <div className = {"col"} onMouseEnter={() => this.setButtonsVisibility(true)} onMouseLeave={() => {this.setButtonsVisibility(false);this.closeAddComponents()}}>
            //     {/* Above component */}
            //     {this.state.areAboveOptionsVisible && <div className = {"row component-options"}>{options}</div> }
            //         {/* To the right of component */}
            //         <div className = {"row w-100"} style={{position:"relative"}}>
            //             {this.children}
            //             <div className = {"col floatOnTopRight hidden"}>
            //                 <div style={{height:"100%",display:"flex",flexDirection:"column",justifyContent:"baseline",zIndex:999}}>
            //                     {/* {this.props.index != 0 && <button  className = {buttonClass} onClick = {this.openAddComponentAbove}>Add <FontAwesomeIcon   icon={faSortUp} /></button>} */}
    
            //                     <div className = {"row"}>
            //                         <button  className = {buttonClass} onClick = {this.openAddComponentAbove}>Add <FontAwesomeIcon   icon={faSortUp} /></button>
            //                         {this.props.index != 0 && <button  className = {buttonClass} onClick = {()=>{this.state.callbacks.moveComponentUp(this.props.index)}}>Move <FontAwesomeIcon   icon={faSortUp} /></button>}
            //                     </div>
                                
            //                     <div className = {"row"}>
            //                     <button  className = {buttonClass} onClick = {()=>{this.state.callbacks.deleteComponent(this.props.index)}}>Delete</button >
            //                     <button  className = {buttonClass} onClick = {this.closeAddComponents}>X</button >
            //                     </div>
                                
            //                     <div className = {"row"}>
            //                         <button  className = {buttonClass} onClick = {this.openAddComponentBelow}>Add <FontAwesomeIcon   icon={faSortDown} /></button>
    
            //                         {this.props.index != this.props.componentCount - 1 && <button  className = {buttonClass} onClick = {()=>{this.state.callbacks.moveComponentDown(this.props.index)}}>Move <FontAwesomeIcon   icon={faSortDown} /></button>}
            //                     </div>
            //                 </div>
            //             </div>
            //     </div>
            //     {/* Below component */}
            //     {this.state.areBelowOptionsVisible && <div className = {"row component-options"}>{options}</div>}
            
            //   </div>
        )
    }
    else{
        return (<div>{this.children}</div>)
    }
    

    };
}