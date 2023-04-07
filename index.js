import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import authRouter from "./routes/auth.route.js";
import linkRouter from "./routes/link.route.js";
import taskRouter from "./routes/task.route.js"
import cookieParser from "cookie-parser";
import redirectRouter from "./routes/redirect.route.js";
import cors from "cors";

const app = express();
const whiteList = [process.env.ORIGIN1];

app.use(
  cors({
    origin: function (origin, callback) {
      if (whiteList.includes(origin) || "undefined") {
        return callback(null, origin);
      }
      return callback("Error de CORS origin: " + origin + " No autorizado!");
    },
  })
);

app.use(express.json());
app.use(cookieParser());

//ejemplo back redirect (opcional)
app.use("/", redirectRouter);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/links", linkRouter);
app.use("/api/v1/tasks", taskRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log("servidor activado en http://localhost:" + PORT)
);
