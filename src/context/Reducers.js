import { ACTIONS } from './Actions';

const reducers = (state, action) => {
  switch (action.type) {
    case ACTIONS.AUTH:
      return {
        ...state,
        auth: action.payload,
      };
    case ACTIONS.MENUS:
      return {
        ...state,
        menus: action.payload,
      };
    case ACTIONS.PERMISSIONS:
      return {
        ...state,
        permissions: action.payload,
      };

    default:
      return state;
  }
};

export default reducers;
