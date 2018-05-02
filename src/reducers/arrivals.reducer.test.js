import { arrivals as reducer } from './arrivals.reducer.js';
import { actionTypes } from '../constants/actions';
import moment from 'moment';

describe('arrivals reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isFetching: false,
      stopID: 0,
      stopName: "",
      arrivals: []
    })
  })

  it('should handle CLEAR_ALL', () => {
    expect(reducer(undefined, {
      type: actionTypes.CLEAR_ALL,
    })).toEqual({
      isFetching: false,
      stopID: 0,
      stopName: "",
      arrivals: []
    })
  })

  it('should handle REQUEST_ARRIVALS', () => {
    expect(reducer(undefined, {
      type: "REQUEST_ARRIVALS",
    })).toEqual({
      isFetching: true,
      stopID: 0,
      stopName: "",
      arrivals: []
    })
  })

  it('should handle RECEIVE_ARRIVALS', () => {
    const json_data = '{"arrival":[{"departed":true,"scheduled":"2018-05-01T11:25:22.000-0700","shortSign":"35 University of Portland","blockPosition":{"feet":56966,"at":"2018-05-01T10:53:29.000-0700","trip":[{"route":35,"destDist":63823,"tripNum":8242058,"pattern":1,"progress":6857,"dir":1,"desc":"University of Portland"}],"lng":-122.6109555,"heading":327,"lat":45.3643748},"estimated":"2018-05-01T11:25:34.000-0700","dir":1,"route":35,"detour":true,"piece":"1","fullSign":"35  Macadam/Greeley to University of Portland via City Ctr","block":3504,"locid":3616,"status":"estimated"},{"route":35,"detour":true,"departed":false,"piece":"1","scheduled":"2018-05-01T11:59:22.000-0700","shortSign":"35 University of Portland","fullSign":"35  Macadam/Greeley to University of Portland via City Ctr","block":3501,"dir":1,"locid":3616,"status":"scheduled"},{"route":36,"detour":true,"departed":false,"piece":"1","scheduled":"2018-05-02T07:43:37.000-0700","shortSign":"36 To Portland","fullSign":"36  South Shore to Portland","block":3667,"dir":1,"locid":3616,"status":"scheduled"}],"queryTime":"2018-05-01T10:53:44.925-0700","location":[{"lng":-122.67504699998,"dir":"Northbound","lat":45.488048999998,"locid":3616,"desc":"SW Macadam & Julia"}]}';
    const example_data = JSON.parse(json_data);

    expect(reducer(undefined, {
      type: "RECEIVE_ARRIVALS",
      payload: example_data,
      currentTime: moment('2018-05-01T10:54:00.000-0700')
    })).toEqual({
      isFetching: false,
      stopID: 3616,
      stopName: "Northbound SW Macadam & Julia",
      arrivals: [
        {
          arrivesIn: "31 mins",
          key: 3504,
          name: "35 University of Portland",
          routeColor: "busline"
        },
        {
          arrivesIn: "Arrives at 11:59 AM (scheduled)",
          key: 3501,
          name: "35 University of Portland",
          routeColor: "busline"
        },
        {
          arrivesIn: "Arrives at 7:43 AM (scheduled)",
          key: 3667,
          name: "36 To Portland",
          routeColor: "busline"
        }
      ]
    })
  })
})
