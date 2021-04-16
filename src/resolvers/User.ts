// @ts-ignore
const ownerOf = (parent, _, context) => {
  return context.prisma.user.findUnique({ where: { id: parent.id } }).ownerOf();
};

export { ownerOf };
