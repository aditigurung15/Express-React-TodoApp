const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");

router.post("/addTask", async (req, res) => {
  try {
    const { title, body, id } = req.body;
    const existingUser = await User.findById(id);
    if (existingUser) {
      const list = new List({ title, body, user: existingUser });
      await list.save().then(() => {
        res.status(200).json({ list });
      });
      existingUser.list.push(list);
      existingUser.save();
    }
  } catch (error) {
    console.log(error);
  }
});

//update

router.put("/updateTask/:id", async (req, res) => {
  try {
    // const { title, body, email } = req.body;
    // const existingUser = await User.findOne({ email });

    const {title, body}= req.body;
   
      const list = await List.findByIdAndUpdate(req.params.id, { title, body });
      list.save().then(() => {
        res.status(200).json({ message: "Task updated" });
      });
   
  } catch (error) {
    console.log(error);
  }
});

//delete
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { id } = req.body;
    const existingUser = await User.findByIdAndUpdate(
       id,
      { $pull: { list: req.params.id } }
    );
    if (existingUser) {
      await List.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).json({ message: "Task deleted" });
      });
    }
  } catch (error) {
    console.log(error);
  }
});
//getTask

router.get("/getTask/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const list = await List.find({ user: userId });

    if (list.length > 0) {
      res.status(200).json({ list });
    } else {
      res.status(200).json({ list: [] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching tasks" });
  }
});

module.exports = router;
