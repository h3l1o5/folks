const router = require("express").Router();
const jwt = require("jsonwebtoken");

const Room = require("../../../models/Room");
const authenticate = require("../../../middlewares/authenticate");

router.use(authenticate);

router.get("/", (req, res, next) => {
  Room.find({}, (err, rooms) => {
    if (err) {
      return next(err);
    }
    const cleanerRooms = rooms.map(room => {
      return {
        id: room._id,
        title: room.title,
        createBy: room.createBy,
        createAt: room.createAt,
        members: room.members,
      };
    });
    res.json({ rooms: cleanerRooms });
  });
});

router.post("/", (req, res, next) => {
  const { title } = req.body;
  const createBy = req.currentUser.username;

  const newRoom = new Room({
    title,
    createBy,
    members: [createBy],
    messages: [],
  });

  newRoom
    .save()
    .then(() => {
      res.json({ success: true });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
