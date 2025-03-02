import "@testing-library/jest-dom";
import { server } from "./msw/mswServerNode";

beforeEach(() => {
  server.listen();
});
