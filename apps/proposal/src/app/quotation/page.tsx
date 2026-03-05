import React from "react";

export default function QuotationPage() {
  // Mock data for the quotation
  const features = [
    {
      category: "阶段一：核心基础平台 (MVP 获客与宣发)",
      description:
        "最快上线版本。用震撼的品牌门面上单，截获公网流量并将其转化为内部私域跟进线索。",
      duration: "1.5 - 2 周",
      price: "￥ 35,000",
      items: [
        {
          name: "顶级转化门厅 (Hero Landing)",
          desc: "用极度震撼的深色星空或极光视差动态背景，配以大号 Slogan，建立“高级华尔街机构”第一印象。",
        },
        {
          name: "实战数据看板展示",
          desc: "专业化图表组件展示近 30 天回撤率、胜率、盈亏比等散户最看重的硬核数据，解决购买信任危机。",
        },
        {
          name: "悬浮系统群与意向拦截",
          desc: "常驻在线客服（WhatsApp/TG直达）及表单。客户一键留资，线索光速推至内部销售 Admin 控制台。",
        },
        {
          name: "公司内部中央控制台 (Admin)",
          desc: "高权限保险库。集中监控所有前台线索（Leads），提供傻瓜式的系统图文公告发布（CMS）。",
        },
        {
          name: "防屏蔽跨国架构与私有全封闭部署",
          desc: "系统代码与客户库完美物理隔绝（离线 Docker 环境），彻底断绝源码外泄与审查屏蔽。",
        },
      ],
    },
    {
      category: "阶段二：私域会员防盗体系 (增值包 A)",
      description:
        "解决软件随意倒卖痛点。用严格的内控制度把核心买主死死锁在平台内。",
      duration: "1 周",
      price: "￥ 15,000",
      items: [
        {
          name: "防薅羊毛实名注册与极简登录室",
          desc: "带有强效防机器人验证的客户通行证，过滤不要钱的白嫖党，强制获取高净值用户邮箱或手机。",
        },
        {
          name: "千人千面状态仪表盘 (Dashboard)",
          desc: "每个散户登录后将看到“体验剩余天数”、软件使用期限、最新的私密公告等资产状态，培养极强续费焦虑。",
        },
        {
          name: "源站级软件版本库 (Downloads)",
          desc: "平台直接列出从 V14 到 V26 等所有迭代版本目录树，附带更新日志，会员点击直链防盗版静默下载。",
        },
        {
          name: "实战干货与 MT5 官方观摩区",
          desc: "内嵌独家跑盘与安装教程视频；并且直接向买家公布官方高盈利账号的 MT5 观摩服务器及账号，供其核对观摩抄作业。",
        },
      ],
    },
    {
      category: "阶段三：AI 多模态分析与计费中枢 (增值包 B)",
      description:
        "引入前沿硅谷算力（大语言视觉模型），赋予平台彻底的降维打击能力和昂贵定价权。",
      duration: "1 - 1.5 周",
      price: "￥ 25,000",
      items: [
        {
          name: "K线病历急速诊断舱 (拖动上传)",
          desc: "散户将会员系统的一张布满复杂 MACD、均线的 MT5 图表直接拖入页面，唤起 AI 开始深度解析。",
        },
        {
          name: "多核心大脑切换与手动参数加持",
          desc: "内置大模型组（GPT-4o / Claude / Gemini 等）供终端客户随意切换，并允许用户手动输入“当前价位”深度质询。",
        },
        {
          name: "精准策略出表与点位下发",
          desc: "毫秒级吞吐后，由大模型过滤并直接打印一份极度专业的包含“看多/看空”及“强制止损1980”等实战数据的研判书。",
        },
        {
          name: "API 计费次数点卡制闭环系统",
          desc: "建立按月收费门槛：后台限定账号初始拥有 100 次图表解析。每次拖图扣减 1 次余量，额度用罄即高逼格弹窗引到支付中心续费包月。",
        },
      ],
    },
  ];

  const timelineSteps = [
    {
      week: "Week 01",
      title: "体验设计与基础设施建设",
      content:
        "完成高转化门厅设计、核心 CMS 系统搭建，以及私有化全封闭 Docker 构架初始化。可立刻部署一个炫酷的静态引流门面。",
    },
    {
      week: "Week 02",
      title: "私域防线与会员引擎",
      content:
        "研发千人千面 Dashboard、多因子极速登录以及最核心的“防盗版时间戳验证链路”，完成加密版下载库的搭建。",
    },
    {
      week: "Week 03",
      title: "多模态大模型对接",
      content:
        "彻底完成图片拖放长传OSS、组装策略级 Prompt 并成功并发打通 GPT-4o 及 Gemini 服务端接口。实现 API 计费闭环账本逻辑。",
    },
    {
      week: "Week 04",
      title: "系统联调测试与黑盒发版",
      content:
        "进行内部 UAT 极限压力测试与数据防刷漏扫。实施跨国免备案服务器实盘部署，移交超级防封锁控制权。",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-gray-900 pb-24">
      {/* Header */}
      <div className="bg-[#1E60F2] text-white pt-20 pb-16 px-6 lg:px-12 rounded-b-[40px] shadow-xl">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <span className="inline-block px-3 py-1 bg-blue-400/30 text-blue-100 text-xs font-bold tracking-widest uppercase rounded-full border border-blue-300/30 mb-4">
            Official Quotation
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Lumina Workspace 多期交付研发预案
          </h1>
          <p className="text-lg md:text-xl font-medium text-blue-100 max-w-3xl leading-relaxed">
            为您构建比行业标准领先 3 年的新一代 AI 智能外汇辅助交易矩阵平台。
            以“军工级私有Docker部署”、“全域防脱库防线”打造无可匹敌的高奢质感与商业安全。
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 mt-[-40px]">
        {/* Modules */}
        <div className="space-y-12 mb-16">
          {features.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-100 relative z-10 p-8 md:p-12 transition-transform hover:-translate-y-1 duration-300">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8 border-b border-gray-100 pb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    {section.category}
                  </h2>
                  <p className="text-base text-gray-500">
                    {section.description}
                  </p>
                </div>
                <div className="mt-6 md:mt-0 flex flex-col items-start md:items-end">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-blue-50 text-blue-700 mb-2">
                    预估工时: {section.duration}
                  </span>
                  <span className="text-2xl font-extrabold text-[#1A1A1A]">
                    {section.price}
                  </span>
                </div>
              </div>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {section.items.map((item, iIndex) => (
                  <li key={iIndex} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Timeline Section */}
        <div className="bg-white rounded-[32px] shadow-xl p-8 md:p-12 mb-16 border border-gray-100 relative z-10">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-extrabold text-gray-900">
              4 周极速敏捷发车时间轴
            </h3>
            <p className="text-gray-500 mt-2">
              每周我们都会交付可供您点开验收的灰度发版系统，告别传统外包一个月的黑盒漫长等待。
            </p>
          </div>
          <div className="relative">
            {/* 贯穿线 */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 transform md:-translate-x-1/2"></div>

            <div className="space-y-12 relative z-10">
              {timelineSteps.map((step, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={idx}
                    className={`flex flex-col md:flex-row items-start md:items-center ${isEven ? "md:flex-row-reverse" : ""}`}>
                    {/* 节点 */}
                    <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.8)] border-4 border-white transform -translate-x-1/2 mt-1 md:mt-0 z-10"></div>

                    <div
                      className={`md:w-1/2 pl-12 md:pl-0 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                      <div className="inline-block px-3 py-1 rounded bg-blue-50 text-blue-700 text-sm font-bold mb-2">
                        {step.week}
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        {step.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {step.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-gradient-to-br from-gray-900 to-[#1A1A1A] rounded-[32px] shadow-2xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-blue-600 rounded-full opacity-20 blur-3xl"></div>

          <div className="mb-8 md:mb-0 relative z-10 w-full md:w-2/3">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              整体研发评估总览
            </h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4">
              * 上述为您展示的是全量功能矩阵的建议封顶交付体系价。您可以结合{" "}
              <span className="text-white font-bold underline decoration-blue-500">
                点卡细表页面
              </span>{" "}
              中剔除不必要的高阶插件进行费用下修。
              <br />*
              本报价包含完整源代码移交、服务器底层防墙部署保障及上线首月质保护航。
            </p>
          </div>

          <div className="flex flex-col items-end relative z-10 min-w-[250px]">
            <p className="text-gray-400 text-sm font-semibold mb-2 uppercase tracking-widest">
              全功能封环参考总价
            </p>
            <div className="text-4xl md:text-5xl font-extrabold text-blue-400 tracking-tight">
              ￥ 75,000
            </div>
            <p className="text-white mt-4 font-medium">
              满配周期上限: <span className="text-blue-200">4.5 周</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
