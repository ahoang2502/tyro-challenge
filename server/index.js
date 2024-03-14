import express from "express";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import connectDB from "./config/db.js";

const port = process.env.PORT || 3000;

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const __dirname = path.resolve();
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

import uploadRoute from "./routes/uploadRoute.js";

app.use("/import-csv", uploadRoute);

app.listen(port, () => {
	console.log(`Server is running on port ${port}...`);
});
