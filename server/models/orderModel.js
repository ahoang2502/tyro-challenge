import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
	orderId: {
		type: String,
		required: true,
	},
	customerId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Customer",
	},
	item: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
