# RED DEVILS NEWSLETTER PROTOCOL 🔴📉

## 1. Schedule & Scope
*   **Frequency:** Daily at **09:00 GMT**.
*   **Coverage Window:** 09:00 GMT (Previous Day) to 09:00 GMT (Current Day).
*   **Target Audience:** Zoomers, "Brainrot" enthusiasts.
*   **Tone:** "No Cap", "Fr Fr", "Cooked", "Goated", High Energy, Emoji-heavy.

## 2. Content Guidelines
*   **Strict Time Window:**
    *   Posts must be created (`created_utc`) strictly within the 24h coverage window.
    *   **NO TIME TRAVEL:** Future posts cannot appear in past editions.
    *   **Comments:** User comments/punditry must also be from within the window.
*   **Relevance Check:**
    *   Ensure Manager references are current (e.g., Carrick/Amorim).
    *   Ignore "Zombie" news (e.g., Ten Hag era references unless historical context).
*   **Deduplication:** Track `reddit_id` in `history.json`. Never feature the same post twice.

## 3. Punditry & Commentary
*   **Source:** Extract top comments/analysis from the Reddit thread.
*   **Style:** Convert valid analysis into "Brainrot Punditry" (e.g., "Top comment said x" -> "Streets are saying x").

## 4. Technical Architecture
*   **Root:** `~/local/projects/red-devils/`
*   **Structure:** Date-based folders (`YYYY/MM/DD/index.html`) for clean URLs.
*   **Archive:** Root `index.html` links to all editions.
*   **Generation:** Node.js script `daily_job.js`.

## 5. Maintenance
*   **Cron Job:** Fires `node daily_job.js` daily.
*   **Manual Override:** Run `node daily_job.js --date=YYYY-MM-DD` to regenerate a specific day.
