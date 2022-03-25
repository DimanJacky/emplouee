import React, { ComponentProps } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Typography, Button, IconLock } from '@neoflex/fastdata-ui-kit';
import settings from 'settings';
import actionTypes from 'actionTypes';
import css from './error.module.scss';
import classNames from "classnames";


export default ({ status = 404, statusText, description, message, ...props }: ComponentProps<any>) => {
    let history = useHistory();
    const dispatch = useDispatch();

    const goBack = () => {
        dispatch({
            type: actionTypes.APP_SET_ERROR,
            payload: false,
        });

        history.goBack();
    };


    const goHome = () => {
        dispatch({
            type: actionTypes.APP_SET_ERROR,
            payload: false,
        });

        history.push(settings.DASHBOARD_PATH);
    };


    return (
        <div className={classNames(css.container, (props.inline && css.inline))}>
            <div className={css.body}>
                <div className={css.errorLabel}>
                    <IconLock className={css.errorIcon} />
                    <span className={css.errorCode}>{status}</span>
                </div>
                <div className={css.errorDesc}>
                    <Typography type={props.inline ? 'h3' : 'h2'} className={css.error}>Error {status} {statusText}</Typography>
                    {
                        // что-то вразумительное для пользователя
                        description ?
                            <Typography type="h3" className={css.description}>{description}</Typography> :
                            // то что приходит с сервера
                            message &&
                            <Typography type="h3" className={css.description}>{message}</Typography>
                    }
                    <div className={css.buttons}>
                        <Button size="small" view="primary" onClick={goBack}>Go back</Button>
                        {
                            !props.inline &&
                            <Button size="small" view="secondary" onClick={goHome}>Back home</Button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
