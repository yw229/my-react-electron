import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Clock.css';
import { increase, decrease, reset} from './services/actions';


class Clock extends Component {
	constructor(props){
		super(props);
		this.ID = null ;
	}
	onIncrement=()=>{
		this.props.increase(this.props.currentValue);
	}

	onDecrement=()=>{
		if(this.props.currentValue>0)
			this.props.decrease(this.props.currentValue);
	}
	increaseByOdd=()=>{
		if(this.props.currentValue %2 !== 0)
			this.props.increase(this.props.currentValue);
	}

	increaseAsyc=()=>{
		this.ID = setInterval(()=>this.onIncrement(), 500);
		return this.ID;
	}
		

	stopCouting=()=>clearInterval(this.ID);

	restCouting=()=>{
		this.props.reset(0);
		//console.log(this.props.currentValue);
	}
	


	render(){
	return (
      <div className='clock-lay-out'>

        <button className= 'btn btn-default' onClick={this.onIncrement}>
          +
        </button>

        <button className= 'btn btn-default' onClick={this.onDecrement}>
          -
        </button>

        <button className= 'btn btn-info' onClick={this.increaseByOdd}>
          Increment if odd
        </button>

        <button className= 'btn btn-success' onClick={this.increaseAsyc}>
          Increment async
        </button>

        <p > Total Value: <label className="label-text">{this.props.currentValue} </label> times </p>
    	
    	<button className= 'btn btn-warning' onClick={this.stopCouting}>
          Stop Auto Couting
        </button>

        <button className= 'btn btn-default' onClick={this.restCouting}>
          Reset Couter
        </button>
    </div>
	)}
}

const mapStateToProps = (state) => (console.log(state),{
	currentValue: state.calculateReducer
});

const mapDispatchToProps = {
	increase: increase,
 	decrease: decrease,
 	reset:reset
};

export default connect(mapStateToProps, mapDispatchToProps)(Clock);
