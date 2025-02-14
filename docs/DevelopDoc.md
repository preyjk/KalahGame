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
  - PostgreSQL + Redis
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

Postgresql
口令:123

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

### 代码仓库 & 分支管理:

- 代码托管：GitHub
- Git 分支策略：
  - main（生产环境）
  - develop（开发环境）
  - feature（新功能）
  - bugfix（修复）
  - hotfix（紧急修复）
- 提交规范: Conventional Commits

### CI/CD

CI/CD 工具：GitHub Actions / GitLab CI/CD / Jenkins
自动化流程：

前端：npm test + npm run build
后端：pytest + black 代码格式化
Docker 容器化 并部署到 AWS/GCP
Kubernetes 滚动更新

### 容器化 & 镜像管理

✅ 容器化技术：Docker + Docker Compose
✅ 镜像仓库：Docker Hub / AWS ECR / GCR

### 云端部署

✅ 云提供商：AWS / GCP / Azure
✅ 部署方式：

Docker Compose（单机部署）
Kubernetes（K8s）集群
Nginx 反向代理

### 监控 & 日志

✅ 监控系统：Prometheus + Grafana
✅ 日志管理：ELK（Elasticsearch + Logstash + Kibana）

✅ Prometheus 监控 FastAPI

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

## Questions

**问题：宿主机无法连接 Docker 中运行的 PostgreSql** （Solved）

运行连接命令: `psql -h localhost -U kalah_user -d kalah_db` 返回 `psql: 错误: 连接到"localhost" (::1)上的服务器，端口5432失败：致命错误:  用户 "kalah_user" Password 认证失败`

1. 确保 PostgreSql 正在运行 `docker ps`（Pass）
2. 确保 PostgreSQL 正在监听 5432 端口（Pass）
   - 进入 postgres_db 容器: `docker exec -it postgres_db psql -U kalah_user -d kalah_db`
   - 查看监听的地址: `SHOW listen_addresses;`
3. 尝试使用 Docker 容器 IP 连接（Pass）
   - `docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' postgres_db`
   - `psql -h xxx.xx.x.x -U kalah_user -d kalah_db`
4. 修改 postgresql.conf 监听所有 IP（Pass）
   - 查看监听的所有 IP: `docker exec -it postgres_db cat /var/lib/postgresql/data/pg_hba.conf`
   - `docker exec -it postgres_db bash -c "echo 'host all all 0.0.0.0/0 md5' >> /var/lib/postgresql/data/pg_hba.conf"`
   - `docker exec -it postgres_db bash -c "echo 'host all all ::/0 md5' >> /var/lib/postgresql/data/pg_hba.conf"`
   - `docker restart postgres_db`
5. 重启了本地 PostgreSQL 服务，确认了本地服务能够成功运行后。不知为何就能成功连接 Docker 内的 PostgreSQL 了。（Solution）
   - 我猜测里面或许有端口占用问题，我在尝试本地服务的过程中，最后可能释放了被占用的 5432 端口。

---

## Reference
