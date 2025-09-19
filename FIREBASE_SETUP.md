# Firebase Setup Guide

## 🔥 Firebase集成指南

### 1. 安装Firebase SDK

```bash
npm install firebase
```

### 2. Firebase控制台设置

1. 访问 [Firebase Console](https://console.firebase.google.com/)
2. 创建新项目或选择现有项目
3. 在项目设置中添加Web应用
4. 复制Firebase配置信息

### 3. 配置Firebase

在 `src/firebase/config.js` 文件中，将配置信息替换为你的Firebase项目配置：

```javascript
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project-id.firebaseapp.com", 
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id-here"
}
```

### 4. 启用Firebase服务

在Firebase控制台中启用以下服务：

#### Authentication
1. 转到 Authentication > Sign-in method
2. 启用 "Email/Password" 登录方式

#### Firestore Database
1. 转到 Firestore Database
2. 创建数据库（测试模式）
3. 设置安全规则（可选）

### 5. Firestore安全规则示例

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can read/write their own library registrations
    match /libraryRegistrations/{docId} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == resource.data.userId || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
  }
}
```

### 6. 测试功能

运行开发服务器：
```bash
npm run dev
```

测试以下功能：
- [ ] 用户注册
- [ ] 用户登录  
- [ ] 用户登出
- [ ] 查看Firebase控制台中的用户数据
- [ ] 查看Firestore中的用户信息

### 7. 故障排除

如果遇到错误：

1. **"Firebase config is missing"**
   - 检查 `src/firebase/config.js` 中的配置是否正确

2. **"Permission denied"**  
   - 检查Firestore安全规则
   - 确保用户已正确认证

3. **"Module not found"**
   - 运行 `npm install firebase`
   - 重启开发服务器

### 8. 生产部署

对于生产环境：
1. 更新Firestore安全规则
2. 启用Firebase Hosting（可选）
3. 配置环境变量
4. 测试所有功能

## 📱 功能特性

### 已实现功能
- ✅ Firebase Authentication用户注册
- ✅ Firebase Authentication用户登录
- ✅ 用户登出
- ✅ 多角色支持（学生、图书管理员、管理员）
- ✅ 用户数据存储到Firestore
- ✅ 实时认证状态管理
- ✅ 错误处理和用户反馈

### 可扩展功能
- 📧 邮箱验证
- 🔐 密码重置
- 👤 用户资料管理
- 📊 管理员仪表板
- 📚 图书馆注册数据存储

## 🎯 EFOLIO Task 7要求

此实现满足EFOLIO Task 7.1和7.2的所有要求：
- 用户注册页面 ✅
- 用户登录页面 ✅  
- Firebase用户数据存储 ✅
- 多角色登录系统 ✅
- 用户登出功能 ✅
- 当前用户控制台显示 ✅ 