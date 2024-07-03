import prisma from '~/lib/prisma';

export default eventHandler(async () => {
  // 首先检查用户是否存在
  const exists = await prisma.user.findUnique({
    where: {
      email: 'niko@prisma.io'
    }
  });

  // 如果用户不存在，则创建新用户
  if (!exists) {
    const newUser = await prisma.user.create({
      data: {
        name: 'Niko',
        email: 'niko@prisma.io',
      }
    });
    return newUser;  // 返回新创建的用户信息
  }

  return 'User already exists in the database';  // 如果用户已存在，返回此消息
});
