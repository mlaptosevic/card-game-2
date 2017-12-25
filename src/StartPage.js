import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import { NumberPlayers, PlayerName } from './action';
import { connect } from 'react-redux';
import './App.css';

class StartPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: ''
    }
  };

  saveName = (e) => {
    this.setState({
      name: e.target.value
    });
  };

  sendActionChangeName = () => {
    this.props.changeName(this.state.name);
  };

   render(){
     return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1> Odaberite broj igraca </h1>
        </header>
        <div>
  				<button className="nump" onClick={(() => this.props.changeNump(2))}>2</button>
  				<button className="nump" onClick={(() => this.props.changeNump(3))}>3</button>
  				<button className="nump" onClick={(() => this.props.changeNump(4))}>4</button>
				</div>
        <p>Unesi ime</p>
        <input type="text" onChange={this.saveName} />

        <div>
        <br/><button onClick={this.sendActionChangeName}>click</button> <br/>
          TEST:<br/>
            {this.props.state.nump} <br/>
            {this.props.state.name}
        </div>
      </div>
      );
    }
}

const StateToProps = (state) => {
  return {state: state};
};

const DispatchToProps = (dispatch) => {
  return {
    changeNump: ( (nump) => dispatch(NumberPlayers(nump))),
    changeName: ( (name) => dispatch(PlayerName(name)))
  }
}

export default connect(StateToProps, DispatchToProps)(StartPage);


// export default StartPage;
