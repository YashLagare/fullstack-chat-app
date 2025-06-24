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

// Add debug logging before importing routes
console.log("About to import auth routes...");
try {
  const authRoutes = await import("./routes/auth.route.js");
  console.log("Auth routes imported successfully");
  app.use("/api/auth", authRoutes.default);
  console.log("Auth routes registered successfully");
} catch (error) {
  console.error("Error with auth routes:", error.message);
  process.exit(1);
}

console.log("About to import message routes...");
try {
  const messageRoutes = await import("./routes/message.route.js");
  console.log("Message routes imported successfully");
  app.use("/api/messages", messageRoutes.default);
  console.log("Message routes registered successfully");
} catch (error) {
  console.error("Error with message routes:", error.message);
  process.exit(1);
}

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