// @ts-ignore
const owner = (parent, _, context) => {
  return context.prisma.group.findUnique({ where: { id: parent.id } }).owner();
};

export { owner };
