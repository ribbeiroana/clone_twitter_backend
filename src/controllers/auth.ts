import { RequestHandler } from 'express';
import { signupShema } from '../schemas/signup';
import { findUserByEmail } from '../services/user';
import slug from 'slug';

export const signup: RequestHandler = async (req, res) => {

  const safeData = signupShema.safeParse(req.body);
  if (!safeData.success) {
    return res.json({ error: safeData.error.flatten().fieldErrors });
  }
  // verificar email 
  const hashEmail = await findUserByEmail(safeData.data.email);
  if (hashEmail) {
    return res.json({ error: 'E-mail já existe' });
  }

  let genSlug = true;
  let userSlug = slug(safeData.data.name);
  while (genSlug) {
    const hasSlug = await findUserBySlug(userSlug);

    if (hasSlug) {
      let slugSuffix = Math.floor(Math.random() * 999999).toString();
      let userSlug = slug(safeData.data.name + slugSuffix);
    } else {
      genSlug = false;
    }
  }

  res.json({});
} 