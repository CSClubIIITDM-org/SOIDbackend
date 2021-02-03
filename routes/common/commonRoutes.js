const router = require("express").Router();
const About = require("../../models/About");
const Contact = require("../../models/Contact");
const Facility = require("../../models/Facility");
const Member = require("../../models/Members");
const Cultural = require("../../models/Motivation");
const Publication = require("../../models/Publication");
const Research = require("../../models/Research");
const Carousal = require("../../models/Carousal");

//ABOUT

router.get("/about", async (req, res) => {
  try {
    const about = await About.find().exec();
    res.status(200).send({ status: "200", message: about });
  } catch (error) {
    res.status(200).send({ status: "400", message: error });
  }
});

//RESEARCH

router.get("/research", async (req, res) => {
  try {
    const research = await Research.find().exec();
    res.status(200).send({ status: "200", message: research });
  } catch (error) {
    res.status(200).send({ status: "400", message: error });
  }
});

//PUBLICATION

router.get("/publication", async (req, res) => {
  try {
    const publication = await Publication.find().exec();
    res.status(200).send({ status: "200", message: publication });
  } catch (error) {
    res.status(200).send({ status: "400", message: error });
  }
});

//FACILITY

router.get("/facility", async (req, res) => {
  try {
    const facility = await Facility.find({});
    res.status(200).send({ status: "200", message: facility });
  } catch (error) {
    res.status(200).send({ status: "400", message: error });
  }
});

router.get("/facility/:id", async (req, res) => {
  try {
    const result = await Facility.findById(req.params.id);
    res.set("Content-Type", "image/jpeg");
    res.status(200).send(result.image);
  } catch (error) {
    res.status(200).send({ status: "400", message: error });
  }
});

//MEMBER

router.get("/member", async (req, res) => {
  try {
    const member = await Member.find({});
    res.status(200).send({ status: "200", message: member });
  } catch (error) {
    res.status(200).send({ status: "400", message: error });
  }
});

router.get("/member/:id", async (req, res) => {
  try {
    const result = await Member.findById(req.params.id);
    res.set("Content-Type", "image/jpeg");
    res.status(200).send(result.image);
  } catch (error) {
    res.status(200).send({ status: "400", message: error });
  }
});

//CULTURAL ACTIVITY

router.get("/cultural", async (req, res) => {
  try {
    const cultural = await Cultural.find({});
    res.status(200).send({ status: "200", message: cultural });
  } catch (error) {
    res.status(200).send({ status: "400", message: error });
  }
});

router.get("/cultural/:id", async (req, res) => {
  try {
    const result = await Cultural.findById(req.params.id);
    res.set("Content-Type", "image/jpeg");
    res.status(200).send(result.image);
  } catch (error) {
    res.status(200).send({ status: "400", message: error });
  }
});

//CAROUSAL IMAGE

router.get("/carousal", async (req, res) => {
  try {
    const carousal = await Carousal.find().exec();
    res.status(200).send({ status: "200", message: carousal });
  } catch (error) {
    res.status(200).send({ status: "400", message: error });
  }
});

router.get("/carousal/:id", async (req, res) => {
  try {
    const result = await Carousal.findById(req.params.id);
    res.set("Content-Type", "image/jpeg");
    res.status(200).send(result.image);
  } catch (error) {
    res.status(200).send({ status: "400", message: error });
  }
});

//CONTACT

router.get("/contact", async (req, res) => {
  try {
    const contact = await Contact.find().exec();
    res.status(200).send({ status: "200", message: contact });
  } catch (error) {
    res.status(200).send({ status: "400", message: error });
  }
});

module.exports = router;
