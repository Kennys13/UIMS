import { createServer } from "node:http";
import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";
import { createApp } from "./app.js";

const app = createApp();
await connectDatabase();

createServer(app).listen(env.PORT, () => {
  console.log(`Lotus Valley School API listening on http://localhost:${env.PORT}`);
});
