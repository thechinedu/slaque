import signupHandler from "@/pages/api/v1/users";
import request from "supertest";

describe("creating a new user", () => {
  it("does something", (done) => {
    request(signupHandler)
      .post("/user")
      .send({ email: "test-user@example.com" })
      .expect("Content-Type", /json/)
      .expect(200)
      .end(done);

    done();
  });
});
