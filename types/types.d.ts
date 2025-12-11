type EmailSenderOptions = {
  to: string;
  subject: string;
  template: JSX.Element;
  from?: string;
};

type ResponseReturnType = {
  status: 'success' | 'error';
  error?: string;
  message?: string;
};
