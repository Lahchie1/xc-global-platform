import os
import subprocess
import shutil
from PIL import Image

# Read logo SVG
with open(os.path.join("public", "brand", "logo-white.svg"), "r", encoding="utf-8") as f:
    logo_svg = f.read()

html = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }
  body {
    width: 1200px;
    height: 630px;
    background-color: #080B11;
    background-image: 
      radial-gradient(circle at 50% 12%, rgba(219, 131, 58, 0.18) 0%, transparent 60%),
      radial-gradient(circle at 90% 85%, rgba(245, 158, 11, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 10% 85%, rgba(30, 41, 59, 0.4) 0%, transparent 50%);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .card {
    width: 1120px;
    height: 550px;
    background: rgba(15, 23, 42, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 28px;
    padding: 52px 64px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  .card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 8%;
    right: 8%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(219, 131, 58, 0.85), transparent);
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo-wrap {
    height: 54px;
    display: flex;
    align-items: center;
  }
  .logo-wrap svg {
    height: 50px;
    width: auto;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: rgba(219, 131, 58, 0.12);
    border: 1px solid rgba(219, 131, 58, 0.35);
    border-radius: 9999px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #FBBF24;
  }
  .badge-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #F59E0B;
    box-shadow: 0 0 10px #F59E0B;
  }
  .content {
    margin-top: 14px;
  }
  h1 {
    font-size: 50px;
    line-height: 1.15;
    font-weight: 800;
    letter-spacing: -0.025em;
    color: #FFFFFF;
    max-width: 960px;
    margin-bottom: 16px;
  }
  .highlight {
    background: linear-gradient(135deg, #FFFFFF 30%, #D4AF37 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  p {
    font-size: 21px;
    line-height: 1.45;
    color: #94A3B8;
    max-width: 880px;
    font-weight: 400;
  }
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }
  .features {
    display: flex;
    align-items: center;
    gap: 28px;
  }
  .feature-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 15px;
    font-weight: 600;
    color: #E2E8F0;
  }
  .feature-icon {
    color: #F59E0B;
    font-size: 16px;
  }
  .domain {
    font-size: 16px;
    font-weight: 700;
    color: #FBBF24;
    letter-spacing: 0.02em;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    background: rgba(255, 255, 255, 0.05);
    padding: 8px 18px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
</style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="logo-wrap">
        __LOGO_PLACEHOLDER__
      </div>
      <div class="badge">
        <span class="badge-dot"></span>
        Growth &amp; Talent Platform
      </div>
    </div>
    <div class="content">
      <h1>Modern Growth &amp; Elite Marketing <span class="highlight">Talent Ecosystem</span></h1>
      <p>We connect high-growth tech ventures with verified revenue leaders, fractional executives, and specialized execution squads.</p>
    </div>
    <div class="footer">
      <div class="features">
        <div class="feature-item"><span class="feature-icon">✦</span> GrowthOS™ Client Portal</div>
        <div class="feature-item"><span class="feature-icon">✦</span> TalentOS™ Specialist Console</div>
        <div class="feature-item"><span class="feature-icon">✦</span> Top 3% Vetted Talent</div>
      </div>
      <div class="domain">xcglobalhq.com</div>
    </div>
  </div>
</body>
</html>
"""

html = html.replace("__LOGO_PLACEHOLDER__", logo_svg)

temp_html = os.path.join(os.environ["TEMP"], "og_template.html")
with open(temp_html, "w", encoding="utf-8") as f:
    f.write(html)

edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

target_app = os.path.abspath(os.path.join("app", "opengraph-image.png"))
target_public = os.path.abspath(os.path.join("public", "opengraph-image.png"))

cmd = [
    edge_path,
    "--headless=new",
    "--disable-gpu",
    "--window-size=1200,630",
    "--hide-scrollbars",
    f"--screenshot={target_app}",
    f"file:///{temp_html.replace(os.sep, '/')}",
]

subprocess.run(cmd, check=True)
shutil.copyfile(target_app, target_public)

img_app = Image.open(target_app)
print(f"app/opengraph-image.png generated: {img_app.size}")

img_pub = Image.open(target_public)
print(f"public/opengraph-image.png generated: {img_pub.size}")

