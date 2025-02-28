import { JwtPayload } from "../auth.dto";
import { JwtStrategy } from "./jwt.strategy";

describe("Authentication JwtStrategy", () => {
  it("should validate the payload", () => {
    const jwtStrategy = new JwtStrategy();
    const payload: JwtPayload = {
      sub: 1,
      username: "test",
      mail: "test@test.com"
    };

    expect(jwtStrategy.validate(payload)).toEqual(payload);
  });
});
