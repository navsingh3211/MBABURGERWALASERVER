import {asyncError} from "../middlewares/errorMiddleware.js"
import ErrorHandler from "../utils/ErrorHandler.js"
import { User } from "../models/User.js"
import { Order } from "../models/Order.js";

export const myProfile = (req, res, next) => {
    res.status(200).json({
        success: true,
        user:req.user
    })
}

// export const logout = (req, res, next) => {
//     req.session.destroy((error) => {
//         if (error) return next(error);
//       res.clearCookie("connect.sid", {
//         secure: process.env.NODE_ENV === "development" ? false : true,
//         httpOnly: process.env.NODE_ENV === "development" ? false : true,
//         sameSite: process.env.NODE_ENV === "development" ? false : "none",
//       });
//         res.status(200).json({
//             message:"Logged Out"
//         })
//     })
// }

export const logout = async (req, res, next) => {
  try{
    if (req.session) {
        await req.session.destroy((error) => {
            // if (error) return next(error);
            res.clearCookie("connect.sid", {
                secure: process.env.NODE_ENV === "development" ? false : true,
                httpOnly: process.env.NODE_ENV === "development" ? false : true,
                sameSite: process.env.NODE_ENV === "development" ? false : "none",
            });
            res.status(200).json({
                message:"Logged Out"
            })
        })
    }else{
        console.log('No session exists');
    }
    
  }catch(error){
    console.error('Error destroying session:', error);
    res.status(500).send('Internal Server Error');
  }
    
}

//admin controller

export const getAdminUsers = asyncError(async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      users,
    });
});

export const getAdminstats = asyncError(async (req, res, next) => {

    const usersCount = await User.countDocuments();

    const orders = await Order.find({});
    
    const preparingOrders = orders.filter((i) => i.orderStatus === "Preparing");
    const shippedOrders = orders.filter((i) => i.orderStatus === "Shipped");
    const deliveredOrders = orders.filter((i) => i.orderStatus === "Delivered");
    
    let totalIncome = 0;

    orders.forEach((i) => {
      totalIncome += i.totalAmount;
    });
    
    res.status(200).json({
      success: true,
      usersCount,
      ordersCount: {
        total: orders.length,
        preparing: preparingOrders.length,
        shipped: shippedOrders.length,
        delivered: deliveredOrders.length,
      },
      totalIncome,
    });
});
