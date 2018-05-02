import { lines as reducer } from './lines.reducer';
import { actionTypes } from '../constants/actions';

describe('lines reducer', () => {

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isFetching: false,
      lines: []
    })
  })

  it('should handle CLEAR_ALL', () => {
    expect(reducer(undefined, {
      type: actionTypes.CLEAR_ALL
    })).toEqual({
      isFetching: false,
      lines: []
    })
  })

  it('should handle REQUEST_LINES', () => {
    expect(reducer(undefined, {
      type: actionTypes.REQUEST_LINES
    })).toEqual({
      isFetching: true,
      lines: []
    })
  })

  it('should handle RECEIVE_LINES', () => {

    const data = {
      route: [
        {
          route: 100,
          detour: true,
          id: 100,
          type: "R",
          desc: "MAX Blue Line"
        },
        {
          route: 98, // should be filtered out
          detour: true,
          id: 98,
          type: "B",
          desc: "MAX Shuttle"
        }
      ]
    }

    expect(reducer(undefined, {
      type: actionTypes.RECEIVE_LINES,
      payload: data
    })).toEqual({
      isFetching: false,
      lines: [
        {
          name: "MAX Blue Line",
          route: 100
        }
      ]
    })
  })

})
