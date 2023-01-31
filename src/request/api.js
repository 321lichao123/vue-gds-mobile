import { get, post } from './http'

export const getExchangeInfoList = data => post('IntegralServer/exchange/getExchangeInfoList', data);

export const publishExchangeInfo = data => post('/IntegralServer/exchange/publishExchangeInfo', data)

export const getTopShow  = data => get('IntegralServer/exchange/getTopShow', data)

export const queryUserInfo = data => post('UserServer/user/queryUserInfo', data)