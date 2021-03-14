const express = require("express");
const { join } = require("path");
const config = require("./config.json");
const srs = require("secure-random-string");
const mongoose = require("mongoose");

mongoose.connect(config.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let rdbs = mongoose.model("redirects", new mongoose.Schema({
    id: { type: String },
    url: { type: String },
}));

let app = express();


app.get("/", async(req, res) => {
    res.sendFile(join(__dirname, "./views/index.html"));
});
app.post("/short", async(req, res) => {
    let domain = req.query.domain;
    let code = srs({length:8});
    let db = new rdbs({
        id: code,
        url: domain
    });
    db.save();
    return res.send(code);
});
app.get("/:code", async(req, res) => {
    let db = await rdbs.findOne({id: req.params.code});
    if(!db) return res.redirect("/")
    return res.redirect(db.url);
})




app.listen(config.port);