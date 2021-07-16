const express = require("express");
const path = require("path");
// const shell = require("shelljs");
const child_process = require("child_process");
const app = express();

let currentView;
let currentViewPID;

const execView = (location) => {
  if (currentViewPID) {
    console.log(`CurrentViewPID exists: ${currentViewPID}\nRemoving...`);
    process.kill(-currentViewPID);
  }
  currentView = child_process.spawn(
    "sudo",
    [
      "./bash/utils/led-image-viewer",
      `./bash/utils/testmedia/${location}`,
      "--led-cols=64",
      "--led-rows=64",
    ],
    { detached: true }
  );
  currentViewPID = currentView.pid;
  console.log("CurrentViewPID after execute: ", currentViewPID);
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
