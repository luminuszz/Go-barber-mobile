import React, { useRef, useCallback } from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles, SubmitHandler } from '@unform/core';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {
  SignUpRequestDTO,
  signUpValidate,
  yuIstance,
} from '../../validators/user/userSignUpValidate';
import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.png';
import api from '../../services/apiClient';
import getValidationsErrors from '../../utils/getValidationsErrors';
import {
  Container,
  Title,
  BackToSignInButton,
  BackToSignInButtonText,
} from './styles';

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const inputEmailRef = useRef<TextInput>(null);
  const InputPasswordlRef = useRef<TextInput>(null);

  const handleSignUp: SubmitHandler<SignUpRequestDTO> = useCallback(
    async data => {
      try {
        await signUpValidate.validate(data, { abortEarly: false });
        console.log(data);
        const response = await api.post('/users', data);

        navigation.navigate('SignIn');
      } catch (err) {
        if (err instanceof yuIstance) {
          const errors = getValidationsErrors(err);
          formRef.current?.setErrors(errors);

          Alert.alert('Opa, erros no cadastro:');

          return;
        }
        console.log(err);
        Alert.alert(
          'Erro no cadastro',
          'Verifique suas credências e tente novamente',
        );
      }
    },
    [],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>Crie sua conta</Title>
            </View>
            <Form onSubmit={handleSignUp} ref={formRef}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => inputEmailRef.current?.focus()}
              />
              <Input
                ref={inputEmailRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => InputPasswordlRef.current?.focus()}
              />
              <Input
                ref={InputPasswordlRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Cadastrar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignInButton onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInButtonText>Voltar para logon</BackToSignInButtonText>
      </BackToSignInButton>
    </>
  );
};

export default SignUp;
