import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
	state = {
			numberOfEvents: '32',
			eventCount: 32,
	};
		
	handleInputChange = (event) => {
		const value = event.target.value;

		if (value <= 0 || value >= 33) {
		this.setState({
			numberOfEvents: value,
			infoText: "Please enter a number between 1 to 32"
		});
	}
		else {
		this.setState({
			numberOfEvents: value,
			infoText:''
		});
	}
		this.props.updateEvents(null, value);
	};

    render() {
			const { numberOfEvents } = this.state;
      return (  
        <div className='NumberOfEvents'>
			<ErrorAlert text={this.state.infoText} />
            <input type="number"
				onChange={(e) => this.handleInputChange(e)} 
				value={numberOfEvents}
				className="numberOfEvents"/>
        </div>
		);
    }    
}

export default NumberOfEvents;