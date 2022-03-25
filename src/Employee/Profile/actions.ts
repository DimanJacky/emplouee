import { sort } from '@neoflex/psa-ui-shared';
import actionTypes from 'actionTypes';
import { fetch } from 'helpers';
import settings from 'settings';


const getUserData = (id: number | undefined) => (dispatch: any) => {
    dispatch({
        type: actionTypes.APP_SET_LOADING,
        payload: true,
    });

    return fetch({
        url: settings.API_URL + settings.EMPLOYEE_PATH + '/' + id + '/detail',
        method: 'GET',
    })
        .then(response => response.json())
        .then(payload => {
            dispatch({
                type: actionTypes.PROFILE_SET_DATA,
                payload
            });

            dispatch({
                type: actionTypes.APP_SET_LOADING,
                payload: false,
            });

            return payload;
        })
        .catch((error) => {
            dispatch({
                type: actionTypes.APP_SET_LOADING,
                payload: false,
            });

            dispatch({
                type: actionTypes.APP_SET_ERROR,
                payload: { ...error, description: 'Пользователь не найден' },
            });

            return;
        });
};

const getCareerHistory = (id: number | undefined) => (dispatch: any) => {
    return fetch({
        url: settings.API_URL + settings.EMPLOYEE_PATH + '/career/' + id,
        method: 'GET',
    })
        .then(response => response.json())
        .then(payload => {
            dispatch({
                type: actionTypes.CAREER_HISTORY_SET,
                payload
            });

            return payload;
        }).catch(error => {
            console.error({ ...error, description: 'Не удалось получить данные по карьере' });

            return;
        });
};


const getProjectAssigmentByEmployeeId = (id: number | undefined) => (dispatch: any) => {
    return fetch({
        url: settings.API_URL + settings.PROJECT_ASSIGNMENT_PATH + settings.EMPLOYEE_PATH + '/' + id,
        method: 'GET',
    })
        .then(response => response.json())
        .then(payload => {
            dispatch({
                type: actionTypes.PROFILE_SET_PROJECT_ASSIGNMENTS,
                payload
            });

            return payload;
        }).catch(error => {
            console.error({ ...error, description: 'Не удалось получить данные по проектам' });

            return;
        });
};

const sortProfileProjects = (profileProjects: [], field: string, desc: boolean = false) => (dispatch: any) => {
    const payload = sort(profileProjects, field, desc);

    dispatch({
        type: actionTypes.PROFILE_SET_PROJECT_ASSIGNMENTS,
        payload,
    });
};


export default {
    getUserData,
    getCareerHistory,
    getProjectAssigmentByEmployeeId,
    sortProfileProjects
};

