import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// import {Bootst}a

const Search = styled.div`
    /* .fix-bar {
        width: 100%;
        height: 20vh;
        display: flex;
        position: absolute;
    } */
    
    .searchbar {
        width: 100%;
        height: 7vh;
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 3%;
        margin-bottom: 3%;
    }

    input {
        width: 80%;
        height: 100%;
        text-align: center;
        font-size: 2rem;
        font-weight: bolder;
        font-size: larger;
        background: white;
        letter-spacing: 20px;
        border: 3px solid white;
        border-radius: 5px;
    }
`
const Main = styled.div`

    .Big_container {
        margin: auto;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        border: 5px solid white;
        border-radius: 5px;
        font-size: larger;
        width: 80%;
        height: 70vh;
    }

    .hash_container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        font-weight: bolder;
        letter-spacing: 5px;
        flex: 1;
        padding: 2%;
        background-color: white;
        width: 100%;
    }

    .middle_container {
        flex: 9;
        width: 100%;
    }

    .wrap_middle {
        display: flex;
        flex-direction: row;
        width: 100%;
    }
    

    .left-box, .right-box {
        line-height: 200%;
        padding: 2%;
        flex: 2;
    }

    .empty-box {
        line-height: 200%;
        padding: 2%;
        flex: 1;
    }

    .block-line{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .kindofblock {
        font-weight: bolder;
        color : #555;
    }

    .valueofblock {
        color : #555;
    }

    .wrap_bottm {
        display: flex;
        flex-direction: row;
        line-height: 250%;
        padding: 2%;
        /* border: 5px blue solid; */

    }

    .bottm{
        flex: 4.4;

    }
    .empty-box2 {
        flex: 1;
        /* background-color: blue; */
    }

    .empty-space {
        width: 100%;
        height: 7vh;
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
        axios.get('http://localhost:4000/search')
        .then((res) => {
            console.log(res.data)
            setAllData(res.data)
            setFilteredData(res.data)
            // setAllData(res.data)

        })
        }, []);
            
        return (
            <div backgroundcolor='black'>
                <Search>
                    <div className='fix-bar'>
                        <div className='searchbar'>
                            <input type="text" onChange={(event) => handleSearch(event)} placeholder="INPUT THE HEIGHT NUMBER OF BLOCK !" />
                        </div>
                    </div>
                </Search>
                    <div>{filteredData.map((value,index)=>{
                    return(
                        <Main>
                            <div key={value.height} >
                                <div className='Big_container' >
                                    <div className='hash_container' >
                                        hash : {value.hash}
                                    </div>

                                    <div className='middle_container'>
                                        <div className='wrap_middle'>
                                            <div className='empty-box'> </div>
                                            <div className='left-box'>
                                                <div className='block-line'>
                                                    <span className='kindofblock'>height :</span>
                                                    <span style={{ color : 'black', fontWeight : 'bolder', fontSize : '1.5rem' }}>{value.height}</span>
                                                </div>
                                                <div className='block-line'>
                                                    <span className='kindofblock'>bits :</span>
                                                    <span className='valueofblock'>{value.bits}</span>
                                                </div>
                                                <div className='block-line'>
                                                    <span className='kindofblock'>confirmation :</span>
                                                    <span className='valueofblock'>{value.confirmation}</span>
                                                </div>
                                                <div className='block-line'>
                                                    <span className='kindofblock'>strippedsize :</span>
                                                    <span className='valueofblock'>{value.strippedsize}</span>
                                                </div>
                                                <div className='block-line'>
                                                    <span className='kindofblock'>size :</span>
                                                    <span className='valueofblock'>{value.strippedsize}</span>
                                                </div>
                                                <div className='block-line'>
                                                    <span className='kindofblock'>weight :</span>
                                                    <span className='valueofblock'>{value.weight}</span>
                                                </div>
                                            </div>
                                            <div className='empty-box'> </div>
                                            <div className='right-box'>
                                                <div className='block-line'>
                                                    <span className='kindofblock'>version :</span>
                                                    <span className='valueofblock'>{value.version}</span>
                                                </div>
                                                <div className='block-line'>
                                                    <span className='kindofblock'>vtime :</span>
                                                    <span className='valueofblock'>v{value.time}</span>
                                                </div>
                                                <div className='block-line'>
                                                    <span className='kindofblock'>mediantime :</span>
                                                    <span className='valueofblock'>{value.mediantime}</span>
                                                </div>
                                                <div className='block-line'>
                                                    <span className='kindofblock'>nonce :</span>
                                                    <span className='valueofblock'>{value.nonce}</span>
                                                </div>
                                                <div className='block-line'>
                                                    <span className='kindofblock'>difficulty :</span>
                                                    <span className='valueofblock'>{value.difficulty}</span>
                                                </div>
                                                <div className='block-line'>
                                                    <span className='kindofblock'>chainwork :</span>
                                                    <span className='valueofblock'>{value.chainwork}</span>
                                                </div>
                                            </div>
                                            <div className='empty-box'> </div>

                                        </div >
                                        <div className='wrap_bottm'>
                                            <div className='empty-box2'> </div>
                                            <div className='bottm'>
                                                <div className='block-line'>
                                                    <span className='kindofblock'>merkleroot :</span>
                                                    <span className='valueofblock'>{value.merkleroot}</span>
                                                </div>
                                                <div className='block-line'>
                                                    <span className='kindofblock'>previousblockhash :</span>
                                                    <span className='valueofblock'>{value.previousblockhash}</span>
                                                </div>
                                                <div className='block-line'>
                                                    <span className='kindofblock'>nextblockhash :</span>
                                                    <span className='valueofblock'>{value.nextblockhash}</span>
                                                </div>
                                            </div>
                                            <div className='empty-box2'> </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="empty-space"></div>

                            </div>
                        </Main>
                    )})}
                </div>
            </div>
            
        )
}




export default BlockSearch;