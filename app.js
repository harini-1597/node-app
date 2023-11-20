require("dotenv").config();
const express = require("express")
const app = express();
const PORT = process.env.PORT || 7777;
const products_route = require("./routes/products")
const connectDB = require("./db/connect")
const oas = require("./openai.json");
const manifest = require('./.well-known/ai-plugin.json');
app.get("/", (req, res) => {
    res.send("This is live");
});

app.get("/openai.json", (req, res) => {
    res.json(oas);
});

app.get("/.well-known/ai-plugin.json", (req, res) => {
    res.json(manifest);
});

app.use("/api/products", products_route);

const start = async () => {
    try{
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () => {
            console.log(`${PORT} Connected`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();