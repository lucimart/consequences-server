import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();

// @ts-ignore
const postsByGroup = async (groupId, context) =>
  await context.prisma.group.findUnique({ where: { id: groupId } }).posts();

// @ts-ignore
export const feed = async (_parent, args, context) => {
  const groupId = args.groupId ? args.groupId : 1;
  return postsByGroup(groupId, context);
};
