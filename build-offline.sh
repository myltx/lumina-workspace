#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "🚀 开始构建 Lumina Workspace 离线部署包..."

# 构建 C端 Web 镜像
echo "====> 📦 正在编译 Web (C端) 镜像..."
docker build -f apps/web/Dockerfile -t lumina-web:latest .

# 构建 B端 Admin 镜像
echo "====> 📦 正在编译 Admin (B端) 镜像..."
docker build -f apps/admin/Dockerfile -t lumina-admin:latest .

# 导出为 Tar 包
echo "====> 💾 正在导出离线安装包 (这可能需要几分钟)..."
docker save -o lumina-web-offline.tar lumina-web:latest
docker save -o lumina-admin-offline.tar lumina-admin:latest

echo "✅ 成功! 两个离线包已经生成:"
echo "- lumina-web-offline.tar"
echo "- lumina-admin-offline.tar"
echo ""
echo "==== 接下来请执行以下操作 ===="
echo "1. 将上面的两个 .tar 文件以及项目根目录的 docker-compose.yml 传到您的服务器"
echo "2. 在服务器上运行: docker load -i lumina-web-offline.tar"
echo "3. 在服务器上运行: docker load -i lumina-admin-offline.tar"
echo "4. 在服务器同一目录下运行: docker-compose up -d"
