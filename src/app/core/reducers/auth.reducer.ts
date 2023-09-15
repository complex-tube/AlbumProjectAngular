import {createReducer, on} from "@ngrx/store";
import {AuthType} from "../services/authorization/authorization.service";
import {setLoginAuthType, setRegisterAuthType} from "../actions/auth.action";

export const authReducer = createReducer(
  AuthType.LOGIN,
  on(setRegisterAuthType, (authType: AuthType) => authType = AuthType.REGISTRATION),
  on(setLoginAuthType, (authType: AuthType) => authType = AuthType.LOGIN)
)
