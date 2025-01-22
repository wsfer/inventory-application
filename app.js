const express = require("express");
const app = express();
const PORT = process.env.port || 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => res.render("home"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
