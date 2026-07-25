-- ==============================================================================
-- KAIRO MANAGEMENT SYSTEM - SUPABASE DATABASE SCHEMA
-- ==============================================================================
-- Execute este script no SQL Editor do seu Dashboard Supabase (https://app.supabase.com)
-- ==============================================================================

-- Extensão UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. USERS TABLE (Perfil do Usuário vinculado ao Supabase Auth)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL DEFAULT 'Estudante Kairo',
    streak_days INTEGER NOT NULL DEFAULT 1,
    target_language VARCHAR(5) NOT NULL DEFAULT 'EN',
    goal TEXT DEFAULT 'conversar',
    custom_goal TEXT DEFAULT '',
    daily_minutes INTEGER NOT NULL DEFAULT 45,
    self_level TEXT DEFAULT 'intermediate',
    total_hours_studied NUMERIC(5, 2) DEFAULT 18.5,
    weekly_goal_hours NUMERIC(4, 2) DEFAULT 5.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 2. LANGUAGE PROGRESS TABLE (Progresso Multilíngue: EN, FR, ES, IT)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.language_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    language_code VARCHAR(5) NOT NULL, -- 'EN', 'FR', 'ES', 'IT'
    level_tag VARCHAR(20) NOT NULL DEFAULT 'A1', -- 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'
    fluency_percent INTEGER NOT NULL DEFAULT 10,
    hours_studied NUMERIC(5, 2) NOT NULL DEFAULT 0.0,
    recommended_focus TEXT DEFAULT 'Vocabulário do Dia a Dia',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, language_code)
);

-- ------------------------------------------------------------------------------
-- 3. VOCABULARY REPOSITORY TABLE (Palavras, Pronúncia IPA & Tradução)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.vocabulary_repository (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    language VARCHAR(5) NOT NULL, -- 'EN', 'FR', 'ES', 'IT'
    word TEXT NOT NULL,
    ipa TEXT NOT NULL,
    translation TEXT NOT NULL,
    example TEXT,
    category VARCHAR(30) NOT NULL DEFAULT 'substantivo', -- 'substantivo', 'verbo', 'adjetivo', 'expressao'
    date_added DATE DEFAULT CURRENT_DATE,
    mastered BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 4. STUDY SCHEDULES TABLE (Cronograma Semanal Adaptativo & Tarefas)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.study_schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    day_name VARCHAR(20) NOT NULL, -- 'Segunda-feira', 'Terça-feira', etc.
    day_code VARCHAR(2) NOT NULL, -- 'M', 'T', 'W', 'T', 'F', 'S'
    active BOOLEAN NOT NULL DEFAULT TRUE,
    tasks JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array de tarefas planejadas
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, day_name)
);

-- ------------------------------------------------------------------------------
-- ÍNDICES DE DESEMPENHO
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_vocab_user_lang ON public.vocabulary_repository(user_id, language);
CREATE INDEX IF NOT EXISTS idx_lang_progress_user ON public.language_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_schedule_user ON public.study_schedules(user_id);

-- ------------------------------------------------------------------------------
-- SEGURANÇA: ROW LEVEL SECURITY (RLS)
-- ------------------------------------------------------------------------------
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.language_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vocabulary_repository ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_schedules ENABLE ROW LEVEL SECURITY;

-- Políticas para user_profiles
DROP POLICY IF EXISTS "Usuários acessam apenas o próprio perfil" ON public.user_profiles;
CREATE POLICY "Usuários acessam apenas o próprio perfil" ON public.user_profiles
    FOR ALL USING (auth.uid() = id);

-- Políticas para language_progress
DROP POLICY IF EXISTS "Usuários acessam apenas seu próprio progresso" ON public.language_progress;
CREATE POLICY "Usuários acessam apenas seu próprio progresso" ON public.language_progress
    FOR ALL USING (auth.uid() = user_id);

-- Políticas para vocabulary_repository
DROP POLICY IF EXISTS "Usuários acessam apenas seu próprio vocabulário" ON public.vocabulary_repository;
CREATE POLICY "Usuários acessam apenas seu próprio vocabulário" ON public.vocabulary_repository
    FOR ALL USING (auth.uid() = user_id);

-- Políticas para study_schedules
DROP POLICY IF EXISTS "Usuários acessam apenas seu próprio cronograma" ON public.study_schedules;
CREATE POLICY "Usuários acessam apenas seu próprio cronograma" ON public.study_schedules
    FOR ALL USING (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- TRIGGER AUTOMÁTICO DE CRIAÇÃO DE PERFIL NO CADASTRO (SIGNUP)
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Cria perfil básico
    INSERT INTO public.user_profiles (id, email, name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'Estudante Kairo')
    );

    -- Semeia os dados padrão de idiomas para o novo usuário
    INSERT INTO public.language_progress (user_id, language_code, level_tag, fluency_percent, hours_studied)
    VALUES
        (NEW.id, 'EN', 'B1', 62, 12.5),
        (NEW.id, 'FR', 'A2', 45, 6.2),
        (NEW.id, 'ES', 'A1', 20, 3.5),
        (NEW.id, 'IT', 'A1', 12, 2.0);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger no evento de inserção de novo auth.user
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
