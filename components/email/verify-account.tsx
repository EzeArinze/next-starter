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

interface WelcomeEmailProps {
  username?: string;
  company?: string;
  url: string;
}

const VerifyAccountEmail = ({
  username = 'Nicole',
  company = 'Reclaim',
  url,
}: WelcomeEmailProps) => {
  const previewText = `Welcome to ${company}, ${username}!`;

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
              Welcome to <strong>{company}</strong>, {username}!
            </Heading>
            <Text className="text-start text-sm text-white">Hello {username},</Text>
            <Text className="text-start text-sm leading-relaxed text-white">
              {"We're excited to have you onboard at"}
              <strong>{company}</strong>. We hope you enjoy your journey with us. If you have any
              questions or need assistance, feel free to reach out.
            </Text>
            <Section className="mt-8 mb-8 text-center">
              <Button
                className="rounded-md bg-white px-5 py-2.5 text-center text-sm font-semibold text-black no-underline"
                href={url}
              >
                Get Started
              </Button>
            </Section>
            <Text className="text-start text-sm text-white">
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

export default VerifyAccountEmail;
