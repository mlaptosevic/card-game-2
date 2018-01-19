import React, {Component} from 'react';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state={
            hasError: false
        };
    }

    componentDidCatch = (error, info) => {
        this.setState({hasError: true});

        console.log('Error: ' + error);
    }

    render(){
        if (this.state.hasError)
            return(
                <div>Houston we have a problem</div>
            );

        return this.props.children;
    }
}