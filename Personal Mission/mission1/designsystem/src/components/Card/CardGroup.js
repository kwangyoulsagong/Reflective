import React from "react";
import Card from "./Card";
function CardGroup(){
  async function fetchData(){
    try{
      let response=await fetch("https")
      let data=await response.json()
      console.log(data)
    }
    catch(error){
      console.error("error")
    }
  }
    return(
        // props 전달
        <>
         <Card
          title="Card 1"
          description="This is the description for Card 1."
          variant="primary"
        />
        <Card
          title="Card 2"
          description="This is the description for Card 2."
          variant="secondary"
        />
        <Card
          title="Card 3"
          description="This is the description for Card 3."
          variant="success"
        />
        </>
    )
}
export default CardGroup