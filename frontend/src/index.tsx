import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import './index.css';
import { DAppProvider } from "@usedapp/core";

import App from './App';

import reportWebVitals from './reportWebVitals';
import { Badges } from './components/Badges';
import { Header } from './components/Header';
import { Mint } from './components/Mint';
import { Search } from './components/Search';
import { About } from './components/About';
import { Discord } from './components/Discord'
import { Footer } from './components/Footer';
interface IHeaderProps {
  // any props that come into the component
}

const Foo: React.FC<IHeaderProps> = (props) => {
  return (
    <p>foooooooo</p>
  )
}
ReactDOM.render(
  <React.StrictMode>
      <DAppProvider config={{}}>

    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/mint" element={<Mint/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/discord" element={<Discord/>}/>

      </Routes>
      <Footer></Footer>
    </Router >
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
