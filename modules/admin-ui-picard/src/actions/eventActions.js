
/**
 * This file contains all redux actions that can be executed on events
 */

// Constants of of actions types for fetching events from server
export const LOAD_EVENTS_IN_PROGRESS = 'LOAD_EVENTS_IN_PROGRESS';
export const LOAD_EVENTS_SUCCESS = 'LOAD_EVENTS_SUCCESS';
export const LOAD_EVENTS_FAILURE = 'LOAD_EVENTS_FAILURE';

// Actions affecting fetching of events from server

export const loadEventsInProgress = () => ({
    type: LOAD_EVENTS_IN_PROGRESS
});

export const loadEventsSuccess = events => ({
    type: LOAD_EVENTS_SUCCESS,
    payload: { events }
});

export const loadEventsFailure = () => ({
    type: LOAD_EVENTS_FAILURE
});
