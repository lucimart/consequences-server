"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserId = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var getTokenPayload = function (token) {
    // @ts-ignore
    return jsonwebtoken_1.default.verify(token, process.env.APP_SECRET);
};
var getUserId = function (req, authToken) {
    if (authToken === void 0) { authToken = ""; }
    if (req) {
        var authHeader = req.headers.authorization;
        if (authHeader) {
            var token = authHeader.replace("Bearer ", "");
            if (!token) {
                throw new Error("No token found");
            }
            var userId = getTokenPayload(token).userId;
            return userId;
        }
    }
    else if (authToken) {
        var userId = getTokenPayload(authToken).userId;
        return userId;
    }
    throw new Error("Not authenticated");
};
exports.getUserId = getUserId;
