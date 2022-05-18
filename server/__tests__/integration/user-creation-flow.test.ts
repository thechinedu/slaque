// import signupHandler from "@/pages/api/v1/users";
// import request from "supertest";
import fetch from "node-fetch";

describe("creating a new user", () => {
  it("does something", async () => {
    const url = new URL("/api/v1/users", process.env.BASE_URL);
    const res = await fetch(url, {
      method: "POST",
    });
    const json = await res.json();

    console.log(json);

    expect(4).toBe(4);
  });
});
