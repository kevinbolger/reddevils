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

// --- MOCK DATA (The Big Mix) ---
const MOCK_REDDIT_DATA = [
    // --- FEB 01 EDITION (The Big Mix: News + Sentiment + Chatter) ---
    // 1. The Main Sentiment (Meta)
    { 
        id: 'sentiment_contract', date: '2026-02-01',
        type: 'sentiment',
        title: 'GIVE HIM THE CONTRACT 📝', 
        image_url: 'https://preview.redd.it/ahmq77n7pwgg1.jpeg?width=960&crop=smart&auto=webp&s=123c33959b1d89400b592d578d1878f9d7310e9f',
        summary: "The timeline is unanimous. After 3 wins in 3 games, the 'Interim' label feels disrespectful. The players are playing for him. The fans are singing for him.",
        punditry: "THE CONSENSUS 🤝: 'Stop the search. We found him. It was right under our nose.'",
        links: [{ text: "The Petition Thread", url: "https://reddit.com/r/reddevils/comments/1qt2bqn/" }]
    },
    // 2. The Hard News (Stat)
    { 
        id: 'news_carrick_record', date: '2026-02-01',
        type: 'news',
        title: 'CARRICK EQUALS AMORIM 📊', 
        summary: "Stat of the day: Michael Carrick has equalled Ruben Amorim's *entire* Manchester United winning record (3 games) in just one week. Amorim needed 47 games.",
        punditry: "REALITY CHECK 💀: 'That stat is actually depressing but also hilarious. We are healing.'",
        links: [{ text: "See the numbers", url: "https://reddit.com/r/reddevils/comments/1qt2bqn/" }]
    },
    // 3. The Vibe (Atmosphere)
    { 
        id: 'vibe_stretford', date: '2026-02-01',
        type: 'vibe',
        title: 'THE STRETFORD END IS HEALING ❤️‍🩹', 
        video_src: 'https://v.redd.it/bgkxixynuwgg1/CMAF_720.mp4?source=fallback',
        summary: "Listen to that roar. The toxicity is gone. Old Trafford sounded like a fortress again today. When Casemiro went off, the standing ovation was deafening.",
        punditry: "FEELS 🥺: 'I haven't heard it this loud since Fergie left. Nature is healing.'",
        links: [{ text: "Watch the ovation", url: "https://reddit.com/r/reddevils/comments/1qt52h6/" }]
    },
    // 4. The Highlight (Sesko)
    { 
        id: 'news_sesko', date: '2026-02-01',
        type: 'news',
        title: 'AIR ŠEŠKO CLEARED FOR TAKEOFF ✈️', 
        image_url: 'https://preview.redd.it/wlxfluxsswgg1.jpeg?width=960&crop=smart&auto=webp&s=ec3b789a9e1f9568fe958e1edf11fb4a27413d83',
        summary: "Benjamin Sesko posted 'Fergie Time' on Instagram. He's scored 4 in his last 3. We finally have a target man who bullies defenders.",
        punditry: "ON GOD ✝️: 'Cross and Inshallah actually works when you have a 6'5 striker.'",
        links: [{ text: "Check the post", url: "https://reddit.com/r/reddevils/comments/1qt2vf3/" }]
    },
    // 5. The Chatter (Casemiro)
    { 
        id: 'chatter_casemiro', date: '2026-02-01',
        type: 'chatter',
        title: 'APOLOGY FORMS: CASEMIRO 📝', 
        summary: "The entire subreddit is filling out apology forms for Casemiro. From 'finished' to 'essential' in 3 games under Carrick.",
        punditry: "TOP COMMENT: 'I owe you an apology. I wasn't familiar with your game (again).' 🙇‍♂️",
        links: [{ text: "Apology Thread", url: "#" }]
    },
    // 6. The Player Stat (Bruno)
    { 
        id: 'news_bruno', date: '2026-02-01',
        type: 'news',
        title: 'BRUNO: 12 ASSISTS 🪄', 
        image_url: 'https://preview.redd.it/yq6iwb2uswgg1.png?width=960&crop=smart&auto=webp&s=7e4d5aa94acfe4eb3ff6a6a5b7ae38306f13730b',
        summary: "Bruno has equalled his best-ever PL assist tally. Playing deeper in the 4-3-3 has unlocked his passing range.",
        punditry: "ANALYSIS 🧠: 'He's not running around like a headless chicken anymore. He's controlling the game.'",
        links: [{ text: "View stats", url: "https://reddit.com/r/reddevils/comments/1qt2w12/" }]
    },

    // --- JAN 31 EDITION (Expanded) ---
    { 
        id: 'news_amad_training', date: '2026-01-31',
        type: 'news',
        title: 'AMAD IN TRAINING ⚡', 
        image_url: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        summary: "Clips from Carrington show Amad destroying defenders. His close control is frightening.",
        punditry: "EYE TEST 👁️: 'He looks sharper than Antony ever has. Start him.'",
        links: [{ text: "Watch clip", url: "#" }]
    },
    { 
        id: 'chatter_rw_debate', date: '2026-01-31',
        type: 'chatter',
        title: 'THE RW DEBATE IS OVER 🛑', 
        summary: "The timeline has decided. No more debates. Amad is the starter. Garnacho (LW) and Amad (RW) is the future.",
        punditry: "THE STREETS 🛣️: 'If I see Antony on the teamsheet, I'm turning the TV off.'",
        links: [{ text: "Discussion", url: "#" }]
    },
    { 
        id: 'news_mainoo', date: '2026-01-31',
        type: 'news',
        title: 'MAINOO CONTRACT 🔒', 
        image_url: 'https://images.unsplash.com/photo-1522778119026-d647f0565c6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        summary: "Breaking: Mainoo close to signing new 5-year deal. The project is safe.",
        punditry: "TIER 1 🥇: 'Done deal. Announcement soon.'",
        links: [{ text: "Read details", url: "#" }]
    },

    // --- JAN 30 EDITION (Expanded) ---
    { 
        id: 'news_stadium', date: '2026-01-30',
        type: 'news',
        title: 'OLD TRAFFORD 2.0 LEAKS 🏟️', 
        image_url: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        summary: "Renders leaked of the expansion. 90k capacity. Looks like a spaceship landed on the brickwork.",
        punditry: "FAN REACTION 😲: 'It's beautiful. Just don't name it the Snapdragon Arena please.'",
        links: [{ text: "See renders", url: "#" }]
    },
    { 
        id: 'chatter_glazers', date: '2026-01-30',
        type: 'chatter',
        title: 'GLAZERS OUT (STILL) 🔰', 
        summary: "Even with the stadium news, the fans aren't buying it. Green and Gold sentiment is still high in the comments.",
        punditry: "REAL TALK 💯: 'New roof doesn't fix the debt. We haven't forgotten.'",
        links: [{ text: "Protest Thread", url: "#" }]
    },
    { 
        id: 'news_academy', date: '2026-01-30',
        type: 'news',
        title: 'U18s BATTER LIVERPOOL 4-0 👶', 
        image_url: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        summary: "The kids are alright. Another hat-trick for the new signing. Unbeaten in 15.",
        punditry: "SCOUT WATCH 🕵️: 'The future is blindingly bright.'",
        links: [{ text: "Match Report", url: "#" }]
    },

    // --- JAN 29 EDITION (Expanded) ---
    { 
        id: 'news_transfer', date: '2026-01-29',
        type: 'news',
        title: 'DEADLINE DAY PANIC 🚨', 
        image_url: 'https://images.unsplash.com/photo-1508163223045-1880bc36e222?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        summary: "Rumors swirling about a backup striker loan. We are thin up top.",
        punditry: "ITK WATCH 👀: 'Plane from Germany just landed. Could be anyone.'",
        links: [{ text: "Live Thread", url: "#" }]
    },
    { 
        id: 'chatter_maguire', date: '2026-01-29',
        type: 'chatter',
        title: 'MAGUIRE ON INSTAGRAM 😂', 
        summary: "Harry Maguire bantering the youth players in the comments. The vibes are immaculate.",
        punditry: "VIBES ✅: 'He might not be the starter, but he is the captain of vibes.'",
        links: [{ text: "See comment", url: "#" }]
    }
];

// --- GENERATOR LOGIC ---

function getBadge(theme) {
    if (theme.type === 'sentiment' || theme.type === 'chatter') return { text: 'THE CHATTER 🗣️', class: 'retro' };
    if (theme.title.includes('CONTRACT')) return { text: 'OFFICIAL 📝', class: 'shock' };
    return { text: 'VIRAL 🔥', class: '' };
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

        .card-media {
            width: 100%;
            height: auto;
            display: block;
            border-bottom: 3px solid #333;
            filter: brightness(0.9);
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
            z-index: 10;
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
        
        .pundit-box {
            background-color: #222;
            border-left: 3px solid #ff00de;
            padding: 10px;
            margin-bottom: 15px;
            font-style: italic;
            color: #ccc;
            font-size: 0.95rem;
        }

        .links-container {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 15px;
        }

        .source-link { 
            display: inline-block; 
            color: #fff; 
            text-decoration: none; 
            font-size: 0.8rem; 
            text-transform: uppercase; 
            font-weight: bold; 
            transition: 0.2s;
            border: 1px solid #666;
            padding: 5px 10px;
            border-radius: 4px;
        }
        .source-link:hover { background: #fff; color: #000; border-color: #fff; }

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
    // 1. Filter Themes for Date
    const themes = MOCK_REDDIT_DATA.filter(p => p.date === date);

    if (themes.length === 0) return;

    // 2. Build HTML Content
    const cardsHtml = themes.map(theme => {
        const badge = getBadge(theme);
        
        // Media
        let mediaHtml = '';
        if (theme.video_src) {
            // Actual Video Embed
            mediaHtml = `
            <video controls autoplay muted loop class="card-media">
                <source src="${theme.video_src}" type="video/mp4">
                Your browser does not support the video tag.
            </video>`;
        } else if (theme.image_url) {
            mediaHtml = `<img src="${theme.image_url}" class="card-media" alt="${theme.title}">`;
        }

        // Links
        const linksHtml = theme.links.map(link => 
            `<a href="${link.url.startsWith('http') || link.url.startsWith('#') ? link.url : 'https://reddit.com' + link.url}" target="_blank" class="source-link">${link.text}</a>`
        ).join('');

        return `
            <div class="card">
                <span class="badge ${badge.class}">${badge.text}</span>
                ${mediaHtml}
                <div class="card-content">
                    <h2>${theme.title}</h2>
                    <p>${theme.summary}</p>
                    <div class="pundit-box">${theme.punditry}</div>
                    <div class="links-container">
                        ${linksHtml}
                    </div>
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

// 5. Update Archive (Same logic as before)
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
