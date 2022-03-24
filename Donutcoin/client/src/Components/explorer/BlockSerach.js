import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlockSearch = (event) =>{


    const [allData,setAllData] = useState([]);
    const [filteredData,setFilteredData] = useState(allData);



    const handleSearch = (event) => {
        let value = event.target.value.toLowerCase();
        let result = [];
            console.log(value);
            result = allData.filter((data) => {
                return data.title.search(value) != -1;
            });
        setFilteredData(result);
    }


    useEffect(() => {
        axios('https://jsonplaceholder.typicode.com/albums/1/photos')
        .then(response => {
        console.log(response.data)
        setAllData(response.data);
        setFilteredData(response.data);
        })
        .catch(error => {
        console.log('Error getting fake data: ' + error);
        })
        }, []);

        const styles = {
            display:'inline',
            width:'30%',
            height:50,
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
                    <input type="text" onChange={(event) =>handleSearch(event)} />
                </div>
                    <div style={{padding:10}}>
                    {filteredData.map((value,index)=>{
                        return(
                            <div key={value.id}>
                                <div style={styles}>
                                    {value.title}
                                </div>
                            </div>
                    )
                    })}
                </div>
            </div>
        )
}

export default BlockSearch;