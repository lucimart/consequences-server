// @ts-ignore
export const user = (parent, _, context) => {
  return context.prisma.profile.findUnique({ where: { id: parent.id } }).user();
};
