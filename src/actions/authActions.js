import { SET_CURRENT_USER } from "../actions/types";
import setAuthorizationToken from "../utils/setAuthorizationToken";

const setCurrentUser = user => ({
    type: SET_CURRENT_USER,
    user,
  });

const logout = () => dispatch => {
  localStorage.removeItem("jwt");
  setAuthorizationToken(false);
  dispatch(setCurrentUser({}));
};

export { logout, setCurrentUser };
