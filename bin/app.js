"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var apollo_server_1 = require("apollo-server");
var client_1 = require("@prisma/client");
var index_1 = require("./resolvers/index");
var utils_1 = require("./utils");
var prisma = new client_1.PrismaClient();
var server = new apollo_server_1.ApolloServer({
    typeDefs: fs_1.default.readFileSync(path_1.default.join(__dirname, "schema.graphql"), "utf8"),
    resolvers: index_1.resolvers,
    context: function (_a) {
        var req = _a.req;
        return __assign(__assign({}, req), { prisma: prisma, userId: req && req.headers.authorization ? utils_1.getUserId(req) : null });
    },
});
server.listen().then(function (_a) {
    var url = _a.url;
    return console.log("Server is running on " + url);
});
