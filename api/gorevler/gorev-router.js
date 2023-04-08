const router = require("express").Router();
const mw = require("./gorev-middleware");
const gorevModel = require("./gorev-model");

router.get("/", async (req, res, next) => {
  try {
    const allRecords = await gorevModel.getAll();
    res.json(allRecords);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", mw.GorevIdKontrol, async (req, res, next) => {
  try {
    res.json(req.Gorev);
  } catch (error) {
    next(error);
  }
});

router.post("/", mw.GorevPayloadKontrol, async (req, res, next) => {
  try {
    const inserted = await gorevModel.create({
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
  mw.GorevIdKontrol,
  mw.GorevPayloadKontrol,
  async (req, res, next) => {
    try {
      const updated = await gorevModel.update(req.params.id, {
        Adi: req.body.Adi,
        Aciklama: req.body.Aciklama,
      });
      res.status(201).json(updated);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", mw.GorevIdKontrol, async (req, res, next) => {
  try {
    await gorevModel.remove(req.params.id);
    res.status(204).json(req.Gorev);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
