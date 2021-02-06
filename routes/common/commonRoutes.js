const router = require("express").Router();
const About = require("../../models/About");
const Contact = require("../../models/Contact");
const Facility = require("../../models/Facility");
const Member = require("../../models/Members");
const Motivation = require("../../models/Motivation");
const NewsAndEvents = require("../../models/NewsAndEvents");
const Objectives = require("../../models/Objectives");
const Publication = require("../../models/Publication");
const Research = require("../../models/Research");


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

//Objectives

router.get("/objective", async (req, res) => {
  try {
    const objective = await Objectives.find().exec();
    res.status(200).send({ status: "200", message: objective });
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

//MOTIVATION

router.get("/motivation", async (req, res) => {
  try {
    const motivation = await Motivation.find({});
    res.status(200).send({ status: "200", message: motivation });
  } catch (error) {
    res.status(200).send({ status: "400", message: error });
  }
});

//News And Events

router.get("/newsandevents", async (req, res) => {
  try {
    const news = await NewsAndEvents.find({});
    res.status(200).send({ status: "200", message: news });
  } catch (error) {
    res.status(200).send({ status: "400", message: error });
  }
});

router.get("/newsandevents/:id", async (req, res) => {
  try {
    const result = await NewsAndEvents.findById(req.params.id);
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
