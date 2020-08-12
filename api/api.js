import base from './base'

import {upl, url3, zsqUrl2, currentUrl} from './baseUrl'

const request = base.requestApi

// 请求登录
export const doLogin = request('/apis/admin/login', 'post');

//获取验证码
export const getVerifyCode = request('/apis/admin/getverifycode?' + Math.random(), 'get')

//获取用户列表
export const userList = request('/apis/admin/userlist', 'get')

//删除用户
export const delUser = request('/apis/admin/user/deluser', 'get')

//冻结用户
export const frozenuser = request('/apis/admin/user/frozenuser', 'get')

//编辑用户|添加用户
export const edituser = request('/apis/admin/edituser', 'post')

//获取权限列表
export const powerList = request('/apis/admin/powerlist', 'get')

//获取权限树
export const powerTree = request('/apis/admin/powertree', 'get')
