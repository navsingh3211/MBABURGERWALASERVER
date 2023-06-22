import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { connectPassport } from "./utils/Provider.js";
import session, { Cookie } from "express-session";
import passport from "passport";
import userRoute from "./routes/user.js";
import orderRoute from "./routes/order.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cors from "cors";
    
const app = express();

export default app;

dotenv.config({ path: "./config/config.env" })

//using middlewares
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "development" ? false : true,
      httpOnly: process.env.NODE_ENV === "development" ? false : true,
      sameSite: process.env.NODE_ENV === "development" ? false : "none",
    },
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({extended:true}));

app.use(
  cors({
    credentials: true,//other wise we can't send cookies
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");


//after config and before routes ,we use passport,middleware
connectPassport();


//importing routes


app.use("/api/v1/", userRoute);
app.use("/api/v1/", orderRoute);

//using error middle ware
app.use(errorMiddleware);