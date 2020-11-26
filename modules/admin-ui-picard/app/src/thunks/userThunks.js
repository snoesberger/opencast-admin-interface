import {loadUsersFailure, loadUsersInProgress, loadUsersSuccess} from "../actions/userActions";
import {getURLParams} from "../utils/resourceUtils";

// fetch users from server
export const fetchUsers = () => async (dispatch, getState) => {
    try {
        dispatch(loadUsersInProgress());

        const state = getState();
        let params = getURLParams(state);

        // /users.json?limit=0&offset=0&filter={filter}&sort={sort}
        let data = await fetch('admin-ng/users/users.json?' + params);

        const users = await data.json();
        dispatch(loadUsersSuccess(users));

    } catch (e) {
        dispatch(loadUsersFailure());
    }
};