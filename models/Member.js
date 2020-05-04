const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    roll: {
      type: Number,
      maxlength: 7,
      required: true,
      unique: true,
    },
    state: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    pro_photo: {
      data: Buffer,
      contentType: String,
    },
    about_p: {
      data: Buffer,
      contentType: String,
    },
    about: {
      type: String,
      required: true,
      trim: true,
    },
    h1_photo: {
      data: Buffer,
      contentType: String,
    },
    hob1: {
      type: String,
      required: true,
      trim: true,
    },
    h2_photo: {
      data: Buffer,
      contentType: String,
    },
    hob2: {
      type: String,
      required: true,
      trim: true,
    },
    h3_photo: {
      data: Buffer,
      contentType: String,
    },
    hob3: {
      type: String,
      required: true,
      trim: true,
    },
    fun_mem: {
      type: String,
      trim: true,
    },
    emb_mem: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Member", memberSchema);
