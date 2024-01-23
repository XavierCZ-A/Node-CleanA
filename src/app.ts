import express from 'express';
import { connectDB } from './data';
import indexRoutes from './routes/index.route';
import { envs } from './config';


const app = express();
const PORT = envs.PORT_HOST;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(indexRoutes);

if (!envs.DB_NAME || ! envs.DB_HOST) {
  console.error('Error the envs are not defined');
  process.exit(1);
}

// Conectar a la base de datos
connectDB({
  dbName: envs.DB_NAME,
  mongoUrl: envs.DB_HOST,
});

app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT}`)
})
