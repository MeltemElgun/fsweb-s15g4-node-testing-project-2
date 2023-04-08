const db = require("./data/db-config");
const server = require("./api/server");
const superTest = require("supertest");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
  await db.seed.run();
});
afterAll(async () => {
  await db.destroy(); //veritabanını yok ediyor
});

describe("TodoApp server test", () => {
  it("[1] Server Çalışıyor mu? /", async () => {
    const res = await superTest(server).get("/");
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ message: "Server is working" });
  }, 1000);
});

describe("Gorev test", () => {
  it("[2] Doğru sayıda Görev Geliyor mu? /", async () => {
    const res = await superTest(server).get("/api/gorev");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  }, 1000);
  it("[3] Doğru Görev Geliyor mu? /", async () => {
    const res = await superTest(server).get("/api/gorev/1");
    expect(res.status).toBe(200);
    expect(res.body.Adi).toBe("Başarılı Ol");
  }, 1000);
  it("[4] Olmayan Görev 404 mü? /", async () => {
    const res = await superTest(server).get("/api/gorev/22");
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Görev Bulunamadı");
  }, 1000);
  it("[5] Görev Ekleme? /", async () => {
    let ornekGorev = {
      Adi: "Python Öğren",
      Aciklama: "Makine öğrenmesinde uzman ol",
    };
    const res = await superTest(server).post("/api/gorev").send(ornekGorev);
    expect(res.status).toBe(201);
    expect(res.body.Adi).toBe("Python Öğren");
  }, 1000);
});

describe("Task test", () => {
  it("[6] Doğru sayıda task geliyor mu", async () => {
    const res = await superTest(server).get("/api/task");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
  }, 1000);
  it("[7] Doğru task geliyor mu", async () => {
    const res = await superTest(server).get("/api/task/1");
    expect(res.status).toBe(200);
    expect(res.body.Adi).toBe("Erken Kalk");
  }, 1000);
  it("[8] Eklenen kayıt geliyor mu", async () => {
    const ornekTask = {
      Adi: "Tensorflow Öğren",
      Aciklama: "Google tensorflow kütüphanesini araştır",
      GorevId: 1,
    };
    const res = await superTest(server).post("/api/task").send(ornekTask);
    expect(res.status).toBe(201);
    expect(res.body.Adi).toBe("Tensorflow Öğren");
  }, 1000);
  it("[9] Payload hatalı olduğunda 400 hatası geliyor mu", async () => {
    const ornekTask = { Adi: "Tensorflow Öğren", GorevId: 1 };
    const res = await superTest(server).post("/api/task").send(ornekTask);
    expect(res.status).toBe(400);
  }, 1000);
  it("[10] Payload hatalı olduğunda mesaj doğru geliyor mu", async () => {
    const ornekTask = { Adi: "Tensorflow Öğren", GorevId: 1 };
    const res = await superTest(server).post("/api/task").send(ornekTask);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Alanları Kontrol ediniz");
  }, 1000);
});
