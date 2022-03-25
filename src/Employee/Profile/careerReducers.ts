import actionTypes from 'actionTypes';
import { CareerHistoryType } from 'configStore';


type CareerAction = {
    readonly type: string,
    payload: CareerHistoryType[]
}


const initialState: CareerHistoryType[] = [];

export default (state: CareerHistoryType[] = initialState, { type, payload }: CareerAction) => {
    switch(type) {
        case actionTypes.CAREER_HISTORY_SET:
            return payload;
        default:
            return state;
    }
};
