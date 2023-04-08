const router = require("express").Router();
const mw = require("./task-middleware");
const taskModel = require("./task-model");

router.get("/", async (req, res, next) => {
  try {
    const allRecords = await taskModel.getAll();
    res.json(allRecords);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", mw.TaskIdKontrol, async (req, res, next) => {
  try {
    res.json(req.Task);
  } catch (error) {
    next(error);
  }
});

router.post("/", mw.TaskPayloadKontrol, async (req, res, next) => {
  try {
    const inserted = await taskModel.create({
      Adi: req.body.Adi,
      Aciklama: req.body.Aciklama,
    });
    res.status(201).json(inserted);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  mw.TaskIdKontrol,
  mw.TaskPayloadKontrol,
  async (req, res, next) => {
    try {
      const updated = await taskModel.update(req.params.id, {
        Adi: req.body.Adi,
        Aciklama: req.body.Aciklama,
      });
      res.status(201).json(updated);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", mw.TaskIdKontrol, async (req, res, next) => {
  try {
    await taskModel.remove(req.params.id);
    res.status(204).json(req.Task);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
