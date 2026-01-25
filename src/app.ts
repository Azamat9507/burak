import  express  from "express";
import path from 'path';
import router from "./router";
import routerAdmin from "./router-admin";
import morgan from "morgan";
import { MORGON_FORMAT } from "./libs/types/config";

/* 1 ENTRANCE */
const app = express();
        
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(morgan(MORGON_FORMAT));
/* 2 SESSIONS */


/* 3 VIEWS */
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");
   
/* 4 ROUTING */
//BSSR : EJS
app.use("/admin", routerAdmin); // ejs
app.use("/", router); //Middleware Design Pattern //SPA : REACT

export default app;