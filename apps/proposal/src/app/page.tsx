import React from "react";

export default function DetailedChecklistPage() {
  // Ultra-detailed feature breakdown mapped to C-End and B-End
  const granularFeatures = [
    {
      module: "前台落地与转化模块 (Landing)",
      features: [
        {
          name: "动态视差主页",
          cEnd: "大屏极光背景 + 核心 Slogan 展示区",
          bEnd: "基础页面大图及文本管理 (CMS)",
          type: "核心展示",
        },
        {
          name: "平台实力背书板",
          cEnd: "展示 MT4/MT5 合作 Logo 及平台交易量/存活时间伪数据",
          bEnd: "前端数据字典及固定值配置表",
          type: "核心展示",
        },
        {
          name: "快速获客表单",
          cEnd: "前台留言框（收集姓名、微信号、业务意向）",
          bEnd: "线索池 (Leads Pool)，支持状态流转（未读/跟进中/死单）",
          type: "必须功能",
        },
        {
          name: "全天候悬浮客服",
          cEnd: "Tawk.to 在线聊天插件及 Telegram/WhatsApp 唤起按钮",
          bEnd: "在线客服代码埋点及第三方客服平台账号挂载配置",
          type: "必须功能",
        },
      ],
    },
    {
      module: "身份认证与账户安全体系",
      features: [
        {
          name: "多因子注册/登录",
          cEnd: "极简版登录框，带图形滑动防反爬验证、忘记密码找回",
          bEnd: "短信/邮件网关配置，白名单IP管理设定",
          type: "基础框架",
        },
        {
          name: "个人信息中心 (Profile)",
          cEnd: "查看注册手机号、账号类型（体验/正式）、注册日期，修改登录密码",
          bEnd: "用户列表页，可对用户密码重置、拉黑封禁、强制踢下线",
          type: "基础框架",
        },
        {
          name: "EA 授权绑定",
          cEnd: "展示当前账号绑定的唯一 MT4/MT5 账号串号及有效期",
          bEnd: "超管给特定用户下发机器码白名单及有效期限",
          type: "核心控制",
        },
      ],
    },
    {
      module: "超级仪表盘 (User Dashboard)",
      features: [
        {
          name: "平台活跃度看板",
          cEnd: "展示累计分析总次数、存活天数、当月使用率打卡",
          bEnd: "无独立后端，直接基于数据库埋点 COUNT 聚合输出",
          type: "用户体验",
        },
        {
          name: "API 面包屑/配额条",
          cEnd: "进度条展示本月剩余 API 图表解析次数（如 85/100）",
          bEnd: "用户模型中增加“剩余点卡数”字段，配有超管手动加点接口",
          type: "付费闭环",
        },
        {
          name: "VIP 购买诱导墙",
          cEnd: "显著的“¥2980 立即续费/升级”大按钮及红绿状态灯",
          bEnd: "支付二维码配置后台，人工财务查账后由 B 端一键开通权限",
          type: "付费闭环",
        },
      ],
    },
    {
      module: "AI 图表解析深水区 (AI Analysis)",
      features: [
        {
          name: "图像交互拦截器",
          cEnd: "上传区域：仅支持拖放/点选 JPG/PNG 且 <5MB 的 MT5 截图",
          bEnd: "OSS 图片存储桶建立与自动定期清理过期截图机制",
          type: "高阶插件",
        },
        {
          name: "模型随意切换器",
          cEnd: "下拉菜单可选 GPT-4o, Gemini 1.5, Claude Opus 等大脑",
          bEnd: "对应多模态大模型的 API Key 秘钥对配置及路由转发层",
          type: "高阶插件",
        },
        {
          name: "多维参数增强填报",
          cEnd: "可选填当前价、RSI、多空倾向等辅助文字",
          bEnd: "将上传的参数和图片打包拼接为底层系统设定好的死板 Prompt",
          type: "高阶插件",
        },
        {
          name: "结构化止损出码",
          cEnd: "页面打印极高专业度的策略表（精确入场位、止盈止损线）",
          bEnd: "利用正则和风控拦截清洗大模型返回文本，防止违规敏感词",
          type: "高阶插件",
        },
      ],
    },
    {
      module: "历史操作与数据复盘 (History)",
      features: [
        {
          name: "全局解析记录检索",
          cEnd: "支持关键词模糊搜索以往问过 AI 的品种策略和时间范围",
          bEnd: "无需专门控制，直接向 C 端开放其 ID 名下历史表只读权限",
          type: "用户体验",
        },
        {
          name: "复盘统计雷达",
          cEnd: "按外汇、黄金等板块展示查询频次和往期涨跌预判",
          bEnd: "汇集全站用户搜索频率数据，供 B 端决策下一个热门交易货币对",
          type: "用户体验",
        },
      ],
    },
    {
      module: "防盗版资源管控与发版库 (Downloads)",
      features: [
        {
          name: "历代 EA 版本母库",
          cEnd: "展现从 V14 极早期版到 V26 高阶 AI 版的树状历史列表",
          bEnd: "强大的加密安装包发版工具，带富文本编辑器撰写本次更新日志",
          type: "必须功能",
        },
        {
          name: "分级防盗直链下载",
          cEnd: "点击只弹出安全保存框，防复制下载链接通过讯雷等爬取",
          bEnd: "OSS 时间戳私有防盗链生成器，验证用户是否是活跃 VIP",
          type: "核心控制",
        },
      ],
    },
    {
      module: "实操教学与观摩倒流 (Media)",
      features: [
        {
          name: "MT5 官方观摩区",
          cEnd: "页面直接放上高净值官方演示账号的服务器 IP、账号、只读密码",
          bEnd: "文本发布后台，随时撤下爆仓账号、挂上新盈利账号",
          type: "必须功能",
        },
        {
          name: "富媒体讲座瀑布流",
          cEnd: "B站、YouTube 的内嵌播放器或外部跳转，提供纯净式体验",
          bEnd: "视频链接集中管理池，并根据用户 VIP 等级决定是否显示特定视频",
          type: "用户体验",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-32">
      {/* 头部区 */}
      <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white pt-20 pb-16 px-6 lg:px-12 shadow-2xl relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end">
          <div className="max-w-4xl">
            <span className="inline-block px-3 py-1 bg-blue-500/30 text-blue-200 text-xs font-bold tracking-widest uppercase rounded-full border border-blue-400/30 mb-4">
              Detailed Work Breakdown Structure
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              竞品底层全域特征清单列表 (WBS)
            </h1>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mix-blend-lighten max-w-3xl">
              为确保商务沟通绝无死角，我们通过潜伏手段对目标竞品的所有末端枝节进行了像素级的解构。
              以下详尽列出了竞品在页面上每一个起作用的按钮、交互，以及其所必须依赖的隐形后台引擎。
              <br />* 本清单可直接作为正式研发立项与功能点裁剪的底表文件。
            </p>
          </div>
          <div className="mt-8 md:mt-0 text-right">
            <div className="text-sm text-gray-400 mb-1">包含细分触点总数</div>
            <div className="text-4xl font-bold text-white">
              21<span className="text-xl text-blue-400">/项</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-12">
        {/* 表格指引 */}
        <div className="flex space-x-6 mb-6 text-sm font-semibold selection:bg-none">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-blue-500 mr-2 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>{" "}
            C 端表现层
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-purple-500 mr-2 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></span>{" "}
            B 端架构层
          </div>
        </div>

        {/* 树状清单 */}
        <div className="space-y-12">
          {granularFeatures.map((section, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-20 shadow-sm backdrop-blur-md bg-white/95 rounded-t-xl">
                <h2 className="text-xl font-bold text-gray-800">
                  {section.module}
                </h2>
              </div>

              <div>
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-[58px] z-10 shadow-sm backdrop-blur-md bg-white/90">
                    <tr className="border-b border-gray-100 text-sm text-gray-500">
                      <th className="px-6 py-4 font-semibold w-[15%]">
                        详细功能点
                      </th>
                      <th className="px-6 py-4 font-semibold w-[35%]">
                        <span className="text-blue-600 font-bold">●</span>{" "}
                        前端交互暴露面 (C End)
                      </th>
                      <th className="px-6 py-4 font-semibold w-[35%]">
                        <span className="text-purple-600 font-bold">●</span>{" "}
                        隐蔽支撑控制台 (B End)
                      </th>
                      <th className="px-6 py-4 font-semibold w-[15%] text-center">
                        系统属性
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {section.features.map((feat, fIdx) => (
                      <tr
                        key={fIdx}
                        className="hover:bg-blue-50/20 group transition-colors">
                        <td className="px-6 py-5 font-bold text-gray-900 border-r border-gray-100/50">
                          {feat.name}
                        </td>
                        <td className="px-6 py-5 text-gray-600 leading-relaxed text-sm">
                          {feat.cEnd}
                        </td>
                        <td className="px-6 py-5 text-gray-600 leading-relaxed text-sm bg-gray-50/50 group-hover:bg-transparent transition-colors">
                          {feat.bEnd}
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span
                            className={`inline-block px-3 py-1 rounded-md text-xs font-bold border ${
                              feat.type === "必须功能"
                                ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                                : feat.type === "核心展示"
                                  ? "bg-cyan-50 text-cyan-700 border-cyan-200"
                                  : feat.type === "核心控制"
                                    ? "bg-red-50 text-red-700 border-red-200"
                                    : feat.type === "付费闭环"
                                      ? "bg-amber-50 text-amber-700 border-amber-200"
                                      : feat.type === "高阶插件"
                                        ? "bg-purple-50 text-purple-700 border-purple-200"
                                        : "bg-gray-100 text-gray-600 border-gray-200"
                            }`}>
                            {feat.type}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">
            此 WBS 功能边界定义清晰，确保全功能 100%
            覆盖。已隔绝所有客户业务理解死角。
          </p>
        </div>
      </div>
    </div>
  );
}
