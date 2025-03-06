
import {  Request, Router } from "express";
import { Base64 } from "js-base64";
import fs from 'fs'
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    const p = path.join(__dirname.replace('router\\Users','\\users'),  "/" + String(dayjs().format("YYYY-MM-DD")))
    try {
      fs.mkdirSync(p, { recursive: true })
    } catch (error) {
      console.log(error)
    }
    cb(null,  p);
  },
  filename: function (req: Request, file: any, cb: any) {
   try {
    const uid = uuid();
    cb(
      null,
        req.headers.username +
        "-" +
        Base64.encode(file.originalname + uid) +
        Date.now() +
        path.extname(file.originalname)
    );
   } catch (error) {
    
   }
  }
});

const upload = multer({
  storage,
  limits: { fields: 12, fieldSize: 1024 * 1024 * 20 },
  fileFilter: function (req: any, file: any, cb: any) {
    try {
     if (file.mimetype.startsWith("image")) {
       cb(null, true);
     } else {
       cb(null, false);
     }
    } catch (error) {
     console.log(error)
    }
   },
});

export const UsersRouter = Router();
// 132
let multerUpload = upload.array("multer");

let videoUpload = multer({
  storage,
  limits: { fields: 12, fieldSize: 1024 * 1024 * 200 },
}).array("videos")

// videoUpload.limits.

let singleUpload = upload.single("images");

try {
  UsersRouter.post("/images", (req: any, res: any) => {
    singleUpload(req, res, (err: any) => {
      try {
        if (!!err) {
          res.json({
            code: 2000,
            type: "single",
            fileList: [],
            msg: err.message,
          });
        }
        res.json({
          code: 1000,
          type: "single",
          file:{...req.file,filename:String(dayjs().format("YYYY-MM-DD")) +"/"+ req.file.filename} ,
          msg: "",
        });
      } catch (error) {
        
      }
    });
  });
  UsersRouter.post("/videos", (req: any, res: any) => {
    videoUpload(req, res, (err: any) => {
      try {
        if (!!err) {
          res.json({
            code: 2000,
            type: "single",
            fileList: [],
            msg: err.message,
          });
        }
        res.json({
          code: 1000,
          type: "single",
          file: req.files.map((x:any)=> {return {...x,filename:String(dayjs().format("YYYY-MM-DD")) +"/"+ req.file.filename}}),
          msg: "",
        });
      } catch (error) {
        
      }
    });
  });
  
} catch (error) {}
