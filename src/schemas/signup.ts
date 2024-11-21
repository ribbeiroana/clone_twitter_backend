import { z } from 'zod';

export const signupShema = z.object({
  name: z.string({ message: 'Nome é obrigatório' }).min(2, 'Precisa ter 2 ou mais caracteres'),
  email: z.string({ message: 'E-mail é obrigatório' }).email('E-mail inválido'),
  password: z.string({ message: 'Senha é obrigatório' }).min(4, 'A senha precisa ter 2 ou mais caracteres'),
  
}); 