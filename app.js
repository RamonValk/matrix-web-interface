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
  console.dir(shell.pwd());

  let currentView;

  const execView = (location) => {
    if (currentView) {
      currentView.kill();
    }
    currentView = shell.exec(
      `sudo ./bash/utils/led-image-viewer ./bash/utils/testmedia/${location} --led-cols=64 --led-rows=64`
    );
  };
  switch (req.body.mediaType) {
    case "aoe":
      execView("geek/aoe.gif");
      break;
    case "nyancat":
      execView("geek/nyancat.gif");
      break;
    case "bb8":
      execView("geek/bb8.gif");
      break;
    default:
      console.dir("No such mediaType");
  }
});
app.listen(3000, () => console.log("Listening on port 3000"));
