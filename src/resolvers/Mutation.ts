import { PrismaClient } from ".prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const signup = async (_: any, args: any, context: any) => {
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
const login = async (_, args, context) => {
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
const createGroup = async (_, args, context) => {
  const { userId } = context;

  return await context.prisma.group.create({
    data: {
      ...args,
      owner: { connect: { id: userId } },
    },
  });
};

// @ts-ignore
const createPost = async (_, args, context) => {
  const groupId = args.group ? args.group.id : 1;
  const { userId } = context;

  return await context.prisma.post.create({
    data: {
      group: { connect: { id: groupId } },
      author: { connect: { id: userId } },
    },
  });
};

// @ts-ignore
const createText = async (parent, args, context) => {
  const post = await createPost(parent, args, context);

  return await context.prisma.text.create({
    data: {
      ...args,
      postId: post.id,
    },
  });
};

export { signup, login, createGroup, createText };
