import React from "react";

export default function CompetitorFeaturesPage() {
  const architecture = [
    {
      phase: "引流转化基建层 (Traffic & Conversion)",
      objective: "建立信任，获取零散访客的联系方式，为销售导流",
      items: [
        {
          cEnd: "高能转化门厅主页",
          cEndDesc:
            "运用星球动效与全屏 Slogan，营造“顶级量化机构”体感，打消用户的廉价戒备。",
          bEnd: "全局配置中心 (CMS)",
          bEndDesc: "超管随时在后台热更新门厅上的文案和 Slogan，无需代码发布。",
          correlation: "前端门面的极致逼格是后端流量的第一重诱捕网。",
        },
        {
          cEnd: "实时交易胜率/回撤率看板",
          cEndDesc:
            "专门展示“AI分析高胜率”、“每日流水”等散户极度敏感的伪实盘或历史数据表。",
          bEnd: "营销数据控制台",
          bEndDesc:
            "后台控制各个图表要展示给访客哪些“漂亮的胜率”数值。允许精细化的营销干预。",
          correlation: "前端用数据刺穿防线，后端掌握数据风向标。",
        },
        {
          cEnd: "全系悬浮在线客服与留言捕网",
          cEndDesc:
            "24h在屏幕右下角：点击一键直飞官方 TG/WhatsApp 以及预留电话/邮箱。",
          bEnd: "中央线索池 (Leads Pool)",
          bEndDesc:
            "所有留言会瞬间以白名单形式落入后台列表，销售专员能实时看到有访客意向。",
          correlation: "客服按钮是引子，线索池是最终打捞大单的变现终端。",
        },
      ],
    },
    {
      phase: "会员私域管控层 (Membership & Security)",
      objective: "杜绝白嫖党，筛选准付费金主，死死锁住核心 EA 发行权",
      items: [
        {
          cEnd: "防薅羊毛通行证 (图形防刷注册登录)",
          cEndDesc:
            "强制弹出的注册面板，需必须填写真实手机、邮箱才可以体验极速一键注册。",
          bEnd: "客户生命周期与权限台 (Users)",
          bEndDesc:
            "超管可在此封禁黑产账号、分配用户标签（基础客户、VIP大金主）。",
          correlation:
            "前端强硬收割信息，后端用来精准区分“闲鱼倒卖者”与“准付费客户”。",
        },
        {
          cEnd: "版本迭代断代防盗版库 (Downloads)",
          cEndDesc:
            "会员进入后台才能看到 EA V14到V26 的更新日志和防盗版直链下载包。",
          bEnd: "加密软件发布库 (Releases)",
          bEndDesc:
            "B端直接在此上传新版 EA 安装包并附带私密说明，强制要求全网老用户回此更新。",
          correlation:
            "告别网盘分享；把最核心的软件源文件通过后端加密传输给前端，断绝泛滥。",
        },
        {
          cEnd: "MT5 私密讲台与服务器观摩大厅",
          cEndDesc:
            "直接通过图片展示保姆级安装 EA 的视频，甚至挂出官方大盈利账户的 MT5 观摩账号与 IP。",
          bEnd: "多媒体动态分发专区",
          bEndDesc: "技术员随时上架从 YouTube/B站 搬运而来的实操讲座。",
          correlation:
            "散户在前端拿手机直接抄起后端放出的“观摩作业”，是世界上最强悍的逼单武器。",
        },
      ],
    },
    {
      phase: "大厂级 AI 超额溢价层 (AI Monetization)",
      objective:
        "引入大模型壁垒，使系统拥有数倍于单纯 EA 网站的月订阅/点卡变现能力",
      items: [
        {
          cEnd: "高能盘面 X 光机（图片拖放解析舱）",
          cEndDesc:
            "黑科技！会员直接将复杂凌乱的 MT5 包含均线/MACD 的截图扔进去，等待图表智能读解。",
          bEnd: "模型总网关极速调度",
          bEndDesc:
            "底层挂载 GPT-4o 或 Gemini 等顶级视觉语言模型，暗中转换用户的图片为庞大深度的策略质询。",
          correlation:
            "前端让客户感觉不可思议，后端将这种惊叹转化为硅谷级的技术壁垒护城河。",
        },
        {
          cEnd: "极寒止损报告与点卡配额中心",
          cEndDesc:
            "直接在屏幕打印极其详细的做多/做空以及精确的入场/止损点位。分析次提示（剩余次数: 15/100）。",
          bEnd: "点卡月租控制账本 (API Quotas)",
          bEndDesc:
            "给每个账号限制初始查询额度，耗尽后引导购买高级包月套餐。建立强大的点卡续命复购模式。",
          correlation:
            "图表解析是消耗品引擎，配额账本是收银机，二者配合构成了源源不断的现金流。",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans pb-24">
      {/* 沉浸式头部 */}
      <div className="bg-gradient-to-br from-gray-900 via-[#1A1A1A] to-[#2D3748] text-white pt-24 pb-20 px-6 lg:px-12 relative overflow-hidden">
        {/* 背景光效 */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30">
          <div className="absolute w-96 h-96 bg-blue-600 rounded-full blur-[100px] top-[-100px] left-[-100px]"></div>
          <div className="absolute w-[600px] h-[600px] bg-purple-600 rounded-full blur-[120px] bottom-[-200px] right-[-200px]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <span className="px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-sm font-bold uppercase tracking-widest border border-blue-500/30 mb-6">
            Confidential Architecture Map
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            竞品核心吸金逻辑全景解剖图
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-4xl leading-relaxed font-light">
            基于对头部平台{" "}
            <span className="font-semibold text-white">xauusd.team</span>{" "}
            的潜伏侦查， 我们以三层递进商业漏斗（引流 &gt; 过滤 &gt;
            收割），在此向您重构展示这套系统的
            <span className="text-blue-400 font-medium">
              {" "}
              C 端（散户所见）
            </span>{" "}
            与
            <span className="text-purple-400 font-medium">
              {" "}
              B 端（老板所控）
            </span>{" "}
            的精妙互锁机制。
          </p>
        </div>
      </div>

      {/* 架构主体区 */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-[-40px] relative z-20 space-y-16">
        {architecture.map((layer, idx) => (
          <div
            key={idx}
            className="bg-white rounded-[32px] shadow-2xl p-8 lg:p-12 border border-gray-100">
            {/* 层级标题 */}
            <div className="mb-10 text-center lg:text-left border-b border-gray-100 pb-8">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
                {layer.phase}
              </h2>
              <p className="text-gray-500 text-lg">
                💡 商业奥秘：{layer.objective}
              </p>
            </div>

            {/* 具体的互锁功能卡片区 */}
            <div className="space-y-8">
              {layer.items.map((item, idxx) => (
                <div
                  key={idxx}
                  className="flex flex-col lg:flex-row bg-gray-50 rounded-2xl border border-gray-100 p-6 relative group hover:border-blue-200 transition-colors duration-300">
                  {/* C 端展示卡 */}
                  <div className="flex-1 lg:pr-8 mb-8 lg:mb-0 relative">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg mr-4">
                        C
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {item.cEnd}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                      {item.cEndDesc}
                    </p>
                  </div>

                  {/* 中间连接符 (互锁标志) */}
                  <div className="hidden lg:flex flex-col items-center justify-center px-4 relative">
                    <div className="h-full w-px bg-gray-200 absolute left-1/2 transform -translate-x-1/2"></div>
                    <div className="w-10 h-10 rounded-full bg-white border-4 border-gray-100 flex items-center justify-center z-10 text-gray-400 shadow-sm relative group-hover:border-blue-100 group-hover:text-blue-500 transition-colors">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                      </svg>
                    </div>
                  </div>

                  {/* B 端展示卡 */}
                  <div className="flex-1 lg:pl-8 mt-8 lg:mt-0 relative before:block lg:before:hidden before:absolute before:inset-x-0 before:top-[-20px] before:h-px before:bg-gray-200">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-lg mr-4">
                        B
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {item.bEnd}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                      {item.bEndDesc}
                    </p>
                  </div>

                  {/* 商业纽带底部栏 */}
                  <div className="absolute bottom-0 left-0 w-full translate-y-1/2 hidden group-hover:flex justify-center z-20 transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <div className="bg-gray-900 text-white text-xs md:text-sm px-6 py-2 rounded-full shadow-xl shadow-gray-900/20 flex items-center font-medium border border-gray-700">
                      <svg
                        className="w-4 h-4 mr-2 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"></path>
                      </svg>
                      {item.correlation}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
