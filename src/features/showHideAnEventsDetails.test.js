import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from "../App";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, test => {
    let AppWrapper;

    //Scenario 1

    test("An event element is collpsed by default", ({ given, when, then }) =>
    {
        given("the user has opened the app to the main page", async () =>
        {
        AppWrapper = await mount(<App />);
        AppWrapper.update();
        });
        
        when("an event has been selected", () => {
            expect(AppWrapper.find('.event__detailsButton')).toHaveLength(2);
        });    

        then("the event details will be collapsed", () => {
          AppWrapper.update();
          expect(AppWrapper.find('.event__moreDetails')).toHaveLength(0);
        });
    });

    //Scenario 2

    test("User can expand an event to see its details", ({ given, when, then }) => 
    {
      let CitySearchWrapper;  
      given("the user is shown a list of events", () => {
        AppWrapper = await mount(<App />);
        });
    
        when("the user clicks on a certain event", () => {
          AppWrapper.update();
          expect(AppWrapper.find('.event__detailsButton')).toHaveLength(2);
          AppWrapper.find('.event__detailsButton').at(0).simulate('click');
        });
    
        then("the event details will be displayed", () => {
          expect(AppWrapper.find('.event__moreDetails')).toHaveLength(1);
        });
      });
    
      //Scenario 3
    
    test("User can collapse an event to hide its details", ({ given, when, then }) => 
    {
        given("the user has clicked on a certain event and the details are showing", async () => {
          AppWrapper = await mount(<App />);
          AppWrapper.update();
          AppWrapper.find('.event__detailsButton').at(0).simulate('click');
          expect(AppWrapper.find('.event__moreDetails')).toHaveLength(1);
        });
    
        when('the user clicks the close button', () => {
          AppWrapper.find('.event__detailsButton').at(0).simulate('click');
        });
    
        then('the event details are hidden', () => {
          expect(AppWrapper.find('.event_moreDetails')).toHaveLength(0);
        });
    

      });
    });