import React,{useState,useEffect} from 'react'
import {Input,Button,Tooltip,Card,List,Table,Tag} from "antd"
import { SearchOutlined } from '@ant-design/icons';
import {root,label,value,field} from "./styles"
import Search from 'antd/lib/input/Search';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
// import {dburl} from "../dburl"
export default function Getcollege(props) {
    var dburl="https://restcountries.eu/rest/v2/name/"
    const { Column, ColumnGroup } = Table;
    // event Handlers and states
    
  
    const [SearchVal, setSearchVal] = useState("")
    const [SearchData, setSearchData] = useState([])
    const [noResult, setnoResult] = useState(false)
   
    const OnClick=()=>{ 
    fetch(`${dburl}${SearchVal}`) .then(res=>res.json())
      .then(data=>{if(data.length===0){setnoResult(true)}else{setnoResult(false)};setSearchData(data)})
      .catch(err=>props.history.push("/error"))
   
    }
   
    
    const OnChange=(e)=>setSearchVal(e.target.value.toLowerCase()) 
   
    console.log(SearchData)
    // components
    let Tager=tags=>(
      <>
      {
      tags.map(tag => (
        <Tag color="blue" key={tag.iso639_1}>
          {tag.name}
        </Tag>
      ))
      }
    </>
  )



    return (
        <div>
           
            <div style={root}>
            <Input style={field}  style={{width:600,marginRight:20}} placeholder="Search by country name" onChange={OnChange}/>
            <Tooltip title="search">
            <Button type="primary" shape="circle" icon={<SearchOutlined />} onClick={OnClick} />
            </Tooltip>
            </div>

            <Table dataSource={SearchData} 
    style={{margin:"20pt"}}
    pagination={{pageSize:10}}
    loading={SearchData.length===0?true:false}> 
      <Column title="Country Name" dataIndex="name"/>
      <Column title="Flag" dataIndex="flag"  render={img=><img src={img} width="20" height="20"/>}/>
      <Column
      title="Languages"
      dataIndex="languages"
      key="tags"
      render={Tager}
    />
        {/*<Column title="State" dataIndex="state" />
      <Column title="City" dataIndex="city" />
   */}
 
  </Table>
{/* 
       {SearchData.length>0 && 
        <Card title={<h1 style={{textAlign:"center"}}>{SearchData[0]?.name.toUpperCase()}</h1>} style={{ width: 800,margin:"auto" }}>
       <div> <label style={label}>City: </label><span style={value}>{SearchData[0]?.city.toUpperCase()}</span></div>
        <br/>
       <div> <label style={label}>State: </label><span style={value}>{SearchData[0]?.state.toUpperCase()}</span></div>
        <br/>
        <div><label style={label}>Country: </label><span style={value}>{SearchData[0]?.country.toUpperCase()}</span></div>
        <br/>
       <div> <label style={label}>Year founded: </label><span style={value}>{SearchData[0]?.yearFounded.toUpperCase()}</span></div>
        <br/>
        <div><label style={label}>Number Of Students: </label><span style={value}>{SearchData[0]?.No_Of_Students}</span></div>
        <br/>
        <div><label style={label}>Courses: </label><span style={value}>{SearchData[0]?.courses}</span></div>
       
        </Card>} */}

        {noResult && <h1 style={{textAlign:"center",color:"grey",opacity:0.7,marginTop:"50pt"}}>No Such Country Exsists </h1>}


           

           
        </div>
    )
}
