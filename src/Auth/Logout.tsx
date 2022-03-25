import React from 'react';
import Refresh from 'components/Refresh';
import { useKeycloak } from '@react-keycloak/web';
import { useDispatch } from 'react-redux';
import actionTypes from 'actionTypes';


export default () => {
    const { keycloak } = useKeycloak();
    const dispatch = useDispatch();

    if(process.env.NODE_ENV === 'development') {
        if(!!keycloak.authenticated) {
            keycloak.logout();

            dispatch({
                type: actionTypes.LOGOUT
            });
        }

        return (
            <div>
                Refresh to="/logout"
            </div>
        );
    }

    return (
        <Refresh to="/logout" />
    );
};
