import express from 'express'
import { createServer } from "http";
import cors from "cors";
import compression from 'compression';
import environment from '@config/environments';
import Database from '@config/database';
import climateController from '@routes/climate.routes';

if (process.env.NODE_ENV !== "production") {
  const env = environment;
}

async function init() {
  const app = express();
  const apiPaths = {
      climate: "/api/climate",
      // auth: "/api/auth",
      // proyects: "/api/proyects",
      // users: "/api/users",
  };

  // Middlewares
  app.use(cors());
  app.use(express.json() );
  app.use(compression());
  

  const database = new Database();
  await database.init();

  // Routes
  app.use( apiPaths.climate, climateController );
  // app.use( apiPaths.proyects, proyectRoutes );
  // app.use( apiPaths.users, userRoutes );
  // app.use( apiPaths.about, aboutRoutes );
  
  const httpServer = createServer(app);
  const PORT = process.env.PORT || 2002;
  httpServer.listen(
      { port: PORT },
      () => console.log(`Server Running on port ${PORT}`) 
  );
}

init();
