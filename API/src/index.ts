import express from 'express';

const app = express();

app.get('/', (_, res) => {
  res.json({ msg: 'hola' });
});

app.listen(4000, () => console.log('Server Running on port 4000'));
