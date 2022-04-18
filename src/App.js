import React, { Component } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import './nprogress.css';
import WelcomeScreen from './WelcomeScreen';
import { ErrorAlert } from './Alert';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentLocation: "all",
    showWelcomeScreen: undefined,
    offlineText: "",
  };

  componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (checkToken(accessToken)).error ? false: true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
    if (!navigator.onLine) {
      this.setState({
        offlineText: "You are not connected to the Internet",
      });
    } else {
      this.setState({
        offlineText: "",
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
      const { currentLocation, numberOfEvents } = this.state;
      if (location) {
        getEvents().then((events) => {
          const locationEvents = (location === 'all') ? events: 
          events.filter((event) => 
          event.location === location);
          const filteredEvents = locationEvents.slice(0, numberOfEvents);
          this.setState({
          events: filteredEvents,
          currentLocation: location,
        });
      });
    } else {
      getEvents.apply().then((events) => {
        const locationEvents =
          currentLocation === "all"
            ? events
            : events.filter((event) => event.location === currentLocation);
        const filteredEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: filteredEvents,
          numberOfEvents: eventCount,
        });
      });
    }
  }; 

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(',').shift()
      return {city, number};
      })
      return data;
    };
  }

  render() {
    const { locations, numberOfEvents} = this.state;
    if (this.state.showWelcomeScreen === undefined) return <div className='App' />
    return (
      <div className='App'>
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
        getAccessToken={() => {getAccessToken() }} />
        <ErrorAlert text={this.state.offlineText} />
        <h1>Meet App</h1>
        <h4>Choose your nearest city</h4>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents updateEvents={this.updateEvents} />
        <h4>Events in each city</h4>
        <ResponsiveContainer height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type='category' dataKey="city" name="city" />
          <YAxis type='number' dataKey="number" name="name of events" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter data={this.getData()} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
        <EventList events={this.state.events} />
      </div>
    );
  };  

export default App;
