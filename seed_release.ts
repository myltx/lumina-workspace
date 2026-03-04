import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } })
  if (!admin) {
    console.log("需要先创建一个管理员用户")
    return
  }
  
  await prisma.release.create({
    data: {
      version: "v3.5.0 Quantum",
      platform: "MT5",
      title: "全新量子震荡识别引擎，自动规避单边流",
      changelog: "### 核心升级\n- 引入了多维度的深度学习模型预测。\n- 大幅降低了马丁格尔策略在单边行情下的硬扛回撤风险。\n\n### 优化\n- 界面响应速度提升加载动画。\n- 修复了因为服务器断线重连导致的重复开仓漏洞。",
      status: "PUBLISHED",
      isLatest: true,
      authorId: admin.id,
      publishedAt: new Date(),
    }
  })
  console.log("种子软件发布数据已生成！")
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
