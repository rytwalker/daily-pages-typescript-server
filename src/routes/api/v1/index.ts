import express from "express";
import pages from "./pages/pages";
import settings from "./settings/settings";
import writers from "./writers/writers";

const router = express.Router();

router.use("/api/v1/pages", pages);
router.use("/api/v1/settings", settings);
router.use("/api/v1/writers", writers);

export default router;
