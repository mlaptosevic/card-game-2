import React, { Component } from 'react';
import './App.css';
import GamePage from './GamePage.js';
import StartPage from './StartPage.js';



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
    {this.state.firstpart ? <StartPage changeFirstpart={()=>this.changeFirstpart()}/> : <GamePage />}
      </div>
    );
  }
}
export default App;
