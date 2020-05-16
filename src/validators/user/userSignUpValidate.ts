import * as Yup from 'yup';

export const signUpValidate = Yup.object().shape({
  name: Yup.string().required('Campo obrigátorio'),
  email: Yup.string().required().email(),
  password: Yup.string().min(6, 'Senha deve ter no minimo seis caracteres'),
});

export const yuIstance = Yup.ValidationError;

export type SignUpRequestDTO = Yup.InferType<typeof signUpValidate>;
