import React, { useState } from 'react';
import { AppView, AuthMode } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthViewProps {
  onLogin: (name: string, email: string) => void;
  onNavigate: (view: AppView) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({
  onLogin,
  onNavigate
}) => {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState<string>('alex.estudante@kairo.edu');
  const [password, setPassword] = useState<string>('••••••••');
  const [name, setName] = useState<string>('Alex Silva');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      if (mode === 'forgot') {
        if (isSupabaseConfigured && supabase) {
          const { error } = await supabase.auth.resetPasswordForEmail(email);
          if (error) {
            setErrorMessage(error.message);
            setLoading(false);
            return;
          }
        }
        setMode('sent');
        setLoading(false);
        return;
      }

      if (mode === 'signin') {
        if (isSupabaseConfigured && supabase) {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password: password
          });

          if (error) {
            setErrorMessage(
              error.message === 'Invalid login credentials'
                ? 'E-mail ou senha incorretos. Verifique suas credenciais.'
                : error.message
            );
            setLoading(false);
            return;
          }

          const fullName = data.user?.user_metadata?.full_name || data.user?.user_metadata?.name || name || email.split('@')[0];
          onLogin(fullName, data.user?.email || email);
          onNavigate('dashboard');
        } else {
          // Fallback if env vars not set yet
          onLogin(name || 'Alex Silva', email);
          onNavigate('dashboard');
        }
      } else if (mode === 'signup') {
        if (isSupabaseConfigured && supabase) {
          const { data, error } = await supabase.auth.signUp({
            email: email.trim(),
            password: password,
            options: {
              data: {
                full_name: name.trim()
              }
            }
          });

          if (error) {
            setErrorMessage(error.message);
            setLoading(false);
            return;
          }

          if (data.session) {
            onLogin(name.trim() || 'Estudante Kairo', email);
            onNavigate('dashboard');
          } else {
            setSuccessMessage('Conta criada com sucesso! Verifique seu caixa de e-mail para confirmação.');
          }
        } else {
          onLogin(name || 'Alex Silva', email);
          onNavigate('dashboard');
        }
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Ocorreu um erro ao processar a autenticação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8f5] text-[#1e1b18] flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md bg-[#fff8f5] rounded-3xl p-8 border border-[#dcc1ba] shadow-xl space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-[#9a4029] text-white flex items-center justify-center font-bold text-xl mx-auto shadow-sm">
            K
          </div>
          <span className="font-serif text-2xl font-bold text-[#9a4029] block">
            Kairo Management System
          </span>
          <p className="text-xs text-[#56423d]">
            Autenticação Supabase Auth & Gestão Acadêmica
          </p>
        </div>

        {!isSupabaseConfigured && (
          <div className="p-3 bg-[#fef3c7] border border-[#f59e0b]/40 rounded-xl text-[11px] text-[#92400e] space-y-1">
            <span className="font-bold block">Aviso Supabase Auth:</span>
            <p>
              As variáveis <code>VITE_SUPABASE_URL</code> e <code>VITE_SUPABASE_ANON_KEY</code> não estão preenchidas. O login local funcionará como demonstração.
            </p>
          </div>
        )}

        {/* Mode Switcher */}
        {mode !== 'sent' && (
          <div className="flex bg-[#f5ece7] p-1 rounded-xl border border-[#dcc1ba]/60">
            <button
              onClick={() => {
                setMode('signin');
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                mode === 'signin' ? 'bg-[#9a4029] text-white shadow-sm' : 'text-[#56423d]'
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => {
                setMode('signup');
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                mode === 'signup' ? 'bg-[#9a4029] text-white shadow-sm' : 'text-[#56423d]'
              }`}
            >
              Criar Conta
            </button>
          </div>
        )}

        {/* Notification Banners */}
        {errorMessage && (
          <div className="p-3 bg-[#fee2e2] border border-[#f87171] rounded-xl text-xs text-[#991b1b] flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3 bg-[#dcfce7] border border-[#4ade80] rounded-xl text-xs text-[#166534] flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form Body */}
        {mode === 'sent' ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-12 h-12 rounded-full bg-[#f2dccb] text-[#9a4029] flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[24px]">mark_email_read</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1e1b18]">
              Instruções Enviadas!
            </h3>
            <p className="text-xs text-[#56423d] leading-relaxed">
              Enviamos um link de redefinição de senha para <strong>{email}</strong>.
            </p>
            <button
              onClick={() => {
                setMode('signin');
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className="w-full py-3 bg-[#9a4029] text-white rounded-xl text-xs font-semibold uppercase tracking-wider"
            >
              Voltar ao Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#56423d] uppercase">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#f5ece7] border border-[#dcc1ba] text-xs text-[#1e1b18] outline-none focus:border-[#9a4029]"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#56423d] uppercase">E-mail</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#f5ece7] border border-[#dcc1ba] text-xs text-[#1e1b18] outline-none focus:border-[#9a4029]"
              />
            </div>

            {mode !== 'forgot' && (
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-semibold text-[#56423d] uppercase">Senha</label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => {
                        setMode('forgot');
                        setErrorMessage(null);
                        setSuccessMessage(null);
                      }}
                      className="text-[11px] font-semibold text-[#9a4029] hover:underline"
                    >
                      Esqueceu?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#f5ece7] border border-[#dcc1ba] text-xs text-[#1e1b18] outline-none focus:border-[#9a4029]"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#9a4029] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#b9583e] transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading && <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>}
              <span>
                {mode === 'signin' ? 'Acessar Kairo' : mode === 'signup' ? 'Criar Minha Conta' : 'Enviar Link'}
              </span>
            </button>
          </form>
        )}

        <div className="text-center pt-2">
          <button
            onClick={() => onNavigate('landing')}
            className="text-xs text-[#89726c] hover:text-[#1e1b18] underline"
          >
            Voltar à Página Inicial
          </button>
        </div>
      </div>
    </div>
  );
};

