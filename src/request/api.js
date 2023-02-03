import { get, post } from './http'

// 交易页面接口
export const getExchangeInfoList = data => post('IntegralServer/exchange/getExchangeInfoList', data);

export const publishExchangeInfo = data => post('/IntegralServer/exchange/publishExchangeInfo', data)

export const getTopShow  = data => get('IntegralServer/exchange/getTopShow', data)

export const queryUserInfo = data => post('IntegralServer/userInfo/getUserInfoByUid', data)

export const chargeImtOrAZ = data => post('IntegralServer/exchange/chargeImtOrAZ', data)

// 用户登陆页面接口
export const login = data => post('/IntegralServer/userInfo/login', data)

export const loginByCode = data => post('IntegralServer/userInfo/loginByCode', data)

export const sendCode = data => post('UserServer/user/sendCode', data)

export const regist = data => post('IntegralServer/userInfo/regist', data)

// 个人中心页面接口
export const queryAcceptancePubListBySelf = data => post('IntegralServer/acceptance/queryAcceptancePubListBySelf', data)

export const queryPurchaseList = data => post('IntegralServer/acceptance/queryPurchaseList', data)

export const getSelfExchangeInfoList = data => post('IntegralServer/exchange/getSelfExchangeInfoList', data)

export const queryTranslationRecordList = data => post('IntegralServer/exchange/queryTranslationRecordList', data)

export const sendImt2Buyer = data => post('IntegralServer/acceptance/sendImt2Buyer', data)

// 回收页面接口
export const recycleAz = data => post('IntegralServer/exchange/recycleAz', data)