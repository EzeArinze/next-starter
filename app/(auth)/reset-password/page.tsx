import TokenError from '@/components/auth/auth-error';
import ResetPassword from '../_components/reset-password';

type SearchParams = Promise<{ [key: string]: string | undefined }>;

export default async function ResetPasswordPage(props: { searchParams: SearchParams }) {
  const { token, error } = await props.searchParams;

  if (!token) {
    return <TokenError message={error} />;
  }

  return (
    <div>
      <ResetPassword token={token} />
    </div>
  );
}
