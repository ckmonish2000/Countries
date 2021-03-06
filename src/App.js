import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Getcollege from "./components/getCollege/getcollege"
import Error from "./components/Error/Error"
import 'antd/dist/antd.css';
import Graph from './components/Graph';
export default function App() {
  return (
   <main>
     <Switch>
     <Route path='/' component={Getcollege} exact/>
     <Route path="/error" component={Error} exact/>
     <Route path="/graph" component={Graph}/>
     </Switch>
   </main>
  )
}
