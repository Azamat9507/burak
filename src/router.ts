import express from "express";
const router = express.Router();
import memberController from "./controllers/member.controller";
import { verify } from '../node_modules/@types/jsonwebtoken/index.d';

/** Member **/
router.post("/member/login", memberController.login);
router.post("/member/signup", memberController.signup);
router.post(
  "/member/logout", 
  memberController.verifyAuth, 
  memberController.logout
);
router.get(
  "/member/detail", 
  memberController.verifyAuth, 
  memberController.getMemberDetail
);

/** Product **/

/** Order **/

export default router;