const path = require('path');

const PROTO_PATH = path.resolve(__dirname, './definitions.proto')

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
	keepCase: true,
	longs: String,
	enums: String,
	arrays: true
});

const customersProto = grpc.loadPackageDefinition(packageDefinition);

const { v4: uuidv4 } = require("uuid");
const customers = [
	{
		id: "a68b823c-7ca6-44bc-b721-fb4d5312cafc",
		name: "John Bolton",
		age: 23,
		address: "Address 1"
	},
	{
		id: "34415c7c-f82d-4e44-88ca-ae2a1aaa92b7",
		name: "Mary Anne",
		age: 45,
		address: "Address 2"
	},
	{
		id: "34415c7c-f82d-4e44-88ca-ae2a1aaa92b9",
		name: "Mary Ranjan",
		age: 25,
		address: "Address 3"
	}
];

const server = new grpc.Server();
server.addService(customersProto.CustomerService.service, {
	getAll: (_, callback) => {
		callback(null, { customers });
	},

	get: (call, callback) => {
		let customer = customers.find(n => n.id == call.request.id);

		if (customer) {
			callback(null, customer);
		} else {
			callback({
				code: grpc.status.NOT_FOUND,
				details: "Not found"
			});
		}
	},

	insert: (call, callback) => {
		let customer = call.request;

		customer.id = uuidv4();
		customers.push(customer);
		callback(null, customer);
	},

	update: (call, callback) => {
		let existingCustomer = customers.find(n => n.id == call.request.id);

		if (existingCustomer) {
			existingCustomer.name = call.request.name;
			existingCustomer.age = call.request.age;
			existingCustomer.address = call.request.address;
			callback(null, existingCustomer);
		} else {
			callback({
				code: grpc.status.NOT_FOUND,
				details: "Not found"
			});
		}
	},

	remove: (call, callback) => {
		let existingCustomerIndex = customers.findIndex(
			n => n.id == call.request.id
		);

		if (existingCustomerIndex != -1) {
			customers.splice(existingCustomerIndex, 1);
			callback(null, {});
		} else {
			callback({
				code: grpc.status.NOT_FOUND,
				details: "Not found"
			});
		}
	}
});


server.bindAsync(
  "127.0.0.1:30043",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log("Server running at http://127.0.0.1:30043");
    server.start();
  }
);
