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

router.get("/users", protectRoute, getUserForSidebar);

// Add validation for the ID parameter
router.get("/:id([0-9a-fA-F]{24})", protectRoute, getMessages); // For MongoDB ObjectId
// OR for any non-empty string:
// router.get("/:id([^/]+)", protectRoute, getMessages);

router.post("/send/:id([0-9a-fA-F]{24})", protectRoute, sendMessage); // For MongoDB ObjectId
// OR for any non-empty string:
// router.post("/send/:id([^/]+)", protectRoute, sendMessage);

export default router;