import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { values } from 'lodash';
import './block.css';
import styled from 'styled-components';

// import {Bootst}


const Main = styled.div`
    .Big_container {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border: 5px black solid;
    width: 50vw;
    height: 70vh;
    }


    .hash_container {
        flex: 1;
    }

    .middle_container {
        flex: 9;
        background-color: yellow;
        display: flex;
        flex-direction: row;
    }

    .small_con1{
        flex: 1;
        background-color: blue;
    }

    .small_con2 {
        flex: 1;
        background-color: pink;
    }

`;

const BlockSearch = (event) =>{
    


    //이렇게 연결한느지?
    const USER = 'parkisak';
    const PASS = 1234;
    const PORT = 9776;

    const [allData,setAllData] = useState([]);
    const [filteredData,setFilteredData] = useState(allData);



    const handleSearch = (event) => {
        let value = event.target.value.toLowerCase();
        let result = [];
            console.log(value);
            if (value!=="") {
            result = allData.filter((data) => {
                return data.height == Number(value);
            });
        }
        setFilteredData(result);
    }


    useEffect(() => {
        // axios('https://jsonplaceholder.typicode.com/albums/1/photos')
        // db에서 정보를 가져와야함
        // axios.get(`http://${USER}:${PASS}@127.0.0.1:${PORT}`)                           //rpc하는 포트,요청보낼시 정보가 필요하다
        // .then(response => {
        // console.log(response.data)
        // setAllData(response.data);
        // setFilteredData(response.data);
        // })
        // .catch(error => {
        // console.log('Error getting fake data: ' + error);
        // })
        axios.get('http://localhost:4000/search')
        .then((res) => {
            console.log(res.data)
            setAllData(res.data)
            setFilteredData(res.data)
            // setAllData(res.data)

        })
        }, []);

        // export const blockLink = (height) => {
        //     return ( <Link to={"/block/" + height}>{height}</Link>);
        // };
        
        // const styles = {
        //     display:'inline',
        //     width:'200',
        //     height:600,
        //     float:'left',
        //     padding:5,
        //     border:'0.5px solid black',
        //     marginBottom:10,
        //     marginRight:10
        //     }
        
            
        return (
            <div backgroundcolor='black'>
                <div style={{ margin: 'auto', marginTop: '10%' }}>
                    <label>Search:</label>
                    <input type="text" onChange={(event) => handleSearch(event)} margin="auto"/>
                </div>
                    <div style={{padding:10}}>
                    {filteredData.map((value,index)=>{
                        return(
                            <Main>
                                <div key={value.height} >
                                    <div className='Big_container' >
                                        <div className='hash_container' >
                                            hash: {value.hash}
                                        </div>

                                        <div className='middle_container'>
                                            <div className='small_con1'>
                                                cc
                                            </div>
                                            <div className='small_con2'>
                                                dd
                                            </div>
                                        </div>

                                    </div>

                                {/* <div style={styles}> */}
                                <table className="block-table">
                                    <tbody>
                                        <tr><td className="tdLabel">hash: </td><td>{value.hash}</td></tr>
                                        <tr><td className="tdLabel">height: </td><td>{value.height}</td></tr>
                                        <tr><td className="tdLabel">bits: </td><td>{value.bits}</td></tr>
                                        <tr><td className="tdLabel">confirmation: </td><td>{value.confirmation}</td></tr>
                                        <tr><td className="tdLabel">strippedsize: </td>{value.strippedsize}</tr>
                                        {/* <td><Link to={`../block/${this.state.block.parentHash}`}>{this.state.block.parentHash}</Link></td></tr> */}
                                        <tr><td className="tdLabel">size: </td><td>{value.strippedsize}</td></tr>
                                        <tr><td className="tdLabel">weight: </td><td>{value.weight}</td></tr>
                                        <tr><td className="tdLabel">version: </td><td>{value.version}</td></tr>
                                        <tr><td className="tdLabel">versionhex: </td><td>{value.versionhex}</td></tr>
                                        <tr><td className="tdLabel">merkleroot: </td><td>{value.merkleroot}</td></tr>
                                        <tr><td className="tdLabel">time: </td><td>{value.time}</td></tr>
                                        <tr><td className="tdLabel">mediantime: </td><td>{value.mediantime}</td></tr>
                                        <tr><td className="tdLabel">nonce: </td><td>{value.nonce}</td></tr>
                                        <tr><td className="tdLabel">difficulty: </td><td>{value.difficulty}</td></tr>
                                        <tr><td className="tdLabel">chainwork: </td><td>{value.chainwork} </td></tr>
                                        <tr><td className="tdLabel">previousblockhash: </td><td>{value.previousblockhash} </td></tr>
                                        <tr><td className="tdLabel">nextblockhash: </td><td>{value.nextblockhash} </td></tr>
                                    </tbody>
                                </table>
                                    {/* hash: {value.hash}
                                    <hr />
                                    height: {value.height}
                                    <hr />
                                    bits: {value.bits}
                                    <hr />
                                    confirmation: {value.confirmation}
                                    <hr />
                                    strippedsize: {value.strippedsize}
                                    <hr />
                                    size: {value.size}
                                    <hr />
                                    hi :{value.weight}
                                    <hr />
                                    {value.version}
                                    <hr />
                                    {value.versionhex}
                                    <hr />
                                    {value.merkleroot}
                                    <hr />
                                    {value.time}
                                    <hr />
                                    {value.mediantime}
                                    <hr />
                                    {value.nonce}
                                    <hr />
                                    {value.difficulty}
                                    <hr />
                                    {value.chainwork}
                                    <hr />
                                    {value.previousblockhash}
                                    <hr />
                                    {value.nextblockhash} */}

                                {/* </div> */}
                            </div>
                            </Main>
                    )
                    })}
                </div>
            </div>
            
        )
}




export default BlockSearch;