import { stops as reducer } from './stops.reducer';
import { actionTypes } from '../constants/actions';

describe('stops reducer', () => {

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isFetching: false,
      stops: []
    })
  })

  it('should handle CLEAR_ALL', () => {
    expect(reducer(undefined, {
      type: actionTypes.CLEAR_ALL
    })).toEqual({
      isFetching: false,
      stops: []
    })
  })

  it('should handle REQUEST_STOPS', () => {
    expect(reducer(undefined, {
      type: actionTypes.REQUEST_STOPS
    })).toEqual({
      isFetching: true,
      stops: []
    })
  })

  it('should handle RECEIVE_STOPS', () => {

    const data = {
      location: [
        {
          desc: "SW Macadam & Julia",
          dir: "Southbound",
          lat: 45.487658999998,
          lng: -122.67552099998,
          locid: 3615,
          route: [
            {
              desc: "35-Macadam/Greeley",
              route: 35,
              type: "B"
            },
            {
              desc: "36-South Shore",
              route: 36,
              type: "B"
            }
          ]
        }
      ],
      queryTime: "2018-05-01T17:09:01.625-0700"
    }

    expect(reducer(undefined, {
      type: actionTypes.RECEIVE_STOPS,
      payload: data
    })).toEqual({
      isFetching: false,
      stops: [
        {
          name: "SW Macadam & Julia Southbound",
          stopID: 3615,
          routes: [
            {
              desc: "35-Macadam/Greeley",
              route: 35,
              type: "B"
            },
            {
              desc: "36-South Shore",
              route: 36,
              type: "B"
            }
          ]
        }
      ]
    })
  })

})