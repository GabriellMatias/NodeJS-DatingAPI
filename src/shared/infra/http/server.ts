import mongoose from 'mongoose';
import { app } from './app';

const port = 5000;
const mongo_url = 'mongodb+srv://gabrielarthur2:ESWP56qudY2RoHQx@prod.62ftuud.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongo_url)
   .then(() => {
      app.listen(process.env.PORT || port, () => console.log(`\n\nServer listening on ${port}\n\n`));
   })
   .catch(error => console.error(`\n\n${error} did not connect\n\n`));