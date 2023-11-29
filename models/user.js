const mongoose = require("mongoose");


// Schema for the user collection

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 15
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 30
  },
  email: {
    type: String,
    required: true,
    index: { // Index only gets created automatically for a new collection
      unique: true,
      collation: { locale: "en", strength: 2 } // case in-sensitive index
    },
    match: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
  },
  password: {
    type: String,
    required: true
  },
  address: {
    number: { type: String },
    street: { type: String },
    city: { type: String },
    zip: { type: String }
  },
  phoneNumbers: [{
    location: {
      type: String,
      required: true,
      enum: ["home", "work", "cell", "other"]
    },
    number: {
      type: String,
      required: true,
      match: /^[2-9]\d{2}-\d{3}-\d{4}$/
    }
  }],
  nickName: {
    type: [String]
  },
  created: {
    type: Date,
    required: true,
    default: Date.now()
  },
  enabled: {
    type: Boolean,
    required: true,
    default: true
  }
})


module.exports = mongoose.model("User", userSchema);