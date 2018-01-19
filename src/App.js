import React, { Component } from 'react';
import './App.css';
import GamePage from './GamePage.js';
import StartPage from './StartPage.js';
import ErrorBoundary from "./errorBoundary";



class App extends Component {

 constructor(props) {
   super(props);

   this.state = {
     showStartPage: true
   };
 }

 changeShowStartPage() {
   this.setState({
     showStartPage: !this.state.showStartPage
   });
 }

  render() {

    return (
      <div>
    {this.state.showStartPage ?
        <ErrorBoundary><StartPage changeShowStartPage={()=>this.changeShowStartPage()}/></ErrorBoundary>  :
        <ErrorBoundary> <GamePage /></ErrorBoundary>}
      </div>
    );
  }
}

export default App;
