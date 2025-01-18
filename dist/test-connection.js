"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
async function testConnection() {
    try {
        await mongoose_1.default.connect('mongodb+srv://ba86work:KIEAxuxQLWh6eFW9@cluster0.uk8fj2y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Connected successfully');
    }
    catch (error) {
        console.error('Connection failed:', error);
    }
    finally {
        await mongoose_1.default.disconnect();
    }
}
testConnection();
//# sourceMappingURL=test-connection.js.map