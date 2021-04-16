// @ts-ignore
export const post = (parent, _, context) => {
  return context.prisma.text.findUnique({ where: { id: parent.id } }).post();
};
