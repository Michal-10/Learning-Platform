"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./utils/db"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const promptRoutes_1 = __importDefault(require("./routes/promptRoutes"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const subCategory_1 = __importDefault(require("./routes/subCategory"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
dotenv.config();
console.log('🔑 OPENAI_API_KEY:', process.env.OPENAI_API_KEY);
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
(0, db_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', userRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/categories', categoryRoutes_1.default);
app.use('/api/subcategories', subCategory_1.default);
app.use('/api/prompts', promptRoutes_1.default);
app.use('/api/admin', adminRoutes_1.default);
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
