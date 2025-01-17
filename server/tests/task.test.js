const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const Task = require("../models/Task");

chai.should();
chai.use(chaiHttp);

describe("Task API", () => {
  beforeEach(async () => {
    await Task.deleteMany();
  });

  it("should return an empty array when there are no tasks", (done) => {
    chai
      .request(server)
      .get("/api/tasks")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.equal(0);
        done();
      });
  });

  it("should add a task with just a title", (done) => {
    const task = { title: "Buy groceries" };
    chai
      .request(server)
      .post("/api/task")
      .send(task)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property("title").eql("Buy groceries");
        res.body.should.have.property("completed").eql(false);
        done();
      });
  });

  it("should fetch one task after adding it", async () => {
    const task = new Task({ title: "Complete homework" });
    await task.save();

    chai
      .request(server)
      .get("/api/tasks")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.equal(1);
        res.body[0].should.have.property("title").eql("Complete homework");
      });
  });

  it("should update the task to completed", async () => {
    const task = new Task({ title: "Call mom", completed: false });
    const savedTask = await task.save();

    chai
      .request(server)
      .put(`/api/task/${savedTask._id}`)
      .send({ completed: true })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("completed").eql(true);
      });
  });

  it("should delete a task and confirm it no longer exists", async () => {
    const task = new Task({ title: "Wash car" });
    const savedTask = await task.save();

    chai
      .request(server)
      .delete(`/api/task/${savedTask._id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property("message")
          .eql("Task deleted successfully");

        Task.findById(savedTask._id, (error, deletedTask) => {
          chai.expect(deletedTask).to.be.null;
        });
      });
  });
});
