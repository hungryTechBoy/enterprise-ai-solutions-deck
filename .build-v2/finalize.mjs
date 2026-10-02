import path from "node:path";
import { pathToFileURL } from "node:url";

const workspaceDir = "/Users/devin/projects/企业AI解决方案PPT";
const SKILL_DIR = "/Users/devin/.codex/plugins/cache/openai-primary-runtime/presentations/26.905.11957/skills/presentations";
const RUNTIME_PYTHON = "/Users/devin/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3";
const candidatePath = path.join(workspaceDir, ".build-v2", "candidate.pptx");
const finalPath = path.join(workspaceDir, "output", "企业AI解决方案介绍-V9-workflow-cover-final.pptx");

const { finalizePresentation } = await import(pathToFileURL(
  path.join(SKILL_DIR, "container_tools", "artifact_tool_utils.mjs"),
).href);

const result = await finalizePresentation({
  explicitTotalSlideCount: 8,
  requiredNativeTableOwnerSlides: [],
  requiredNativeChartOwnerSlides: [],
  workspaceDir,
  candidatePath,
  finalPath,
  pythonExecutable: RUNTIME_PYTHON,
  integrityValidatorPath: path.join(SKILL_DIR, "container_tools", "inspect_presentation_package_integrity.py"),
  layoutValidatorPath: path.join(SKILL_DIR, "container_tools", "inspect_presentation_layout_geometry.py"),
  layoutArgs: [
    "--expected-slide-size-emu", "12192000,6858000",
    "--validate-heading-fit",
  ],
  fontPolicy: { basis: "design", families: ["Hiragino Sans GB"] },
  verifyArtifactToolImport: true,
  receiptPath: path.join(workspaceDir, ".codex-finalizer", "企业AI解决方案介绍-V9-workflow-cover-final.pptx.validation.json"),
});

console.log(JSON.stringify(result, null, 2));
