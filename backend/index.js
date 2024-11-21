const express = require("express");
const mongoose = require("mongoose");
const shortid = require("shortid");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config({});

// Middleware
app.use(express.json());

// app.use(cors());
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
    })
);
app.options("*", cors());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// URL Schema
const urlSchema = new mongoose.Schema({
    longUrl: { type: String, required: true },
    shortId: { type: String, required: true, unique: true },
    clicks: { type: String },
});

//URL model
const Url = mongoose.model("Url", urlSchema);

// API Routes
app.post("/api/shorten", async (req, res) => {
    const { longUrl } = req.body;
    if (!longUrl)
        return res.status(400).json({ error: "Long URL is required" });
    const shortId = shortid.generate();
    const shortUrl = `${process.env.BACKEND_URL}/${shortId}`;
    try {
        const newUrl = new Url({ longUrl, shortId });
        await newUrl.save();
        res.json({ longUrl, shortUrl });
    } catch (error) {
        console.error("Error saving URL:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/", (req, res) => {
    res.send("Hello there");
});

// redirects to original url
app.get("/:shortId", async (req, res) => {
    const { shortId } = req.params;
    try {
        const urlEntry = await Url.findOne({ shortId });
        urlEntry.clicks = urlEntry.clicks + 1;
        await urlEntry.save();

        if (!urlEntry) return res.status(404).json({ error: "URL not found" });

        res.redirect(urlEntry.longUrl);
    } catch (error) {
        console.error("Error redirecting:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const PORT = process.env.PORT;
app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);
