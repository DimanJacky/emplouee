import React, { ComponentProps, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import css from './profile.module.scss';
import { useParams } from 'react-router-dom';
import {
    Table, TableCell, TableRow, Tag,
    Typography, Button
} from '@neoflex/fastdata-ui-kit';
import { RootState } from 'configStore';
import NativeLink from 'components/NativeLink';
import { IconSort, StatusTag } from '@neoflex/psa-ui-shared';
import actions from './actions';


type ParamTypes = {
    id?: string
}

type ObjectString = {
    [key: string]: string
}


const ProjectAssignmentsTab = ({ profileProjects, ...props }: ComponentProps<any>) => {
    const { id } = useParams<ParamTypes>();
    const [open, setOpen] = useState(false);
    const initialOrderBy: ObjectString = { startDate: 'asc' };
    const [orderedBy, setOrderedBy] = useState(initialOrderBy);


    useEffect(() => {
        props.getProjectAssigmentByEmployeeId(Number(id));
    }, [id]);

    const sumPercentage = profileProjects
        .filter((profileProject: any) => profileProject.isCurrentTask)
        .reduce((sum: number, profileProject: any) => sum + profileProject.percentage, 0);


    const getColorByPercentage = (percentage: number, isCurrentTask: boolean) => {
        return percentage > 100 && isCurrentTask ? 'error' : 'default';
    };


    const sortBy = (field: string, desc: boolean = false) => {
        setOrderedBy({ [field]: desc ? 'desc' : 'asc' });
        props.sortProfileProjects(profileProjects, field, desc);
    };


    const projectCount = profileProjects
        .filter((profileProject: any) => open || profileProject.isCurrentTask || profileProject.isFeatureTask)
        .map((profileProject: any) => profileProject.project.id);


    return (
        <Table cells={10} valign="center" className={css.projectsTable}>
            <Table.Row>
                <Table.Cell colspan={8}>
                    <Typography type="h3" weight="medium">Программы проектов: {[...new Set(projectCount)].length}</Typography>
                </Table.Cell>
                <Table.Cell colspan={2} align="right">
                    <Button view="link" onClick={ () => setOpen(!open)} >{open ? 'Скрыть' : 'Показать все' }</Button>
                </Table.Cell>
            </Table.Row>
            <Table.Header color="dark" className={css.header}>
                <Table.Cell colspan={4} nowrap>
                    Наименование программы
                    <IconSort fieldName="project.name" sortBy={sortBy} orderedBy={orderedBy} />
                </Table.Cell>
                <Table.Cell>
                    %
                    <IconSort fieldName="percentage" sortBy={sortBy} orderedBy={orderedBy} />
                </Table.Cell>
                <Table.Cell colspan={2} nowrap>
                    Роль
                    <IconSort fieldName="endDate" sortBy={sortBy} orderedBy={orderedBy} />
                </Table.Cell>
                <Table.Cell colspan={2} nowrap>
                    Дата начала
                    <IconSort fieldName="startDate" sortBy={sortBy} orderedBy={orderedBy} />
                </Table.Cell>
                <Table.Cell  colspan={2} nowrap>
                    Дата окончания
                    <IconSort fieldName="projectRole" sortBy={sortBy} orderedBy={orderedBy} />
                </Table.Cell>
                <Table.Cell colspan={2} nowrap>
                    Статус
                    <IconSort fieldName="status" sortBy={sortBy} orderedBy={orderedBy} />
                </Table.Cell>
            </Table.Header>
            {
                profileProjects
                    .filter((profileProject: any) => open || profileProject.isCurrentTask || profileProject.isFeatureTask)
                    .map((profileProject: any, key: number) => {
                        return (
                            <TableRow key={key}>
                                <TableCell colspan={4}>
                                    <NativeLink to={'/project/' + profileProject.project.id}>{profileProject.project.name}</NativeLink>
                                </TableCell>
                                <TableCell>
                                    <Tag color={getColorByPercentage(sumPercentage, profileProject.isCurrentTask)}>
                                        {profileProject.percentage + '%'}
                                    </Tag>
                                </TableCell>
                                <TableCell colspan={2} nowrap>{profileProject.projectRole}</TableCell>
                                <TableCell colspan={2} nowrap>{new Date(profileProject.startDate).toLocaleDateString()}</TableCell>
                                <TableCell colspan={2} nowrap>{new Date(profileProject.endDate).toLocaleDateString()}</TableCell>
                                <TableCell colspan={2} nowrap><StatusTag gender="female" type={profileProject.status} /></TableCell>
                            </TableRow>
                        );
                    })
            }
        </Table>
    );
};

export default connect(
    (state: RootState) => ({
        ...state.app,
        profileProjects: state.profileProjects
    }),
    { ...actions }
)(ProjectAssignmentsTab);
