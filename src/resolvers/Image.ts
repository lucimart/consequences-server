// @ts-ignore
export const post = (parent, _, context) => {
  return context.prisma.image.findUnique({ where: { id: parent.id } }).post();
};
