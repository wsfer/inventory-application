const express = require("express");
const app = express();
const indexRouter = require("./routes/indexRouter");
const gameRouter = require("./routes/gameRouter");
const genreRouter = require("./routes/genreRouter");

const PORT = process.env.port || 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/games", gameRouter);
app.use("/genre", genreRouter);
app.use("/", indexRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
