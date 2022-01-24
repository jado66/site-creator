import React, { useState, useEffect, createRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import PictureFrame from "./pictureFrame";
import ContentEditable from "react-contenteditable";

export default function Product(props) {
    const [name, setName] = useState("Product");
    const [description, setDescription] = useState("Product's Description");
    const [price, setPrice] = useState("$5");

    const headerRef = createRef()
    const descriptionRef = createRef()
    const priceRef = createRef();

    // On component load
    useEffect(() => {

        // Update the document title using the browser API
        const storedName = localStorage.getItem(props.id+"-name");
        const storedPrice = localStorage.getItem(props.id+"-price");        
        const storedDescription = localStorage.getItem(props.id+"-description");
        
        if (storedName){
            setName(storedName)
        }
        if (storedPrice){
            setPrice(storedPrice)
        }
        if (storedDescription){
            setDescription(storedDescription)
        }       
    
    }, []);



    const changeName = (val) => {
        setName(val);
        localStorage.setItem(props.id+"-name",val);
    }

    const changeDescription = (val) => {
        setDescription(val)
        localStorage.setItem(props.id+"-description",val);
    }

    const changePrice = (val) => {
        localStorage.setItem(props.id+"-price",val);
        setPrice(val)
    }


    const addToCart = () => {

        props.cartCallbacks.addToCart(
        {
            name:name,
            quantity:1,
            price:price,
            description:description
        })
        
    }

    const buyNow = () => {
        localStorage.setItem("buy-now",
                            JSON.stringify({
                                name:name,
                                quantity:1,
                                price:price,
                                description:description
                            }));
    }

    return( 
        <div className = "row p-3 text-start boxShadow" style={{backgroundColor:props.webStyle.lightShade}}>
            <div className = "col p-0">
               <PictureFrame noBorder ={true} id = {props.id+'-picture'} webStyle = {props.webStyle}/>
            </div>
            <div className = "col ms-3 position-relative">
                <div className = "row">
                    <ContentEditable
                        innerRef={headerRef}
                        html={name} // innerHTML of the editable div
                        disabled={!props.webStyle.isEditMode}       // use true to disable editing
                        onChange={(evt)=>{changeName(evt.target.value)}} // handle innerHTML change
                        tagName='h4' // Use a custom HTML tag (uses a div by default)
                    />
                </div>
                <div className = "row"> 
                    <ContentEditable
                        innerRef={priceRef}
                        html={price} // innerHTML of the editable div
                        disabled={!props.webStyle.isEditMode}       // use true to disable editing
                        onChange={(evt)=>{changePrice(evt.target.value)}} // handle innerHTML change
                        tagName='h5' // Use a custom HTML tag (uses a div by default)
                    />
                </div>
                <div className="row flex-grow-1 ">
                    <ContentEditable
                        innerRef={descriptionRef}
                        html={description} // innerHTML of the editable div
                        disabled={!props.webStyle.isEditMode}       // use true to disable editing
                        onChange={(evt)=>{changeDescription(evt.target.value)}} // handle innerHTML change
                        tagName='p' // Use a custom HTML tag (uses a div by default)
                    />
                </div>
                <div className="row position-absolute bottom-0 w-100 ">
                    <div className = "col text-start"> 
                        <button className = "btn " onClick = {addToCart} style={{backgroundColor:props.webStyle.darkAccent, color:props.webStyle.lightShade}}><FontAwesomeIcon className="me-2" icon = {faCartPlus}/>Add</button>
                    </div>
                    <div className = "col text-end"> 
                        <button className = "btn " onClick = {buyNow} 
                            style={{backgroundColor:props.webStyle.darkAccent,  color:props.webStyle.lightShade}}>Buy Now</button>
                        {/* Add to cart just gets the cart and updates it. That's all. */}
                    </div>
                </div>
            </div>
            
        </div>
    );
  }
