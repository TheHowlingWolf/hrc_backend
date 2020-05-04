const member = require("../models/Member");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.createMember = (req, res) => {
  let form = new formidable.IncomingForm();
  console.log("hi");
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Cannot Create Product",
      });
    }
    console.log(form);
    //destructing the fields
    const {
      name,
      roll,
      state,
      about,
      hob1,
      hob2,
      hob3,
      fun_mem,
      emb_mem,
    } = fields;
    if (!name || !roll || !state || !about || !hob1 || !hob2 || !hob3) {
      return res.status(400).json({
        error: "Please Include all fields",
      });
    }

    //Creating Members
    let Member = new member(fields);
    //Handling photos
    if (file.pro_photo) {
      if (file.pro_photo.size > 3145728) {
        //1048576 = 1*1024*1024 i.e 1mb limit
        return res.status(413).json({
          error: "File size too big",
        });
      }

      Member.pro_photo.data = fs.readFileSync(file.pro_photo.path);
      Member.pro_photo.contentType = file.pro_photo.type;
    }

    if (file.about_p) {
      Member.about_p.data = fs.readFileSync(file.about_p.path);
      Member.about_p.contentType = file.about_p.type;
    }

    if (file.about_p) {
      Member.about_p.data = fs.readFileSync(file.about_p.path);
      Member.about_p.contentType = file.about_p.type;
    }

    if (file.h1_photo) {
      Member.h1_photo.data = fs.readFileSync(file.h1_photo.path);
      Member.h1_photo.contentType = file.h1_photo.type;
    }

    if (file.h2_photo) {
      Member.h2_photo.data = fs.readFileSync(file.h2_photo.path);
      Member.h2_photo.contentType = file.h1_photo.type;
    }

    if (file.h3_photo) {
      Member.h3_photo.data = fs.readFileSync(file.h3_photo.path);
      Member.h3_photo.contentType = file.h3_photo.type;
    }

    //Save to db
    Member.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Saving Member in Db failed",
        });
      }
      res.json(product);
    });
  });
};

exports.getAllMembers = async (req, res) => {
  console.log("h1");
  await member
    .find()
    .select("name _id") //to get specific fields we can list all names or use - (minus prefix) with names to rule out that field since calls to photos is time consuming hence ruling it out
    .sort([["roll", "asc"]]) //Sort by filter will be set from frontend by which Member will be sort
    .limit(10)
    .exec((err, Members) => {
      if (err) {
        return res.status(400).json({
          error: "Can't fetch all Members",
        });
      }
      console.log(Members);
      res.json(Members);
    });
};

exports.pro_photo = (req, res, next) => {
  if (req.profile.pro_photo.data) {
    res.set("Content-Type", req.profile.pro_photo.contentType);
    console.log(req.profile.pro_photo.data);
    return res.send(req.profile.pro_photo.data);
  } //Sending back the pictures

  next();
};

exports.about_p = (req, res, next) => {
  if (req.profile.about_p.data) {
    res.set("Content-Type", req.profile.about_p.contentType);
    console.log(req.profile.about_p.contentType);
    return res.send(req.profile.about_p.data);
  } //Sending back the pictures
  next();
};

exports.h1_photo = (req, res, next) => {
  if (req.profile.h1_photo.data) {
    res.set("Content-Type", req.profile.h1_photo.contentType);
    return res.send(req.profile.h1_photo.data);
  } //Sending back the pictures
  next();
};

exports.h2_photo = (req, res, next) => {
  if (req.profile.h2_photo.data) {
    res.set("Content-Type", req.profile.h2_photo.contentType);
    return res.send(req.profile.h2_photo.data);
  } //Sending back the pictures
  next();
};

exports.h3_photo = (req, res, next) => {
  if (req.profile.h3_photo.data) {
    res.set("Content-Type", req.profile.h3_photo.contentType);
    return res.send(req.profile.h3_photo.data);
  } //Sending back the pictures
  next();
};

exports.getUserById = (req, res, next, id) => {
  member.findById(id).exec((err, Member) => {
    //always db return 2 things err or user
    if (err || !Member) {
      return res.status(400).json({
        error: "No user was found in DB",
      });
    }

    req.profile = Member; //storing the user object in a object name profile
    next();
  });
};

exports.getOneMember = (req, res) => {
  req.profile.pro_photo = undefined;
  req.profile.about_p = undefined;
  req.profile.h1_photo = undefined;
  req.profile.h2_photo = undefined;
  req.profile.h3_photo = undefined;
  console.log(req.profile);
  //can have middleware such that the photo can be loaded in the background whenever called from frontend
  return res.json(req.profile);
};
