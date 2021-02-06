const router = require("express").Router();
const About = require("../../models/About");
const Contact = require("../../models/Contact");
const Research = require("../../models/Research");
const Publication = require("../../models/Publication");
const { handleImageUpload } = require("../../middlewares/imgUpload");
const Facility = require("../../models/Facility");
const Member = require("../../models/Members");
const Motivation = require("../../models/Motivation");
const Cultural = require("../../models/CulturalActivity");
const Carousal = require("../../models/Carousal");
const verify = require("./verify");

// router.post("/about", async (req, res) => {
//   const newAbout = new About({
//     desc: req.body.desc,
//   });
//   try {
//     await newAbout.save();
//     res.status(200).send({ status: "200", message: "About Added" });
//   } catch (error) {
//     res.status(200).send({ status: "500", message: error });
//   }
// });

//EDIT ABOUT

router.put("/about", verify, async (req, res) => {
  try {
    const about = await About.findOne().exec();
    about.set(req.body);
    const result = await about.save();
    res.send({ status: "200", message: "About Edited Succesfully" });
  } catch (error) {
    res.status(200).send({ status: "500", message: "Internal Server error" });
  }
});

//RESEARCH APIS

//ADD RESEARCH

router.post("/research", verify, async (req, res) => {
  const researchExist = await Research.findOne({ title: req.body.title });

  if (researchExist) {
    res.status(200).send({
      status: "400",
      message: "Reserach Paper with same title already Exists",
    });
    return;
  }

  const newResearch = new Research(req.body);
  try {
    await newResearch.save();
    res.status(200).send({ status: "200", message: "Research Added" });
  } catch (error) {
    res.status(200).send({ status: "500", message: "Internal Server error" });
  }
});

//EDIT RESEARCH

router.put("/research/:id", verify, async (req, res) => {
  try {
    const research = await Research.findById(req.params.id).exec();
    research.set(req.body);
    const result = await research.save();
    res.send({ status: "200", message: "Edited Research Successfully" });
  } catch (error) {
    res.status(200).send({ status: "500", message: "Internal Server error" });
  }
});

//DELETE RESEARCH

router.delete("/research", verify, async (req, res) => {
  const { type } = req.user;
  if (type !== "admin") {
    res
      .status(200)
      .send({ status: "400", message: "Only Admin can access this" });

    return;
  }
  try {
    const research = await Research.deleteOne({ _id: req.body._id });
    res.status(200).send({ status: "200", message: "Deleted succesfully" });
  } catch (error) {
    res.status(200).send({ status: "500", message: "Internal Server error" });
  }
});

// router.post("/contact", async (req, res) => {
//   const newContact = new Contact({
//     info: req.body.info,
//     mail: req.body.mail,
//     number: req.body.number,
//   });
//   try {
//     await newContact.save();
//     res.status(200).send({ status: "200", message: "Contact Added" });
//   } catch (error) {
//     res.status(200).send({ status: "500", message: error });
//   }
// });

//EDIT CONTACT

router.put("/contact", verify, async (req, res) => {
  try {
    const contact = await Contact.findOne().exec();
    contact.set(req.body);
    const result = await contact.save();
    res.send({ status: "200", message: result });
  } catch (error) {
    res.status(200).send({ status: "500", message: "Internal Server error" });
  }
});

//PUBLICATION APIS

//ADD PUBLICATION

router.post("/publication", verify, async (req, res) => {
  const publicationExist = await Publication.findOne({ title: req.body.title });

  if (publicationExist) {
    res.status(200).send({
      status: "400",
      message: "Publication with same title already Exists",
    });
    return;
  }

  const newPublication = new Publication(req.body);

  try {
    await newPublication.save();
    res.status(200).send({ status: "200", message: "Publication Added" });
  } catch (error) {
    res.status(200).send({ status: "500", message: "Internal Server Error" });
  }
});

//EDIT PUBLICATION

router.put("/publication/:id", verify, async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id).exec();
    publication.set(req.body);
    const result = await publication.save();
    res.send({ status: "200", message: "Edited Publication Successfully" });
  } catch (error) {
    res.status(200).send({ status: "500", message: "Internal Server error" });
  }
});

//DELETE PUBLICATION

router.delete("/publication", verify, async (req, res) => {
  const { type } = req.user;
  if (type !== "admin") {
    res
      .status(200)
      .send({ status: "400", message: "Only Admin can access this" });

    return;
  }
  try {
    const publication = await Publication.deleteOne({ _id: req.body._id });
    res.status(200).send({ status: "200", message: "Deleted succesfully" });
  } catch (error) {
    res.status(200).send({ status: "500", message: "Internal Server error" });
  }
});

//FACILITY APIS

//ADD FACILITY

router.post("/facility", handleImageUpload, verify, async (req, res) => {
  const newFacility = new Facility({
    image: req.file.buffer,
    name: req.body.name,
    desc: req.body.desc,
  });

  try {
    await newFacility.save();
    res.status(200).send({ status: "200", message: "Facility Added" });
  } catch (error) {
    res.status(200).send({ status: "500", message: "Internal Server Error" });
  }
});

//UPDATE FACILITY

router.put("/facility/:id", handleImageUpload, verify, async (req, res) => {
  let updatedFacility = req.body;

  if (req.file) updatedFacility.image = req.file.buffer;
  try {
    await Facility.findByIdAndUpdate(req.params.id, updatedFacility);
    res.status(200).send({ status: "200", message: "Facility Edited" });
  } catch (error) {
    res.status(200).send({ status: "500", message: "Internal Server Error" });
  }
});

//DELETE FACILITY

router.delete("/facility", verify, async (req, res) => {
  const { type } = req.user;
  if (type !== "admin") {
    res
      .status(200)
      .send({ status: "400", message: "Only Admin can access this" });

    return;
  }
  try {
    const facility = await Facility.deleteOne({ _id: req.body._id });
    res.status(200).send({ status: "200", message: "Deleted succesfully" });
  } catch (error) {
    res.status(200).send({ status: "500", message: "Internal Server error" });
  }
});

//MEMBER APIS

//ADD MEMBER

router.post("/member", handleImageUpload, verify, async (req, res) => {
  const newMember = new Member({
    image: req.file.buffer,
    name: req.body.name,
    education: req.body.education,
    about: req.body.about,
    number: req.body.number,
    researchInterest: req.body.researchInterest,
    websiteLink: req.body.websiteLink,
    email: req.body.email,
    desc: req.body.desc,
  });

  try {
    await newMember.save();
    res.status(200).send({ status: "200", message: "Member Added" });
  } catch (error) {
    res.status(200).send({ status: "500", message: "Internal Server Error" });
  }
});

// UPDATE MEMBER

router.put("/member/:id", handleImageUpload, verify, async (req, res) => {
  let updatedMember = req.body;

  if (req.file) updatedMember.image = req.file.buffer;
  try {
    await Member.findByIdAndUpdate(req.params.id, updatedMember);
    res.status(200).send({ status: "200", message: "Member Edited" });
  } catch (error) {
    res.status(200).send({ status: "500", message: "Internal Server Error" });
  }
});

//DELETE MEMBER

router.delete("/member", verify, async (req, res) => {
  const { type } = req.user;
  if (type !== "admin") {
    res
      .status(200)
      .send({ status: "400", message: "Only Admin can access this" });

    return;
  }
  try {
    const member = await Member.deleteOne({ _id: req.body._id });
    res.status(200).send({ status: "200", message: "Deleted succesfully" });
  } catch (error) {
    res.status(200).send({ status: "500", message: "Internal Server error" });
  }
});

//ADD CULTURAL ACTIVITY

router.post("/cultural", handleImageUpload, verify, async (req, res) => {
  const newCultural = new Cultural({
    image: req.file.buffer,
    event: req.body.event,
    desc: req.body.desc,
    eventDate: req.body.eventDate,
  });

  try {
    await newCultural.save();
    res.status(200).send({ status: "200", message: "Cultural Activity Added" });
  } catch (error) {
    res.status(200).send({ status: "500", message: "Internal Server Error" });
  }
});

// UPDATE CULTURAL ACTIVITY

router.put("/cultural/:id", handleImageUpload, verify, async (req, res) => {
  let updatedCultural = req.body;

  if (req.file) updatedCultural.image = req.file.buffer;
  try {
    await Cultural.findByIdAndUpdate(req.params.id, updatedCultural);
    res
      .status(200)
      .send({ status: "200", message: "Cultural Activity Edited" });
  } catch (error) {
    res.status(200).send({ status: "500", message: "Internal Server Error" });
  }
});

//DELETE CULTURAL ACTIVITY

router.delete("/cultural", verify, async (req, res) => {
  const { type } = req.user;
  if (type !== "admin") {
    res
      .status(200)
      .send({ status: "400", message: "Only Admin can access this" });

    return;
  }
  try {
    const cultural = await Cultural.deleteOne({ _id: req.body._id });
    res.status(200).send({ status: "200", message: "Deleted succesfully" });
  } catch (error) {
    res.status(200).send({ status: "500", message: "Internal Server error" });
  }
});

//ADD CAROUSAL IMAGE

router.post("/carousal", handleImageUpload, verify, async (req, res) => {
  const newImage = new Carousal({
    image: req.file.buffer,
    desc: req.body.desc,
  });

  try {
    await newImage.save();
    res.status(200).send({ status: "200", message: "Carousal Image Added" });
  } catch (error) {
    res.status(200).send({ status: "500", message: "Internal Server Error" });
  }
});

// UPDATE CAROUSAL IMAGE

router.put("/carousal/:id", handleImageUpload, verify, async (req, res) => {
  let updatedImage = req.body;

  if (req.file) updatedImage.image = req.file.buffer;
  try {
    await Carousal.findByIdAndUpdate(req.params.id, updatedImage);
    res.status(200).send({ status: "200", message: "Carousal Image Edited" });
  } catch (error) {
    res.status(200).send({ status: "500", message: "Internal Server Error" });
  }
});

//DELETE CAROUSAL IMAGE

router.delete("/carousal", verify, async (req, res) => {
  const { type } = req.user;
  if (type !== "admin") {
    res
      .status(200)
      .send({ status: "400", message: "Only Admin can access this" });

    return;
  }
  try {
    const carousal = await Carousal.deleteOne({ _id: req.body._id });
    res.status(200).send({ status: "200", message: "Deleted succesfully" });
  } catch (error) {
    res.status(200).send({ status: "500", message: "Internal Server error" });
  }
});

module.exports = router;
