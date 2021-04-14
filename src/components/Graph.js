import React from 'react'
import {useQuery,gql} from "@apollo/client"

export default function Graph() {
    let query=gql`
    query one{
        AllStudents{
          name
        }
      }
  `;
  let{ loading, error, data } = useQuery(query, { fetchPolicy: 'no-cache' })
  let onclick=()=>{
      console.log(data);
    }
    return (
        <div>
          <button onClick={onclick}>test</button>
        </div>
    )
}
