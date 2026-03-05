import { prisma } from "../prisma";
import dayjs from "dayjs";

/**
 * 校验用户的 MT5 序列号与授权到期日。
 * 用于拦截失效或未付费的散户下载 EA，及调用高级 API 接口。
 * @param userId - 用户 ID
 * @returns boolean true 表示授权有效，可以放行；false 表示未授权或已过期
 */
export async function checkMT5Auth(userId: string): Promise<boolean> {
  if (!userId) return false;

  const currentUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { expireDate: true, mt5Serial: true },
  });

  // 如果有到期时间，且当前时间早于到期时间，则判定为已授权
  if (currentUser?.expireDate && dayjs(currentUser.expireDate).isAfter(dayjs())) {
    return true;
  }

  return false;
}
