// import cookieParser from "cookie-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import express from "express";

// import path from "path";

// import { connectDB } from "./lib/db.js";
// import { app, server } from "./lib/socket.js";
// import authRoutes from "./routes/auth.route.js";
// import messageRoutes from "./routes/message.route.js";

// dotenv.config();
// // const app = express(); now we dont need cause we alrady created it in scoket.io file so we delete this line

// const PORT = process.env.PORT || 5001;
// const __dirname = path.resolve();


// // ✅ Increase payload size limit here
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ limit: '10mb', extended: true }));

// app.use(cookieParser());

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

// if(process.env.NODE_ENV==="production"){
//   app.use(express.static(path.join(__dirname,"../frontend/dist")));

//   app.get("*", (req,res)=>{
//     res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    
//   })
// }

// server.listen(PORT, () => { // we just replace app with server that we created in socket.io file
//   console.log(`Server is running on PORT: ${PORT}`);
//   connectDB();
// });

import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// ✅ Increase payload size limit here
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
  connectDB();
});