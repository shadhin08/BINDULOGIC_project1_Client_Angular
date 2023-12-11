import { createReducer, on } from '@ngrx/store';
import { initalLogedinUserState } from './logedin-uer.state';
import { login } from './logedin-user.actions';

const _logedInUserReducer = createReducer(
  initalLogedinUserState,
  on(login, (state, action) => {
    console.log('login reducer');
    return {
      ...state,
      username: action.username,
      isLogedin: true,
    };
  })
);

export function logedInUserReducer(state: any, action: any) {
  return _logedInUserReducer(state, action);
}
