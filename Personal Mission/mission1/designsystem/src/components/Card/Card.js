import React from "react";
import "./Card.css"

const Card =({title, description, variant})=>{
    const className=`card card-${variant}`
    return(
        // 받은 props 렌더링
    <div className={className}>
        <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
    </div>
    )
}
export default Card;