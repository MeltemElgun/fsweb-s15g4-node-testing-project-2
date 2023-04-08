const gorevModel = require("./gorev-model");

async function GorevIdKontrol(req, res, next) {
  try {
    const existGorev = await gorevModel.getById(req.params.id);
    if (!existGorev) {
      next({
        status: 404,
        message: "Görev Bulunamadı",
      });
    } else {
      req.Gorev = existGorev;
      next();
    }
  } catch (error) {
    next(error);
  }
}
async function GorevPayloadKontrol(req, res, next) {
  try {
    let { Adi, Aciklama } = req.body;
    if (!Adi || !Aciklama) {
      next({
        status: 400,
        message: "Alanları Kontrol ediniz",
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}
module.exports = {
  GorevIdKontrol,
  GorevPayloadKontrol,
};
