# <center>Develop Doc</center>

## I. 项目概述

### 1.1 项目简介

**项目目标**
制作网页版的 Kalah Game，能够进行单人模式和网上双人对战，单人模式配有不同实现的 AI。

### 1.2 功能需求

**Kalah 游戏规则**

1. 棋盘结构：
   - 每位玩家有 6 个 pits 和 1 个得分坑（Kalah）。
   - 初始状态下，每个坑里有 4 颗种子。
2. 游戏玩法：

   - 玩家轮流选择一个坑，从中取出所有种子，按顺时针方向逐个分发到后续的坑中。
   - 如果最后一颗种子落在自己的 Kalah，该玩家获得额外回合。
   - 如果最后一颗种子落在自己空的坑，且对面坑有种子，玩家可捕获对面坑的种子，并放入自己的 Kalah（自己的一颗种子也放入）。

3. 游戏结束：
   - 当一方的 6 个坑全为空，游戏结束。
   - 另一方将剩余种子全部归入其 Kalah。
   - Kalah 中种子最多的玩家获胜。

目标：通过策略分配种子、争取额外回合、捕获对手种子，以最大化 Kalah 的得分。

**Two Player Local 模式**

**Two Player Online 模式**

**One Player AI 模式**

**Setting**

### 1.3 非功能需求

- 性能需求
- 兼容性
- 安全性
- 可用性：无障碍设计

---

## II. 技术架构

### 2.1 技术栈

- Frontend
  - 前端框架：React + Vite + TailwindCSS
  - 前端状态管理：Redux
  - 前端通信：WebSocket
  - 动画：Framer Motion
- Backend
  - 后端框架：FastAPI
  - 后端通信：WebSocket + REST API
- Database
  - PostgreSQL / Redis
- AI
  - MCTS + 强化学习
- DevOps
  - Vercel（前端）+ AWS / Railway（后端）

### 2.2 系统架构图

### 2.3 模块设计

后端架构: MSC (Modal - Service - Controller)
`[Frontend React] → [routes] → [services] → [models] → [database]`

- routes = Controller
- 前端的 Http 请求由 routes 处理，然后调用 services 方法处理业务逻辑，services 调用 models 方法处理 Kalah 游戏规则等底层逻辑，models 调用数据库。

---

## III. 数据结构和 API

### 3.1 数据库设计

### 3.2 API 文档

---

## IV. 前端设计

### 4.1 UI

主界面：选择模式

- 单人模式（AI 对战）
- 双人模式（本地对战）
- 双人模式（网上对战）
- 设置

### 4.2 前端路由

### 4.3 响应式设计

---

## 开发规范

### 5.1 代码规范

### 5.2 版本控制

---

## QA

---

## DevOps

---

## Management

Pre Stage

- 搭建项目
- 测试前后端的连通
- 测试数据库的连通

Stage 1

- 实现后端的 Kalah 游戏规则
- API

Stage 2

- 实现前端界面
- 连接后端 API

---

## Reference
