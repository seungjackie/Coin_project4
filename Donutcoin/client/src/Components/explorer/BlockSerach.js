import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { values } from 'lodash';


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

        const styles = {
            display:'inline',
            width:'200',
            height:300,
            float:'left',
            padding:5,
            border:'0.5px solid black',
            marginBottom:10,
            marginRight:10
            }
            
        return (
            <div className="App">
                <div style={{ margin: '0 auto', marginTop: '10%' }}>
                    <label>Search:</label>
                    <input type="text" onChange={(event) => handleSearch(event)} />
                </div>
                    <div style={{padding:10}}>
                    {filteredData.map((value,index)=>{
                        return(
                            <div key={value.height}>
                                <div style={styles}>
                                    hash: {value.hash}
                                    <br/>
                                    height: {value.height}
                                    <br />
                                    bits: {value.bits}
                                    <br />
                                    confirmation: {value.confirmation}
                                    <br />
                                    strippedsize: {value.strippedsize}
                                    <br />
                                    size: {value.size}
                                    <br />
                                    hi :{value.weight}
                                    <br />
                                    {value.version}
                                    <br />
                                    {value.versionhex}
                                    <br />
                                    {value.merkleroot}
                                    <br />
                                    {value.time}
                                    <br />
                                    {value.mediantime}
                                    <br />
                                    {value.nonce}
                                    <br />
                                    {value.bits}
                                    <br />
                                    {value.difficulty}
                                    <br />
                                    {value.chainwork}
                                    <br />
                                    {value.previousblockhash}
                                    <br />
                                    {value.nextblockhash}

                                </div>
                            </div>
                    )
                    })}
                </div>
            </div>
        )
}

export default BlockSearch;