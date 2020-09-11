import React from 'react'
import '../App.css';

 const MemeGen = ({template ,onClick}) =>{
    return(
        <>
        <img style={{
        width:"300px",height:"300px" ,border:"1px solid black"}}
        src={template.url}
        alt={template.url} 
        key={template.id} 
        onClick={onClick}></img>
        </>
    )
}
export default MemeGen;