import React, { Component } from 'react';
import Card from './Card';
import { connect } from 'react-redux';

class Table extends Component {

    constructor(props) {
        super(props);

        // const cardList = this.createCardComponents();

        // this.state = {
        //     cardList: this.props.table
        // };
    }

    // createCardComponents = () => {
    //     return this.props.table.map((card)=> {
    //         return(
    //             <Card key={card.code} url={card.image} func={()=>{}}/>
    //         );
    //     });
    // };

    render(){
        // let cardList = this.createCardComponents();
        // console.log(cardList);

        return(
            <div>
                {this.props.table}
            </div>
        );
    }

}


const mapStateToProps = (state) => {
    return {
        // table: state.table
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);