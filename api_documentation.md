# 医影随护AI平台 API文档

## 通用说明

### 基础URL
```
https://yqkwiqirqxxc.sealoshzh.site/api
```

### 请求头
所有需要认证的接口都需要在请求头中携带token：
```
Authorization: Bearer your_token_here
```

### 通用响应格式

#### 成功响应
```json
{
  "code": 0,
  "message": "操作成功",
  "data": {
    // 响应数据
  }
}
```

#### 失败响应
```json
{
  "code": 400,
  "message": "错误信息"
}
```

### 通用错误码
- 0: 成功
- 400: 请求参数错误
- 401: 未授权或token无效
- 403: 权限不足
- 404: 资源不存在
- 500: 服务器内部错误

## 用户认证模块

### 1. 用户登录

#### 请求信息
- **URL**: `/user/login`
- **方法**: `POST`
- **描述**: 用户登录接口

#### 请求参数
```json
{
  "username": "string", // 用户名或手机号
  "password": "string"  // 密码
}
```

#### 成功响应
```json
{
  "code": 0,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userId": "60d21b4667d0d8992e610c85",
    "username": "testuser",
    "avatar": "https://example.com/avatar.jpg",
    "phoneNumber": "13800138000"
  }
}
```

#### 失败响应
```json
{
  "code": 400,
  "message": "用户名或密码错误"
}
```

### 2. 用户注册

#### 请求信息
- **URL**: `/user/register`
- **方法**: `POST`
- **描述**: 用户注册接口

#### 请求参数
```json
{
  "username": "string",      // 用户名，3-20个字符
  "password": "string",      // 密码，6-20个字符
  "phoneNumber": "string",   // 手机号，11位
  "verificationCode": "string" // 验证码，6位
}
```

#### 成功响应
```json
{
  "code": 0,
  "message": "注册成功",
  "data": {
    "userId": "60d21b4667d0d8992e610c85",
    "username": "testuser"
  }
}
```

#### 失败响应
```json
{
  "code": 400,
  "message": "用户名已存在"
}
```
或
```json
{
  "code": 400,
  "message": "手机号已注册"
}
```
或
```json
{
  "code": 400,
  "message": "验证码无效或已过期"
}
```

### 3. 发送验证码

#### 请求信息
- **URL**: `/user/sendVerificationCode`
- **方法**: `POST`
- **描述**: 发送短信验证码

#### 请求参数
```json
{
  "phoneNumber": "string", // 手机号，11位
  "type": "string"        // 验证码类型：register-注册，reset-password-重置密码
}
```

#### 成功响应
```json
{
  "code": 0,
  "message": "发送成功",
  "data": {
    "codeId": "60d21b4667d0d8992e610c85",
    "expireAt": 1621234567890
  }
}
```

#### 失败响应
```json
{
  "code": 400,
  "message": "手机号格式不正确"
}
```

### 4. 重置密码

#### 请求信息
- **URL**: `/user/resetPassword`
- **方法**: `POST`
- **描述**: 重置用户密码

#### 请求参数
```json
{
  "phoneNumber": "string",     // 手机号，11位
  "verificationCode": "string", // 验证码，6位
  "newPassword": "string"      // 新密码，6-20个字符
}
```

#### 成功响应
```json
{
  "code": 0,
  "message": "密码重置成功"
}
```

#### 失败响应
```json
{
  "code": 400,
  "message": "验证码无效或已过期"
}
```
或
```json
{
  "code": 404,
  "message": "用户不存在"
}
```

### 5. 获取用户信息

#### 请求信息
- **URL**: `/user/info`
- **方法**: `GET`
- **描述**: 获取当前登录用户信息
- **需要认证**: 是

#### 请求参数
无

#### 成功响应
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "userId": "60d21b4667d0d8992e610c85",
    "username": "testuser",
    "avatar": "https://example.com/avatar.jpg",
    "phoneNumber": "13800138000",
    "age": 30,
    "gender": "male",
    "medicalHistory": ["高血压", "糖尿病"],
    "emergencyContact": "13900139000",
    "guardianPhone": "13700137000"
  }
}
```

#### 失败响应
```json
{
  "code": 401,
  "message": "未授权: 缺少令牌"
}
```
或
```json
{
  "code": 404,
  "message": "用户不存在"
}
```

## 健康数据模块

### 1. 上传健康数据

#### 请求信息
- **URL**: `/health/upload`
- **方法**: `POST`
- **描述**: 上传用户健康数据
- **需要认证**: 是

#### 请求参数
```json
{
  "bloodPressure": {
    "systolic": 120,  // 收缩压，50-250
    "diastolic": 80   // 舒张压，30-150
  },
  "bloodSugar": 5.5,  // 血糖，0-30
  "heartRate": 75,    // 心率，30-220
  "temperature": 36.5, // 体温，34-43
  "steps": 8000,      // 步数，>=0
  "sleep": 8,         // 睡眠时间(小时)，0-24
  "recordTime": "2023-07-01T08:00:00Z" // 记录时间，ISO8601格式
}
```

#### 成功响应
```json
{
  "code": 0,
  "message": "上传成功",
  "data": {
    "recordId": "60d21b4667d0d8992e610c85",
    "status": "normal",
    "suggestions": [
      "您的健康状况良好，请继续保持健康的生活方式。"
    ]
  }
}
```

#### 失败响应
```json
{
  "code": 400,
  "message": "血压格式不正确"
}
```
或
```json
{
  "code": 400,
  "message": "收缩压范围在50-250之间"
}
```

### 2. 获取健康数据列表

#### 请求信息
- **URL**: `/health/list`
- **方法**: `GET`
- **描述**: 获取用户健康数据列表
- **需要认证**: 是

#### 请求参数
```
?startDate=2023-07-01&endDate=2023-07-31&pageSize=10&pageNum=1
```

- **startDate**: 开始日期，可选，格式：YYYY-MM-DD
- **endDate**: 结束日期，可选，格式：YYYY-MM-DD
- **pageSize**: 每页数量，可选，默认10
- **pageNum**: 页码，可选，默认1

#### 成功响应
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "total": 100,
    "list": [
      {
        "recordId": "60d21b4667d0d8992e610c85",
        "bloodPressure": {
          "systolic": 120,
          "diastolic": 80
        },
        "bloodSugar": 5.5,
        "heartRate": 75,
        "temperature": 36.5,
        "steps": 8000,
        "sleep": 8,
        "status": "normal",
        "recordTime": "2023-07-01T08:00:00Z"
      }
    ]
  }
}
```

#### 失败响应
```json
{
  "code": 400,
  "message": "开始日期格式不正确"
}
```

### 3. 获取健康数据详情

#### 请求信息
- **URL**: `/health/detail/:recordId`
- **方法**: `GET`
- **描述**: 获取健康数据详情
- **需要认证**: 是

#### 请求参数
- **recordId**: 记录ID，路径参数

#### 成功响应
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "recordId": "60d21b4667d0d8992e610c85",
    "bloodPressure": {
      "systolic": 120,
      "diastolic": 80
    },
    "bloodSugar": 5.5,
    "heartRate": 75,
    "temperature": 36.5,
    "steps": 8000,
    "sleep": 8,
    "status": "normal",
    "suggestions": [
      "您的健康状况良好，请继续保持健康的生活方式。"
    ],
    "recordTime": "2023-07-01T08:00:00Z"
  }
}
```

#### 失败响应
```json
{
  "code": 404,
  "message": "健康记录不存在"
}
```

## 监护人管理模块

### 1. 绑定监护人

#### 请求信息
- **URL**: `/guardian/bind`
- **方法**: `POST`
- **描述**: 绑定监护人
- **需要认证**: 是

#### 请求参数
```json
{
  "guardianPhone": "string", // 监护人手机号
  "shareHealthData": true    // 是否共享健康数据
}
```

#### 成功响应
```json
{
  "code": 0,
  "message": "绑定成功",
  "data": {
    "bindId": "60d21b4667d0d8992e610c85",
    "bindTime": "2023-07-01T08:00:00Z",
    "status": "pending"
  }
}
```

#### 失败响应
```json
{
  "code": 400,
  "message": "手机号格式不正确"
}
```

### 2. 解绑监护人

#### 请求信息
- **URL**: `/guardian/unbind`
- **方法**: `POST`
- **描述**: 解绑监护人
- **需要认证**: 是

#### 请求参数
无

#### 成功响应
```json
{
  "code": 0,
  "message": "解绑成功"
}
```

#### 失败响应
```json
{
  "code": 400,
  "message": "未绑定监护人"
}
```

### 3. 获取绑定状态

#### 请求信息
- **URL**: `/guardian/status`
- **方法**: `GET`
- **描述**: 获取监护人绑定状态
- **需要认证**: 是

#### 请求参数
无

#### 成功响应
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "isBound": true,
    "guardianPhone": "138****1234",
    "shareHealthData": true,
    "bindTime": "2023-07-01T08:00:00Z"
  }
}
```

#### 失败响应
```json
{
  "code": 401,
  "message": "未授权: 缺少令牌"
}
```

### 4. 更新共享设置

#### 请求信息
- **URL**: `/guardian/updateSharing`
- **方法**: `POST`
- **描述**: 更新健康数据共享设置
- **需要认证**: 是

#### 请求参数
```json
{
  "shareHealthData": true // 是否共享健康数据
}
```

#### 成功响应
```json
{
  "code": 0,
  "message": "更新成功"
}
```

#### 失败响应
```json
{
  "code": 400,
  "message": "未绑定监护人"
}
```

## 智能诊断模块

### 1. 分析症状

#### 请求信息
- **URL**: `/diagnosis/analyze`
- **方法**: `POST`
- **描述**: 分析用户症状
- **需要认证**: 是

#### 请求参数
```json
{
  "symptoms": "string", // 症状描述
  "duration": "string", // 持续时间
  "severity": "string"  // 严重程度：mild-轻度，moderate-中度，severe-重度
}
```

#### 成功响应
```json
{
  "code": 0,
  "message": "分析成功",
  "data": {
    "diagnosisId": "60d21b4667d0d8992e610c85",
    "possibleConditions": [
      {
        "condition": "感冒",
        "probability": 0.8,
        "description": "普通感冒，建议多休息多喝水"
      }
    ],
    "suggestions": [
      "多休息",
      "多喝水",
      "保持室内空气流通"
    ],
    "shouldSeeDoctor": false
  }
}
```

#### 失败响应
```json
{
  "code": 400,
  "message": "症状描述不能为空"
}
```

### 2. 语音输入

#### 请求信息
- **URL**: `/diagnosis/voice-input`
- **方法**: `POST`
- **描述**: 语音输入症状
- **需要认证**: 是

#### 请求参数
```json
{
  "audioData": "base64_encoded_audio_data" // Base64编码的音频数据
}
```

#### 成功响应
```json
{
  "code": 0,
  "message": "识别成功",
  "data": {
    "text": "我最近感觉有点头痛和喉咙疼"
  }
}
```

#### 失败响应
```json
{
  "code": 400,
  "message": "音频数据不能为空"
}
```

### 3. 获取诊断历史

#### 请求信息
- **URL**: `/diagnosis/history`
- **方法**: `GET`
- **描述**: 获取诊断历史记录
- **需要认证**: 是

#### 请求参数
```
?pageSize=10&pageNum=1
```

- **pageSize**: 每页数量，可选，默认10
- **pageNum**: 页码，可选，默认1

#### 成功响应
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "total": 100,
    "list": [
      {
        "diagnosisId": "60d21b4667d0d8992e610c85",
        "symptoms": "头痛和喉咙疼",
        "diagnosis": "感冒",
        "probability": 0.8,
        "suggestions": ["多休息", "多喝水"],
        "shouldSeeDoctor": false,
        "createTime": "2023-07-01T08:00:00Z"
      }
    ]
  }
}
```

#### 失败响应
```json
{
  "code": 401,
  "message": "未授权: 缺少令牌"
}
```

## 智能陪伴模块

### 1. 聊天

#### 请求信息
- **URL**: `/companion/chat`
- **方法**: `POST`
- **描述**: 与AI助手聊天
- **需要认证**: 是

#### 请求参数
```json
{
  "message": "string", // 用户消息
  "sessionId": "string" // 会话ID，可选，首次聊天可不传
}
```

#### 成功响应
```json
{
  "code": 0,
  "message": "发送成功",
  "data": {
    "reply": "您好，我是您的健康助手，有什么可以帮您的吗？",
    "sessionId": "60d21b4667d0d8992e610c85",
    "suggestions": [
      "今天的血压情况如何？",
      "需要查看健康建议吗？",
      "帮我设置用药提醒"
    ]
  }
}
```

#### 失败响应
```json
{
  "code": 400,
  "message": "消息不能为空"
}
```

### 2. 语音输入

#### 请求信息
- **URL**: `/companion/voice-input`
- **方法**: `POST`
- **描述**: 语音输入消息
- **需要认证**: 是

#### 请求参数
```json
{
  "audioData": "base64_encoded_audio_data", // Base64编码的音频数据
  "sessionId": "string" // 会话ID，可选
}
```

#### 成功响应
```json
{
  "code": 0,
  "message": "识别成功",
  "data": {
    "text": "我想知道今天的健康建议",
    "sessionId": "60d21b4667d0d8992e610c85"
  }
}
```

#### 失败响应
```json
{
  "code": 400,
  "message": "音频数据不能为空"
}
```

### 3. 获取聊天历史

#### 请求信息
- **URL**: `/companion/history`
- **方法**: `GET`
- **描述**: 获取聊天历史记录
- **需要认证**: 是

#### 请求参数
```
?pageSize=10&pageNum=1
```

- **pageSize**: 每页数量，可选，默认10
- **pageNum**: 页码，可选，默认1

#### 成功响应
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "total": 100,
    "list": [
      {
        "sessionId": "60d21b4667d0d8992e610c85",
        "message": "我想知道今天的健康建议",
        "reply": "根据您的健康数据，今天的血压和心率都在正常范围内...",
        "createTime": "2023-07-01T08:00:00Z"
      }
    ]
  }
}
```

#### 失败响应
```json
{
  "code": 401,
  "message": "未授权: 缺少令牌"
}
```

## 健康档案模块

### 1. 添加健康档案

#### 请求信息
- **URL**: `/health-records/add`
- **方法**: `POST`
- **描述**: 添加健康档案
- **需要认证**: 是

#### 请求参数
```json
{
  "type": "string",      // 档案类型：medical-病历，examination-检查报告，vaccination-疫苗接种
  "title": "string",     // 标题
  "content": "string",   // 内容
  "date": "2023-07-01", // 日期，格式：YYYY-MM-DD
  "hospital": "string",  // 医院，可选
  "doctor": "string",    // 医生，可选
  "attachments": [       // 附件，可选
    {
      "name": "string",  // 文件名
      "url": "string"    // 文件URL
    }
  ]
}
```

#### 成功响应
```json
{
  "code": 0,
  "message": "添加成功",
  "data": {
    "recordId": "60d21b4667d0d8992e610c85"
  }
}
```

#### 失败响应
```json
{
  "code": 400,
  "message": "档案类型不能为空"
}
```

### 2. 获取健康档案列表

#### 请求信息
- **URL**: `/health-records/list`
- **方法**: `GET`
- **描述**: 获取健康档案列表
- **需要认证**: 是

#### 请求参数
```
?type=medical&pageSize=10&pageNum=1
```

- **type**: 档案类型，可选：medical-病历，examination-检查报告，vaccination-疫苗接种
- **pageSize**: 每页数量，可选，默认10
- **pageNum**: 页码，可选，默认1

#### 成功响应
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "total": 100,
    "list": [
      {
        "recordId": "60d21b4667d0d8992e610c85",
        "type": "medical",
        "title": "感冒就诊记录",
        "date": "2023-07-01",
        "hospital": "第一人民医院",
        "doctor": "张医生",
        "createTime": "2023-07-01T08:00:00Z"
      }
    ]
  }
}
```

#### 失败响应
```json
{
  "code": 401,
  "message": "未授权: 缺少令牌"
}
```

### 3. 获取健康档案详情

#### 请求信息
- **URL**: `/health-records/detail/:recordId`
- **方法**: `GET`
- **描述**: 获取健康档案详情
- **需要认证**: 是

#### 请求参数
- **recordId**: 记录ID，路径参数

#### 成功响应
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "recordId": "60d21b4667d0d8992e610c85",
    "type": "medical",
    "title": "感冒就诊记录",
    "content": "患者出现发热、咳嗽症状，诊断为普通感冒...",
    "date": "2023-07-01",
    "hospital": "第一人民医院",
    "doctor": "张医生",
    "attachments": [
      {
        "name": "检查报告.pdf",
        "url": "https://example.com/report.pdf"
      }
    ],
    "createTime": "2023-07-01T08:00:00Z"
  }
}
```

#### 失败响应
```json
{
  "code": 404,
  "message": "健康档案不存在"
}
```

### 4. 删除健康档案

#### 请求信息
- **URL**: `/health-records/delete/:recordId`
- **方法**: `DELETE`
- **描述**: 删除健康档案
- **需要认证**: 是

#### 请求参数
- **recordId**: 记录ID，路径参数

#### 成功响应
```json
{
  "code": 0,
  "message": "删除成功"
}
```

#### 失败响应
```json
{
  "code": 404,
  "message": "健康档案不存在"
}
```

## 用药提醒模块

### 1. 添加用药提醒

#### 请求信息
- **URL**: `/medication/add`
- **方法**: `POST`
- **描述**: 添加用药提醒
- **需要认证**: 是

#### 请求参数
```json
{
  "name": "string",       // 药品名称
  "dosage": "string",     // 剂量
  "frequency": "string",  // 频率：daily-每天，weekly-每周，monthly-每月，custom-自定义
  "customFrequency": "string", // 自定义频率，当frequency为custom时必填
  "startDate": "2023-07-01", // 开始日期，格式：YYYY-MM-DD
  "endDate": "2023-07-31",   // 结束日期，格式：YYYY-MM-DD，可选
  "alertTimes": ["08:00", "20:00"] // 提醒时间，格式：HH:mm
}
```

#### 成功响应
```json
{
  "code": 0,
  "message": "添加成功",
  "data": {
    "medicationId": "60d21b4667d0d8992e610c85"
  }
}
```

#### 失败响应
```json
{
  "code": 400,
  "message": "药品名称不能为空"
}
```

### 2. 获取用药提醒列表

#### 请求信息
- **URL**: `/medication/list`
- **方法**: `GET`
- **描述**: 获取用药提醒列表
- **需要认证**: 是

#### 请求参数
无

#### 成功响应
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "list": [
      {
        "medicationId": "60d21b4667d0d8992e610c85",
        "name": "阿司匹林",
        "dosage": "100mg",
        "frequency": "daily",
        "customFrequency": "",
        "startDate": "2023-07-01",
        "endDate": "2023-07-31",
        "alertTimes": ["08:00", "20:00"],
        "isActive": true,
        "createTime": "2023-07-01T08:00:00Z"
      }
    ]
  }
}
```

#### 失败响应
```json
{
  "code": 401,
  "message": "未授权: 缺少令牌"
}
```

### 3. 获取用药提醒详情

#### 请求信息
- **URL**: `/medication/detail/:medicationId`
- **方法**: `GET`
- **描述**: 获取用药提醒详情
- **需要认证**: 是

#### 请求参数
- **medicationId**: 提醒ID，路径参数

#### 成功响应
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "medicationId": "60d21b4667d0d8992e610c85",
    "name": "阿司匹林",
    "dosage": "100mg",
    "frequency": "daily",
    "customFrequency": "",
    "startDate": "2023-07-01",
    "endDate": "2023-07-31",
    "alertTimes": ["08:00", "20:00"],
    "isActive": true,
    "createTime": "2023-07-01T08:00:00Z"
  }
}
```

#### 失败响应
```json
{
  "code": 404,
  "message": "用药提醒不存在"
}
```

### 4. 更新用药提醒

#### 请求信息
- **URL**: `/medication/update/:medicationId`
- **方法**: `PUT`
- **描述**: 更新用药提醒
- **需要认证**: 是

#### 请求参数
```json
{
  "name": "string",       // 药品名称，可选
  "dosage": "string",     // 剂量，可选
  "frequency": "string",  // 频率，可选：daily-每天，weekly-每周，monthly-每月，custom-自定义
  "customFrequency": "string", // 自定义频率，当frequency为custom时必填
  "startDate": "2023-07-01", // 开始日期，可选，格式：YYYY-MM-DD
  "endDate": "2023-07-31",   // 结束日期，可选，格式：YYYY-MM-DD
  "alertTimes": ["08:00", "20:00"], // 提醒时间，可选，格式：HH:mm
  "isActive": true // 是否激活，可选
}
```

#### 成功响应
```json
{
  "code": 0,
  "message": "更新成功"
}
```

#### 失败响应
```json
{
  "code": 404,
  "message": "用药提醒不存在"
}
```

### 5. 删除用药提醒

#### 请求信息
- **URL**: `/medication/delete/:medicationId`
- **方法**: `DELETE`
- **描述**: 删除用药提醒
- **需要认证**: 是

#### 请求参数
- **medicationId**: 提醒ID，路径参数

#### 成功响应
```json
{
  "code": 0,
  "message": "删除成功"
}
```

#### 失败响应
```json
{
  "code": 404,
  "message": "用药提醒不存在"
}
```

## 社区模块

### 1. 获取文章列表

#### 请求信息
- **URL**: `/community/articles`
- **方法**: `GET`
- **描述**: 获取健康文章列表
- **需要认证**: 是

#### 请求参数
```
?category=all&pageSize=10&pageNum=1
```

- **category**: 文章分类，可选：all-全部，tips-健康小贴士，disease-疾病知识，lifestyle-生活方式
- **pageSize**: 每页数量，可选，默认10
- **pageNum**: 页码，可选，默认1

#### 成功响应
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "total": 100,
    "list": [
      {
        "articleId": "60d21b4667d0d8992e610c85",
        "title": "健康生活方式指南",
        "summary": "保持健康的生活方式对预防疾病至关重要...",
        "author": "医疗专家",
        "publishTime": "2023-07-01T08:00:00Z",
        "viewCount": 100,
        "category": "tips"
      }
    ]
  }
}
```

#### 失败响应
```json
{
  "code": 401,
  "message": "未授权: 缺少令牌"
}
```

### 2. 获取文章详情

#### 请求信息
- **URL**: `/community/article/:articleId`
- **方法**: `GET`
- **描述**: 获取健康文章详情
- **需要认证**: 是

#### 请求参数
- **articleId**: 文章ID，路径参数

#### 成功响应
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "articleId": "60d21b4667d0d8992e610c85",
    "title": "健康生活方式指南",
    "content": "<p>这是文章内容...</p>",
    "author": "医疗专家",
    "publishTime": "2023-07-01T08:00:00Z",
    "viewCount": 100,
    "category": "tips"
  }
}
```

#### 失败响应
```json
{
  "code": 404,
  "message": "文章不存在"
}
```

### 3. 搜索文章

#### 请求信息
- **URL**: `/community/search`
- **方法**: `GET`
- **描述**: 搜索健康文章
- **需要认证**: 是

#### 请求参数
```
?keyword=高血压&pageSize=10&pageNum=1
```

- **keyword**: 搜索关键词
- **pageSize**: 每页数量，可选，默认10
- **pageNum**: 页码，可选，默认1

#### 成功响应
```json
{
  "code": 0,
  "message": "搜索成功",
  "data": {
    "total": 100,
    "list": [
      {
        "articleId": "60d21b4667d0d8992e610c85",
        "title": "高血压的预防与治疗",
        "summary": "高血压是一种常见的慢性病...",
        "author": "医疗专家",
        "publishTime": "2023-07-01T08:00:00Z",
        "viewCount": 100,
        "category": "disease"
      }
    ]
  }
}
```

#### 失败响应
```json
{
  "code": 400,
  "message": "搜索关键词不能为空"
}
```

## 通知设置模块

### 1. 获取通知设置

#### 请求信息
- **URL**: `/notification/settings`
- **方法**: `GET`
- **描述**: 获取通知设置
- **需要认证**: 是

#### 请求参数
无

#### 成功响应
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "healthAlert": true,
    "medicineAlert": true,
    "fallAlert": false,
    "newsAlert": true
  }
}
```

#### 失败响应
```json
{
  "code": 401,
  "message": "未授权: 缺少令牌"
}
```

### 2. 更新通知设置

#### 请求信息
- **URL**: `/notification/update`
- **方法**: `POST`
- **描述**: 更新通知设置
- **需要认证**: 是

#### 请求参数
```json
{
  "healthAlert": true,   // 健康提醒
  "medicineAlert": true, // 用药提醒
  "fallAlert": false,    // 跌倒提醒
  "newsAlert": true      // 新闻提醒
}
```

#### 成功响应
```json
{
  "code": 0,
  "message": "更新成功"
}
```

#### 失败响应
```json
{
  "code": 400,
  "message": "参数格式不正确"
}
```

### 3. 获取通知列表

#### 请求信息
- **URL**: `/notification/list`
- **方法**: `GET`
- **描述**: 获取通知列表
- **需要认证**: 是

#### 请求参数
```
?pageSize=10&pageNum=1
```

- **pageSize**: 每页数量，可选，默认10
- **pageNum**: 页码，可选，默认1

#### 成功响应
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "total": 100,
    "unreadCount": 5,
    "list": [
      {
        "notificationId": "60d21b4667d0d8992e610c85",
        "title": "健康提醒",
        "content": "您的血压偏高，请注意休息",
        "type": "health",
        "isRead": false,
        "createTime": "2023-07-01T08:00:00Z"
      }
    ]
  }
}
```

#### 失败响应
```json
{
  "code": 401,
  "message": "未授权: 缺少令牌"
}
```

### 4. 标记通知为已读

#### 请求信息
- **URL**: `/notification/read/:notificationId`
- **方法**: `POST`
- **描述**: 标记单个通知为已读
- **需要认证**: 是

#### 请求参数
- **notificationId**: 通知ID，路径参数

#### 成功响应
```json
{
  "code": 0,
  "message": "标记成功"
}
```

#### 失败响应
```json
{
  "code": 404,
  "message": "通知不存在"
}
```

### 5. 标记所有通知为已读

#### 请求信息
- **URL**: `/notification/readAll`
- **方法**: `POST`
- **描述**: 标记所有通知为已读
- **需要认证**: 是

#### 请求参数
无

#### 成功响应
```json
{
  "code": 0,
  "message": "标记成功",
  "data": {
    "markedCount": 5
  }
}
```

#### 失败响应
```json
{
  "code": 401,
  "message": "未授权: 缺少令牌"
}
``` 