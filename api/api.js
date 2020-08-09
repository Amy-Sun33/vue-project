import base from './base'

import { upl, url3, zsqUrl2, currentUrl } from './baseUrl'

const request = base.requestApi

// 请求登录
export const doLogin = request('/apis/admin/login', 'post');

//获取验证码
export const getVerifyCode = request('/apis/getverifycode?'+ Math.random(), 'get')
