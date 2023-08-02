import express from "express";
import passport from "passport";
import { myProfile, logout } from "../controllers/user.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import { getAdminUsers, getAdminstats } from "../controllers/user.js";
const router = express.Router();

router.get(
  "/googlelogin",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get("/login",
    passport.authenticate("google",{
      successRedirect:process.env.FRONTEND_URL
    }),
    (req, res, next) => {
        res.send("Logged In")
    }
);

router.get("/me",isAuthenticated, myProfile);
// router.get("/me", myProfile);
router.get("/logout", logout);

//Admin routes
router.get("/admin/users", isAuthenticated, authorizeAdmin, getAdminUsers);

router.get("/admin/stats", isAuthenticated, authorizeAdmin, getAdminstats);



export default router;
