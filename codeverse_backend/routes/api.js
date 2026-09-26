import { Router } from "express";
import { handleRoot } from "../controller/controller.js";
import { handleSignup, handleSignin } from "../controller/userController.js";
import { handleLeaderBoard } from "../controller/rankController.js";
import { updateUserCodingProfile, handleUserData, addCodingProfileData, updateDetails, addSocialMedia } from "../controller/userProfileController.js";
import { validateLeetcode, validateGFG, validateCodeforces, validateCodechef } from "../controller/validateUser.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

// get request router ...
router.get("/", handleRoot); //working

// To fetch user information from client by user username ...
router.get("/user/:username", handleUserData); // working

// to update profile data (protected)
router.put("/user/addplatform", verifyToken, addCodingProfileData);
// to update personal details (protected)
router.put("/user/updatedetails", verifyToken, updateDetails);
// to update social media accounts (protected)
router.put("/user/addsocial", verifyToken, addSocialMedia);

// to update coding profiles data (protected)
router.put("/user/:username", verifyToken, updateUserCodingProfile);

// login and signup router ...
router.post("/signup", handleSignup); // working
router.post("/signin", handleSignin); // working

// Leaderboard router ...
router.get("/leaderboard", handleLeaderBoard); // working

// To validate username
router.get('/validate/leetcode', validateLeetcode);
router.get('/validate/gfg', validateGFG);
router.get('/validate/codeforces', validateCodeforces);
router.get('/validate/codechef', validateCodechef);

export default router;    