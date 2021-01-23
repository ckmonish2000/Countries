import React,{useState,useEffect} from 'react'
import {Input,Button,Tooltip,Card,List,Table,Tag} from "antd"
import { SearchOutlined } from '@ant-design/icons';
import {root,label,value,field,h2} from "./styles"
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
    const [SortBy, setSortBy] = useState("name")
    const OnClick=()=>{ 
    fetch(`${dburl}${SearchVal}`) .then(res=>res.json())
      .then(data=>{if(typeof data.length==="undefined"){props.history.push("/error")}setSearchData(data)})
      .catch(err=>props.history.push("/error"))
   
    }
   
  useEffect(() => {
    SearchData?.sort(function(a, b) {
      // Compare the 2 dates
      if (a[SortBy] < b[SortBy]) return -1;
      if (a[SortBy] > b[SortBy]) return 1;
      return 0;
    });
    console.log(SearchData)
  }, [SortBy])
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
{SearchData.length===0?"":


<Table dataSource={SearchData} 
style={{margin:"20pt"}}
pagination={{pageSize:10}}
loading={SearchData.length===0?true:false}> 
  <Column title="Country Name" dataIndex="name"/>
  <Column title="Capital" dataIndex="capital" />
  <Column title="Flag" dataIndex="flag"  render={img=><img src={img} width="20" height="20"/>}/>
  <Column title="Longitude" dataIndex="latlng"  render={tz=><h2 style={h2}>{tz.length===0?"Na":tz[1]}</h2>}/>
  <Column title="Latitude" dataIndex="latlng"  render={tz=><h2 style={h2}>{tz.length===0?"Na":tz[0]}</h2>}/>
  <Column title="Time Zone" dataIndex="timezones"  render={tz=><h2 style={h2}>{tz[0]}</h2>}/>
  <Column title="Currencies" dataIndex="currencies"  render={tz=><h2 style={h2}>{tz[0].symbol+" "+tz[0].code}</h2>}/>
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
}

      


           

           
        </div>
    )
}
