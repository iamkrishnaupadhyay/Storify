require("dotenv").config();
require("./config/db.js");
const express = require("express");
const authRouter = require("./routes/authRoutes.js")
const cors = require("cors");
const otpRouter = require("./routes/otpRoutes.js");
const verifyToken = require("./middlewares/verifyTokens.js");
const folderRouter = require("./routes/folderRoutes.js");
const fileFolderRouter = require("./routes/fileFolderRoutes.js");
const fileRouter = require("./routes/fileRoutes.js");


const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.get("/", (req, res) => {
    res.send("App is running");
});

app.use("/api/v1/auth", authRouter);
app.use(verifyToken);
app.use("/api/v1/otp", otpRouter);
app.use("/api/v1/folder", folderRouter);
app.use("/api/v1/file-folder", fileFolderRouter);
app.use("/api/v1/file", fileRouter);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});