import React, { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    IconCertificate, IconEmail, IconTeams,
    Typography, Button, Tooltip
} from '@neoflex/fastdata-ui-kit';
import { RootState } from 'configStore';
import Container from 'components/Container';
import ProfileTabs from './ProfileTabs';
import css from './profile.module.scss';
import ProjectAssignmentsTab from './ProjectAssignmentsTab';
import CareerHistoryTab from './CareerHistoryTab';
import { businessEntity } from 'helpers';

export { default as reducers } from './reducers';


type ParamTypes = {
    id?: string
}

const Profile = () => {
    const profile = useSelector((state: RootState) => state.profile);
    const { id } = useParams<ParamTypes>();


    return (
        <Container>
            {
                profile.id &&
                <Fragment>
                    <div className={css.profileName}>
                        <Typography type="h2" tag="h1">{profile.lastName} {profile.firstName} {profile.patronymic}</Typography>
                        <div>
                            <Button view="secondary" onClick={() => window.open('mailto:' + profile.email)}><Tooltip title="Написать на email"><IconEmail /></Tooltip></Button>
                            <Button view="secondary" onClick={() => window.open('https://teams.microsoft.com/l/chat/0/0?users=' + profile.email)}><Tooltip title="Написать в MS Teams" position="bottom-end"><IconTeams /></Tooltip></Button>
                        </div>
                    </div>

                    <ProfileTabs id={id} />

                    <div className={css.paper}>
                        <div className={css.userInfo}>
                            <div className={css.userCard}>
                                <div className={css.dataTable}>
                                    <div className={css.userPhoto}>
                                        {profile.photo && <img src={profile.photo} alt="" />}
                                        <IconCertificate />
                                    </div>
                                    <div className={css.tableRow}>
                                        <div className={css.name}>Внутренний телефон</div>
                                        <div className={css.value}>
                                            {/*<Editable name="internalPhoneNumber" value={profile.internalPhoneNumber} />*/}
                                            {profile.internalPhone}
                                        </div>
                                    </div>
                                    <div className={css.tableRow}>
                                        <div className={css.name}>Мобильный телефон</div>
                                        <div className={css.value}>
                                            {/*<Editable name="mobilePhone" value={profile.mobilePhone} />*/}
                                            {profile.mobilePhone}
                                        </div>
                                    </div>
                                    <div className={css.tableRow}>
                                        <div className={css.name}>Email</div>
                                        <div className={css.value}>
                                            <a href={'mailto:' + profile.email}>{profile.email}</a></div>
                                    </div>
                                </div>
                            </div>
                            <div className={css.userDesc}>
                                <div className={css.dataTable}>
                                    <div className={css.tableRow}>
                                        <div className={css.name}>Грейд</div>
                                        <div className={css.value}>{profile.position}</div>
                                    </div>
                                    <div className={css.tableRow}>
                                        <div className={css.name}>Роль в компании</div>
                                        <div className={css.value}>{profile.companyRole}</div>
                                    </div>
                                    <div className={css.tableRow}>
                                        <div className={css.name}>Специализация</div>
                                        <div className={css.value}>{profile.specialization}</div>
                                    </div>
                                    <div className={css.tableRow}>
                                        <div className={css.name}>Подразделение</div>
                                        <div className={css.value}>{businessEntity(profile.businessEntity, profile.employeeDepartment, profile.employeeGroup)}</div>
                                    </div>
                                    <div className={css.tableRow}>
                                        <div className={css.name}>Филиал</div>
                                        <div className={css.value}>{profile.companyBranch}</div>
                                    </div>
                                    <div className={css.tableRow}>
                                        <div className={css.name}>Локация</div>
                                        <div className={css.value}>{profile.location}</div>
                                    </div>
                                    {
                                        profile.manager &&
                                        <div className={css.tableRow}>
                                            <div className={css.name}>Руководитель</div>
                                            <div className={css.value}>
                                                <Link to={'/employee/' + profile.manager.id}>{profile.manager.lastName} {profile.manager.firstName} {profile.manager.patronymic}</Link>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <ProjectAssignmentsTab />

                    <CareerHistoryTab />

                </Fragment>
            }
        </Container>
    );
};


export default Profile;
