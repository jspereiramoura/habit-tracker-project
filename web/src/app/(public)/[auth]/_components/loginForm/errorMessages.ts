export const loginErrorMessages = {
  EMPTY_USER: "Preencha o campo de nome de usuário",
  EMPTY_PASS: "Preencha o campo de senha",
  INVALID_USER: "Nome de usuário deve ter pelo menos 3 caracteres",
  INVALID_PASS: "Senha deve ter pelo menos 6 caracteres",
  INVALID_EMAIL: "Email inválido"
} as const;

export const errorModalTexts = {
  UNAUTHORIZED: {
    title: "Falha de Autenticação",
    description: "Usuário ou senha inválidos, tente novamente"
  },
  GENERIC: {
    title: "Erro ao realizar a operação",
    description:
      "Ocorreu um erro ao realizar a operação, tente novamente mais tarde"
  }
} as const;
