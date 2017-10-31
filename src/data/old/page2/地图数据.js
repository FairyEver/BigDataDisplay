// 养殖户分布 大地图上用

// 所有的地区
// let city = ['上海', '云南', '内蒙古', '西藏', '北京', '台湾', '吉林', '四川', '天津', '宁夏', '安徽', '山东', '山西', '广东', '广西', '新疆', '江苏', '江西', '河北', '河南', '浙江', '海南', '湖北', '湖南', '甘肃', '福建', '贵州', '辽宁', '重庆', '陕西', '青海', '香港', '澳门', '黑龙江']
let city = ['上海', '云南', '内蒙古', '西藏', '北京', '吉林', '四川', '天津', '宁夏', '安徽', '山东', '山西', '广东', '广西', '新疆', '江苏', '江西', '河北', '河南', '浙江', '海南', '湖北', '湖南', '甘肃', '福建', '贵州', '辽宁', '重庆', '陕西', '青海', '黑龙江']

// console.log(city.length)

// 在所有的地区中随机选出来几个
// let getArrayItems = (arr, num) => {
//   let tempArray = []
//   for (var index in arr) {
//     tempArray.push(arr[index])
//   }
//   var returnArray = []
//   for (var i = 0; i < num; i++) {
//     if (tempArray.length > 0) {
//       var arrIndex = Math.floor(Math.random() * tempArray.length)
//       returnArray[i] = tempArray[arrIndex]
//       tempArray.splice(arrIndex, 1)
//     } else {
//       break
//     }
//   }
//   return returnArray
// }

// 生成一组数据
let dataBuilder = () => {
  // 随机20个地区
  // let _city = getArrayItems(city, 20)
  let _city = city
  // 基础地图数据
  return _city.map(e => {
    let n = Math.round(Math.random() * 100)
    return {
      name: e,
      value: n * n
    }
  }).map(e => {
    // 加工 生成地图附加的详细信息
    let _e = e
    // r1使用
    e.r1 = {
      cd: Math.round(Math.random() * 100) + 50,
      hl: Math.round(Math.random() * 100) + 50,
      tt: Math.round(Math.random() * 100) + 50,
      ym: Math.round(Math.random() * 100) + 50
    }
    // r2使用
    e.r2 = [
      {name: '30岁以下', value: Math.round(Math.random() * 100) + 20},
      {name: '30-40', value: Math.round(Math.random() * 100) + 30},
      {name: '40-50', value: Math.round(Math.random() * 100) + 50},
      {name: '50-60', value: Math.round(Math.random() * 100) + 20},
      {name: '60岁以上', value: Math.round(Math.random() * 100) + 10}
    ]
    // r3使用
    e.r3 = [
      {name: '红壳蛋鸡', value: Math.round(Math.random() * 100) + 50},
      {name: '粉壳蛋鸡', value: Math.round(Math.random() * 100) + 50},
      {name: '白壳蛋鸡', value: Math.round(Math.random() * 100) + 50}
    ]
    return _e
  })
}

export default {
  mapInfo: {
    cd: Math.round(Math.random() * 10000),
    hl: Math.round(Math.random() * 10000),
    tt: Math.round(Math.random() * 10000),
    tm: Math.round(Math.random() * 10000)
  },
  mapData: dataBuilder()
}
