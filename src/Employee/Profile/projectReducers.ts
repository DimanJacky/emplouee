import actionTypes from 'actionTypes';
import { ProjectAssignment } from 'configStore';


type ProfileAction = {
    readonly type: string,
    payload: ProjectAssignment[]
}


const initialState: ProjectAssignment[] = [];


export default (state: ProjectAssignment[] = initialState, { type, payload }: ProfileAction) => {
    switch(type) {
        case actionTypes.PROFILE_SET_PROJECT_ASSIGNMENTS:
            return payload;
        default:
            return state;
    }
};
