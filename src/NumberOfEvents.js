import React, { Component } from 'react';

class NumberOfEvents extends Component {
	state = {
			numberOfEvents: '32',
			eventCount: 32,
	};
		
	handleInputChange = (event) => {
		const value = event.target.value;
		this.setState({
			numberOfEvents: value,
		});
		this.props.updateEvents(null, value);
	};

    render() {
			const { numberOfEvents } = this.state;
      return (  
        <div className='NumberOfEvents'>
            <input type="number"
				onChange={(e) => this.handleInputChange(e)} 
				value={numberOfEvents}
				className="numberOfEvents"/>
        </div>
		);
    }
}    

export default NumberOfEvents;