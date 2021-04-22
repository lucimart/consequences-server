import { PrismaClient } from ".prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserInputError } from "apollo-server";

const prisma = new PrismaClient();

export const signup = async (_: any, args: any, context: any) => {
  const saltRounds = 10;
  const password = await bcrypt.hash(args.password, saltRounds);
  const user = await context.prisma.user.create({
    data: { ...args, password },
  });
  // @ts-ignore
  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

  return {
    token,
    user,
  };
};
// @ts-ignore
export const login = async (_, args, context) => {
  const user = await context.prisma.user.findUnique({
    where: { email: args.email },
  });
  if (!user) {
    throw new Error("Invalid credentials.");
  }
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid credentials.");
  }
  // @ts-ignore
  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

  return {
    token,
    user,
  };
};

// @ts-ignore
export const createGroup = async (_, args, context) => {
  const { userId } = context;

  return await context.prisma.group.create({
    data: {
      ...args,
      owner: { connect: { id: userId } },
    },
  });
};

// @ts-ignore
const postsInGroupCount = async (context, groupId: number) => {
  const posts = await context.prisma.group
    .findUnique({
      where: {
        id: groupId,
      },
    })
    .posts();

  return posts.length;
};

// @ts-ignore
const createPost = async (_, args, context) => {
  const groupId = args.groupId ? args.groupId : 1;
  const { userId } = context;

  if (args.parent != null)
    return await context.prisma.post.create({
      data: {
        group: { connect: { id: groupId } },
        author: { connect: { id: userId } },
        parent: { connect: { id: args.parent.id } },
      },
    });
  else {
    if ((await postsInGroupCount(context, groupId)) > 0)
      throw new UserInputError("Cannot be parent post");
    else
      return await context.prisma.post.create({
        data: {
          group: { connect: { id: groupId } },
          author: { connect: { id: userId } },
          isRoot: true,
        },
      });
  }
};

// @ts-ignore
export const createText = async (parent, args, context) => {
  const post = await createPost(parent, args, context);

  return await context.prisma.text.create({
    data: {
      ...args,
      post: { connect: { id: post.id } },
    },
  });
};

// @ts-ignore
export const createVote = async (parent, { post, reply }, context) => {
  const { userId } = context;
  if ((post != null && reply != null) || (post == null && reply == null))
    throw new UserInputError(
      "Same vote cannot be related to a post and a reply"
    );

  if (post != null) {
    const vote = await context.prisma.vote.create({
      data: {
        post: { connect: { id: post.id } },
        user: { connect: { id: userId } },
      },
    });

    await context.prisma.post.update({
      where: {
        id: vote.id,
      },
      data: {
        votesCount: { increment: 1 },
      },
    });

    return vote;
  } else {
    const vote = await context.prisma.vote.create({
      data: {
        reply: { connect: { id: reply.id } },
        user: { connect: { id: userId } },
      },
    });

    await context.prisma.reply.update({
      where: {
        id: vote.id,
      },
      data: {
        votesCount: { increment: 1 },
      },
    });

    return vote;
  }
};
