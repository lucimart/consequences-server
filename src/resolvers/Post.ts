// @ts-ignore
const author = (parent, _, context) => {
  return context.prisma.group.findUnique({ where: { id: parent.id } }).author();
};

// @ts-ignore
const group = (parent, _, context) => {
  return context.prisma.group.findUnique({ where: { id: parent.id } }).group();
};

export { author, group };
