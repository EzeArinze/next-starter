import { Github } from 'lucide-react';
import Link from 'next/link';

export default function StarterInfoPage() {
  return (
    <div className="flex w-full justify-center px-6 py-4">
      <div className="bg-background mx-auto w-full max-w-xl space-y-6 rounded-2xl p-8 shadow-sm">
        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Next.js Starter Template</h1>
          <p className="text-muted-foreground text-sm">
            This project is a clean starting point for building modern full-stack applications.
          </p>
        </div>

        {/* Stack */}
        <div className="space-y-3">
          <h2 className="text-foreground text-sm font-medium">Included stack</h2>

          <ul className="text-muted-foreground space-y-2 text-sm">
            <li>
              • Authentication with <span className="text-foreground font-medium">better-auth</span>
            </li>
            <li>
              • Database ORM using <span className="text-foreground font-medium">Drizzle</span>
            </li>
            <li>
              • <span className="text-foreground font-medium">PostgreSQL</span> as the database
            </li>
            <li>
              • API layer powered by <span className="text-foreground font-medium">oRPC</span>
            </li>
            <li>
              • Server state handled with{' '}
              <span className="text-foreground font-medium">React Query</span>
            </li>
            <li>
              • Env handled with <span className="text-foreground font-medium">T3 env</span>
            </li>
            <li>
              • Ui: <span className="text-foreground font-medium">Shadcn</span>
            </li>
            <li>
              • Animation: <span className="text-foreground font-medium">Motion</span>
            </li>
          </ul>
        </div>

        {/* Coming soon */}
        <div className="bg-muted/40 rounded-lg border border-dashed p-4">
          <p className="text-muted-foreground text-sm">
            🔒 <span className="text-foreground font-medium">Arcjet</span> integration (rate
            limiting & security) will be added soon.
          </p>
        </div>

        {/* Instructions */}
        <div className="space-y-3">
          <h2 className="text-foreground text-sm font-medium">How to use this template</h2>

          <ol className="text-muted-foreground space-y-2 text-sm">
            <li>1. Fork this repository on GitHub to create your own copy.</li>
            <li>2. Clone your forked repository to your local machine.</li>
            <li>3. Install dependencies and set up your environment variables.</li>
            <li>4. Update the database connection and run migrations.</li>
            <li>5. Start building your application on top of the existing setup.</li>
          </ol>

          <p className="text-muted-foreground text-xs">
            Forking ensures all your changes stay in your own repository and do not affect this one.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-muted-foreground text-xs">
            Build on top of this template however you like.
          </p>

          <Link
            href="https://github.com/EzeArinze/next-starter.git"
            target="_blank"
            className="hover:bg-muted inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
          >
            <Github className="size-4" />
            View on GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}
