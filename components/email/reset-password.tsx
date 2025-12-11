import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import Logo from '../logo';

interface ResetPasswordEmailProps {
  username?: string;
  company?: string;
  url: string;
}

const ResetPasswordEmail = ({
  username = 'Nicole',
  company = 'Reclaim',
  url,
}: ResetPasswordEmailProps) => {
  const previewText = `Reset your ${company} password`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto bg-black/50 font-sans">
          <Container className="mx-auto mb-10 max-w-[465px] p-5">
            <Section className="mt-10">
              <Logo />
            </Section>

            <Heading className="mx-0 my-8 p-0 text-center text-2xl font-normal text-white">
              Reset your password
            </Heading>

            <Text className="text-start text-sm text-white">Hi {username},</Text>

            <Text className="text-start text-sm leading-relaxed text-white">
              We received a request to reset the password for your {company}
              account. Click the button below to choose a new password. This link will expire in 5
              minutes for your security.
            </Text>

            <Section className="mt-8 mb-8 text-center">
              <Button
                className="rounded-md bg-white px-5 py-2.5 text-center text-sm font-semibold text-black no-underline"
                href={url}
              >
                Reset Password
              </Button>
            </Section>

            <Text className="text-start text-sm text-white">
              If you didn&apos;t request a password reset, you can safely ignore this email — no
              changes were made to your account.
              <br />
              <br />
              Cheers,
              <br />
              The {company} Team
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ResetPasswordEmail;
