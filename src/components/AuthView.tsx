import React, { useState } from 'react';
import { AppView, AuthMode } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { signInWithGoogle } from '../lib/firebase';

interface AuthViewProps {
  onLogin: (name: string, email: string) => void;
  onNavigate: (view: AppView) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({
  onLogin,
  onNavigate
}) => {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const user = await signInWithGoogle();
      if (user) {
        onLogin(user.displayName || user.email?.split('@')[0] || 'Estudante Kairo', user.email || '');
        onNavigate('dashboard');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Falha ao realizar login com Google');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoData = () => {
    setEmail('alex.estudante@kairo.edu');
    setPassword('demo123456');
    setName('Alex Silva');
    setErrorMessage(null);
  };

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

        {/* Google Sign In Button */}
        {mode !== 'sent' && (
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-3 px-4 bg-white border border-[#dcc1ba] rounded-xl text-xs font-semibold text-[#1e1b18] hover:bg-[#faf4f0] transition-colors shadow-sm flex items-center justify-center gap-2.5 disabled:opacity-60"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Entrar com Google</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[#dcc1ba]/60"></div>
              <span className="text-[11px] font-medium text-[#89726c] uppercase">ou com e-mail</span>
              <div className="flex-1 h-px bg-[#dcc1ba]/60"></div>
            </div>
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

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={fillDemoData}
                className="text-xs text-[#9a4029] font-medium hover:underline flex items-center justify-center gap-1 mx-auto"
              >
                <span className="material-symbols-outlined text-[16px]">science</span>
                <span>Preencher com conta de teste (Alex Silva)</span>
              </button>
            </div>
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

