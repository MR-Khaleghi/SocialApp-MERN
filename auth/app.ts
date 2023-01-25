import exppress from 'express';

const app = exppress();

app.get('*', (req, res) => {
  res.status(200).send({});
});
export default app;
