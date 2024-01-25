import express, { Request, Response } from "express";
import flickerRouter from "./routes/flicker";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(cors());

app.use("/api/flickr", flickerRouter);

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});

export default app;
