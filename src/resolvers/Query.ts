import { PrismaClient } from ".prisma/client";
import { Post } from "@prisma/client";

const prisma = new PrismaClient();

// @ts-ignore
// const postsByGroup = async (groupId, context) =>
//   await context.prisma.group.findUnique({ where: { id: groupId } }).posts();

// export const feed = async (_parent, args, context) => {
//   const groupId = args.groupId ? args.groupId : 1;
//     return postsByGroup(groupId, context);
// };

export const firstFeed = async (_parent, { ...args, take = 10 }, context) => {
  const groupId: number = args.group ? args.group.id : 1;
  let parent = await context.prisma.post.findUnique({
    where: { id: 1, group: { id: groupId } },
    include: { children: true },
  });
  let tree: any[] = [];
  let children;
  let i = -1;
  while (++i < take) {
    tree.push(parent);
    children = tree[i]?.children.sort(
      (child1: any, child2: any) => child2.votesCount - child1.votesCount
    );
    parent = await context.prisma.post.findUnique({
      where: { id: children[0].id },
      include: { children: true },
    });
  }
  return tree;
};

export const feed = async (_parent, { parentId, take = 10 }, context) => {
  let parent = await context.prisma.post.findUnique({
    where: { id: parentId },
    include: { children: true },
  });
  let tree: any[] = [];
  let children;
  let i = -1;
  while (++i < take) {
    tree.push(parent);
    children = tree[i]?.children.sort(
      (child1: any, child2: any) => child2.votesCount - child1.votesCount
    );
    parent = await context.prisma.post.findUnique({
      where: { id: children[0].id },
      include: { children: true },
    });
  }
  return tree;
};
