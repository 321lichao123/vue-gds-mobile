import { get, post } from './http'

// 交易页面接口
export const getExchangeInfoList = data => post('IntegralServer/exchange/getExchangeInfoList', data);

export const publishExchangeInfo = data => post('/IntegralServer/exchange/publishExchangeInfo', data)

export const getTopShow  = data => get('IntegralServer/exchange/getTopShow', data)

export const queryUserInfo = data => post('IntegralServer/userInfo/getUserInfoByUid', data)

// 用户登陆页面接口
export const login = data => post('UserServer/user/login', data)

export const loginByCode = data => post('IntegralServer/userInfo/loginByCode', data)

export const sendCode = data => post('UserServer/user/sendCode', data)

export const regist = data => post('IntegralServer/userInfo/regist', data)