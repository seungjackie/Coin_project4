import React, {useState}  from "react";
import axios from "axios";

function Getblockhash() {
    const [blockindex, setBlockindex] = useState('');

    const onBlockindexHandler = (event) => {
        setBlockindex(event.currentTarget.value)
    }

    const [blockhash, setBlockhash] = useState('');

    const onGetblockhashHandler = (event) => {
        event.preventDefault();
        fetchgetblockhash();
    }

    const fetchgetblockhash = async() => {
        axios.post("http://localhost:4000/getblockhash_result", {
            index: blockindex
        }).then((response) => console.log(response))
    }

    return(
        <>
            <h2>getblockhash</h2>
            <form onSubmit={onGetblockhashHandler}>
                <input  type="number" value={blockindex || ''} onChange={onBlockindexHandler} placeholder="write block index"/>
                <button type="submit">submit</button>
            </form>
            <br />
            <input  type="text" value={blockhash} readOnly/>
        </>
    )
}

export default Getblockhash;