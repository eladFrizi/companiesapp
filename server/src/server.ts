import express from 'express';
import cors from 'cors';
import { registerDashboardController } from './contollers/dashboard.controller';
const app = express();
const port = 3000;
app.use(cors())

registerDashboardController(app);

app.listen(port, () => {
  console.log(`App is running on port ${port}.`);
});

