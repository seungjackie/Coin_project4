import React, {useState}  from "react";
import axios from "axios";

function Getblockcount() {
    const fetchgetblockcount = async() => {
        axios.post("http://localhost:4000/getblockcount").then((response) => {})
    }

    return(
        <>
            
        </>
    )
}

export default Getblockcount;