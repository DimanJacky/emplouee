import { sort } from '@neoflex/psa-ui-shared';
import actionTypes from 'actionTypes';
import { fetch } from 'helpers';
import settings from 'settings';


const searchUsers = (searchData: any) => (dispatch: any) => {
    return fetch({
        url: settings.API_URL + '/employee/employees',
        method: 'POST',
        params: searchData,
    })
        .then(response => response.json())
        .then(payload => {
            dispatch({
                type: actionTypes.APP_SET_LOADING,
                payload: false,
            });

            dispatch({
                type: actionTypes.EMPLOYEE_SET_LIST,
                payload,
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
                payload: error.message,
            });

            return;
        });
};


const sortUsers = (users: any, field: string, desc: boolean = false) => (dispatch: any) => {
    const payload = sort(users, field, desc);

    dispatch({
        type: actionTypes.EMPLOYEE_SET_LIST,
        payload,
    });
};


export default { searchUsers, sortUsers };
