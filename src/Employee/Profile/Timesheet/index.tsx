import React, { ComponentProps, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, IconEmail, IconTeams, Typography } from '@neoflex/fastdata-ui-kit';
import { RootState } from 'configStore';
import Container from 'components/Container';
import ProfileTabs from '../ProfileTabs';
import actions from '../actions';
import css from './timeshit.module.scss';


type ParamTypes = {
    id?: string
}


const Timesheet = (props: ComponentProps<any>) => {
    const {
        profile,
        // ...rest
    } = props;

    const { id } = useParams<ParamTypes>();


    return (
        <Container>
            {
                profile.id &&
                <Fragment>
                    <div className={css.profileName}>
                        <Typography type="h2" tag="h1">{profile.lastName} {profile.firstName} {profile.patronymic}</Typography>
                        <div>
                            <Button view="secondary" onClick={() => window.open('mailto:' + profile.email)}><IconEmail /></Button>
                            <Button view="secondary" onClick={() => window.open('https://teams.microsoft.com/l/chat/0/0?users=' + profile.email)}><IconTeams /></Button>
                        </div>
                    </div>

                    <ProfileTabs id={id} />
                </Fragment>
            }
        </Container>
    );
};


export default connect(
    (state: RootState) => ({
        ...state.app,
        profile: state.profile
    }),
    { ...actions }
)(Timesheet);
