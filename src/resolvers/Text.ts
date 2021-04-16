// @ts-ignore
const post = (parent, _, context) => {
  return context.prisma.group.findUnique({ where: { id: parent.id } }).post();
};

export { post };
