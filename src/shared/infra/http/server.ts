import mongoose from "mongoose";
import { serverHttp } from "./app";

const port = 5000;
const mongo_url = process.env.MONGO_URL;

mongoose
  .connect(mongo_url)
  .then(() => {
    serverHttp.listen(process.env.PORT || port, () =>
      console.log(`\n\nServer listening on ${port}\n\n`)
    );
  })
  .catch((error) => console.error(`\n\n${error} did not connect\n\n`));
