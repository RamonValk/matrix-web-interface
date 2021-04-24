const express = require("express");
const path = require("path");
const shell = require("shelljs");

const app = express();

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});
app.post("/", (req, res) => {
  res.render("index", { title: "Home" });
  console.dir(req.body);
  shell.ls();
  console.dir(shell.pwd());
  console.dir(
    shell.exec(
      "sudo ./bash/utils/led-image-viewer ./bash/utils/testmedia/aoe.gif --led-cols=64 --led-rows=64"
    )
  );
});
app.listen(3000, () => console.log("Listening on port 3000"));
