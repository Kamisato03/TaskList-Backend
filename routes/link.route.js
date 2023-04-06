import { Router } from "express";
import {
  createLinks,
  getLink,
  getLinks,
  removeLink,
  updateLink,
} from "../controllers/link.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyLinkValidator, paramLinkValidator } from "../middlewares/validatorManeger.js";
const router = Router();

//GET   /api/v1/links all   links 
//GET   /api/v1/links/:id   single link
//POST  /api/v1/links       create link
//PATCH /api/v1/links/:id   update link
//DELETE /api/v1/links/:id  remove link

router.get("/", requireToken, getLinks);
router.post("/", requireToken, bodyLinkValidator, createLinks);
router.get("/:id", requireToken, paramLinkValidator ,getLink);
router.delete("/:id", requireToken, paramLinkValidator ,removeLink);
router.patch("/:id", requireToken, paramLinkValidator, bodyLinkValidator, updateLink);
export default router;
