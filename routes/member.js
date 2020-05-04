const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const {
  createMember,
  getAllMembers,
  getOneMember,
  getUserById,
  pro_photo,
  about_p,
  h1_photo,
  h2_photo,
  h3_photo,
} = require("../controller/member");

router.param("userId", getUserById);

router.post(
  "/member/registration",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("Name Should be atleast 3 characters."),
    check("roll").isEmail().withMessage("Roll is Required"),
    check("state")
      .isLength({ min: 3 })
      .withMessage("State Should be atleast 3 characters."),
  ],
  createMember
);

router.get("/product/pro_photo/:userId", pro_photo);
router.get("/product/about_p/:userId", about_p);
router.get("/product/h1_photo/:userId", h1_photo);
router.get("/product/h2_photo/:userId", h2_photo);
router.get("/product/h3_photo/:userId", h3_photo);

router.get("/members", getAllMembers);
router.get("/members/:userId", getOneMember);

router.get("/check", (req, res) => {
  res.send("<h1> Testing 100</h1>");
});

module.exports = router;
