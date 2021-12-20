const figlet = require("figlet");
const chalkAnimation = require('chalk-animation');
const headerText = "Courier Service CLI";
const asciiArt = figlet.textSync(headerText, {
  horizontalLayout: "full",
  verticalLayout: "default",
});
const rainbow = chalkAnimation.karaoke(asciiArt,3);
rainbow.start()

