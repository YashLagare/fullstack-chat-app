// import express from 'express';
// import { getMessages, getUserForSidebar, sendMessage } from "../controllers/message.controller.js";
// import { protectRoute } from '../middleware/auth.middleware.js';
// const router = express.Router();

// router.get("/users", protectRoute, getUserForSidebar);
// router.get("/:id",protectRoute,getMessages);

// router.post("/send/:id",protectRoute,sendMessage);







// export default router;  // export the router so it can be used in other files

import express from 'express';
import { getMessages, getUserForSidebar, sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

// ✅ Specific routes FIRST
router.get("/users", protectRoute, getUserForSidebar);
router.post("/send/:id", protectRoute, sendMessage);

// ✅ THEN dynamic param routes
router.get("/:id", protectRoute, getMessages); // this must be LAST

export default router;
