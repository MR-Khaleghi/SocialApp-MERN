import exppress from 'express';
import signupRouter from './routes/signup';
import { json } from 'body-parser';
const app = exppress();
app.use(json());
app.use(signupRouter);
export default app;
