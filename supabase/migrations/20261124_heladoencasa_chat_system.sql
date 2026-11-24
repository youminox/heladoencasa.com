-- Migration: heladoencasa_chat_system
-- Tablas para HeladoEnCasa.com (Chat IA gpt-4o-mini predeterminado + Índice de Artículos + Clics Amazon)

CREATE TABLE IF NOT EXISTS public.heladoencasa_chat_config (
  id text PRIMARY KEY DEFAULT 'default',
  is_enabled boolean NOT NULL DEFAULT true,
  ai_model text NOT NULL DEFAULT 'gpt-4o-mini',
  temperature numeric NOT NULL DEFAULT 0.35,
  max_messages_per_session integer NOT NULL DEFAULT 30,
  daily_budget_usd numeric NOT NULL DEFAULT 5.0,
  welcome_message text NOT NULL DEFAULT '¡Hola! 🍨✨ Soy tu Asesor de Máquinas de Helado IA de HeladoEnCasa.com (modelo mini rápido). Cuéntame tu presupuesto, cuántas porciones necesitas, si tienes espacio en el congelador o si buscas vasos/tapas compatibles para Ninja CREAMi o Cuisinart y recetas de helados o sorbetes, y te recomendaré la mejor opción en Amazon Estados Unidos.',
  custom_instructions text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO public.heladoencasa_chat_config (
  id, is_enabled, ai_model, temperature, max_messages_per_session, daily_budget_usd, welcome_message, custom_instructions
)
VALUES (
  'default',
  true,
  'gpt-4o-mini',
  0.35,
  30,
  5.0,
  '¡Hola! 🍨✨ Soy tu Asesor de Máquinas de Helado IA de HeladoEnCasa.com (modelo mini rápido). Cuéntame tu presupuesto, cuántas porciones necesitas, si tienes espacio en el congelador o si buscas vasos/tapas compatibles para Ninja CREAMi o Cuisinart y recetas de helados o sorbetes, y te recomendaré la mejor opción en Amazon Estados Unidos.',
  ''
)
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.heladoencasa_chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id text NOT NULL,
  page_url text,
  user_agent text,
  first_user_message text,
  last_user_message text,
  messages_count integer NOT NULL DEFAULT 0,
  clicks_count integer NOT NULL DEFAULT 0,
  recommended_articles jsonb NOT NULL DEFAULT '[]'::jsonb,
  clicked_urls jsonb NOT NULL DEFAULT '[]'::jsonb,
  prompt_tokens integer NOT NULL DEFAULT 0,
  completion_tokens integer NOT NULL DEFAULT 0,
  total_tokens integer NOT NULL DEFAULT 0,
  estimated_cost_usd numeric NOT NULL DEFAULT 0,
  model_used text NOT NULL DEFAULT 'gpt-4o-mini',
  created_at timestamptz NOT NULL DEFAULT now(),
  last_message_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.heladoencasa_chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.heladoencasa_chat_sessions(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  recommended_articles jsonb NOT NULL DEFAULT '[]'::jsonb,
  suggested_options jsonb NOT NULL DEFAULT '[]'::jsonb,
  model text,
  prompt_tokens integer NOT NULL DEFAULT 0,
  completion_tokens integer NOT NULL DEFAULT 0,
  total_tokens integer NOT NULL DEFAULT 0,
  cost_usd numeric NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.heladoencasa_chat_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES public.heladoencasa_chat_sessions(id) ON DELETE SET NULL,
  visitor_id text,
  article_slug text,
  article_title text,
  category text,
  target_url text NOT NULL,
  page_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.heladoencasa_articles (
  slug text PRIMARY KEY,
  title text NOT NULL,
  category text NOT NULL,
  category_name text NOT NULL,
  excerpt text,
  featured_image text,
  read_time text DEFAULT '7 min',
  search_text text,
  active boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_heladoencasa_sessions_last_msg ON public.heladoencasa_chat_sessions (last_message_at DESC);
CREATE INDEX IF NOT EXISTS idx_heladoencasa_messages_session ON public.heladoencasa_chat_messages (session_id, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_heladoencasa_clicks_created ON public.heladoencasa_chat_clicks (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_heladoencasa_articles_cat ON public.heladoencasa_articles (category) WHERE active = true;

ALTER TABLE public.heladoencasa_chat_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.heladoencasa_chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.heladoencasa_chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.heladoencasa_chat_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.heladoencasa_articles ENABLE ROW LEVEL SECURITY;
