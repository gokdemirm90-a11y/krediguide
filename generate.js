const https = require('https');
const fs = require('fs');

const topics = [
  { title: "How to Get the Best Mortgage Rate in 2026", tag: "Mortgage", icon: "🏠", color: "t2" },
  { title: "What to Do After a Car Accident: Step by Step", tag: "Legal", icon: "🚗", color: "t1" },
  { title: "Personal Injury Lawsuit: What to Expect", tag: "Legal", icon: "⚖️", color: "t1" },
  { title: "30-Year vs 15-Year Mortgage: Which Is Better?", tag: "Mortgage", icon: "📊", color: "t2" },
  { title: "How Much Car Insurance Do You Actually Need?", tag: "Insurance", icon: "🛡️", color: "t3" },
  { title: "Slip and Fall Accident: Your Legal Rights", tag: "Legal", icon: "⚠️", color: "t1" },
  { title: "How to Dispute a Medical Bill", tag: "Legal", icon: "🏥", color: "t1" },
  { title: "First-Time Homebuyer Guide 2026", tag: "Mortgage", icon: "🏡", color: "t2" },
  { title: "Auto Loan vs Leasing: Full Comparison", tag: "Auto Loan", icon: "🚙", color: "t3" },
  { title: "How to File a Wage Theft Claim", tag: "Legal", icon: "💼", color: "t1" },
  { title: "Homeowners Insurance: What's Covered?", tag: "Insurance", icon: "🏠", color: "t3" },
  { title: "Can I Sue My Employer? Know Your Rights", tag: "Legal", icon: "⚖️", color: "t1" },
  { title: "Refinancing Your Mortgage: When Does It Make Sense?", tag: "Mortgage", icon: "🔄", color: "t2" },
  { title: "Dog Bite Laws: Who Pays and When", tag: "Legal", icon: "🐕", color: "t1" },
  { title: "How Credit Score Affects Your Mortgage Rate", tag: "Mortgage", icon: "📈", color: "t2" },
  { title: "Wrongful Death Claims: A Family Guide", tag: "Legal", icon: "⚖️", color: "t1" },
  { title: "Understanding Your Auto Insurance Policy", tag: "Insurance", icon: "🚗", color: "t3" },
  { title: "How to Lower Your Monthly Mortgage Payment", tag: "Mortgage", icon: "💰", color: "t2" },
  { title: "Tenant Rights: What Your Landlord Can't Do", tag: "Legal", icon: "🏠", color: "t1" },
  { title: "FHA vs Conventional Loan: Which Is Right for You?", tag: "Mortgage", icon: "🏦", color: "t2" },
];

const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
const topic = topics[dayOfYear % topics.length];
const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
const slug = topic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const tagColor = topic.tag === 'Legal' ? '#f87171' : topic.tag === 'Mortgage' ? '#a78bfa' : '#34d399';

console.log('Generating article:', topic.title);

const requestData = JSON.stringify({
  model: "claude-haiku-4-5-20251001",
  max_tokens: 1500,
  messages: [{
    role: "user",
    content: `Write a helpful, informative article for Americans about: "${topic.title}"\n\nThe article should be practical, easy to understand, and around 400-500 words.\nStructure it with:\n- A brief intro paragraph\n- 3-4 main sections with clear headings (use ### for headings)\n- Practical tips or key takeaways\n- A brief conclusion\n\nWrite in plain English, no jargon. Focus on actionable advice.\nDo NOT include the title in your response, just the body content.`
  }]
});

const options = {
  hostname: 'api.anthropic.com',
  path: '/v1/messages',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.ANTHROPIC_API_KEY,
    'anthropic-version': '2023-06-01',
    'Content-Length': Buffer.byteLength(requestData)
  }
};

function makeRequest() {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.content && parsed.content[0]) {
            resolve(parsed.content[0].text);
          } else {
            reject(new Error('No content: ' + data));
          }
        } catch(e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.write(requestData);
    req.end();
  });
}

async function main() {
  const content = await makeRequest();

  const htmlContent = content
    .replace(/### (.*)/g, '<h3>$1</h3>')
    .replace(/## (.*)/g, '<h2>$1</h2>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="${topic.title} — Free guide from KrediGuide.com">
<title>${topic.title} — KrediGuide.com</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<style>
:root{--bg:#0a0f1e;--bg2:#0f1628;--card:#141d35;--card2:#1a2540;--border:rgba(255,255,255,0.07);--accent:#4f8cff;--accent2:#a78bfa;--accent3:#34d399;--text:#f0f4ff;--muted:#7a88a8;--radius:16px;}
*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;overflow-x:hidden;}
body::before{content:'';position:fixed;inset:0;background:radial-gradient(ellipse 80% 50% at 20% 10%,rgba(79,140,255,0.10) 0%,transparent 60%);pointer-events:none;z-index:0;}
nav{position:sticky;top:0;z-index:100;background:rgba(10,15,30,0.92);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);padding:0 5%;display:flex;align-items:center;justify-content:space-between;height:60px;gap:12px;}
.logo{font-family:'Syne',sans-serif;font-weight:800;font-size:1.25rem;color:var(--text);text-decoration:none;display:flex;align-items:center;gap:8px;}
.logo-dot{width:8px;height:8px;border-radius:50%;background:var(--accent);display:inline-block;}
.nav-links{display:flex;gap:1.4rem;list-style:none;}
.nav-links a{color:var(--muted);text-decoration:none;font-size:0.85rem;}
.nav-links a:hover{color:var(--text);}
.nav-cta{background:var(--accent);color:#fff;padding:8px 18px;border-radius:8px;font-size:0.83rem;font-weight:500;text-decoration:none;}
.article-wrap{position:relative;z-index:1;max-width:760px;margin:0 auto;padding:60px 5% 80px;}
.breadcrumb{font-size:0.78rem;color:var(--muted);margin-bottom:20px;}
.breadcrumb a{color:var(--muted);text-decoration:none;}
.breadcrumb a:hover{color:var(--accent);}
.article-tag{display:inline-block;font-size:0.72rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:${tagColor};background:rgba(255,255,255,0.05);padding:4px 12px;border-radius:999px;margin-bottom:16px;}
h1{font-family:'Syne',sans-serif;font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;line-height:1.2;margin-bottom:16px;}
.article-meta{font-size:0.82rem;color:var(--muted);margin-bottom:32px;padding-bottom:20px;border-bottom:1px solid var(--border);}
.article-body{font-size:0.95rem;color:var(--muted);line-height:1.85;}
.article-body p{margin-bottom:18px;}
.article-body h2{font-family:'Syne',sans-serif;font-size:1.3rem;font-weight:700;color:var(--text);margin:28px 0 12px;}
.article-body h3{font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:700;color:var(--text);margin:22px 0 10px;}
.article-body strong{color:var(--text);}
.ad-banner{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:20px;text-align:center;min-height:90px;display:flex;align-items:center;justify-content:center;position:relative;margin:40px 0;}
.ad-label{position:absolute;top:8px;left:12px;font-size:0.65rem;color:rgba(255,255,255,0.2);}
.related{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:28px;margin-top:40px;}
.related h3{font-family:'Syne',sans-serif;font-size:1rem;font-weight:700;margin-bottom:16px;}
.related-links{display:flex;flex-direction:column;gap:10px;}
.related-link{display:flex;align-items:center;gap:10px;text-decoration:none;padding:10px;background:var(--card2);border-radius:8px;transition:background .2s;}
.related-link:hover{background:var(--bg);}
.related-link-text{font-size:0.88rem;color:var(--muted);}
.related-link:hover .related-link-text{color:var(--text);}
.disclaimer{background:var(--card2);border-left:3px solid rgba(251,146,60,0.4);border-radius:0 8px 8px 0;padding:14px 18px;margin-top:32px;font-size:0.82rem;color:var(--muted);line-height:1.6;}
footer{position:relative;z-index:1;border-top:1px solid var(--border);padding:32px 5%;text-align:center;}
footer p{font-size:0.78rem;color:var(--muted);}
footer a{color:var(--muted);text-decoration:none;margin:0 12px;}
@media(max-width:768px){.nav-links{display:none;}}
</style>
</head>
<body>
<nav>
  <a href="index.html" class="logo"><span class="logo-dot"></span>KrediGuide<span style="color:var(--accent)">.com</span></a>
  <ul class="nav-links">
    <li><a href="mortgage.html">Mortgage</a></li>
    <li><a href="auto-loan.html">Auto Loan</a></li>
    <li><a href="legal-guide.html">Legal Guides</a></li>
    <li><a href="insurance-guide.html">Insurance</a></li>
  </ul>
  <a href="mortgage.html" class="nav-cta">Calculators</a>
</nav>
<div class="article-wrap">
  <div class="breadcrumb"><a href="index.html">Home</a> / <a href="blog.html">Blog</a> / ${topic.tag}</div>
  <div class="article-tag">${topic.tag}</div>
  <h1>${topic.title}</h1>
  <div class="article-meta">${topic.icon} ${topic.tag} &middot; ${date} &middot; 5 min read</div>
  <div class="ad-banner"><span class="ad-label">AD</span><div style="color:var(--muted);font-size:0.82rem;">Advertisement</div></div>
  <div class="article-body">${htmlContent}</div>
  <div class="ad-banner"><span class="ad-label">AD</span><div style="color:var(--muted);font-size:0.82rem;">Advertisement</div></div>
  <div class="related">
    <h3>Related Guides</h3>
    <div class="related-links">
      <a href="mortgage.html" class="related-link"><span>🏠</span><span class="related-link-text">Mortgage Calculator</span></a>
      <a href="legal-guide.html" class="related-link"><span>⚖️</span><span class="related-link-text">Legal Guides — When do you need a lawyer?</span></a>
      <a href="auto-loan.html" class="related-link"><span>🚗</span><span class="related-link-text">Auto Loan Calculator</span></a>
      <a href="insurance-guide.html" class="related-link"><span>🛡️</span><span class="related-link-text">Insurance Guide</span></a>
    </div>
  </div>
  <div class="disclaimer"><strong style="color:var(--text)">Disclaimer:</strong> General information only — not legal or financial advice. Consult a licensed professional for your specific situation.</div>
</div>
<footer>
  <p><a href="index.html">Home</a><a href="about.html">About</a><a href="privacy-policy.html">Privacy</a><a href="contact.html">Contact</a></p>
  <p style="margin-top:10px;">© 2026 KrediGuide.com</p>
</footer>
</body>
</html>`;

  fs.writeFileSync(`article-${slug}.html`, html);
  console.log('Article saved:', `article-${slug}.html`);

  // Blog sayfasını güncelle
  let blogContent = fs.readFileSync('blog.html', 'utf8');
  const newCard = `<a href="article-${slug}.html" class="blog-card" data-cat="${topic.tag.toLowerCase().replace(/ /g, '')}"><div class="blog-thumb ${topic.color}">${topic.icon}</div><div class="blog-content"><div class="blog-tag">${topic.tag}</div><div class="blog-title">${topic.title}</div><div class="blog-meta">5 min · ${date}</div></div></a>`;
  blogContent = blogContent.replace('<div class="blog-grid" id="blogGrid">', '<div class="blog-grid" id="blogGrid">\n      ' + newCard);
  fs.writeFileSync('blog.html', blogContent);
  console.log('Blog updated!');
}

main().catch(console.error);


// Sitemap güncelle
function updateSitemap() {
  const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.startsWith('google'));
  const date = new Date().toISOString().split('T')[0];
  
  const urls = files.map(f => {
    const priority = f === 'index.html' ? '1.0' : f.startsWith('article-') ? '0.8' : '0.7';
    return `  <url><loc>https://krediguide.com/${f}</loc><priority>${priority}</priority><lastmod>${date}</lastmod><changefreq>daily</changefreq></url>`;
  }).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  fs.writeFileSync('sitemap.xml', sitemap);
  console.log('Sitemap updated with', files.length, 'pages');
}

updateSitemap();
