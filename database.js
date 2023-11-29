const mongoose = require("mongoose");

// STEP 1 - ESTABLISH THE CONNECTION

mongoose.connect(process.env['DATABASE'], { })
  .then(() => console.log("Connected!"))
  .catch(err => console.log(err));