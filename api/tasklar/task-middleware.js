const taskModel = require("./task-model");

async function TaskIdKontrol(req, res, next) {
  try {
    const isTaskExist = await taskModel.getById(req.params.id);
    if (!isTaskExist) {
      next({
        status: 404,
        message: "Task bulunamadı",
      });
    } else {
      req.Task = isTaskExist;
      next();
    }
  } catch (error) {
    next(error);
  }
}
async function TaskPayloadKontrol(req, res, next) {
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
  TaskIdKontrol,
  TaskPayloadKontrol,
};
