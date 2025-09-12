import express from "express"
import routes from "./routes/index.js"
import cors from "cors";

const corsOptions = {
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    optionsSuccessStatus: 200,
};

const app = express()
app.use(express.json())
app.use(cors(corsOptions));
app.use("/api", routes)

export default app