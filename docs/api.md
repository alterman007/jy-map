### 地图打点
- socket 推送实时位置
```json
[
  {
    "id": "[string, number]", // 唯一标示符
    "type": "string", // enum('car', 'people'),
    "lat": "number",
    "lng": "number",
    "name": "string", // 车牌 或 单兵设备名
  }
]
```

### 实时告警
- socket 推送实时位置
```json
[
  { 
    "id": "[string, number]", // 唯一标示符
    "type": "string", // enum('车辆告警', '人脸告警'),
    "name": "string", // 车牌 | 人名 
    "time": "string", // format 2019.08.11 23:32:20
  },
]
```

### 联网警力历史
- http get

name | dec | required
:-:| :-: | :-:
from | 开始时间 | false
to | 结束时间 | false
```json
[
  {
    "id": "[string, number]", // 唯一标示符
    "poster": "string", // 图片地址
    "belongTo": "string", // 所属派出所 
    "deviceCode": "string", // 设备号
    "time": "string", // 时间 format： 2019.08.11 23:32:20
  }
]
```

### 联网警力历史详情
- http get

name | dec | required
:-:| :-: | :-:
deviceId | 设备Id | true

```json
[
  {
    "id": "[string, number]", // 唯一标示符
    "poster": "string", // 图片地址
    "belongTo": "string", // 所属派出所 
    "deviceCode": "string", // 设备号
    "time": "string", // 时间 format： 2019.08.11 23:32:20
    "lat": "number",
    "lng": "number",
    "wifiNum": "number", // wifi 嗅控数
  }
]
```

### 联网警力抓拍信息
- http get

name | dec | required
:-:| :-: | :-:
from | 开始时间 | false
to | 结束时间 | false
deviceId | 设备Id | true

```json
[
  {
    "id": "[string, number]", // 唯一标示符
    "poster": "Array<string>", // 图片地址列表
    "name": "string", // 车牌 或 单兵设备名
    "belongTo": "string", // 所属派出所 
    "deviceCode": "string", // 设备号
    "time": "string", // 时间 format： 2019.08.11 23:32:20
    "lat": "number",
    "lng": "number",
    "cameraPosition": "string", // 摄像头位置
  }
]
```
### 单兵轨迹
- http get

name | dec | required
:-:| :-: | :-:
from | 开始时间 | false
to | 结束时间 | false
deviceId | 设备Id | true

```json
[
  ["lng", "lat"], // 经纬度列表
]
```

### 联网告警历史
- http get

name | dec | required
:-:| :-: | :-:
from | 开始时间 | false
to | 结束时间 | false
```json
[
  {
    "id": "[string, number]", // 唯一标示符
    "poster": "string", // 图片地址
    "name": "string", // 车牌号
    "time": "string", // 时间 format： 2019.08.11 23:32:20
  }
]
```

### 联网告警详情
- http get

name | dec | required
:-:| :-: | :-:
deviceId | 设备Id | true
```json
[
  {
    "id": "[string, number]", // 唯一标示符
    "poster": "string", // 图片地址列表
    "name": "string", // 车牌 或 单兵设备名
    "lat": "number",
    "lng": "number",
    "time": "string", // 时间 format： 2019.08.11 23:32:20
    "belongTo": "string", // 所属派出所 
    "type": "string", // enum('车辆告警', '人脸告警'),
    "deviceCode": "string", // 设备号
    "position": "string", // 所在区域
  }
]
```


### 联网告警详情人脸轨迹
- http get

name | dec | required
:-:| :-: | :-:
deviceId | 设备Id | true
from | 开始时间 | false
to | 结束时间 | false
```json
[
  ["lng", "lat"], // 经纬度列表
]
```
