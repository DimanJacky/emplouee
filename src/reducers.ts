import actionTypes from 'actionTypes';
import { AppState, AppAction } from 'configStore';


const initialState: AppState = {
    loading: false,
    error: false,
    positions: [],
    businessEntities: [],
    branches: [],
    companyRoles: [],
    employeeDepartments: [],
    employeeGroups: [],
    projectStatuses: [],
};


export const reducers = (state: AppState = initialState, { type, payload }: AppAction) => {
    switch(type) {
        case actionTypes.APP_SET_LOADING:
            return {
                ...state,
                loading: payload,
            };
        case actionTypes.APP_SET_ERROR:
            return {
                ...state,
                error: payload,
            };
        case actionTypes.APP_SET_POSITIONS:
            return {
                ...state,
                positions: payload,
            };
        case actionTypes.APP_SET_LOCATIONS:
            return {
                ...state,
                branches: payload,
            };
        case actionTypes.APP_SET_COMPANY_ROLES:
            return {
                ...state,
                companyRoles: payload,
            };
        case actionTypes.APP_SET_EMPLOYEE_GROUPS:
            return {
                ...state,
                employeeGroups: payload,
            };
        case actionTypes.APP_SET_EMPLOYEE_DEPARTMENTS:
            return {
                ...state,
                employeeDepartments: payload,
            };
        case actionTypes.APP_SET_BUSINESS_ENTITIES:
            return {
                ...state,
                businessEntities: payload,
            };
        case actionTypes.APP_SET_PROJECT_STATUSES:
            return {
                ...state,
                projectStatuses: payload,
            };
        case actionTypes.APP_SET_SPECIALIZATIONS:
            return {
                ...state,
                specializations: payload,
            };
        default:
            return state;
    }
};
