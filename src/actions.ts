import actionTypes from 'actionTypes';
import { fetch, tokenService } from 'helpers';
import settings from 'settings';

type DictionaryType = {
    id: number,
    name: string,
    shortName?: string
};

type DictionaryTypeRole = {
    id: number,
    role: string
};


const getUserInfo = (data: any) => {
    return fetch({
        url: settings.API_URL + '/employee/info-by-login',
        method: 'GET',
        params: {
            login: data.preferred_username
        }
    });
};


const getAuthData = () => (dispatch: any) => {
    const accessToken = tokenService.tokenStorage.getAccessToken();

    if(!accessToken) {
        dispatch({
            type: actionTypes.AUTH_SET_LOADING,
            payload: false,
        });

        return;
    }

    dispatch({
        type: actionTypes.AUTH_SET_LOADING,
        payload: true,
    });

    return fetch({
        url: settings.VALIDATE_TOKEN_URL,
        method: 'POST',
        params: {
            token: accessToken,
            withEmployeeInfo: true
        },
        accessToken: false
    })
        .then(response => response.json())
        .then(payload => {
            if(payload.status) {
                dispatch({
                    type: actionTypes.LOGIN,
                    payload: { encryptedTokens: accessToken, userInfo: payload.employeeInfo }
                });
            } else {
                dispatch({
                    type: actionTypes.LOGOUT
                });
            }

            dispatch({
                type: actionTypes.AUTH_SET_LOADING,
                payload: false,
            });
        })
        .catch((error) => {
            dispatch({
                type: actionTypes.LOGOUT
            });

            dispatch({
                type: actionTypes.AUTH_SET_ERROR,
                payload: error.message,
            });

            dispatch({
                type: actionTypes.AUTH_SET_LOADING,
                payload: false,
            });

            return;
        });
};


const getPositions = () => (dispatch: any) => {
    fetch({
        url: settings.API_URL + '/employee/dictionary/positions',
        method: 'GET',
    })
        .then(response => response.json())
        .then(positions => positions.map((position: DictionaryType) => ({ value: position.id.toString(), label: position.name })))
        .then(positions => {
            dispatch({
                type: actionTypes.APP_SET_POSITIONS,
                payload: positions,
            });
        })
        .catch((error) => {
            console.error(error);

            return;
        });
};


const getBusinessEntities = () => (dispatch: any) => {
    fetch({
        url: settings.API_URL + '/employee/dictionary/employee_structure_units',
        method: 'GET',
        params: {
            type: 'BUSINESS_ENTITY'
        },
    })
        .then(response => response.json())
        .then(entities => entities.map((entity: DictionaryType) => ({ value: entity.id.toString(), label: entity.name })))
        .then(entities => {
            dispatch({
                type: actionTypes.APP_SET_BUSINESS_ENTITIES,
                payload: entities,
            });
        })
        .catch((error) => {
            console.error(error);

            return;
        });
};


const getEmployeeDepartments = () => (dispatch: any) => {
    fetch({
        url: settings.API_URL + '/employee/dictionary/employee_structure_units',
        method: 'GET',
        params: {
            type: 'DEPARTMENT'
        },
    })
        .then(response => response.json())
        .then(entities => entities.map((entity: DictionaryType) => ({ value: entity.id.toString(), label: entity.name })))
        .then(entities => {
            dispatch({
                type: actionTypes.APP_SET_EMPLOYEE_DEPARTMENTS,
                payload: entities,
            });
        })
        .catch((error) => {
            console.error(error);

            return;
        });
};


const getLocations = () => (dispatch: any) => {
    fetch({
        url: settings.API_URL + '/employee/dictionary/company_branches',
        method: 'GET',
    })
        .then(response => response.json())
        .then(branches => branches.map((branch: DictionaryType) => ({ value: branch.id.toString(), label: branch.name })))
        .then(branches => {
            dispatch({
                type: actionTypes.APP_SET_LOCATIONS,
                payload: branches,
            });
        })
        .catch((error) => {
            console.error(error);

            return;
        });
};


const getCompanyRoles = () => (dispatch: any) => {
    fetch({
        url: settings.API_URL + '/employee/dictionary/company_roles',
        method: 'GET',
    })
        .then(response => response.json())
        .then(roles => roles.map((role: DictionaryTypeRole) => ({ value: role.id.toString(), label: role.role })))
        .then(roles => {
            dispatch({
                type: actionTypes.APP_SET_COMPANY_ROLES,
                payload: roles,
            });
        })
        .catch((error) => {
            console.error(error);

            return;
        });
};


const getEmployeeGroups = () => (dispatch: any) => {
    fetch({
        url: settings.API_URL + '/employee/dictionary/employee_structure_units',
        method: 'GET',
        params: {
            type: 'GROUP'
        },
    })
        .then(response => response.json())
        .then(entities => entities.map((entity: DictionaryType) => ({ value: entity.id.toString(), label: entity.name })))
        .then(entities => {
            dispatch({
                type: actionTypes.APP_SET_EMPLOYEE_GROUPS,
                payload: entities,
            });
        })
        .catch((error) => {
            console.error(error);

            return;
        });
};


const getProjectStatuses = () => (dispatch: any) => {
    const statuses = [
        { label: 'Not started', value: 1 },
        { label: 'In Progress', value: 2 },
        { label: 'Completed', value: 3 }
    ];

    dispatch({
        type: actionTypes.APP_SET_PROJECT_STATUSES,
        payload: statuses,
    });
};


type SpecializationType = {
    id: number,
    name: string,
    moodleId: number
};


const getSpecializations = () => (dispatch: any) => {
    return fetch({
        url: settings.API_URL + '/employee/dictionary/specializations',
        method: 'GET',
        params: {
            type: 'SPECIALIZATION'
        },
    })
        .then(response => response.json())
        .then(entities => entities.map((entity: SpecializationType) => ({ value: entity.id.toString(), label: entity.name })))
        .then(entities => {
            dispatch({
                type: actionTypes.APP_SET_SPECIALIZATIONS,
                payload: entities,
            });
        })
        .catch((error) => {
            console.error(error);

            return;
        });
};


export default {
    getUserInfo,
    getAuthData,
    getPositions,
    getBusinessEntities,
    getLocations,
    getCompanyRoles,
    getEmployeeGroups,
    getProjectStatuses,
    getEmployeeDepartments,
    getSpecializations
};
