import React, { Component } from 'react';
import { NumberPlayers, PlayerName } from './action';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
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
    this.props.changeFirstpart();

  };

   render(){
     return (
      <div className="App">
        <header className="App-header">
            <h3> Choose number of players </h3>
        </header>
        <div className="block">
  				<Button bsSize="large" bsStyle="warning" className="nump" onClick={(() => this.props.changeNump(2))}>2 players</Button>
  				<Button bsSize="large" bsStyle="danger" className="nump" onClick={(() => this.props.changeNump(3))}>3 players</Button>
  				<Button bsSize="large" bsStyle="info" className="nump" onClick={(() => this.props.changeNump(4))}>4 players</Button>
				</div>
        <div className="clearfix"></div><br/>
        <div className="block">
          <p>Enter your name</p>
          <input type="text" onChange={this.saveName} />
        </div>
        <br/>
        <div className="block">
          <Button bsSize="large" bsStyle="success" onClick={this.sendActionChangeName}>Submit</Button> <br/>

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
