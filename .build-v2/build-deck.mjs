import fs from "node:fs/promises";
import path from "node:path";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const ROOT = "/Users/devin/projects/企业AI解决方案PPT";
const ASSETS = path.join(ROOT, "assets");
const OUT = path.join(ROOT, ".build-v2", "candidate.pptx");

const W = 1280;
const H = 720;
const FONT = "Hiragino Sans GB";
const C = {
  paper: "#F4EFE7",
  paper2: "#E9DED1",
  ink: "#211F1C",
  muted: "#6D645C",
  rust: "#AF5033",
  rustDark: "#873B28",
  rustSoft: "#E9C7B8",
  line: "#C8BAAD",
  white: "#FFFFFF",
  green: "#19A796",
  greenSoft: "#D9F0EA",
  blueSoft: "#DDE6F4",
  goldSoft: "#E8D9B4",
};

const deck = Presentation.create({ slideSize: { width: W, height: H } });

function shape(slide, x, y, w, h, fill = "none", radius = 0, lineFill = "none", lineWidth = 0) {
  return slide.shapes.add({
    geometry: "rect",
    position: { left: x, top: y, width: w, height: h },
    fill,
    line: { fill: lineFill, width: lineWidth },
    ...(radius ? { borderRadius: radius } : {}),
  });
}

function txt(slide, text, x, y, w, h, opts = {}) {
  const box = slide.shapes.add({
    geometry: "textbox",
    position: { left: x, top: y, width: w, height: h },
    fill: "none",
    line: { fill: "none", width: 0 },
  });
  box.text = text;
  box.text.style = {
    typeface: opts.typeface ?? FONT,
    fontSize: opts.size ?? 20,
    bold: opts.bold ?? false,
    italic: opts.italic ?? false,
    color: opts.color ?? C.ink,
    alignment: opts.align ?? "left",
    verticalAlignment: opts.vAlign ?? "top",
    autoFit: opts.autoFit ?? "none",
    wrap: "square",
    lineSpacing: opts.lineSpacing ?? 1.12,
    insets: opts.insets ?? { top: 0, right: 0, bottom: 0, left: 0 },
  };
  return box;
}

function topRule(slide) {
  shape(slide, 66, 38, 1148, 1.5, C.line);
}

function footer(slide, index) {
  txt(slide, String(index).padStart(2, "0") + " / 08", 990, 672, 200, 20, {
    size: 10,
    typeface: "Hiragino Sans GB",
    color: C.muted,
    align: "right",
  });
}

function title(slide, eyebrow, heading, index, opts = {}) {
  topRule(slide);
  txt(slide, eyebrow, 66, 55, 420, 28, { size: 18, bold: true, color: C.rust });
  txt(slide, heading, 66, 91, opts.width ?? 1080, opts.height ?? 68, {
    size: opts.size ?? 42,
    bold: true,
    color: C.ink,
    lineSpacing: 1.02,
  });
  footer(slide, index);
}

async function addImg(slide, name, x, y, w, h, opts = {}) {
  const bytes = await fs.readFile(path.join(ASSETS, name));
  return slide.images.add({
    blob: bytes,
    contentType: "image/png",
    alt: opts.alt ?? name,
    fit: opts.fit ?? "cover",
    position: { left: x, top: y, width: w, height: h },
    ...(opts.crop ? { crop: opts.crop } : {}),
    ...(opts.radius ? { geometry: "roundRect", borderRadius: opts.radius } : {}),
  });
}

function metric(slide, x, y, w, value, label, detail, accent = C.rust) {
  shape(slide, x, y, w, 2, accent);
  txt(slide, value, x, y + 12, w, 50, { size: 39, bold: true, color: accent });
  txt(slide, label, x, y + 63, w, 25, { size: 18, bold: true });
  txt(slide, detail, x, y + 92, w, 38, { size: 14, color: C.muted, lineSpacing: 1.2 });
}

function challenge(slide, n, heading, body, x, y, w) {
  txt(slide, n, x, y, 46, 32, { size: 23, bold: true, color: C.rust });
  txt(slide, heading, x + 50, y, w - 50, 28, { size: 18, bold: true });
  txt(slide, body, x + 50, y + 30, w - 50, 42, { size: 14, color: C.muted, lineSpacing: 1.2 });
}

// Slide 1: cover
{
  const s = deck.slides.add();
  s.background.fill = C.paper;
  shape(s, 0, 0, 14, H, C.rust);
  txt(s, "公司介绍", 66, 50, 180, 25, { size: 16, bold: true, color: C.rust });
  txt(s, "COMPANY PROFILE · 2026", 370, 53, 256, 18, { size: 10.5, bold: true, color: C.muted, align: "right" });
  txt(s, "深圳峦识科技有限公司", 66, 83, 560, 36, { size: 24, bold: true, color: C.ink });
  shape(s, 66, 132, 560, 1.5, C.line);

  txt(s, "企业 AI 解决方案与落地服务", 66, 166, 550, 38, { size: 28, bold: true, color: C.ink });
  txt(s, "让 AI 成为", 66, 236, 550, 64, { size: 53, bold: true, color: C.ink, lineSpacing: 1.0 });
  txt(s, "可持续的业务能力", 66, 300, 560, 72, { size: 55, bold: true, color: C.rust, lineSpacing: 1.0 });
  txt(s, "从认知培训和场景共创，到应用落地与持续运营", 68, 413, 550, 34, { size: 18.5, color: C.muted });

  shape(s, 66, 505, 560, 1.5, C.line);
  const coverKeywords = ["认知共识", "场景共创", "应用落地", "持续运营"];
  coverKeywords.forEach((label, i) => {
    const x = 66 + i * 146;
    txt(s, label, x, 526, 122, 24, { size: 15, bold: true, color: i === 2 ? C.rust : C.ink });
  });
  txt(s, "ENTERPRISE AI SOLUTIONS & DELIVERY", 66, 651, 360, 18, { size: 10.5, bold: true, color: C.muted });
  txt(s, "01 / 08", 518, 651, 108, 18, { size: 10.5, color: C.muted, align: "right" });

  await addImg(s, "cover-concept-workflow-v1.png", 665, 52, 570, 616, {
    fit: "contain",
    alt: "企业文档、知识、数据和客户需求进入Agent编排中枢，形成业务执行与持续优化闭环",
  });
}

// Slide 2: four problems
{
  const s = deck.slides.add();
  s.background.fill = C.paper;
  shape(s, 0, 0, 360, H, C.rust);
  txt(s, "企业 AI 的", 58, 78, 250, 35, { size: 24, bold: true, color: C.white });
  txt(s, "四个\n真实难题", 58, 135, 270, 150, { size: 49, bold: true, color: C.white, lineSpacing: 0.98 });
  txt(s, "真正的挑战集中在业务选择、落地执行和组织协同。", 60, 335, 246, 98, { size: 18, color: C.white, lineSpacing: 1.35 });
  txt(s, "02 / 08", 227, 672, 88, 18, { size: 11, color: C.white, align: "right" });

  txt(s, "企业不缺 AI，", 410, 64, 780, 58, { size: 42, bold: true });
  txt(s, "缺的是把 AI 变成业务结果", 410, 121, 790, 68, { size: 44, bold: true, color: C.rust });
  txt(s, "从“能演示”走到“能运行、能复制、能持续产生价值”。", 412, 199, 760, 36, { size: 18, color: C.muted });

  const pains = [
    ["01", "场景难选", "想法很多，但不知道哪些问题真正值得投入。"],
    ["02", "落地难", "接入真实数据、系统与权限，打通业务流程并不容易。"],
    ["03", "规模化难", "一个 PoC 跑通，不代表能稳定上线和复制推广。"],
    ["04", "组织变革难", "上线之后，岗位流程与管理机制若不同步，价值难持续。"],
  ];
  pains.forEach((p, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 412 + col * 392;
    const y = 282 + row * 176;
    shape(s, x, y, 348, 1.5, C.line);
    txt(s, p[0], x, y + 18, 70, 48, { size: 36, bold: true, color: C.rust });
    txt(s, p[1], x + 76, y + 19, 250, 30, { size: 21, bold: true });
    txt(s, p[2], x + 76, y + 58, 258, 66, { size: 15, color: C.muted, lineSpacing: 1.3 });
  });
}

// Slide 3: service and delivery path
{
  const s = deck.slides.add();
  s.background.fill = C.paper;
  title(s, "我们怎样开始", "企业 AI 服务与落地路径", 3);
  txt(s, "两种进入方式，汇入同一套从共识到运营的交付链路。", 66, 152, 820, 32, { size: 18, color: C.muted });

  shape(s, 66, 204, 520, 122, C.rust, 14);
  txt(s, "入口一", 90, 224, 100, 24, { size: 15, bold: true, color: C.white });
  txt(s, "AI 认知培训与场景工作坊", 90, 254, 430, 34, { size: 24, bold: true, color: C.white });
  txt(s, "适合尚未形成 AI 共识、不确定从哪里开始的企业", 90, 294, 448, 25, { size: 14, color: C.white });

  shape(s, 614, 204, 600, 122, C.white, 14, C.line, 1);
  txt(s, "入口二", 640, 224, 100, 24, { size: 15, bold: true, color: C.rust });
  txt(s, "明确业务问题直接启动", 640, 254, 500, 34, { size: 24, bold: true });
  txt(s, "适合已经有明确需求、希望快速验证和落地的企业", 640, 294, 500, 25, { size: 14, color: C.muted });

  const stages = [
    ["01", "认知与诊断", "AI共识\n机会方向"],
    ["02", "场景共创", "场景清单\n方案蓝图"],
    ["03", "原型验证", "可演示\n可验证原型"],
    ["04", "生产交付", "系统集成\n正式上线"],
    ["05", "运营优化", "效果评测\n持续迭代"],
  ];
  shape(s, 122, 424, 1022, 3, C.line);
  stages.forEach((st, i) => {
    const x = 75 + i * 235;
    shape(s, x + 52, 404, 42, 42, C.rust, 21);
    txt(s, st[0], x + 52, 410, 42, 24, { size: 14, bold: true, color: C.white, align: "center" });
    txt(s, st[1], x, 463, 146, 28, { size: 18, bold: true, align: "center" });
    txt(s, st[2], x, 501, 146, 54, { size: 15.5, color: C.muted, align: "center", lineSpacing: 1.18 });
  });
  shape(s, 66, 590, 1148, 54, C.paper2, 8);
  txt(s, "上线导入、使用辅导、效果评测与版本优化贯穿交付全程", 92, 607, 1096, 24, { size: 18, bold: true, color: C.rustDark, align: "center" });
}

// Slide 4: agent platform
{
  const s = deck.slides.add();
  s.background.fill = C.paper;
  title(s, "案例一", "TikTok 商业化 Agent 平台", 4, { width: 720 });
  txt(s, "支撑商业化 Agent 快速搭建、稳定上线与持续运营", 68, 145, 650, 30, { size: 18, color: C.muted });

  txt(s, "业务挑战", 66, 204, 200, 28, { size: 19, bold: true, color: C.rust });
  challenge(s, "01", "Agent 重复建设", "各团队独立开发，Prompt、模型与工具难以复用", 66, 244, 420);
  challenge(s, "02", "版本发布难以管理", "配置频繁变化，测试与发布长期依赖工程协作", 66, 336, 420);
  challenge(s, "03", "应用质量缺少标准", "各个 Agent 各自测试，版本升级后难以对比效果", 66, 428, 420);

  shape(s, 504, 190, 500, 338, C.white, 14, C.line, 1);
  await addImg(s, "agent-platform.png", 520, 206, 468, 306, { fit: "cover", radius: 9, crop: { left: 0.02, top: 0, right: 0, bottom: 0 }, alt: "TikTok商业化Agent平台管理界面" });
  shape(s, 518, 334, 9, 28, C.white);
  shape(s, 1020, 190, 194, 160, C.white, 12, C.line, 1);
  await addImg(s, "version-management.png", 1030, 200, 174, 120, { fit: "cover", radius: 7, crop: { left: 0.04, top: 0.05, right: 0.03, bottom: 0.46 }, alt: "Agent版本管理" });
  txt(s, "版本管理与发布", 1032, 325, 170, 18, { size: 12.5, bold: true, color: C.rust, align: "center" });
  shape(s, 1020, 368, 194, 160, C.white, 12, C.line, 1);
  await addImg(s, "evaluation.png", 1030, 378, 174, 120, { fit: "cover", radius: 7, crop: { left: 0.02, top: 0.02, right: 0.02, bottom: 0.45 }, alt: "Agent效果评测" });
  txt(s, "效果评测与优化", 1032, 503, 170, 18, { size: 12.5, bold: true, color: C.rust, align: "center" });

  metric(s, 66, 557, 330, "12+", "商业化 Agent 上线", "完成搭建、测试并投入真实业务使用");
  metric(s, 458, 557, 330, "65%", "Agent 搭建周期缩短", "平均搭建周期由约 4 周缩短至 10 天");
  metric(s, 850, 557, 330, "75%", "版本迭代时间减少", "常规配置调整与发布由 2 天缩短至半天");
}

// Slide 5: ad diagnosis
{
  const s = deck.slides.add();
  s.background.fill = C.paper;
  title(s, "案例二", "TikTok Shop 广告诊断 Agent", 5, { width: 820 });
  txt(s, "汇总大量投放诊断数据，帮助广告主快速定位问题并完成优化", 68, 145, 790, 30, { size: 18, color: C.muted });

  txt(s, "业务挑战", 66, 204, 200, 28, { size: 19, bold: true, color: C.rust });
  challenge(s, "01", "诊断链路复杂", "需要跨店铺、商品、Campaign和数据报表反复排查", 66, 244, 376);
  challenge(s, "02", "投放问题难以归因", "预算、商品、库存、转化率和广告设置相互影响", 66, 336, 376);
  challenge(s, "03", "专家服务难以规模化", "复杂问题依赖平台运营和广告专家人工分析", 66, 428, 376);

  shape(s, 464, 190, 750, 310, C.white, 14, C.line, 1);
  await addImg(s, "ad-assistant.png", 480, 206, 252, 278, { fit: "contain", radius: 9, alt: "TikTok Shop广告诊断整体界面" });
  await addImg(s, "ad-assistant.png", 748, 206, 450, 278, { fit: "cover", radius: 9, crop: { left: 0.45, top: 0.02, right: 0.01, bottom: 0.52 }, alt: "TikTok Shop广告诊断结论与优化建议" });

  shape(s, 66, 516, 1148, 32, C.paper2, 6);
  txt(s, "账户数据    广告计划    预算    商品    库存    流量    订单    转化率    ROI", 82, 524, 1116, 20, { size: 14, bold: true, color: C.rustDark, align: "center" });
  metric(s, 66, 568, 330, "30+", "投放诊断指标", "综合分析账户、广告、商品与转化数据");
  metric(s, 458, 568, 330, "<3 分钟", "完成初步问题诊断", "从跨页面排查收敛为一次对话式诊断");
  metric(s, 850, 568, 330, "60%", "高频问题自助解决", "减少对平台运营和广告专家的重复咨询");
}

// Slide 6: Prudential mini program
{
  const s = deck.slides.add();
  s.background.fill = C.paper;
  title(s, "案例三", "保诚保险团队智能工作台", 6, { width: 840 });
  txt(s, "将团队社区、保险知识问答与客户计划书统一到一个小程序", 68, 145, 870, 30, { size: 18, color: C.muted });

  const painData = [
    ["团队经验难沉淀", "市场信息与销售资料散落在微信群和个人设备"],
    ["保险知识查询效率低", "条款、核保规则与销售资料分散，复杂问题依赖资深顾问"],
    ["计划书复杂，反馈不可见", "传统制作流程耗时，发送后无法掌握客户查看情况"],
  ];
  painData.forEach((p, i) => {
    const x = 66 + i * 392;
    shape(s, x, 194, 350, 78, i === 1 ? C.rust : C.white, 10, i === 1 ? C.rust : C.line, 1);
    txt(s, p[0], x + 18, 208, 314, 24, { size: 16.5, bold: true, color: i === 1 ? C.white : C.ink, align: "center" });
    txt(s, p[1], x + 18, 238, 314, 27, { size: 12.5, color: i === 1 ? C.white : C.muted, align: "center", lineSpacing: 1.12 });
  });

  const modules = [
    ["团队社区", "动态、资料与业务经验集中沉淀\n成员审批、团队切换与共同管理"],
    ["保险知识助手", "基于团队知识库回答产品与核保问题\n支持 @文件 和引用溯源，可返回原文核对"],
    ["智能计划书", "基于客户参数自动生成标准计划书\n微信分享并记录查看时间与查看时长"],
  ];
  modules.forEach((m, i) => {
    const x = 66 + i * 392;
    const isCenter = i === 1;
    shape(s, x, 298, 350, 210, isCenter ? C.rust : C.white, 14, isCenter ? C.rust : C.line, 1);
    txt(s, m[0], x + 24, 327, 302, 34, { size: isCenter ? 23 : 21, bold: true, color: isCenter ? C.white : C.rust, align: "center" });
    shape(s, x + 135, 375, 80, 2, isCenter ? C.white : C.rust);
    txt(s, m[1], x + 30, 404, 290, 78, { size: 15, color: isCenter ? C.white : C.muted, align: "left", lineSpacing: 1.38 });
  });
  metric(s, 66, 542, 330, "3 大模块", "覆盖顾问核心工作", "团队协作、知识服务与客户计划书");
  metric(s, 458, 542, 330, "4 类文件", "企业知识统一沉淀", "支持 PDF、Word、Excel 与 PPT 资料");
  metric(s, 850, 542, 330, "2 项反馈", "客户浏览进度可追踪", "记录查看时间与查看时长");
}

// Slide 7: advantages and team
{
  const s = deck.slides.add();
  s.background.fill = C.paper;
  title(s, "为什么选择我们", "能够把 AI 项目真正交付到业务中", 7, { width: 1000 });
  const adv = [
    ["业务理解", "从企业经营目标和岗位流程出发识别真实问题。"],
    ["端到端交付", "覆盖培训、方案、原型、开发、系统集成和上线。"],
    ["平台化建设", "既能交付单个应用，也能统一管理多个 Agent。"],
    ["持续运营", "用户导入、效果评测、问题复盘和版本优化持续进行。"],
  ];
  adv.forEach((a, i) => {
    const x = 66 + i * 294;
    shape(s, x, 190, 260, 2, C.rust);
    txt(s, a[0], x, 207, 250, 28, { size: 20, bold: true });
    txt(s, a[1], x, 247, 246, 76, { size: 15, color: C.muted, lineSpacing: 1.35 });
  });

  shape(s, 66, 355, 1148, 1.5, C.line);
  txt(s, "核心团队", 66, 382, 180, 28, { size: 19, bold: true, color: C.rust });
  const team = [
    ["陈启明", "创始人 / 首席 AI 解决方案专家", "负责企业 AI 战略咨询、场景设计与项目总体方案。"],
    ["林若川", "联合创始人 / AI 平台与工程负责人", "负责 Agent 平台、知识系统、数据连接和生产交付。"],
    ["周婧妍", "客户成功与 AI 赋能负责人", "负责管理层培训、场景工作坊、上线导入和持续运营。"],
  ];
  team.forEach((t, i) => {
    const x = 66 + i * 392;
    shape(s, x, 430, 350, 170, C.white, 12, C.line, 1);
    shape(s, x, 430, 350, 3, C.rust);
    shape(s, x + 22, 452, 56, 56, C.rust, 28);
    txt(s, t[0].slice(0, 1), x + 22, 462, 56, 28, { size: 19, bold: true, color: C.white, align: "center" });
    txt(s, t[0], x + 96, 448, 220, 28, { size: 21, bold: true, color: C.ink });
    txt(s, t[1], x + 96, 481, 230, 45, { size: 14, bold: true, color: C.rust, lineSpacing: 1.18 });
    txt(s, t[2], x + 24, 538, 302, 48, { size: 14, color: C.muted, lineSpacing: 1.3 });
  });
}

// Slide 8: engagement
{
  const s = deck.slides.add();
  s.background.fill = C.paper;
  title(s, "合作方式", "两种方式启动企业 AI 项目", 8, { width: 940 });
  txt(s, "从认知开始，或者带着明确问题直接进入解决方案共创。", 68, 145, 860, 30, { size: 18, color: C.muted });

  shape(s, 66, 202, 540, 348, C.rust, 16);
  txt(s, "01", 92, 228, 80, 45, { size: 38, bold: true, color: C.white });
  txt(s, "AI 认知培训与场景工作坊", 92, 282, 450, 66, { size: 27, bold: true, color: C.white, lineSpacing: 1.06 });
  txt(s, "适合尚未形成统一 AI 认知、不确定从哪里开始的企业。", 94, 364, 446, 48, { size: 16, color: C.white, lineSpacing: 1.3 });
  txt(s, "管理层培训\n行业案例拆解\n部门业务访谈\n场景共创工作坊", 94, 421, 252, 108, { size: 15, color: C.white, lineSpacing: 1.32 });
  txt(s, "交付：企业 AI 机会地图", 345, 449, 215, 46, { size: 17, bold: true, color: C.white, align: "center" });

  shape(s, 634, 202, 580, 348, C.white, 16, C.line, 1);
  txt(s, "02", 662, 228, 80, 45, { size: 38, bold: true, color: C.rust });
  txt(s, "AI 解决方案设计与落地", 662, 282, 470, 66, { size: 27, bold: true, lineSpacing: 1.06 });
  txt(s, "适合已经存在明确业务问题、希望快速验证并正式上线的企业。", 664, 364, 456, 48, { size: 16, color: C.muted, lineSpacing: 1.3 });
  txt(s, "业务诊断与方案设计\nPoC 原型验证\n系统开发与集成\n上线运营与持续优化", 664, 421, 268, 108, { size: 15, color: C.muted, lineSpacing: 1.32 });
  txt(s, "交付：可正式运行的 AI 应用", 946, 449, 222, 46, { size: 17, bold: true, color: C.rust, align: "center" });

  shape(s, 66, 566, 1148, 78, C.paper2, 10);
  txt(s, "从一次业务场景访谈开始", 92, 582, 680, 28, { size: 23, bold: true, color: C.rustDark });
  txt(s, "识别值得先做的场景，明确试点边界与价值目标", 92, 615, 710, 20, { size: 14, color: C.muted });
  txt(s, "预约业务场景访谈", 880, 592, 286, 24, { size: 18, bold: true, color: C.rust, align: "right" });
}

await fs.mkdir(path.dirname(OUT), { recursive: true });
await (await PresentationFile.exportPptx(deck)).save(OUT);
console.log(OUT);
