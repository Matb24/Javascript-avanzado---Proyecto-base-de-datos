import express from "express";
import morgan from "morgan";
import cors from "cors";
import { connectDB } from "./db.js";
import authRoutes from "./routers/auth.routes.js";
import almacenRoutes from "./routers/almacen.routes.js";

// Inicializar la app
const app = express();

// Configuración de CORS
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));


app.use(morgan("dev"));
app.use(express.json());

connectDB();

// Rutas existentes
app.use("/api/auth", authRoutes);
app.use("/api/Almacen", almacenRoutes);

export default app;
