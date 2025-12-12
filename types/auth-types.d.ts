type Action = 'provider' | 'credentials';

type AuthenticationAction = {
  data: signInSchemaType | null;
  action: Action;
  provider?: 'google' | 'github';
};

type SignInType = {
  email: string;
  password: string;
  callbackURL?: string;
};

type SignUpType = {
  email: string;
  password: string;
  callbackURL?: string;
  confirmPassword: string;
};

type resetPaswordType = {
  password: string;
  confirmPassword: string;
  token: string;
};

type ResetPasswordActionType = {
  email: string;
  redirectTo: string;
};
