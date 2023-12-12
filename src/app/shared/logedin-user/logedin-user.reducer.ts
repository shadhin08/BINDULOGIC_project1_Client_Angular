import { createReducer, on } from '@ngrx/store';
import { initalLogedinUserState } from './logedin-uer.state';
import { login, logOut } from './logedin-user.actions';

const _logedInUserReducer = createReducer(
  initalLogedinUserState,
  on(login, (state, action) => {
    // console.log('login reducer');
    return {
      ...state,
      username: action.username,
      isLogedin: true,
    };
  }),
  on(logOut, (state) => {
    // console.log('logout reducer');
    return {
      ...state,
      username: '',
      isLogedin: false,
    };
  })
);

export function logedInUserReducer(state: any, action: any) {
  return _logedInUserReducer(state, action);
}
