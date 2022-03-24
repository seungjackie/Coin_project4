import React, {Component} from 'react';
import Information from './testJson/test-json';

class BlockSerach extends Component{

  //검색이 작동하는 방식
  constructor(){
    super();

    this.state={
      search:null
    };
  }

  //초기에 null설정된 search라는변수 포함되어 결과를 표시
  searchSpace=(event)=>{
    let keyword = event.target.value;
    this.setState({search:keyword})
  }

  render(){
    const styleInfo={
      paddingRight:'10px'
    }
    const elementStyle={
      border:'solid',
      borderRadius:'10px',
      position:'relative',
      left:'10vh',
      height:'3vh',
      width:'20vh',
      marginTop:'5vh',
      marginBottom:'10vh'
    }

    //this.state.search변수에 있는 키워드를 포함하는지 확인하는지?
    const items = Information.filter((data)=>{
      if(this.state.search == null)
          return data
      else if(data.name.toLowerCase().includes(this.state.search.toLowerCase()) || data.country.toLocaleLowerCase().includes(this.state.search.toLowerCase())){
          return data
      }
    }).map(data => {                       // in-json.js 파일 불러오기
      return(
        <div>
          <ul>                                                    
            <li style={{position:'relative',left:'10vh'}}>
              <span style={styleInfo}>{data.name}</span>          
              <span style={styleInfo}>{data.age}</span>
              <span style={styleInfo}>{data.country}</span>
            </li>
          </ul>
        </div>
      )
    })

    //검색바
    return (
      <div>
        <input type="text" 
        placeholder="Enter item to be seaerched" 
        style={elementStyle} onChange={(e)=>this.searchSpace(e)} />
        {items}
      </div>
    )
  }
}
;

export default BlockSerach;