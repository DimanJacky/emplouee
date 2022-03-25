import actionTypes from 'actionTypes';
import { AppAction, AuthType } from 'configStore';
import { tokenService } from 'helpers';


const initialState: AuthType = {
    token: tokenService.tokenStorage.getAccessToken(),
    loading: true,
    error: false,
    userInfo: {
        id: 0,
        lastName: '...',
        firstName: '...',
    }
};


export default (state: AuthType = initialState, { type, payload }: AppAction) => {
    switch(type) {
        case actionTypes.LOGIN:
            tokenService.tokenStorage.setAccessToken(payload.token);

            return {
                ...state,
                token: payload.token,
                userInfo: { ...state.userInfo, ...payload.userInfo },
            };
        case actionTypes.LOGOUT:
            tokenService.tokenStorage.removeAccessToken();

            return {};
        case actionTypes.AUTH_SET_LOADING:
            return {
                ...state,
                loading: payload,
            };
        case actionTypes.AUTH_SET_ERROR:
            return {
                ...state,
                error: payload,
            };
        default:
            return state;
    }
};
