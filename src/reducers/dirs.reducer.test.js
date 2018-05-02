import { dirs as reducer } from './dirs.reducer';
import { actionTypes } from '../constants/actions';

describe('dirs reducer', () => {

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      dirs: []
    })
  })

  it('should handle CLEAR_ALL', () => {
    expect(reducer(undefined, {
      type: actionTypes.CLEAR_ALL
    })).toEqual({
      dirs: []
    })
  })

  it('should handle RECEIVE_DIRS', () => {
    const json_data = {
      "route":[
        {
          "route":290,"id":290,"type":"R","dir":[
            {
              "stop":[
                {"lng":-122.635064954801,"tp":true,"dir":"Northbound","locid":13720,"seq":50,"lat":45.4307340035525,"desc":"SE Park Ave MAX Station"},
                {"lng":-122.639820283264,"tp":true,"dir":"Northbound","locid":13721,"seq":100,"lat":45.4414300790699,"desc":"Milwaukie/Main St MAX Station"},
                {"lng":-122.637850044126,"tp":false,"dir":"Northbound","locid":13722,"seq":150,"lat":45.4629841355052,"desc":"SE Tacoma/Johnson Creek MAX Station"},
                {"lng":-122.640055072533,"tp":false,"dir":"Northbound","locid":13723,"seq":200,"lat":45.4751043966085,"desc":"SE Bybee Blvd MAX Station"},
                {"lng":-122.648456036111,"tp":true,"dir":"Northbound","locid":13724,"seq":250,"lat":45.491139289206,"desc":"SE 17th Ave & Holgate Blvd MAX Station"},
                {"lng":-122.648142110259,"tp":false,"dir":"Northbound","locid":13725,"seq":300,"lat":45.4981312211504,"desc":"SE 17th Ave & Rhine St MAX Station"},
                {"lng":-122.653515728282,"tp":false,"dir":"Westbound","locid":13726,"seq":350,"lat":45.502953415077,"desc":"Clinton St/SE 12th Ave MAX Station"},
                {"lng":-122.662862367057,"tp":true,"dir":"Westbound","locid":13727,"seq":400,"lat":45.5066175688256,"desc":"OMSI/SE Water MAX Station"},
                {"lng":-122.671538535885,"tp":true,"dir":"Westbound","locid":13728,"seq":450,"lat":45.502716303795,"desc":"South Waterfront/SW Moody MAX Station"},
                {"lng":-122.680857537753,"tp":true,"dir":"Westbound","locid":13729,"seq":500,"lat":45.5079417924473,"desc":"Lincoln St/SW 3rd Ave MAX Station"}
              ],
              "dir":0,
              "desc":"To Portland City Center"
            },
            {
              "stop":[
                {"lng":-122.675604427032,"tp":true,"dir":"Southbound","locid":7601,"seq":50,"lat":45.526731616216,"desc":"Union Station/NW 5th & Glisan MAX Stn"},
                {"lng":-122.67549799998,"tp":false,"dir":"Southbound","locid":9303,"seq":100,"lat":45.523884999998,"desc":"NW 5th & Couch MAX Station"},
                {"lng":-122.676178303543,"tp":false,"dir":"Southbound","locid":7627,"seq":150,"lat":45.5215733878279,"desc":"SW 5th & Oak MAX Station"},
                {"lng":-122.677933767116,"tp":true,"dir":"Southbound","locid":7646,"seq":200,"lat":45.5182554212177,"desc":"Pioneer Place/SW 5th Ave MAX Station"},
                {"lng":-122.679741623174,"tp":false,"dir":"Southbound","locid":7608,"seq":250,"lat":45.5149139607922,"desc":"City Hall/SW 5th & Jefferson MAX Station"},
                {"lng":-122.681550763375,"tp":false,"dir":"Southbound","locid":7618,"seq":300,"lat":45.5116447001344,"desc":"PSU Urban Center/SW 5th & Mill MAX Station"},
                {"lng":-122.68299899998,"tp":false,"dir":"Southbound","locid":7606,"seq":350,"lat":45.508978999998,"desc":"PSU South/SW 5th & Jackson MAX Stn"},
                {"lng":-122.680153629022,"tp":true,"dir":"Eastbound","locid":13710,"seq":400,"lat":45.5079019263657,"desc":"Lincoln St/SW 3rd Ave MAX Station"},
                {"lng":-122.671140642375,"tp":true,"dir":"Eastbound","locid":13711,"seq":450,"lat":45.5026929590342,"desc":"South Waterfront/SW Moody MAX Station"},
                {"lng":-122.662559416233,"tp":true,"dir":"Eastbound","locid":13712,"seq":500,"lat":45.5064751143635,"desc":"OMSI/SE Water MAX Station"},
                {"lng":-122.652985502472,"tp":false,"dir":"Eastbound","locid":13713,"seq":550,"lat":45.5026039347046,"desc":"Clinton St/SE 12th Ave MAX Station"},
                {"lng":-122.64817782531,"tp":false,"dir":"Southbound","locid":13714,"seq":600,"lat":45.4976442388039,"desc":"SE 17th Ave & Rhine St MAX Station"},
                {"lng":-122.648540497655,"tp":true,"dir":"Southbound","locid":13715,"seq":650,"lat":45.4906392186667,"desc":"SE 17th Ave & Holgate Blvd MAX Station"},
                {"lng":-122.639989839367,"tp":false,"dir":"Southbound","locid":13716,"seq":700,"lat":45.474666624828,"desc":"SE Bybee Blvd MAX Station"},
                {"lng":-122.637423485364,"tp":false,"dir":"Southbound","locid":13717,"seq":750,"lat":45.4626312855465,"desc":"SE Tacoma/Johnson Creek MAX Station"},
                {"lng":-122.640055900183,"tp":true,"dir":"Southbound","locid":13718,"seq":800,"lat":45.4410267562951,"desc":"Milwaukie/Main St MAX Station"},
                {"lng":-122.635064954801,"tp":true,"dir":"Northbound","locid":13720,"seq":900,"lat":45.4307340035525,"desc":"SE Park Ave MAX Station"}
              ],
              "dir":1,
              "desc":"To Milwaukie"
            }
          ],
          "desc":"MAX Orange Line"
        }
      ]
    }

    expect(reducer({dirs: []}, {
      type: actionTypes.RECEIVE_DIRS,
      payload: json_data
    })).toEqual({
      dirs: [
        {
          desc: "To Portland City Center",
          dir: 0,
          stop: [
            {"lng":-122.635064954801,"tp":true,"dir":"Northbound","locid":13720,"seq":50,"lat":45.4307340035525,"desc":"SE Park Ave MAX Station"},
            {"lng":-122.639820283264,"tp":true,"dir":"Northbound","locid":13721,"seq":100,"lat":45.4414300790699,"desc":"Milwaukie/Main St MAX Station"},
            {"lng":-122.637850044126,"tp":false,"dir":"Northbound","locid":13722,"seq":150,"lat":45.4629841355052,"desc":"SE Tacoma/Johnson Creek MAX Station"},
            {"lng":-122.640055072533,"tp":false,"dir":"Northbound","locid":13723,"seq":200,"lat":45.4751043966085,"desc":"SE Bybee Blvd MAX Station"},
            {"lng":-122.648456036111,"tp":true,"dir":"Northbound","locid":13724,"seq":250,"lat":45.491139289206,"desc":"SE 17th Ave & Holgate Blvd MAX Station"},
            {"lng":-122.648142110259,"tp":false,"dir":"Northbound","locid":13725,"seq":300,"lat":45.4981312211504,"desc":"SE 17th Ave & Rhine St MAX Station"},
            {"lng":-122.653515728282,"tp":false,"dir":"Westbound","locid":13726,"seq":350,"lat":45.502953415077,"desc":"Clinton St/SE 12th Ave MAX Station"},
            {"lng":-122.662862367057,"tp":true,"dir":"Westbound","locid":13727,"seq":400,"lat":45.5066175688256,"desc":"OMSI/SE Water MAX Station"},
            {"lng":-122.671538535885,"tp":true,"dir":"Westbound","locid":13728,"seq":450,"lat":45.502716303795,"desc":"South Waterfront/SW Moody MAX Station"},
            {"lng":-122.680857537753,"tp":true,"dir":"Westbound","locid":13729,"seq":500,"lat":45.5079417924473,"desc":"Lincoln St/SW 3rd Ave MAX Station"}
          ]
        },
        {
          desc: "To Milwaukie",
          dir: 1,
          stop: [
            {"lng":-122.675604427032,"tp":true,"dir":"Southbound","locid":7601,"seq":50,"lat":45.526731616216,"desc":"Union Station/NW 5th & Glisan MAX Stn"},
            {"lng":-122.67549799998,"tp":false,"dir":"Southbound","locid":9303,"seq":100,"lat":45.523884999998,"desc":"NW 5th & Couch MAX Station"},
            {"lng":-122.676178303543,"tp":false,"dir":"Southbound","locid":7627,"seq":150,"lat":45.5215733878279,"desc":"SW 5th & Oak MAX Station"},
            {"lng":-122.677933767116,"tp":true,"dir":"Southbound","locid":7646,"seq":200,"lat":45.5182554212177,"desc":"Pioneer Place/SW 5th Ave MAX Station"},
            {"lng":-122.679741623174,"tp":false,"dir":"Southbound","locid":7608,"seq":250,"lat":45.5149139607922,"desc":"City Hall/SW 5th & Jefferson MAX Station"},
            {"lng":-122.681550763375,"tp":false,"dir":"Southbound","locid":7618,"seq":300,"lat":45.5116447001344,"desc":"PSU Urban Center/SW 5th & Mill MAX Station"},
            {"lng":-122.68299899998,"tp":false,"dir":"Southbound","locid":7606,"seq":350,"lat":45.508978999998,"desc":"PSU South/SW 5th & Jackson MAX Stn"},
            {"lng":-122.680153629022,"tp":true,"dir":"Eastbound","locid":13710,"seq":400,"lat":45.5079019263657,"desc":"Lincoln St/SW 3rd Ave MAX Station"},
            {"lng":-122.671140642375,"tp":true,"dir":"Eastbound","locid":13711,"seq":450,"lat":45.5026929590342,"desc":"South Waterfront/SW Moody MAX Station"},
            {"lng":-122.662559416233,"tp":true,"dir":"Eastbound","locid":13712,"seq":500,"lat":45.5064751143635,"desc":"OMSI/SE Water MAX Station"},
            {"lng":-122.652985502472,"tp":false,"dir":"Eastbound","locid":13713,"seq":550,"lat":45.5026039347046,"desc":"Clinton St/SE 12th Ave MAX Station"},
            {"lng":-122.64817782531,"tp":false,"dir":"Southbound","locid":13714,"seq":600,"lat":45.4976442388039,"desc":"SE 17th Ave & Rhine St MAX Station"},
            {"lng":-122.648540497655,"tp":true,"dir":"Southbound","locid":13715,"seq":650,"lat":45.4906392186667,"desc":"SE 17th Ave & Holgate Blvd MAX Station"},
            {"lng":-122.639989839367,"tp":false,"dir":"Southbound","locid":13716,"seq":700,"lat":45.474666624828,"desc":"SE Bybee Blvd MAX Station"},
            {"lng":-122.637423485364,"tp":false,"dir":"Southbound","locid":13717,"seq":750,"lat":45.4626312855465,"desc":"SE Tacoma/Johnson Creek MAX Station"},
            {"lng":-122.640055900183,"tp":true,"dir":"Southbound","locid":13718,"seq":800,"lat":45.4410267562951,"desc":"Milwaukie/Main St MAX Station"},
            {"lng":-122.635064954801,"tp":true,"dir":"Northbound","locid":13720,"seq":900,"lat":45.4307340035525,"desc":"SE Park Ave MAX Station"}
          ]
        }
      ]
    })
  })

})