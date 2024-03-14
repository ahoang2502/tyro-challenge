import Order from "../models/orderModel.js";
import Customer from "../models/customerModel.js";

export const addOrder = async (req, res) => {
	console.log(req);
	const { orderId, customerId, item, quantity } = req;

	if (!customerId) throw new Error("Missing customerId");

	// Check if customer exists in database
	const existingCustomer = await Customer.findOne({ customerId });
	if (!existingCustomer)
		throw new Error(
			"User does not exist in database. Please sign up to proceed with order!"
		);

	const order = new Order({
		orderId,
		customerId,
		item,
		quantity,
	});

	const createdOrder = await order.save();

	res.status(201).json(createdOrder);
};
