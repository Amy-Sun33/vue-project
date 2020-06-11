const href = window.location.href

let upl = ''
let url2 = ''
let url3 = ''
let url4 = ''
let zsqUrl2 = ''
let currentUrl = ''

if (href.indexOf('zhihuotech') != -1) {
  upl = 'https://zhihuotech.com/dev'
  url2 = 'https://zhihuotech.com/scan_web_dev'
  url3 = 'https://zhihuotech.com/insight_dev'
  zsqUrl2 = 'https://zhihuotech.com/devj'
  currentUrl = 'zhihuotech.com/dev'
} else if (href.indexOf('ezsq') != -1) {
  upl = 'https://www.ezsq.cn/p'
  url2 = 'https://www.ezsq.cn/scan_web_online'
  url3 = 'https://www.ezsq.cn/insight'
  zsqUrl2 = 'https://www.ezsq.cn/j'
  currentUrl = 'www.ezsq.cn/p'
} else {
  upl = 'https://zhihuotech.com/dev'
  url2 = 'https://zhihuotech.com/scan_web_dev'
  url3 = 'https://zhihuotech.com/insight_dev'
  currentUrl = 'zhihuotech.com/dev'
}

export { upl, url2, url3, url4, zsqUrl2, currentUrl }
