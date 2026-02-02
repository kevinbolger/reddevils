const fs = require('fs');
const path = require('path');

const projectDir = '/Users/kevinbolger/local/projects/red-devils';
// Ensure project dir exists (it should)
if (!fs.existsSync(projectDir)) fs.mkdirSync(projectDir, { recursive: true });

// Data (same as before)
const data = {
    '2026-02-01': [
        {
            badge: 'WTF 🤯', class: 'shock',
            title: 'AMORIM COOKED?! CARRICK IS HIM 😤',
            text: `Y'all won't believe this stat. Michael Carrick just matched Ruben Amorim's BEST streak in only <span class="highlight">3 GAMES</span>. Amorim needed 47 games. The timeline is healing.`,
            link: 'https://www.reddit.com/r/reddevils/comments/1qt2bqn/'
        },
        {
            badge: 'AURA +1000 ✨',
            title: 'AIR ŠEŠKO HAS LANDED ✈️👑',
            text: `Benjamin Sesko posted "Fergie Time" on IG and the vibes are IMMACULATE. Bro is literally levitating at Old Trafford rn. Main character energy only.`,
            link: 'https://www.reddit.com/r/reddevils/comments/1qt2vf3/'
        },
        {
            badge: 'GOATED 🐐',
            title: 'CASEMIRO REDEMPTION ARC 🥶',
            text: `Standing ovation? ✅ POTM? ✅ No-look assist? ✅. Form is temporary, Class is permanent. Respect the OG.`,
            link: 'https://www.reddit.com/r/reddevils/comments/1qt52h6/'
        }
    ],
    '2026-01-31': [
        {
            badge: 'RETRO VIBES 📼', class: 'retro',
            title: '6 YEARS OF MAGNIFICO 🎩',
            text: `Can you believe it's been 6 years since we signed Bruno? <span class="highlight">JAN 30, 2020</span>. He changed everything. Put some respect on his name.`,
            link: 'https://www.reddit.com/r/reddevils/comments/1qqaovh/'
        },
        {
            badge: 'CRIMINAL 👮',
            title: 'AMAD ROBBED?! 😤',
            text: `The streets are saying Amad deserved more minutes. Look at this heat map. He is literally cooking every time he touches the ball. Make it make sense.`,
            link: '#'
        }
    ],
    '2026-01-30': [
        {
            badge: 'WHOLESOME 🥺',
            title: 'MCSAUCE LOVES CARRICK ❤️',
            text: `Scott McTominay dropped the L-bomb for Carrick. "I've got so much love and respect for him." The vibes in the dressing room must be immaculate rn.`,
            link: 'https://www.reddit.com/r/reddevils/comments/1qod6kd/'
        },
        {
            badge: 'CINEMA 🎥',
            title: 'SPIDERCAM GOALS 🕷️',
            text: `If you haven't seen the Spidercam angle of the City/Arsenal goals, you are missing out. It looks like FIFA but better. Pure art.`,
            link: 'https://www.reddit.com/r/reddevils/comments/1qo94nt/'
        }
    ],
    '2026-01-29': [
        {
            badge: 'SAVAGE 💀',
            title: 'MAGUIRE ON IG 😂',
            text: `Harry Maguire telling Senne Lammens to "punch another one clear for us". The shithousery is off the charts. We love to see it.`,
            link: 'https://www.reddit.com/r/reddevils/comments/1qnbyng/'
        },
        {
            badge: 'INJURY NEWS 🚑',
            title: 'SHAW IS BACK (MAYBE) 👀',
            text: `Rumors swirling that Luke Shaw was spotted walking without crutches. Are we dreaming? Don't give me hope.`,
            link: '#'
        }
    ]
};

const dates = Object.keys(data).sort();

// Helper to get path components from "YYYY-MM-DD"
const getDatePath = (dateStr) => {
    const [y, m, d] = dateStr.split('-');
    return { y, m, d, fullPath: path.join(y, m, d) };
};

// Helper to create link to another date from a date page
// Since all date pages are at depth 3 (YYYY/MM/DD/index.html), we go up 3 levels to root
const getLinkToDate = (targetDateStr) => {
    const { y, m, d } = getDatePath(targetDateStr);
    return `../../../${y}/${m}/${d}/`; // Implicit index.html
};

const template = (date, content, prevDate, nextDate) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RED DEVILS HYPE - ${date}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,700;0,900;1,900&display=swap');
        body { font-family: 'Montserrat', sans-serif; background-color: #111; color: #fff; margin: 0; padding: 0; overflow-x: hidden; }
        header { background: linear-gradient(45deg, #DA291C, #990000); padding: 1.5rem; text-align: center; border-bottom: 4px solid #fff; position: sticky; top: 0; z-index: 100; box-shadow: 0 0 20px rgba(218, 41, 28, 0.6); }
        h1 { font-size: 2.5rem; text-transform: uppercase; font-style: italic; margin: 0; text-shadow: 3px 3px 0px #000; letter-spacing: -2px; }
        .subtitle { font-size: 0.9rem; background: #fff; color: #DA291C; display: inline-block; padding: 2px 8px; font-weight: 900; transform: skew(-10deg); margin-top: 5px; }
        .nav-bar { display: flex; justify-content: space-between; padding: 1rem; background: #000; font-weight: bold; text-transform: uppercase; border-bottom: 2px solid #333; }
        .nav-bar a { color: #fff; text-decoration: none; padding: 0.5rem 1rem; border: 1px solid #333; border-radius: 4px; transition: 0.2s; }
        .nav-bar a:hover { background: #DA291C; border-color: #DA291C; }
        .nav-bar span { color: #666; padding: 0.5rem 1rem; }
        .container { max-width: 600px; margin: 2rem auto; padding: 1rem; }
        .card { background: #1a1a1a; border-radius: 20px; margin-bottom: 2rem; overflow: hidden; border: 2px solid #333; transition: transform 0.2s, box-shadow 0.2s; position: relative; }
        .card:hover { transform: scale(1.02) rotate(1deg); border-color: #DA291C; box-shadow: 0 0 15px rgba(218, 41, 28, 0.5); }
        .card-content { padding: 1.5rem; }
        .badge { background: #ff00de; color: #fff; padding: 4px 10px; border-radius: 50px; font-size: 0.7rem; font-weight: 900; text-transform: uppercase; position: absolute; top: 10px; right: 10px; box-shadow: 0 0 10px #ff00de; }
        .badge.shock { background: #ffd700; color: #000; box-shadow: 0 0 10px #ffd700; }
        .badge.retro { background: #00ffff; color: #000; box-shadow: 0 0 10px #00ffff; }
        h2 { font-size: 1.8rem; line-height: 1; margin: 0 0 10px 0; text-transform: uppercase; font-weight: 900; font-style: italic; }
        p { font-size: 1rem; color: #ccc; margin-bottom: 1rem; }
        .highlight { color: #DA291C; font-weight: bold; background: rgba(218, 41, 28, 0.1); padding: 2px 5px; }
        .btn { display: block; width: 100%; padding: 1rem; background: #fff; color: #000; text-align: center; text-decoration: none; font-weight: 900; text-transform: uppercase; border-radius: 12px; margin-top: 10px; transition: 0.2s; box-sizing: border-box; }
        .btn:hover { background: #DA291C; color: #fff; box-shadow: 5px 5px 0px #000; transform: translate(-2px, -2px); }
        .footer { text-align: center; padding: 2rem; font-size: 0.8rem; opacity: 0.5; border-top: 1px solid #333; margin-top: 3rem; }
    </style>
</head>
<body>

<header>
    <h1>RED DEVILS FR FR 🔴</h1>
    <span class="subtitle">EDITION: ${date}</span>
</header>

<div class="nav-bar">
    ${prevDate ? `<a href="${getLinkToDate(prevDate)}">← ${prevDate}</a>` : '<span>← PREV</span>'}
    <a href="../../../">ARCHIVE</a>
    ${nextDate ? `<a href="${getLinkToDate(nextDate)}">${nextDate} →</a>` : '<span>NEXT →</span>'}
</div>

<div class="container">
    ${content}
</div>

<div class="footer">
    <p>BUILT BY KEVTAV 🔴 • DON'T FORGET TO LIKE & SUBSCRIBE</p>
</div>

</body>
</html>
`;

// Generate Newsletter Pages
dates.forEach((date, index) => {
    const prevDate = index > 0 ? dates[index - 1] : null;
    const nextDate = index < dates.length - 1 ? dates[index + 1] : null;

    const cardsHtml = data[date].map(item => `
    <div class="card">
        <span class="badge ${item.class || ''}">${item.badge}</span>
        <div class="card-content">
            <h2>${item.title}</h2>
            <p>${item.text}</p>
            <a href="${item.link}" target="_blank" class="btn">FULL STORY 🔗</a>
        </div>
    </div>
    `).join('');

    const html = template(date, cardsHtml, prevDate, nextDate);
    
    // Create hierarchy: YYYY/MM/DD
    const { y, m, d, fullPath } = getDatePath(date);
    const targetDir = path.join(projectDir, fullPath);
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
    
    fs.writeFileSync(path.join(targetDir, 'index.html'), html);
    console.log(`Generated ${fullPath}/index.html`);
});

// Generate Archive (index.html at root)
const archiveHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RED DEVILS FR FR - ARCHIVE</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,700;0,900;1,900&display=swap');
        body { font-family: 'Montserrat', sans-serif; background-color: #111; color: #fff; margin: 0; padding: 0; }
        header { background: #DA291C; padding: 2rem; text-align: center; }
        h1 { font-style: italic; text-transform: uppercase; margin: 0; }
        .container { max-width: 600px; margin: 2rem auto; padding: 1rem; }
        .archive-list { list-style: none; padding: 0; }
        .archive-item { background: #1a1a1a; margin-bottom: 1rem; padding: 1rem; border-radius: 10px; border: 1px solid #333; display: flex; justify-content: space-between; align-items: center; transition: 0.2s; }
        .archive-item:hover { transform: translateX(10px); border-color: #DA291C; }
        .archive-item a { color: #fff; text-decoration: none; font-weight: bold; font-size: 1.2rem; display: block; width: 100%; }
        .date { color: #666; font-size: 0.9rem; }
    </style>
</head>
<body>
<header>
    <h1>ARCHIVE 📚</h1>
    <p>HISTORY OF THE BRAINROT</p>
</header>
<div class="container">
    <ul class="archive-list">
        ${dates.slice().reverse().map(date => {
            const { y, m, d } = getDatePath(date);
            return `
            <li class="archive-item">
                <a href="${y}/${m}/${d}/">
                    EDITION: ${date} <br>
                    <span class="date">See what we cooked on this day</span>
                </a>
                <span>➡️</span>
            </li>
            `;
        }).join('')}
    </ul>
</div>
</body>
</html>
`;

fs.writeFileSync(path.join(projectDir, 'index.html'), archiveHtml);
console.log('Generated root index.html (Archive)');
