# 企业 AI 解决方案公司介绍 PPT

深圳峦识科技有限公司企业 AI 解决方案与落地服务介绍材料。

## 最终交付

- PPT：`output/企业AI解决方案介绍-V9-workflow-cover-final.pptx`
- PDF：`output/pdf/企业AI解决方案介绍-V9-workflow-cover-final.pdf`
- HTML：`enterprise-ai-deck.html`

## 项目内容

- `.build-v2/`：PPT 构建与导出脚本
- `assets/`：封面概念图及案例素材
- `sources/`：用户提供的原始 Word 文档和参考截图
- `design-demos/`：设计方向稿
- `output/`：各版本 PPT 和 PDF 成品
- `brand-spec.md`：品牌视觉规范
- `direction-approved.md`：设计方向与改稿记录
- `方案与执行计划.md`：内容与执行方案
- `AGENTS.md`：数据源、项目决策、构建方式和后续任务交接指南

## 重新生成 PPT

进入 `.build-v2` 后运行：

```bash
node build-deck.mjs
```

构建脚本依赖 Codex 工作区提供的演示文稿运行时。
