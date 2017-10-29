import echarts from 'echarts'
import chinaMap from '@/assets/echarts/china.js'

// anhui.json        hebei.json        liaoning.json     sichuan.json
// beijing.json      heilongjiang.json macau.json        taiwan.json
// chongqing.json    henan.json        neimenggu.json    tianjin.json
// fujian.json       hongkong.json     ningxia.json      xinjiang.json
// gansu.json        hubei.json        qinghai.json      xizang.json
// guangdong.json    hunan.json        shan1xi.json      yunnan.json
// guangxi.json      jiangsu.json      shan3xi.json      zhejiang.json
// guizhou.json      jiangxi.json      shandong.json
// hainan.json       jilin.json        shanghai.json

echarts.registerMap('china', chinaMap)

export default echarts
