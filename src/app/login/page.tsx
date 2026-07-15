import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="mx-auto grid min-h-[calc(100vh-4.5rem)] w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <section className="hidden lg:block">
        <p className="vintage-kicker">Your monthly desk</p>
        <h1 className="mt-6 max-w-lg text-6xl leading-[0.96]">Order for every monthly close.</h1>
        <p className="mt-6 max-w-md text-lg leading-8 text-slate-600">
          Keep every client, request, and document in one calm workspace—without another email thread.
        </p>
        <div className="mt-10 flex items-center gap-5">
          <span className="postmark">Private<br />workspace</span>
          <p className="max-w-xs border-l border-slate-300 pl-5 text-sm leading-6 text-slate-600">
            Secure authentication and private file storage powered by Supabase.
          </p>
        </div>
      </section>
      <div className="lg:justify-self-end">
        <LoginForm />
      </div>
    </main>
  );
}
