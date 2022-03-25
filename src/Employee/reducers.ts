import actionTypes from 'actionTypes';
import { EmployeeType } from 'configStore';


type EmployeesAction = {
    readonly type: string,
    payload: EmployeeType[]
}

const initialState: EmployeeType[] = [];

export default (state: EmployeeType[] = initialState, { type, payload }: EmployeesAction) => {
    switch(type) {
        case actionTypes.EMPLOYEE_SET_LIST:
            return payload;
        default:
            return state;
    }
};
