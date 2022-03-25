import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import settings from 'settings';
import Dashboard from './Dashboard';
import Error from 'components/Error';
import ProfileRoutes from './Profile';
import actions from '../actions';
import { useDispatch } from 'react-redux';

export { default as reducers } from './reducers';


export default () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getPositions());
        dispatch(actions.getLocations());
        dispatch(actions.getBusinessEntities());
        dispatch(actions.getCompanyRoles());
        dispatch(actions.getEmployeeGroups());
        dispatch(actions.getEmployeeDepartments());
        dispatch(actions.getSpecializations());

        // искать при загрузке страницы
        // await makeSearch();
    }, []);

    return (
        <Switch>
            <Route exact path={settings.DASHBOARD_PATH} component={Dashboard} />
            <Route path={settings.DASHBOARD_PATH + '/:id'} component={ProfileRoutes} />
            {/* render 404 */}
            <Route render={() => <Error status={404} statusText="Page not found" />} />
            {/* or redirect to dashboard */}
            <Redirect to={settings.DASHBOARD_PATH} />
        </Switch>
    );
};
