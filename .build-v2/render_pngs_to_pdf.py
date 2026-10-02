from pathlib import Path

from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas


SOURCE_DIR = Path("/Users/devin/projects/企业AI解决方案PPT/.review-v9-hires")
OUTPUT_PATH = Path(
    "/Users/devin/projects/企业AI解决方案PPT/output/pdf/"
    "企业AI解决方案介绍-V9-workflow-cover-final.pdf"
)
PAGE_SIZE = (960.0, 540.0)


def slide_number(path: Path) -> int:
    return int(path.stem.split("-")[-1])


slides = sorted(SOURCE_DIR.glob("slide-*.png"), key=slide_number)
if len(slides) != 8:
    raise RuntimeError(f"Expected 8 rendered slides, found {len(slides)}")

OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
pdf = canvas.Canvas(str(OUTPUT_PATH), pagesize=PAGE_SIZE, pageCompression=1)
for slide in slides:
    pdf.drawImage(ImageReader(str(slide)), 0, 0, width=PAGE_SIZE[0], height=PAGE_SIZE[1])
    pdf.showPage()
pdf.save()

print(OUTPUT_PATH)
