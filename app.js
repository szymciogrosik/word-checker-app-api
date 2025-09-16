const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const dbPath = path.resolve(__dirname, "words.db");
const db = new sqlite3.Database(dbPath);

app.get("/exact", (req, res) => {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: "Missing query parameter q" });

    db.get("SELECT word FROM words WHERE word = ?", [q], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ found: !!row, word: row ? row.word : null });
    });
});

app.get("/pattern", (req, res) => {
    const { pattern } = req.query;
    if (!pattern) return res.status(400).json({ error: "Missing query parameter pattern" });

    db.all("SELECT word FROM words WHERE word GLOB ?", [pattern], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ matches: rows.map(r => r.word) });
    });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
