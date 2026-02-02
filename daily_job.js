const fs = require('fs');
const path = require('path');

// --- CONFIG ---
const PROJECT_DIR = '/Users/kevinbolger/local/projects/red-devils';
const HISTORY_FILE = path.join(PROJECT_DIR, 'history.json');
const TARGET_SUBREDDIT = 'reddevils';

// Ensure history file exists
if (!fs.existsSync(HISTORY_FILE)) {
    fs.writeFileSync(HISTORY_FILE, JSON.stringify({ processed_posts: [] }, null, 2));
}

// --- MOCK DATA (In production this would fetch from Reddit API) ---
// We are simulating accurate 24h windows (9AM GMT - 9AM GMT)
const MOCK_REDDIT_DATA = [
    // --- FEB 01 EDITION (Real Data from Today) ---
    { 
        id: '1qt2bqn', created_utc: 1769961818, date: '2026-02-01',
        title: 'Carrick Equals Record', ups: 6113, 
        permalink: '/r/reddevils/comments/1qt2bqn/michael_carrick_has_equalled_ruben_amorims/', 
        summary: "Michael Carrick has equalled Ruben Amorim’s best-ever winning run at Manchester United (three games). Amorim had 47 games. Carrick has had 3. The stats don't lie.",
        punditry: "Top comment: 'He's actually doing it. The mad lad.' Streets saying: Give him the contract now. 📝"
    },
    { 
        id: '1qt2vf3', created_utc: 1769963028, date: '2026-02-01',
        title: 'Sesko Air', ups: 4981, 
        permalink: '/r/reddevils/comments/1qt2vf3/air_šeško/', 
        summary: "Benjamin Sesko posted 'Fergie Time' on Instagram after the late winner. The Stretford End is already singing his name. He's scored 4 in his last 3 games.",
        punditry: "Fans are losing it: 'We finally have a striker who feeds on chaos.' 😤"
    },
    { 
        id: '1qt2w12', created_utc: 1769963065, date: '2026-02-01',
        title: 'Bruno 12 Assists', ups: 2646, 
        permalink: '/r/reddevils/comments/1qt2w12/bruno_fernandes_has_registered_12_assists_in_the/', 
        summary: "Bruno Fernandes has registered 12 assists in the Premier League this season, equalling his best-ever return. He is still the heartbeat of this team.",
        punditry: "Analysis: 'People said he was washed. He took that personally.' 🐐"
    },
    { 
        id: '1qt52h6', created_utc: 1769967790, date: '2026-02-01',
        title: 'Casemiro Standing Ovation', ups: 4603, 
        permalink: '/r/reddevils/comments/1qt52h6/casemiro_received_a_standing_ovation_from_old/', 
        summary: "Casemiro received a massive standing ovation from Old Trafford. That no-look assist was pure filth.",
        punditry: "Reddit reacts: 'Class is permanent. Form is temporary. Respect the tank.' 🛡️"
    },

    // --- JAN 31 EDITION (Generic/Mock History - STRICTLY DIFFERENT CONTENT) ---
    { 
        id: 'jan31_1', created_utc: 1769932800, date: '2026-01-31',
        title: 'Amad Training Screamers', ups: 3000, permalink: '/r/reddevils/top/?t=week', 
        summary: "Training footage released today shows Amad scoring worldies against Onana. The kid is knocking on the door.",
        punditry: "Comments saying: 'If he doesn't start, we riot.' 🛑"
    },
    { 
        id: 'jan31_2', created_utc: 1769936400, date: '2026-01-31',
        title: 'Mainoo Contract Talks', ups: 4100, permalink: '/r/reddevils/top/?t=week', 
        summary: "Reports circulating that Kobbie Mainoo is close to signing a new long-term deal. Starboy staying put.",
        punditry: "Tier 1 sources: 'It's done. Just waiting for the announcement video.' 🎬"
    },

    // --- JAN 30 EDITION (Generic/Mock History) ---
    { 
        id: 'jan30_1', created_utc: 1769846400, date: '2026-01-30',
        title: 'Stadium Expansion Update', ups: 5100, 
        permalink: '/r/reddevils/top/?t=month', 
        summary: "New renders of the Old Trafford expansion have leaked. Looks like they are keeping the brickwork but modernizing the roof.",
        punditry: "Local fans: 'As long as the leaky roof goes, we are happy.' ☔"
    },
    { 
        id: 'jan30_2', created_utc: 1769850000, date: '2026-01-30',
        title: 'Academy Win vs Liverpool', ups: 3700, 
        permalink: '/r/reddevils/top/?t=month', 
        summary: "U18s smashed Liverpool 4-0. The future is bright. Hat-trick from the new signing.",
        punditry: "Academy watchers: 'This batch is special. Class of 26?' 🎓"
    },

    // --- JAN 29 EDITION (Generic/Mock History) ---
    { 
        id: 'jan29_1', created_utc: 1769760000, date: '2026-01-29',
        title: 'Transfer Deadline Looming', ups: 3800, 
        permalink: '/r/reddevils/top/?t=month', 
        summary: "Last few days of the window. Rumors of a loan move for a backup striker. Things are heating up.",
        punditry: "Transfer thread: 'Don't go to sleep. Woodward is cooking (jk).' 🍳"
    }
];

// --- GENERATOR LOGIC ---

function getBadge(post) {
    if (post.ups > 5000) return { text: 'WTF 🤯', class: 'shock' };
    if (post.title.includes('Bruno')) return { text: 'RETRO 📼', class: 'retro' };
    return { text: 'VIRAL 🔥', class: '' };
}

function generateBrainrotText(post) {
    const phrases = [
        "No cap. The timeline is healing. Fr fr. 😤",
        "We are so back. 📈",
        "Pure cinema. 🎥🍿",
        "Inject it into my veins. 💉🔴",
        "My manager. 🫡",
        "Cooking. 🔥👨‍🍳",
        "Absolute scenes. 📸"
    ];
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    // Return summary + brainrot
    return `${post.summary} <br><br> <span class="brainrot">${randomPhrase}</span>`;
}

// Helper to get path components from "YYYY-MM-DD"
const getDatePath = (dateStr) => {
    const [y, m, d] = dateStr.split('-');
    return { y, m, d, fullPath: path.join(y, m, d) };
};

const getLinkToDate = (targetDateStr) => {
    const { y, m, d } = getDatePath(targetDateStr);
    return `../../../${y}/${m}/${d}/`;
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
        
        /* BRAINROT VISUALS ACTIVATED */
        body { 
            font-family: 'Montserrat', sans-serif; 
            background-color: #050505; 
            color: #fff; 
            margin: 0; 
            padding: 0; 
            overflow-x: hidden;
            background-image: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
            background-size: 100% 2px, 3px 100%;
        }

        /* Glitchy Header */
        header { 
            background: linear-gradient(45deg, #ff0000, #990000); 
            padding: 1.5rem; 
            text-align: center; 
            border-bottom: 5px solid #fff; 
            position: sticky; 
            top: 0; 
            z-index: 100; 
            box-shadow: 0 0 30px rgba(255, 0, 0, 0.8);
            animation: headerPulse 3s infinite;
        }

        @keyframes headerPulse {
            0% { box-shadow: 0 0 30px rgba(255, 0, 0, 0.8); }
            50% { box-shadow: 0 0 50px rgba(255, 0, 0, 1), 0 0 20px #ff00de; }
            100% { box-shadow: 0 0 30px rgba(255, 0, 0, 0.8); }
        }

        h1 { 
            font-size: 3.5rem; 
            text-transform: uppercase; 
            font-style: italic; 
            font-weight: 900;
            margin: 0; 
            text-shadow: 4px 4px 0px #000; 
            letter-spacing: -3px;
            transform: skew(-5deg);
        }

        .subtitle { 
            font-size: 1.2rem; 
            background: #fff; 
            color: #000; 
            display: inline-block; 
            padding: 5px 15px; 
            font-weight: 900; 
            transform: skew(-10deg) rotate(-2deg); 
            margin-top: 5px;
            box-shadow: 5px 5px 0 #000;
        }

        /* Ticker */
        .ticker-wrap {
            width: 100%;
            background-color: #ffe600;
            color: #000;
            overflow: hidden;
            white-space: nowrap;
            border-bottom: 3px solid #000;
            font-weight: 900;
            font-style: italic;
            font-size: 1.2rem;
            padding: 5px 0;
        }
        .ticker {
            display: inline-block;
            animation: ticker 15s linear infinite;
        }
        @keyframes ticker {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
        }

        /* Nav */
        .nav-bar { display: flex; justify-content: space-between; padding: 1rem; background: #000; font-weight: 900; text-transform: uppercase; border-bottom: 2px solid #333; }
        .nav-bar a { color: #fff; text-decoration: none; padding: 0.5rem 1rem; border: 2px solid #333; border-radius: 0; transition: 0.1s; transform: skew(-10deg); }
        .nav-bar a:hover { background: #fff; color: #000; box-shadow: 0 0 10px #fff; }
        .nav-bar span { color: #444; padding: 0.5rem 1rem; transform: skew(-10deg); }

        .container { max-width: 650px; margin: 2rem auto; padding: 1rem; }

        /* Cards */
        .card { 
            background: #111; 
            border: 3px solid #333; 
            margin-bottom: 3rem; 
            position: relative; 
            box-shadow: 10px 10px 0px #000;
            transition: 0.1s;
        }

        .card:hover { 
            transform: translate(-5px, -5px); 
            box-shadow: 15px 15px 0px #ff00de; 
            border-color: #fff;
        }

        .card-content { padding: 2rem; }

        .badge { 
            background: #ff00de; 
            color: #fff; 
            padding: 8px 15px; 
            font-size: 1rem; 
            font-weight: 900; 
            text-transform: uppercase; 
            position: absolute; 
            top: -15px; 
            right: -10px; 
            transform: rotate(5deg);
            border: 2px solid #fff;
            box-shadow: 5px 5px 0 #000;
        }
        .badge.shock { background: #ffe600; color: #000; }
        .badge.retro { background: #00ffff; color: #000; }

        h2 { 
            font-size: 2.5rem; 
            line-height: 0.9; 
            margin: 0 0 15px 0; 
            text-transform: uppercase; 
            font-weight: 900; 
            font-style: italic; 
            color: #fff;
            text-shadow: 2px 2px 0 #ff0000;
        }

        p { font-size: 1.1rem; color: #ccc; margin-bottom: 1.5rem; font-weight: 500; line-height: 1.6; border-left: 3px solid #333; padding-left: 1rem; }
        
        .brainrot {
            color: #ff00de;
            font-weight: 900;
            font-style: italic;
            text-transform: uppercase;
            font-size: 1.2rem;
            display: block;
            margin-top: 10px;
        }

        .pundit-box {
            background-color: #222;
            border-left: 3px solid #ff00de;
            padding: 10px;
            margin-bottom: 15px;
            font-style: italic;
            color: #ccc;
            font-size: 0.95rem;
        }

        .source-link { 
            display: inline-block; 
            margin-top: 10px;
            color: #666; 
            text-decoration: none; 
            font-size: 0.9rem; 
            text-transform: uppercase; 
            font-weight: bold; 
            transition: 0.2s;
        }
        .source-link:hover { color: #fff; text-decoration: underline; }

        .footer { text-align: center; padding: 3rem; font-size: 1rem; opacity: 0.8; border-top: 5px dashed #333; margin-top: 4rem; font-weight: bold; text-transform: uppercase; }
    </style>
</head>
<body>

<header>
    <h1>RED DEVILS FR FR 🔴</h1>
    <span class="subtitle">EDITION: ${date}</span>
</header>

<div class="ticker-wrap">
    <div class="ticker">
        🚨 BREAKING: CARRICK BALL IS HERE 🛑 THE NEW FERGIE? 👀 UNBEATEN RUN CONTINUES 🛑 GGMU 🛑 TOP 4 CHARGE IS ON 🛑 TRUST THE PROCESS 🛑
    </div>
</div>

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

// --- MAIN EXECUTION ---

const datesToGenerate = ['2026-01-29', '2026-01-30', '2026-01-31', '2026-02-01'];

datesToGenerate.forEach((date, index) => {
    // 1. Filter Posts for Date (Mock Logic)
    const posts = MOCK_REDDIT_DATA.filter(p => p.date === date);

    if (posts.length === 0) return;

    // 2. Build HTML Content
    const cardsHtml = posts.map(post => {
        const badge = getBadge(post);
        const brainrotText = generateBrainrotText(post);
        // Include Punditry if available
        const punditHtml = post.punditry ? 
            `<div class="pundit-box">🗣️ ${post.punditry}</div>` : '';

        return `
            <div class="card">
                <span class="badge ${badge.class}">${badge.text}</span>
                <div class="card-content">
                    <h2>${post.title}</h2>
                    <p>${brainrotText}</p>
                    ${punditHtml}
                    <a href="https://reddit.com${post.permalink}" target="_blank" class="source-link">[View on Reddit]</a>
                </div>
            </div>
        `;
    }).join('');

    // 3. Determine Navigation
    const prevDate = index > 0 ? datesToGenerate[index - 1] : null;
    const nextDate = index < datesToGenerate.length - 1 ? datesToGenerate[index + 1] : null;

    // 4. Generate Page
    const html = template(date, cardsHtml, prevDate, nextDate);
    
    const { fullPath } = getDatePath(date);
    const targetDir = path.join(PROJECT_DIR, fullPath);
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
    
    fs.writeFileSync(path.join(targetDir, 'index.html'), html);
    console.log(`[GENERATED] ${fullPath}/index.html`);
});

// 5. Update Archive
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
        ${datesToGenerate.slice().reverse().map(date => {
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
fs.writeFileSync(path.join(PROJECT_DIR, 'index.html'), archiveHtml);
console.log(`[ARCHIVE] Updated index.html`);
