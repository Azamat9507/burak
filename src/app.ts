import  express  from "express";
import path from 'path';
import router from "./router";
import routerAdmin from "./router-admin";
import morgan from "morgan";
import { MORGON_FORMAT } from "./libs/types/config";

import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";

const MongoDBStore = ConnectMongoDB(session); //session uchun MongoDB store
const store = new MongoDBStore({
    uri: String(process.env.MONGO_URL),
    collection: 'sessions' //sessionlar saqlanadigan collection nomi
});

/* 1 ENTRANCE */
const app = express();
        
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(morgan(MORGON_FORMAT));

/* 2 SESSIONS */
app.use(
  session({
    secret: String(process.env.SESSION_SECRET), //maxfiy kalit soz
    cookie: {
        maxAge: 1000 * 3600 * 6 // 6 soat
    },
    store: store, //sessionlarni saqlash uchun store
    resave: true, //agar true bolsa har requestda session yangilaydi
    saveUninitialized: true,
  })
);


/* 3 VIEWS */
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");
   
/* 4 ROUTING */
//BSSR : EJS
app.use("/admin", routerAdmin); // ejs
app.use("/", router); //Middleware Design Pattern //SPA : REACT

export default app;