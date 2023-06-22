import express from "express";
import { isAuthenticated, authorizeAdmin } from "../middlewares/auth.js";
import {
  placeOrder,
  getMyOrders,
  getMyOrderDetails,
  getAdminOrders,
  processOrder,
  placeOrderOnline,
  paymentVerification,
} from "../controllers/order.js";

const router = express.Router();

router.post("/createorder",isAuthenticated, placeOrder);

router.post("/createOrderOnline",isAuthenticated, placeOrderOnline);

router.post("/paymentverification",isAuthenticated, paymentVerification);


router.get("/myorders", isAuthenticated, getMyOrders);

router.get("/order/:id", isAuthenticated, getMyOrderDetails);

//add admin middleware
router.get("/admin/orders", isAuthenticated,authorizeAdmin, getAdminOrders);

router.get("/admin/order/:id", isAuthenticated,authorizeAdmin, processOrder);





export default router;
