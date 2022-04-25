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

const CustomerService = grpc.loadPackageDefinition(packageDefinition).CustomerService;
const protpClient = new CustomerService(
	"localhost:30043",
	grpc.credentials.createInsecure()
);

module.exports = protpClient;
