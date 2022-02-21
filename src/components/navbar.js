import React, { useState, useContext, useEffect  } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  useDroppable
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import "bootstrap/dist/js/bootstrap.bundle.min";

import {
  restrictToVerticalAxis,
  restrictToHorizontalAxis,
  restrictToWindowEdges,
  snapCenterToCursor,
} from '@dnd-kit/modifiers';

import Fade from 'react-reveal/Fade';


import { faAngleDoubleRight, faAngleDoubleLeft,faCaretSquareDown,  faPencilAlt, faTrashAlt,  faCheck, faSortDown, faArrowsAlt,  faCarrot, faShoppingCart , faArrowCircleDown, faHamburger, faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare, faTwitter, faInstagram, faYoutube, faTiktok, faDiscord, faEtsy, faGithub, faImdb, faLinkedinIn,faPatreon, faPinterestP, faReddit, faShopify, faSpotify, faSoundcloud, faSnapchatGhost, faGooglePlusG } from "@fortawesome/free-brands-svg-icons"


import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

import { MouseSensor, KeyboardSensor } from "./Sensors";
import AdminNavWrapper from "./AdminNavWrapper";

import {WebContext} from "../App"


import {
  Link
} from "react-router-dom";


// TODO dropdowns need to open only their dropdowns

export default function NavBar(props) {
  const [isEdit, setIsEdit] = useState(false);
  const [isShowDeleteSpot, showDeleteSpot] = useState(false);
  const [isShowDropdownDeleteSpot, showDropdownDeleteSpot] = useState(false);
  const [isShowButtons, showButtons] = useState(false);

  const webContext = useContext(WebContext);

  const [navData, setNavData] = useState([
    {
      id:1,
      name:"Site Creator",
      path:"/"
    },
    {
      id:2,
      name:"How It Works",
      path:"/how-it-works"
    }, 
    {
      id:3,
      name:"Need Help",
      path:"/need-help"
    },
    {
      id:4,
      name:"Getting Started",
      path:"/getting-started"
    },
    {
      id:5,
      name:"Components",
      path:"/components"
    },
    
    {
      id:6,
      name:"Contact",
      path:"/contact"
    }
  ]);

  useEffect(() => {
    if (webContext.msgPort == "save"){

      const componentData = { 
        name: props.componentName,
        id: props.id,
        content: {
          navData:navData
        }
      }

      webContext.saveComponentData(props.pageName,props.index,componentData)
    }
  }, [webContext.msgPort]);

  // [
  //   {
  //     id:1,
  //     name:"Site Creator",
  //     path:"/"
  //   },
  //   {
  //     id:2,
  //     name:"How It Works",
  //     path:"/how-it-works"
  //   }, 
  //   {
  //     id:3,
  //     name:"Need Help",
  //     path:"/need-help"
  //   },
  //   {
  //     id:4,
  //     name:"Getting Started",
  //     path:"/getting-started"
  //   },
  //   {
  //     id:5,
  //     name:"Components",
  //     path:"/components"
  //   },
    
  //   {
  //     name:"Contact",
  //     path:"/contact"
  //   }
  // ]

  
  // useEffect(() => {
  //   if(props.pages){
  //     const pages = props.pages;
     
  //     setNavData(pages)
  
  // }
  // }, []);

  // const [items, setItems] = useState(["1", "2", "3"]);

  const componentMapping = {
    Email:faEnvelope,
    Facebook: faFacebookSquare,
    Twitter: faTwitter,
    Instagram: faInstagram,
    Youtube: faYoutube,
    Tiktok: faTiktok,
    Discord: faDiscord,
    Etsy: faEtsy,
    Github: faGithub,
    Imdb: faImdb,
    LinkedinIn: faLinkedinIn,
    Patreon: faPatreon,
    Pinterest: faPinterestP,
    Reddit: faReddit,
    Shopify: faShopify,
    Spotify: faSpotify,
    Soundcloud: faSoundcloud,
    Snapchat: faSnapchatGhost
  };


  const sensors = useSensors(useSensor(MouseSensor,{
    activationConstraint: {
      delay: 100,
      tolerance: 5,
    }

  }));

  // , {
  //   activationConstraint: {
  //     delay: 1000,
  //   },
  // }

  let navItems = [];

  if (isEdit) {
    // for(var index = 1; index < navData.length; index++){
    [...navData.slice(1)].forEach((el,index) => {
      // let el = navData[index]

      let dropdownItems = [];

      if ("dropdown" in el) {
        el.dropdown.forEach((subEl, subIndex) => {
          dropdownItems.push(
            <DropDownLink key = {el.name+subEl.name+subEl.path+"DropDown"}
                          isEdit = {true} webStyle = {webContext.webStyle}
                          name = {subEl.name} path = {subEl.path} 
                          onChangeName = {(evt) => {
                            handleLinkDropdownChange(evt, index, subIndex, "name");
                          }}
            
                          onChangePath = {(evt) => {
                            handleLinkDropdownChange(evt, index, subIndex, "path");
                          }}/>
          );
        });
      }

      navItems.push(
        <li className={"nav-item "+(webContext.webStyle.isMobile?"ms-2":"mx-4")} 
            key={"edit"+el.name+"input2"}
        >
          <div key={"edit"+el.name+"div"}>
            {"dropdown" in el ? (
              <div  key={"edit"+el.name+"div2"}
                    className= {"position-relative "+(webContext.webStyle.isMobile ? "input-group" : "")}>
                <input
                  key={"edit"+el.name+"input"}
                  className={
                    "form-control-plaintext" + (webContext.webStyle.isMobile ? " w-50" : "")
                  }
                  onChange={(evt) => {
                    handleLinkChange(evt, index+1, "text");
                  }}
                  style ={{width:`${el.name.length+2}ch`,color:webContext.webStyle.lightShade}}

                  value={el.name}
                />
                <Link
                  key={"edit"+el.name+"dropToggle"}
                  className={
                    "nav-link dropdown-toggle" + (webContext.webStyle.isMobile ? " w-50" : "")
                  }
                  style ={{color:webContext.webStyle.lightShade}}
                  data-no-dnd="true"
                  data-bs-toggle="dropdown"
                  id="navbarDropdown"
                  role="button"
                  aria-expanded="false"
                  path="javascript:void(0)"
                >
                  Dropdown
                </Link>
                <ul key={"edit"+el.name+"ul"} className="dropdown-menu boxShadow" style={{backgroundColor:webContext.webStyle.darkAccent}} aria-labelledby="navbarDropdown">
                  {dropdownItems}
                </ul>
              </div>
            ) : (
              <div key={"edit"+el.name+"div"} className={webContext.webStyle.isMobile ? "input-group" : ""} >
                <input
                  key={"edit"+el.name+"input1"}
                  className={
                    "form-control-plaintext" + (webContext.webStyle.isMobile ? " w-50" : "")
                  }
                  onChange={(evt) => {
                    handleLinkChange(evt, index+1, "name");
                  }}
                  style ={{width:`${el.name.length+2}ch`,color:webContext.webStyle.lightShade}}

                  value={el.name}
                />
                <input
                  key={"edit"+el.name+"input2"}
                  className={
                    "form-control-plaintext" + (webContext.webStyle.isMobile ? " w-50" : "")
                  }
                  onChange={(evt) => {
                    handleLinkChange(evt, index+1, "path");
                  }}
                  style ={{width:`${el.path.length+2}ch`,color:webContext.webStyle.lightShade}}
                  value={el.path}
                />
              </div>
            )}
          </div>
        </li>
      );
    });

    // Move Mode
  } else {
    for(var index = 1; index < navData.length; index++){

      let el = navData[index]

      let dropdownItems = [];

      if ("dropdown" in el) {
        el.dropdown.forEach((el, index) => {
          dropdownItems.push(
            <AdminNavWrapper
              key={el.id}
              id={el.id}
              // order = {el.or}
              className={"py-2 "}
            >
              <li className="nav-item ms-2">
                <Link
                  data-no-dnd="true"
                  className="nav-link active "
                  aria-current="page"
                  path="javascript:void(0)"
                >
                  {el.name}
                </Link>
              </li>
            </AdminNavWrapper>
          );
        });
      }

      navItems.push(
        <AdminNavWrapper
          key={el.id}
          id={el.id}
          // order = {el.or}
          className={"py-2 "}
        >
          <li className={"nav-item "+(webContext.webStyle.isMobile?"ms-2":"mx-4")} style ={{whiteSpace: "nowrap"}}>
            {"dropdown" in el ? (
              <div className="position-relative ">
                <a
                  style={{color:webContext.webStyle.lightShade}}
                  className="  dropdown-toggle text-decoration-none"
                  data-bs-toggle="dropdown"
                  id={"navbarDropdown" + el.id}
                  role="button"
                  aria-expanded="false"
                  path="javascript:void(0)"
                >
                  {el.name}
                </a>
                <ul
                  className="dropdown-menu border-0 rounded-0 boxShadow" style={{backgroundColor:webContext.webStyle.darkAccent, top:"2.5em"}}
                  aria-labelledby={"navbarDropdown" + el.id}

                >
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}

                    // modifiers = {[ verticalListSortingStrategy]}

                    onDragStart={() => {
                      showDropdownDeleteSpot(true);
                    }}
                    onDragEnd={(evt) => {
                      handleDropdownDragEnd(evt, index);
                      showDropdownDeleteSpot(false);
                      
                    }}
                  >
                    <SortableContext
                      items={el.dropdown}
                      strategy={verticalListSortingStrategy}
                    >
                      {dropdownItems}
                      {isShowDropdownDeleteSpot && (
                        <DeleteDrop id={`${index}:deleteDrop`} />
                      )}

                      <button
                        className="btn "
                        data-no-dnd="true"
                        type="button"
                        onClick={(evt) => {
                          addDropdownlink(evt, index);
                        }}
                      >
                        <FontAwesomeIcon icon={faPlusSquare}/>
                      </button>
                    </SortableContext>
                  </DndContext>
                </ul>
              </div>
            ) : (
              <Link
                data-no-dnd="true"

                style={{color:webContext.webStyle.lightShade}}
                className={"text-decoration-none "}
                aria-current="page"
                to={el.path}
              >
                {el.name}
              </Link>
            )}
          </li>
        </AdminNavWrapper>
      );
    };
  }

  const socialLinks = webContext.socialMedias.filter(({location}) => {
    if (location === "New Link") {
      return false; // skip
    }
    return true;
    }).map(({link,location}) =>
      <li className="py-2">
        <Link className={'nav-link social-link'} key = {location}  href={`${link}`}  style={{color:webContext.webStyle.lightShade}}><FontAwesomeIcon className={"sm-icons"} icon={componentMapping[location]} /></Link>
      </li>
    );

  return (
    <div
      className="fullWidth boxShadow px-5  " style={{backgroundColor:webContext.webStyle.darkAccent, color:webContext.webStyle.lightShade, position: "sticky",top: 0, alignSelf: "flex-start",zIndex:1}}
      onMouseEnter={() => {
        showButtons(true);
      }}
      onMouseLeave={() => {
        showButtons(false);
      }}
    >
      {/* style={{backgroundColor:webContext.webStyle.lightShade}} */}
        <nav className="navbar navbar-expand-lg mx-4 p-0 container mx-auto">
          
          <div className={"container-fluid g-0 "+(webContext.webStyle.isMobile?" ms-3":"")}>
            {isEdit?
            <div data-no-dnd="true">
              <input
                  style ={{color:webContext.webStyle.lightShade}}

                  className="form-control-plaintext w-50"
                  value={navData[0].name}
                  onChange={(evt) => {
                    handleLinkChange(evt, 0, "name");
                  }}
                />
                <input
                  className="form-control-plaintext w-50"
                  style ={{color:webContext.webStyle.lightShade}}

                  value={navData[0].path}
                  onChange={(evt) => {
                    handleLinkChange(evt, 0, "path");
                  }}
                />
            </div>
            :
            <Link className="navbar-brand" style={{color:webContext.webStyle.lightShade}}>{navData[0].name}</Link>
            }
            <button
              className="navbar-toggler btn"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <FontAwesomeIcon  style={{color:webContext.webStyle.lightShade}} icon={faBars}/>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className={"navbar-nav me-auto mb-2 mb-lg-0 "+(webContext.webStyle.isMobile?" ":"align-items-center")}>
                {isEdit ? (
                  <div data-no-dnd="true" className={"d-flex "+(webContext.webStyle.isMobile?"flex-column ":"flex-direction-col")}>
                      {navItems}
                  </div>
                  
                ) : (
                  <DndContext
                    sensors={sensors}
                    modifiers = {[ webContext.webStyle.isMobile
                      ? restrictToVerticalAxis
                      : restrictToHorizontalAxis]}
                    collisionDetection={closestCenter}
                    onDragStart={() => {
                      showDeleteSpot(true);
                    }}
                    onDragEnd={(evt) => {
                      handleDragEnd(evt);
                      showDeleteSpot(false);
                    }}
                  >
                    <SortableContext
                      items={navData}
                      strategy={
                        webContext.webStyle.isMobile
                          ? verticalListSortingStrategy
                          : horizontalListSortingStrategy
                      }
                    >
                      {navItems}
                      {isShowDeleteSpot && (
                        <div className={"py-2"}>
                          <DeleteDrop id={"deleteDrop"} />
                        </div>
                      )}
                    </SortableContext>
                    
                  </DndContext>
                  
                )}
              </ul>
              {isShowButtons && (
                  <div
                    data-no-dnd="true"
                    className="btn-group  "
                    role="group"
                    aria-label="Basic example"

                    // onClick={()=>{alert("group")}}
                  >
                    <button
                      className="btn border-end mx-2"
                      type="button"
                      onClick={() => {
                        addLink();
                      }}
                    >
                      <FontAwesomeIcon icon={faPlusSquare} style={{color:webContext.webStyle.lightShade}} />
                    </button>
                      
                    <button
                      className="btn mx-1 px-0"
                      type="button"
                      onClick={() => {
                        addLink(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faCaretSquareDown} style={{color:webContext.webStyle.lightShade}}/>

                    </button>
                    <button
                      className="btn border-start mx-2"
                      type="button"
                      onClick={() => {
                        setIsEdit(!isEdit); 
                      }}
                    >
                      <FontAwesomeIcon icon={isEdit?faArrowsAlt:faPencilAlt} style={{color:webContext.webStyle.lightShade}}/> 
                    </button>
                  </div>
                )}
                  <ul className="navbar-nav sm-icons justify-content-start me-0 " style={{float:0}} >
                    {socialLinks}
                    
                    {Object.keys(webContext.cart).length != 0 &&
                    <li className="position-relative">
                      <Link className='col ms-3' to={"/checkout"}  style={{color:webContext.webStyle.lightShade}}><FontAwesomeIcon className={"m-icons"} icon={faShoppingCart} /></Link>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill ">
                        {Object.keys(webContext.cart).length}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </li>
                    } 
                  </ul>
                
            </div>
          </div>
        </nav>
      </div>
  );

  function addLink(isDropdown) {
    const newLink = isDropdown
      ? {
          id: Math.random() * 10000,
          name: "New Dropdown",
          dropdown: [{ name: "New Link", path: "/", id: Math.random() * 10000 }]
        }
      : { id: Math.random() * 10000, name: "New Link", path: "/" };

    setNavData([...navData, newLink]);
  }

  function addDropdownlink(event, index) {
    setNavData((prevData) => {
      // alert(index);
      let newData = [...prevData];

      newData[index].dropdown = [
        ...newData[index].dropdown,
        { id: Math.random() * 10000, name: "New Link", path: "/" }
      ];

      setNavData(newData);
    });
    event.stopPropagation();
  }

  function removeLink(index) {
    // If dropdown be super sure because it will remove all the subdata
    if (window.confirm("Are you sure you want to remove this link?")) {
      setNavData((prevData) => {
        // alert(index);
        let newData = [
          ...prevData.slice(0, index),
          ...prevData.slice(index + 1)
        ];

        setNavData(newData);
      });
    }
  }

  function removeDropdownLink(parentIndex, index) {
    // If dropdown be super sure because it will remove all the subdata
    if (window.confirm("Are you sure you want to remove this link?")) {
      setNavData((prevData) => {
        // alert(index);
        let newData = [...prevData];
        let newDropdown = [
          ...newData[parentIndex].dropdown.slice(0, index),
          ...newData[parentIndex].dropdown.slice(index + 1)
        ];
        newData[parentIndex].dropdown = newDropdown;
        setNavData(newData);
      });
    }
  }

  function handleLinkChange(event, index, type) {
    setNavData((prevData) => {
      let newData = [...prevData];

      newData[index][type] = event.target.value;

      return newData;
    });
  }

  function handleLinkDropdownChange(event, parentIndex, index, type) {
    setNavData((prevData) => {
      let newData = [...prevData];

      newData[parentIndex].dropdown[index][type] = event.target.value;

      return newData;
    });
  }

  function handleDragEnd(event) {
    const { active, over } = event;

        // event.preventDefault();


    if (active.id !== over.id) {
      const oldIndex = active.data.current.sortable.index;

      if (!over.data.current) {
        removeLink(oldIndex);
        return;
      }

      const newIndex = over.data.current.sortable.index;

      // removeLink

      setNavData((prevData) => {
        return arrayMove(prevData, oldIndex, newIndex);
      });
    }

  }

  function handleDropdownDragEnd(event, index) {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = active.data.current.sortable.index;

      // if( === 0){
      if (!over.data.current) {
        removeDropdownLink(index, oldIndex);
        return;
      }

      const newIndex = over.data.current.sortable.index;

      setNavData((prevData) => {
        let newData = [...prevData];

        newData[index].dropdown = arrayMove(
          newData[index].dropdown,
          oldIndex,
          newIndex
        );

        return newData;
      });
    }
    // event.preventDefault();

  }

}

const DeleteDrop = (props) => {
  const { setNodeRef } = useDroppable({
    id: props.id
  });
  return (
    <div ref={setNodeRef}>
      <li
        className="nav-link active border-primary rounded-3"
        style={{ borderStyle: "dashed", borderWidth: "1px" }}
      >
        Delete
      </li>
    </div>
  );
};



//  I really need to consolidate this....

const DropDownLink = (props) =>{
  const webContext = useContext(WebContext);

  if (props.isEdit)
    return (
      
      <li className="nav-item col" >
        <div className="input-group " >
          <input
            style ={{color:webContext.webStyle.lightShade}}

            className="form-control-plaintext w-50"
            value={props.name}
            onChange={props.onChangeName}
            
          />
          <input
            className="form-control-plaintext w-50"
            style ={{color:webContext.webStyle.lightShade}}
            value={props.path}
            onChange={props.onChangePath}
          />
        </div>
      </li>
    )
  else{
    return(<div></div>)
  }
}