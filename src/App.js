import React, { Component } from 'react';
import './App.css';
import GamePage from './GamePage.js';
import StartPage from './StartPage.js';
import ErrorBoundary from "./errorBoundary";



class App extends Component {

 constructor(props) {
   super(props);

   this.state = {
     firstpart: true
   };
 }

 changeFirstpart() {
   this.setState({
     firstpart: !this.state.firstpart
   });
 }

  render() {

    return (
      <div>
    {this.state.firstpart ?
        <ErrorBoundary><StartPage changeFirstpart={()=>this.changeFirstpart()}/></ErrorBoundary>  :
        <ErrorBoundary> <GamePage /></ErrorBoundary>}
      </div>
    );
  }
}
export default App;
