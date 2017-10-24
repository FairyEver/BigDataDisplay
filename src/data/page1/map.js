// 养殖户分布 大地图上用

let res = [
  {'name': '上海', 'value': '67'},
  {'name': '云南', 'value': '20'},
  {'name': '内蒙古', 'value': '3'},
  {'name': '西藏', 'value': '123'},
  {'name': '北京', 'value': '323'},
  {'name': '台湾', 'value': '1'},
  {'name': '吉林', 'value': '38'},
  {'name': '四川', 'value': '23'},
  {'name': '天津', 'value': '34'},
  {'name': '宁夏', 'value': '5'},
  {'name': '安徽', 'value': '281'},
  {'name': '山东', 'value': '83'},
  {'name': '山西', 'value': '194'},
  {'name': '广东', 'value': '118'},
  {'name': '广西', 'value': '80'},
  {'name': '新疆', 'value': '14'},
  {'name': '江苏', 'value': '397'},
  {'name': '江西', 'value': '44'},
  {'name': '河北', 'value': '23'},
  {'name': '河南', 'value': '44'},
  {'name': '浙江', 'value': '65'},
  {'name': '海南', 'value': '47'},
  {'name': '湖北', 'value': '23'},
  {'name': '湖南', 'value': '67'},
  {'name': '甘肃', 'value': '4'},
  {'name': '福建', 'value': '56'},
  {'name': '贵州', 'value': '78'},
  {'name': '辽宁', 'value': '10'},
  {'name': '重庆', 'value': '23'},
  {'name': '陕西', 'value': '95'},
  {'name': '青海', 'value': '1'},
  {'name': '香港', 'value': '7'},
  {'name': '澳门', 'value': '7'},
  {'name': '黑龙江', 'value': '46'}
]
export default res.map(e => {
  let _e = e
  e.info = {
    cd: Math.round(Math.random() * 1000),
    hl: Math.round(Math.random() * 1000),
    tt: Math.round(Math.random() * 1000),
    ym: Math.round(Math.random() * 1000)
  }
  return _e
})
