# 企业 AI 解决方案 PPT Agent 交接指南

## 项目目标

本项目为深圳峦识科技有限公司制作面向企业主与企业管理者的公司介绍 PPT。核心信息是公司能够提供企业 AI 认知培训、场景共创、Agent 建设、系统上线和持续运营服务，并将 AI 转化为可持续的业务能力。

对外表达应以企业方案、业务结果和交付能力为主，避免堆砌模型、RAG、Prompt 等技术术语。培训是客户服务与项目流程的一部分，不应被包装成与解决方案割裂的独立业务。

## 当前交付状态

- 当前最终 PPT：`output/企业AI解决方案介绍-V9-workflow-cover-final.pptx`
- 当前最终 PDF：`output/pdf/企业AI解决方案介绍-V9-workflow-cover-final.pdf`
- HTML 版本：`enterprise-ai-deck.html`
- 总页数：8 页
- 当前封面主视觉：`assets/cover-concept-workflow-v1.png`
- 当前 GitHub 仓库：https://github.com/hungryTechBoy/enterprise-ai-solutions-deck
- 当前已知提交基线：`3ba16522ecead6ea5618445c82da0a27f00b944d`

保诚案例页尚未使用真实产品截图。下一版应从 V9 继续，使用新版本号，不覆盖现有成品。

## 数据源优先级

处理内容冲突时，按以下优先级判断：

1. 用户在当前对话中的明确要求与修订意见。
2. 飞书知识库原文及其附件。
3. 用户提供的 Word、图片、压缩包等原始文件。
4. 用户确认过的方案文档和设计决策记录。
5. 当前 PPT 中已经落地的内容。
6. AI 生成的包装文案和暂定数据。

禁止把 AI 包装数据当成客户真实数据，也不要把导出失败产生的占位图片当成真实产品截图。

## 用户提供的链接

### 飞书知识库主入口

https://lu2htnn302.feishu.cn/wiki/DBeVwaMAzi05pskt1qacC6IWnud

用途：项目的主要资料入口，包含方案文档、图片、附件或指向其他方案的链接。需要使用飞书 CLI 直接读取原始 Wiki 节点，不能只依赖导出的 Word 文件。

当前情况：本机飞书 CLI 的用户授权曾过期。重新授权后，应读取全文和 `reference_map`，提取所有 `<img>`、`<source>` 等媒体 token，并使用 `lark-cli docs +media-download` 下载真实资源。

建议读取流程：

```bash
lark-cli wiki +node-get \
  --node-token 'https://lu2htnn302.feishu.cn/wiki/DBeVwaMAzi05pskt1qacC6IWnud' \
  --as user --format json

lark-cli docs +fetch \
  --doc 'https://lu2htnn302.feishu.cn/wiki/DBeVwaMAzi05pskt1qacC6IWnud' \
  --detail full --doc-format xml --as user

lark-cli docs +media-download \
  --token '<file_token>' --output '<目标路径>' --as user
```

### 企业 AI 真实问题讨论

`chatgpt-conversation://6ab944c7-6e2c-83ec-a814-377897b00513`

标题：企业AI方案标题生成

用途：第 2 页“企业 AI 的四个真实难题”的内容来源。用户最终确认的四点为：场景难选、落地难、规模化难、组织变革难。

### GitHub 仓库

https://github.com/hungryTechBoy/enterprise-ai-solutions-deck

用途：项目源文件、素材、方案、历版 PPT/PDF 和交接信息的统一存储位置。当前为公开仓库，默认分支为 `main`。

## 用户提供的文件

### 保诚保险小助手用户手册

仓库路径：`sources/保诚保险/保险小助手小程序用户手册.docx`

原始附件名：`保险小助手小程序用户手册.docx`

用途：保诚保险团队智能工作台案例的权威功能来源。可确认的产品能力包括：

- 团队创建、加入、成员审批、管理员设置和多团队切换。
- 团队动态发布、点赞、评论和业务附件共享。
- “保小助”保险 AI 助手，支持产品条款、核保规则和销售技巧问答。
- 通过“@文件”引用团队知识库文档进行回答。
- 答案列出引用源文件，并可跳转原文核对。
- 团队文件与个人文件管理、搜索、排序及在线预览。
- 根据客户年龄、性别、保额等参数生成保险计划书。
- 计划书微信转发、长图保存、查看时间和查看时长追踪。
- VIP 会员、兑换码、帮助与反馈等运营功能。

重要限制：这个 DOCX 的正文可以读取，但其中原本的飞书图片/附件在导出后被替换成“附件不支持下载”占位图。DOCX 压缩包内的 `word/media/image1.png` 和 `image2.png` 不是产品截图，禁止用于 PPT。真实产品图片必须从飞书原文下载，或由用户单独提供原始截图。

### 案例页面结构参考

仓库路径：`sources/参考截图/案例页面结构参考-王府井集团.png`

用途：案例页内容结构参考。建议沿用“企业简介/业务挑战/解决方案/真实界面/实践效果”的叙事方式，但不照搬其视觉样式。用户要求项目品牌可以直接写明，不需要隐藏。

### 字号问题批注

仓库路径：`sources/参考截图/字号问题批注.png`

用途：记录早期版本中“小标题太小、别人不知道页面在讲什么”的问题。所有页面需要保持清晰的主题标题和足够大的阅读字号。

### 封面参考

仓库路径：`sources/参考截图/封面参考-企业级客服营销Agent白皮书.jpg`

用途：封面的信息层级参考，包括公司标识、公司介绍属性、主题标题和 Slogan。用户明确不希望直接采用产品界面拼图，最终使用透明背景的业务流程概念图。

## 项目内现有业务素材

### TikTok 商业化 Agent 平台

- `assets/agent-platform.png`
- `assets/version-management.png`
- `assets/evaluation.png`

以上素材已经用于第 4 页，分别展示 Agent 平台主界面、版本管理和效果评测。

### TikTok Shop 广告诊断 Agent

- `assets/ad-assistant.png`
- `assets/seller-assistant.png`

`ad-assistant.png` 已用于第 5 页的诊断界面和优化建议。`seller-assistant.png` 是 TikTok Shop Seller Assistant 界面，目前未用于保诚案例。

### 保诚保险团队智能工作台

当前没有真实产品截图进入 `assets/`。第 6 页现阶段只有原生排版卡片，不能声称使用了真实产品界面。

完成素材下载后，建议至少保留三张原始截图：

1. 团队社区或团队动态页面。
2. “保小助”知识库问答及引用溯源页面。
3. 智能计划书生成、分享或浏览记录页面。

推荐版式：左侧保留 2 至 3 个关键业务挑战，中部放一张主要真实界面，右侧放两张功能局部图，底部保留成果数据。图片应为真实界面截图，不得用 AI 生成图冒充产品界面。

## 派生素材和非事实来源

以下图片为 AI 生成的封面视觉，不属于业务事实或产品证据：

- `assets/cover-ai-workflow-v1.png`
- `assets/cover-ai-workflow-v2-crop.png`
- `assets/cover-ai-workflow-v3-balanced.png`
- `assets/cover-concept-delivery-loop-v1.png`
- `assets/cover-concept-workflow-v1.png`
- `assets/cover-concept-people-results-v1.png`

`design-demos/` 下的 HTML 和 PNG 是设计探索稿，不应被当成客户原始资料。

## 当前内容中需要核实的数据

以下数字是用户允许先行包装的暂定数据，正式对外前必须替换或确认：

- TikTok 商业化 Agent 平台：`12+`、`65%`、`75%`。
- TikTok Shop 广告诊断 Agent：`30+`、`<3 分钟`、`60%`。
- 保诚案例：`3 大模块`、`4 类文件`、`2 项反馈`。

第 7 页的团队姓名和履历也是占位内容：陈启明、林若川、周婧妍。正式发布前必须由用户确认真实成员资料。

## 已确认的内容和设计原则

- 公司名称：深圳峦识科技有限公司。
- PPT 属性：公司介绍。
- 主题：企业 AI 解决方案与落地服务。
- Slogan：让 AI 成为可持续的业务能力。
- 服务路径：认知培训与场景工作坊、业务诊断、场景共创、原型验证、生产交付、运营优化。
- 第 2 页四个问题：场景难选、落地难、规模化难、组织变革难。
- 案例名称应体现项目级能力，不能写成普通功能名称。
- 案例品牌可以直接使用 TikTok、TikTok Shop 和保诚。
- 视觉使用暖白、陶土色、深灰黑；避免通用紫色科技渐变和机器人、大脑、芯片等 AI 陈词滥调。
- 页面标题必须足够大，优先保证一眼看懂页面主题。
- 真实图片用于增强可信度；不能用无关的概念图替代产品证据。

更完整的设计过程见 `direction-approved.md`，内容与执行方案见 `方案与执行计划.md`，品牌规范见 `brand-spec.md`。

## 构建与验证

主要构建文件：

- `.build-v2/build-deck.mjs`
- `.build-v2/finalize.mjs`
- `.build-v2/render_pngs_to_pdf.py`

重新生成候选 PPT：

```bash
cd .build-v2
node build-deck.mjs
```

每次修改后必须：

1. 为新版本使用新的文件名，例如 V10，不覆盖 V9。
2. 渲染全部 8 页并逐页检查。
3. 确认中文字体、图片裁切、标题换行、页码和指标无异常。
4. 同步生成 PPT 和 PDF。
5. 更新本文件中对应的最终版本路径和数据源状态。
6. 提交并 push 到 GitHub `main`。

## 待办顺序

1. 完成飞书用户授权。
2. 直接读取飞书 Wiki 原文，枚举全部媒体 token 和正文内链接。
3. 下载保诚小程序真实截图到 `sources/保诚保险/飞书原图/`。
4. 将选中的截图复制到 `assets/` 并使用清晰、稳定的英文文件名。
5. 重做第 6 页，导出 V10 PPT/PDF。
6. 更新数据源清单，补充飞书原文中的子文档和附件链接。
7. 提交并 push。

