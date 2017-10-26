// 养殖户分布 大地图上用

// 所有的地区
let city = ['上海', '云南', '内蒙古', '西藏', '北京', '台湾', '吉林', '四川', '天津', '宁夏', '安徽', '山东', '山西', '广东', '广西', '新疆', '江苏', '江西', '河北', '河南', '浙江', '海南', '湖北', '湖南', '甘肃', '福建', '贵州', '辽宁', '重庆', '陕西', '青海', '香港', '澳门', '黑龙江']

// 在所有的地区中随机选出来几个
let getArrayItems = (arr, num) => {
  let tempArray = []
  for (var index in arr) {
    tempArray.push(arr[index])
  }
  var returnArray = []
  for (var i = 0; i < num; i++) {
    if (tempArray.length > 0) {
      var arrIndex = Math.floor(Math.random() * tempArray.length)
      returnArray[i] = tempArray[arrIndex]
      tempArray.splice(arrIndex, 1)
    } else {
      break
    }
  }
  return returnArray
}

// 生成一组数据
let dataBuilder = () => {
  // 随机20个地区
  let _city = getArrayItems(city, 20)
  // 基础地图数据
  return _city.map(e => {
    return {
      name: e,
      value: Math.round(Math.random() * 50)
    }
  }).map(e => {
    // 加工 生成地图下面的四个详细信息
    let _e = e
    e.info = {
      cd: Math.round(Math.random() * 100),
      hl: Math.round(Math.random() * 100),
      tt: Math.round(Math.random() * 100),
      ym: Math.round(Math.random() * 100)
    }
    return _e
  })
}

// let a = dataBuilder()
// let b = dataBuilder()
// console.log(a)
// console.log(b)
// console.log(a === b)

export default {
  all: dataBuilder(),
  hong: dataBuilder(),
  bai: dataBuilder(),
  fen: dataBuilder()
}
