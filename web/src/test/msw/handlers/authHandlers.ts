import { http, HttpResponse } from "msw";
import { API_URL } from "../../../config/api";

const users = [
  {
    id: 1,
    username: "user1",
    password: "password1",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InVzZXIxIn0.MUD4At1AbuGyzP470BAhaxxtB3DExc6wzLdAADyVzVs"
  },
  {
    id: 2,
    username: "user2",
    password: "password2",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InVzZXIyIn0.ip_33d5qfSqH7Os_T5Eg8Dl_nzOilS6cMWRwEN_ITxg"
  }
];

export const authHandlers = [
  http.post(API_URL + "/login", async ({ request }) => {
    const { username, password } = JSON.parse(await request.text());
    const user = users.find(
      u => u.username === username && u.password === password
    );

    if (user) {
      return HttpResponse.json(
        { id: user.id, username: user.username, token: user.token },
        { status: 200 }
      );
    } else {
      return HttpResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
  }),

  http.post(API_URL + "/register", async ({ request }) => {
    const { username, password } = JSON.parse(await request.text());
    const newUser = {
      id: users.length + 1,
      username,
      password,
      token: "mocked_token"
    };

    users.push(newUser);
    return HttpResponse.json(newUser, { status: 201 });
  })
];
