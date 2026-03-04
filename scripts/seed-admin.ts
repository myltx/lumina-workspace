import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const username = 'admin'
  const password = 'password123'
  
  const hashedPassword = await bcrypt.hash(password, 10)

  const admin = await prisma.user.upsert({
    where: { username },
    update: {
      role: 'ADMIN',
      password: hashedPassword,
    },
    create: {
      username,
      name: 'Super Admin',
      role: 'ADMIN',
      password: hashedPassword,
    },
  })

  console.log('✅ 超级管理员账户初始化成功！')
  console.log('-----------------------------------')
  console.log(`账号名: ${admin.username}`)
  console.log(`原密码: ${password}`)
  console.log(`角色权限: ${admin.role}`)
  console.log('-----------------------------------')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
