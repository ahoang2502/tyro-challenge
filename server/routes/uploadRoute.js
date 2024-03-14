import path from "path";
import fs from "fs";
import filesize from "filesize";
import express from "express";
import multer from "multer";
import csv from "fast-csv";

import { addOrder } from "../controllers/orderControllers.js";

const __dirname = path.resolve();

const router = express.Router();

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, "uploads/");
	},
	filename(req, file, cb) {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		);
	},
});

const upload = multer({
	storage,
});

function uploadCsv(path) {
	let stream = fs.createReadStream(path);
	let csvDataColl = [];

	// Check file size
	const stats = fs.statSync(path);
	const fileSizeInMb = stats.size;

	if (fileSizeInMb > 2000)
		throw new Error("File is too big, please try a different file");

	let fileStream = csv
		.parse()
		.on("data", (data) => {
			csvDataColl.push(data);
		})
		.on("end", () => {
			csvDataColl.shift();

			const order = csvDataColl[0];
			const mappedOrder = {
				orderId: order[0],
				customerId: order[1],
				item: order[2],
				quantity: order[3],
			};

			addOrder(mappedOrder);
		});

	stream.pipe(fileStream);
}

router.post("/", upload.single("file"), (req, res) => {
	uploadCsv(__dirname + `/${req.file.path}`);

	res.send({
		message: "File uploaded!",
		file: `/${req.file.path}`,
	});
});

export default router;
