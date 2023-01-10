import {configureStore} from '@reduxjs/toolkit';


import loginSlice from './loginSlice';
// import { counterReducer } from './counter';

export default configureStore({
    reducer:{
        login:loginSlice
        // counter: counterReducer,
    }
});