import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducers as appReducers } from 'reducers';
import { reducers as authReducers } from 'Auth';
import { reducers as employeeReducers } from 'Employee';
import { reducers as profileReducers } from 'Employee/Profile';
import { projectReducers as profileProjectsReducers } from 'Employee/Profile';
import { careerReducers as careerHistoryReducers } from 'Employee/Profile';
import { composeWithDevTools } from 'redux-devtools-extension';

export type TokenType =  string | undefined;

export type AppState = {
    loading: boolean,
    error: string | boolean,
    positions: { value: string, label: string }[],
    businessEntities: { value: string, label: string }[],
    specializations: { value: string, label: string }[],
    branches: { value: string, label: string }[],
    companyRoles: { value: string, label: string }[],
    employeeDepartments: { value: string, label: string }[],
    employeeGroups: { value: string, label: string }[],
    projectStatuses: { value: string, label: string }[],
};


export type AuthType = {
    token: string | boolean | null,
    loading: boolean
    error: string | boolean,
    userInfo: {
        id: number,
        lastName: string,
        firstName: string,
        patronymic?: string,
    }
};


export type EmployeeType = {
    id?: number,
    firstName?: string,
    lastName?: string,
    patronymic?: string,
    position?: {
        id: number,
        shortName: string,
        name: string,
        numberValue: number
    },
    businessEntity?: {
        id: number,
        shortName: string,
        name: string,
        description: string,
        managerId: number
    },
    role?: string
}

export type ProfileType = {
    id: number,
    firstName: string,
    lastName: string,
    patronymic?: string,
    email?: string,
    photo?: string,
    internalPhone?: string,
    mobilePhone?: string,
    position?: string,
    companyRole?: string,
    specialization?: string,
    businessEntity: string,
    employeeGroup?: string,
    employeeDepartment?: string,
    companyBranch?: string,
    location?: string,
    manager: EmployeeType
};


export type ProjectAssignment = {
    project?: {
        id?: number,
        name?: string
    },
    task?: {
        id?: number,
        name?: string,
        jiraKey?: string
    },
    percentage?: number,
    projectRole?: string,
    startDate?: Date,
    endDate?: Date,
    status?: string,
    isCurrentTask?: boolean,
    isFeatureTask?: boolean,
    fullProjectTaskName?: string
}


export type CareerHistoryType = {
    grade?: string,
    role?: string,
    businessEntity: string,
    department?: string,
    group?: string,
    status?: string,
    date: Date,
    branch?: string,
    location?: string
}


export type AppAction = {
    type: string,
    payload: string | object | boolean | any
};


export type RootState = {
    app: AppState,
    auth: AuthType,
    employee: EmployeeType[],
    profile: ProfileType,
    profileProjects: ProjectAssignment[],
    careerHistory: CareerHistoryType[],
};

export const store = createStore(
    combineReducers({
        app: appReducers,
        auth: authReducers,
        employee: employeeReducers,
        profile: profileReducers,
        profileProjects: profileProjectsReducers,
        careerHistory: careerHistoryReducers,
    }),
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);
