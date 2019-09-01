import '../css/loading.css';

import React from 'react';

export default class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {   
            show: this.props.show || false        
        }
        this.startLoading = this.startLoading.bind(this)
        this.stopLoading = this.stopLoading.bind(this)
    }
    componentWillMount(){
        // this.props.onRef(null);
    }
       
    componentDidMount(){
        this.props.onRef(this)
    }
    shouldComponentUpdate(nextProps, nextState) {
        if(nextState.show !== this.state.loading) return true
        return false
    }
    
    startLoading = () =>{
        this.setState({show: true})
    }
    stopLoading = () =>{ 
        this.setState({show: false})
    } 
    render() {
        const {show} = this.state;
        return show ? 
            <div id="demo-content">
                
                <div id="loader-wrapper-login">
                    <div id="loader"></div>
                </div>
            </div>
        : ""
    }
}