import React, {Component} from 'react';
import { SendCardFromStoreToTable } from '../action';
import { connect } from 'react-redux';
import './Card.css';

class Card extends Component {

  removeCard = () => {
    this.props.sendCardFromStoreToTable(this.props.cardId, this.props.playerId);
    this.props.func(this.props.cardId);
    this.props.updateTableCards();
  };

  render(){
    return(
      <div className="card">
        <img className="cardImage" src={this.props.url} onClick={this.removeCard}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Card);
