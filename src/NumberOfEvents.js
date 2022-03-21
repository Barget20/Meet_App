import React, { Component } from 'react';

class NumberOfEvents extends Component {
	state = {
			numberOfEvents: '32',
			eventCount: 32
	}
		
	handleInputChange = (eventCount) => {
		this.props.updateEvents(eventCount);
}

    render() {
			const { eventCount } = this.state;
      return (  
        <div className='NumberOfEvents'>
            <input
						type="number"
						onChange={this.handleInputChange} 
						value={eventCount}
						className="numberOfEvents"/>
        </div>
			)	
    }
};    

export default NumberOfEvents;