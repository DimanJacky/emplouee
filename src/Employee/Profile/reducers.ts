import actionTypes from 'actionTypes';
import { EmployeeType } from 'configStore';


type ProfileAction = {
    readonly type: string,
    payload: EmployeeType
}


const initialState: EmployeeType = {};


export default (state: EmployeeType = initialState, { type, payload }: ProfileAction) => {
    switch(type) {
        case actionTypes.PROFILE_SET_DATA:
            return payload;
        default:
            return state;
    }
};
