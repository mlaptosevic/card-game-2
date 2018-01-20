import React, {Component} from 'react';
import {NumberPlayers, PlayerName} from './action';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import './StartPage.css';

class StartPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            playersName: 'YOU'
        }
    };

    saveName = (e) => {
        this.setState({
            playersName: e.target.value
        });
    };

    sendActionChangeName = () => {
        this.props.changeName(this.state.playersName, this.props.state.nump);
        this.props.changeShowStartPage();

    };

    render() {
        return (
            <div className="background">
                <div className="main-menu">
                    <div className="title-centered">
                      <div className="title">
                        <div className="cardTitle">CARD</div>
                        <div className="gameTitle">GAME</div>
                      </div>
                    </div>
                    <div className="input-centered">
                      <input type="text" onChange={this.saveName}
                        className="nameEntry" placeholder="ENTER YOUR NAME" />
                    </div>
                          <Button bsSize="large" bsStyle="info" className="nump"
                            onClick={(() => this.props.changeNump(2))}>2 players</Button>
                          <Button bsSize="large" bsStyle="info" className="nump" onClick={(() => this.props.changeNump(3))}>3
                        players</Button>
                    <Button bsSize="large" bsStyle="info" className="nump" onClick={(() => this.props.changeNump(4))}>4
                        players</Button>
                <br/>

                <br/>

                        <Button bsSize="large" bsStyle="info" className="submitButton"
                        onClick={this.sendActionChangeName}>PLAY</Button> <br/>

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
        changeNump: ((nump) => dispatch(NumberPlayers(nump))),
        changeName: ((name, nump) => dispatch(PlayerName(name, nump)))
    }
};

export default connect(StateToProps, DispatchToProps)(StartPage);
