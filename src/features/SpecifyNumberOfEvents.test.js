import {loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

const feature = loadFeature('./src/features/SpecifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
    let AppWrapper;

    //Scenario 1

    test('When a user has not specified a number, the default number is 32.', ({ given, when, then}) => 
    {
        given('The user is on the main page of the app', async () => {
            AppWrapper = await mount(<App />);
        });

        when('the user has not specified a number of events', () => {
            AppWrapper.update();
        });

        then('the default number of displayed events is 32', () => {
            expect(AppWrapper.find('.event')).toHaveLength(2);
        });
    });

    //Scenario 2

    test('User can change the number of events they want to see', ({ given, when, then}) => 
    {
        given('the user is on the main page of the app', async () => {
            AppWrapper = await mount(<App />);
        });

        when('the user set a number of events they want to see in the "number of events" box', () => {
            AppWrapper.update();
            const eventObject = { target: { value: 1}};
            AppWrapper.find('.numberOfEvents').simulate('change', eventObject);
        });

        then('the number of events will be adjusted and displayed to the chosen number', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(1);
        });
    });

});