"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const configured = isSupabaseConfigured();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    if (!configured) {
      setMessage("Configura Supabase en .env.local antes de autenticar usuarios.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const authCall =
      mode === "login"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({ email, password });

    const { error } = await authCall;
    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    if (mode === "signup") {
      setMessage("Cuenta creada. Revisa tu email si Supabase requiere confirmación.");
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>{mode === "login" ? "Inicia sesión" : "Crea tu cuenta"}</CardTitle>
        <CardDescription>Supabase Auth listo para email y password.</CardDescription>
      </CardHeader>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
        </div>
        {message ? <p className="rounded-xl bg-slate-100 p-3 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-300">{message}</p> : null}
        {!configured ? <p className="text-sm text-amber-600">Faltan NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY.</p> : null}
        <Button className="w-full" disabled={loading} type="submit">
          {loading ? "Procesando..." : mode === "login" ? "Entrar" : "Registrarme"}
        </Button>
      </form>
      <button className="mt-4 text-sm font-medium text-slate-600 underline dark:text-slate-300" onClick={() => setMode(mode === "login" ? "signup" : "login")} type="button">
        {mode === "login" ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
      </button>
    </Card>
  );
}
