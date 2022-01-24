import React, { useState } from "react";

function Shop(props){
    const [productIds, setProductIds] = useState([props.id+'-prod1',props.id+'-prod2',props.id+'-prod3'])

    return(
        <div className = "col">
            {productIds.map((id) => (
                <div className = {"row"}>
                    <Product key = {id} id = {id}/>
                </div>
            ))}
           
        </div>)
}