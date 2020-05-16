import * as Yup from 'yup';

export const signInValidate = Yup.object().shape({
  email: Yup.string()
    .required('E-mail obrigátorio')
    .email('Informe um email válido'),
  password: Yup.string().required('Senha obrigátoria'),
});

export const yuIstance = Yup.ValidationError;

export type SignInRequestDTO = Yup.InferType<typeof signInValidate>;
