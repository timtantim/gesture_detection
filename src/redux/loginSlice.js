import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loginState: false,
    expires_in:null,
    expires_time:null,
    refresh_token:null,
    user_account:null,
    access_token:null,
    token_type:null

}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoginTrue:(state)=>{
        state.loginState=true;
    },
    setLoginFalse:(state)=>{
      state.loginState=false;
    },
    setExpiresIn:(state, action)=>{
      state.expires_in=action.payload;
    },
    setExpireTime:(state, action)=>{
      state.expires_time=action.payload;
    },
    setRefreshToken:(state, action)=>{
      state.refresh_token=action.payload;
    },
    setUserAccount:(state, action)=>{
      state.user_account=action.payload;
    },
    setAccessToken:(state, action)=>{
      state.access_token=action.payload;
    },
    setTokenType:(state, action)=>{
      state.token_type=action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  setLoginTrue,
  setLoginFalse,
  setExpiresIn,
  setExpireTime,
  setRefreshToken,
  setUserAccount,
  setAccessToken,
  setTokenType

} = loginSlice.actions

export default loginSlice.reducer