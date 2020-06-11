import base from './base'

import { upl, url3, zsqUrl2, currentUrl } from './baseUrl'

const request = base.requestApi

// 请求登录
export const doLogin = request('/apis/index', 'get')
