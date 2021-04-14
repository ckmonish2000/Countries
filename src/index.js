import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {ApolloClient,ApolloProvider,InMemoryCache} from "@apollo/client"
let uri= 'http://localhost:8000/graphql'
let cache=new InMemoryCache()
const client=new ApolloClient({uri,cache})

ReactDOM.render(
  
  <BrowserRouter>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  </BrowserRouter>
  ,
  document.getElementById('root')
);
