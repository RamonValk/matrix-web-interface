const express = require("express");
const path = require("path");
const shell = require("shelljs");
const app = express();

let currentView;
let currentViewPID;

const execView = (location) => {
  console.log("CurrentViewPID before execute: ", currentViewPID);
  if (currentViewPID) {
    console.log("CurrentViewPID exists: ", currentViewPID);
    // const execKill = shell.exec(`kill -9 ${currentViewPID}`);
    const execKill = shell.exit(currentViewPID);
    console.log("execKill output: ");
    console.dir(execKill);
  }
  currentView = shell.exec(
    `sudo ./bash/utils/led-image-viewer ./bash/utils/testmedia/${location} --led-cols=64 --led-rows=64`,
    { async: true }
  );
  currentViewPID = currentView.pid;
  console.log("CurrentViewPID after execute: ", currentView);
};

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});
app.post("/", (req, res) => {
  res.render("index", { title: "Home" });
  console.dir(req.body);

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
