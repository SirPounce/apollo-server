import setupServer from "./server.js";
import { config } from "dotenv";

config(); // Setup envrironment variables

setupServer()
  .listen()
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
