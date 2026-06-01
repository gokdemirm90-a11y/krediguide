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
  { title: "Homeowners Insurance: What Is Covered?", tag: "Insurance", icon: "🏠", color: "t3" },
  { title: "Can I Sue My Employer? Know Your Rights", tag: "Legal", icon: "⚖️", color: "t1" },
  { title: "Refinancing Your Mortgage: When Does It Make Sense?", tag: "Mortgage", icon: "🔄", color: "t2" },
  { title: "Dog Bite Laws: Who Pays and When", tag: "Legal", icon: "🐕", color: "t1" },
  { title: "How Credit Score Affects Your Mortgage Rate", tag: "Mortgage", icon: "📈", color: "t2" },
  { title: "Wrongful Death Claims: A Family Guide", tag: "Legal", icon: "⚖️", color: "t1" },
  { title: "Understanding Your Auto Insurance Policy", tag: "Insurance", icon: "🚗", color: "t3" },
  { title: "How to Lower Your Monthly Mortgage Payment", tag: "Mortgage", icon: "💰", color: "t2" },
  { title: "Tenant Rights: What Your Landlord Cannot Do", tag: "Legal", icon: "🏠", color: "t1" },
  { title: "FHA vs Conventional Loan: Which Is Right for You?", tag: "Mortgage", icon: "🏦", color: "t2" },
  { title: "How to Handle Insurance After a Car Accident", tag: "Insurance", icon: "🚗", color: "t3" },
  { title: "What Is PMI and How to Avoid It?", tag: "Mortgage", icon: "📋", color: "t2" },
  { title: "Workplace Discrimination: Your Legal Options", tag: "Legal", icon: "⚖️", color: "t1" },
  { title: "How to Negotiate a Car Price in 2026", tag: "Auto Loan", icon: "🚗", color: "t3" },
  { title: "Small Claims Court: How It Works", tag: "Legal", icon: "🏛️", color: "t1" },
  { title: "How to Read a Mortgage Statement", tag: "Mortgage", icon: "📄", color: "t2" },
  { title: "Medical Malpractice: Do You Have a Case?", tag: "Legal", icon: "🏥", color: "t1" },
  { title: "Gap Insurance: Is It Worth It?", tag: "Insurance", icon: "🛡️", color: "t3" },
  { title: "How to Pay Off Your Mortgage Early", tag: "Mortgage", icon: "💰", color: "t2" },
  { title: "Sexual Harassment at Work: What to Do", tag: "Legal", icon: "💼", color: "t1" },
  { title: "Down Payment Assistance Programs 2026", tag: "Mortgage", icon: "🏡", color: "t2" },
  { title: "What Happens If You Miss a Mortgage Payment?", tag: "Mortgage", icon: "⚠️", color: "t2" },
  { title: "How to File a Personal Injury Claim", tag: "Legal", icon: "⚖️", color: "t1" },
  { title: "Car Depreciation: What You Need to Know", tag: "Auto Loan", icon: "📉", color: "t3" },
  { title: "Umbrella Insurance: Do You Need It?", tag: "Insurance", icon: "☂️", color: "t3" },
  { title: "How to Improve Your Credit Score Fast", tag: "Mortgage", icon: "📈", color: "t2" },
  { title: "Construction Accident: Your Legal Rights", tag: "Legal", icon: "🏗️", color: "t1" },
  { title: "VA Loan Benefits: A Complete Guide", tag: "Mortgage", icon: "🎖️", color: "t2" },
  { title: "What Is Uninsured Motorist Coverage?", tag: "Insurance", icon: "🚗", color: "t3" },
  { title: "How Long Does a Personal Injury Case Take?", tag: "Legal", icon: "⏱️", color: "t1" },
  { title: "HELOC vs Home Equity Loan: Key Differences", tag: "Mortgage", icon: "🏠", color: "t2" },
  { title: "Drunk Driving Accident: Your Legal Options", tag: "Legal", icon: "🚨", color: "t1" },
  { title: "How to Dispute an Insurance Claim Denial", tag: "Insurance", icon: "📝", color: "t3" },
  { title: "Mortgage Pre-Approval: Everything You Need to Know", tag: "Mortgage", icon: "✅", color: "t2" },
  { title: "Nursing Home Abuse: Signs and Legal Options", tag: "Legal", icon: "⚖️", color: "t1" },
  { title: "How to Save for a Down Payment Fast", tag: "Mortgage", icon: "💵", color: "t2" },
  { title: "Rear-End Collision: Who Is at Fault?", tag: "Legal", icon: "🚗", color: "t1" },
  { title: "Life Insurance: How Much Do You Need?", tag: "Insurance", icon: "💙", color: "t3" },
  { title: "What Is a Good Debt-to-Income Ratio?", tag: "Mortgage", icon: "📊", color: "t2" },
  { title: "Wrongful Termination vs At-Will Employment", tag: "Legal", icon: "💼", color: "t1" },
  { title: "How to Buy a Car with Bad Credit", tag: "Auto Loan", icon: "🚗", color: "t3" },
  { title: "Flood Insurance: Do You Need It?", tag: "Insurance", icon: "🌊", color: "t3" },
  { title: "How Mortgage Points Work", tag: "Mortgage", icon: "📍", color: "t2" },
  { title: "Whiplash Injury: Symptoms and Legal Rights", tag: "Legal", icon: "🤕", color: "t1" },
  { title: "How to Get Out of an Upside Down Car Loan", tag: "Auto Loan", icon: "🚗", color: "t3" },
  { title: "Renters Insurance: Why You Need It", tag: "Insurance", icon: "🏠", color: "t3" },
  { title: "Bridge Loan: What It Is and When to Use It", tag: "Mortgage", icon: "🌉", color: "t2" },
  { title: "Hit and Run Accident: What to Do", tag: "Legal", icon: "🚨", color: "t1" },
  { title: "How to Compare Mortgage Lenders", tag: "Mortgage", icon: "🔍", color: "t2" },
  { title: "Disability Discrimination at Work: Your Rights", tag: "Legal", icon: "⚖️", color: "t1" },
  { title: "Car Insurance After a DUI", tag: "Insurance", icon: "🚗", color: "t3" },
  { title: "Interest-Only Mortgage: Pros and Cons", tag: "Mortgage", icon: "📊", color: "t2" },
  { title: "Product Liability: When Defective Products Cause Harm", tag: "Legal", icon: "⚠️", color: "t1" },
  { title: "How to Refinance a Car Loan", tag: "Auto Loan", icon: "🔄", color: "t3" },
  { title: "Health Insurance Basics: HMO vs PPO", tag: "Insurance", icon: "❤️", color: "t3" },
  { title: "Assumable Mortgage: What It Means", tag: "Mortgage", icon: "🏠", color: "t2" },
  { title: "Social Security Disability: How to Apply", tag: "Legal", icon: "⚖️", color: "t1" },
  { title: "Best Time to Buy a Car in 2026", tag: "Auto Loan", icon: "📅", color: "t3" },
  { title: "Title Insurance: Do You Need It?", tag: "Mortgage", icon: "📄", color: "t2" },
  { title: "Truck Accident Injuries: What to Do", tag: "Legal", icon: "🚛", color: "t1" },
  { title: "How Deductibles Work in Insurance", tag: "Insurance", icon: "💰", color: "t3" },
  { title: "Seller Concessions: What Are They?", tag: "Mortgage", icon: "🤝", color: "t2" },
  { title: "How to Report Workplace Harassment", tag: "Legal", icon: "📝", color: "t1" },
  { title: "Certified Pre-Owned vs Used Car", tag: "Auto Loan", icon: "🚗", color: "t3" },
  { title: "Mortgage Escrow Account Explained", tag: "Mortgage", icon: "🏦", color: "t2" },
  { title: "Wrongful Foreclosure: Your Legal Options", tag: "Legal", icon: "🏠", color: "t1" },
  { title: "Classic Car Insurance: What You Need", tag: "Insurance", icon: "🚙", color: "t3" },
  { title: "How to Get a Mortgage With Low Income", tag: "Mortgage", icon: "💵", color: "t2" },
  { title: "Motorcycle Accident Claims: A Guide", tag: "Legal", icon: "🏍️", color: "t1" },
  { title: "How to Trade In Your Car", tag: "Auto Loan", icon: "🔄", color: "t3" },
  { title: "Does Homeowners Insurance Cover Mold?", tag: "Insurance", icon: "🏠", color: "t3" },
  { title: "Co-Signing a Mortgage: What You Need to Know", tag: "Mortgage", icon: "✍️", color: "t2" },
  { title: "Pedestrian Accident: Your Legal Rights", tag: "Legal", icon: "🚶", color: "t1" },
  { title: "How to Finance a Used Car", tag: "Auto Loan", icon: "🚗", color: "t3" },
  { title: "What Does Liability Insurance Cover?", tag: "Insurance", icon: "🛡️", color: "t3" },
  { title: "How to Appeal a Mortgage Denial", tag: "Mortgage", icon: "📋", color: "t2" },
  { title: "Brain Injury Claims: A Legal Guide", tag: "Legal", icon: "🧠", color: "t1" },
  { title: "Electric Vehicle Tax Credits 2026", tag: "Auto Loan", icon: "⚡", color: "t3" },
  { title: "Pet Insurance: Is It Worth the Cost?", tag: "Insurance", icon: "🐾", color: "t3" },
  { title: "Adjustable Rate Mortgage: Pros and Cons", tag: "Mortgage", icon: "📊", color: "t2" },
  { title: "Age Discrimination at Work: Legal Guide", tag: "Legal", icon: "⚖️", color: "t1" },
  { title: "How to Get the Best Auto Loan Rate", tag: "Auto Loan", icon: "💰", color: "t3" },
  { title: "Condo vs House: Financial Comparison", tag: "Mortgage", icon: "🏢", color: "t2" },
  { title: "Bicycle Accident Claims: Know Your Rights", tag: "Legal", icon: "🚲", color: "t1" },
  { title: "How Much House Can You Actually Afford?", tag: "Mortgage", icon: "🏠", color: "t2" },
  { title: "Filing a Police Report After a Car Accident", tag: "Legal", icon: "🚔", color: "t1" },
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function callAPI(topicTitle) {
  const requestData = JSON.stringify({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1200,
    messages: [{
      role: "user",
      content: `Write a helpful article for Americans about: "${topicTitle}"\n\nAround 350-400 words. Include:\n- Brief intro\n- 3 sections with ### headings\n- Practical tips\n- Brief conclusion\n\nPlain English only. No jargon. Actionable advice.\nDo NOT include the title. Just the body content.`
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
            reject(new Error('API error: ' + data));
          }
        } catch(e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(requestData);
    req.end();
  });
}

function buildHTML(topic, content, date) {
  const tagColor = topic.tag === 'Legal' ? '#f87171' : topic.tag === 'Mortgage' ? '#a78bfa' : '#34d399';
  const htmlContent = content
    .replace(/### (.*)/g, '<h3>$1</h3>')
    .replace(/## (.*)/g, '<h2>$1</h2>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>');

  return `<!DOCTYPE html>
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
:root{--bg:#0a0f1e;--card:#141d35;--card2:#1a2540;--border:rgba(255,255,255,0.07);--accent:#4f8cff;--accent2:#a78bfa;--accent3:#34d399;--text:#f0f4ff;--muted:#7a88a8;--radius:16px;}
*{box-sizing:border-box;margin:0;padding:0;}
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
.related-link{display:flex;align-items:center;gap:10px;text-decoration:none;padding:10px;background:var(--card2);border-radius:8px;}
.related-link-text{font-size:0.88rem;color:var(--muted);}
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
      <a href="legal-guide.html" class="related-link"><span>⚖️</span><span class="related-link-text">Legal Guides</span></a>
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
}

async function main() {
  const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  let blogContent = fs.readFileSync('blog.html', 'utf8');
  let newCards = '';

  for (let i = 0; i < topics.length; i++) {
    const topic = topics[i];
    const slug = topic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const filename = `article-${slug}.html`;

    if (fs.existsSync(filename)) {
      console.log(`[${i+1}/${topics.length}] Skipping (exists): ${topic.title}`);
      continue;
    }

    console.log(`[${i+1}/${topics.length}] Generating: ${topic.title}`);

    try {
      const content = await callAPI(topic.title);
      const html = buildHTML(topic, content, date);
      fs.writeFileSync(filename, html);
      console.log(`  ✓ Saved: ${filename}`);

      newCards += `<a href="${filename}" class="blog-card" data-cat="${topic.tag.toLowerCase().replace(/ /g, '')}"><div class="blog-thumb ${topic.color}">${topic.icon}</div><div class="blog-content"><div class="blog-tag">${topic.tag}</div><div class="blog-title">${topic.title}</div><div class="blog-meta">5 min · ${date}</div></div></a>\n      `;

      // Rate limiting - API'yi fazla zorlamayalım
      await sleep(1500);
    } catch(err) {
      console.error(`  ✗ Error: ${err.message}`);
      await sleep(3000);
    }
  }

  // Blog sayfasını güncelle
  if (newCards) {
    blogContent = blogContent.replace('<div class="blog-grid" id="blogGrid">', '<div class="blog-grid" id="blogGrid">\n      ' + newCards);
    fs.writeFileSync('blog.html', blogContent);
    console.log('Blog page updated!');
  }

  // Sitemap güncelle
  const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.startsWith('google'));
  const sitemapDate = new Date().toISOString().split('T')[0];
  const urls = files.map(f => {
    const priority = f === 'index.html' ? '1.0' : f.startsWith('article-') ? '0.8' : '0.7';
    return `  <url><loc>https://krediguide.com/${f}</loc><priority>${priority}</priority><lastmod>${sitemapDate}</lastmod><changefreq>daily</changefreq></url>`;
  }).join('\n');
  fs.writeFileSync('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`);
  console.log(`Sitemap updated with ${files.length} pages!`);
  console.log('DONE!');
}

main().catch(console.error);
