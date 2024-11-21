import { prisma } from '../utils/prisma'
import { getPublicURL } from '../utils/url';

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: { email }
  });

  if (user) {
    return {
      ...user,
      avatar: getPublicURL(user.avatar),
      cover: getPublicURL(user.cover),
    }

  }

  return null;
}