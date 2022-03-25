import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import settings from 'settings';
import Error from 'components/Error';
import Profile from './Profile';
import Timesheet from './Timesheet';
import actions from './actions';

export { default as reducers } from './reducers';
export { default as projectReducers } from './projectReducers';
export { default as careerReducers } from './careerReducers';


type ParamTypes = {
    id?: string
}

const ProfileRoutes = () => {
    const { id } = useParams<ParamTypes>();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getUserData(Number(id)));
    }, [id]);


    return (
        <Switch>
            <Route exact path={settings.DASHBOARD_PATH + '/:id'} component={Profile} />
            <Route exact path={settings.DASHBOARD_PATH + '/:id/timesheet'} component={Timesheet} />
            {/*render 404 */}
            <Route render={() => <Error status={404} statusText="Page not found" />} />
            {/* or redirect to dashboard */}
            <Redirect to={settings.DASHBOARD_PATH} />
        </Switch>
    );
};


export default ProfileRoutes;
