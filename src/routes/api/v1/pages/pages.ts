import express from "express";
import Pages from "../../../../controllers/Pages";
import isAuth from "../../../../middleware/isAuth";

const router = express.Router();
// GET: api/v1/pages PERMISSIONS: USER or ADMIN
router.get("/", isAuth, Pages.getPages);

// GET: api/v1/pages/:pageId PERMISSIONS: USER or ADMIN
router.get("/:pageId", isAuth, Pages.getPage);

// POST: api/v1/pages PERMISSIONS: USER or ADMIN
router.post("/", isAuth, Pages.addPage);

// PUT: api/v1/pages/update/{id} PERMISSIONS: USER or ADMIN
router.put("/:pageId", isAuth, Pages.updatePage);

// DELETE: api/v1/pages/delete/{id} PERMISSIONS: USER or ADMIN
router.delete("/:pageId", isAuth, Pages.deletePage);

export default router;
