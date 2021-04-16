"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ownerOf = void 0;
// @ts-ignore
var ownerOf = function (parent, _, context) {
    return context.prisma.user.findUnique({ where: { id: parent.id } }).ownerOf();
};
exports.ownerOf = ownerOf;
