import React, {Component} from 'react';
import { SendCardFromStoreToTable } from '../action';
import { connect } from 'react-redux';
import './Card.css';

class CardBack extends Component {

  removeCard = () => {
    this.props.sendCardFromStoreToTable(this.props.cardId, this.props.playerId);
  };

  render(){
    return(
      <div className="card">
        <img className="cardImage" src="karta.jpg" onClick={this.removeCard} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendCardFromStoreToTable: ( (cardId, playerId) => dispatch(SendCardFromStoreToTable(cardId, playerId)))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardBack);
