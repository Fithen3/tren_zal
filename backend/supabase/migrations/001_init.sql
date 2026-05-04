-- ============================================
-- Fitness House Архангельск — Supabase Schema
-- Run these in: Supabase Dashboard → SQL Editor
-- ============================================

-- 1. Leads (заявки с форм)
CREATE TABLE IF NOT EXISTS leads (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT        NOT NULL,
  phone       TEXT        NOT NULL,
  email       TEXT,
  service     TEXT,
  club        TEXT        NOT NULL DEFAULT 'Архангельск Московский',
  type        TEXT        NOT NULL DEFAULT 'lead',   -- lead | tour | callback
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. News (новости клубов)
CREATE TABLE IF NOT EXISTS news (
  id          BIGSERIAL PRIMARY KEY,
  club_id     INTEGER     NOT NULL DEFAULT 2194,
  text        TEXT        NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id              BIGSERIAL PRIMARY KEY,
  email           TEXT        NOT NULL UNIQUE,
  club            TEXT        NOT NULL DEFAULT 'Архангельск Московский',
  subscribed_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- Row Level Security
-- ============================================

-- leads: only backend service key can read/write
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role_all_leads"
  ON leads FOR ALL
  USING (auth.role() = 'service_role');

-- news: public read, service_role write
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_news"
  ON news FOR SELECT
  USING (true);
CREATE POLICY "service_role_write_news"
  ON news FOR INSERT
  USING (auth.role() = 'service_role');

-- newsletter: service_role only
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role_all_newsletter"
  ON newsletter_subscribers FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================
-- Sample news data
-- ============================================

INSERT INTO news (club_id, text, created_at) VALUES
(2194,
 'Уважаемые посетители! Обращаем Ваше внимание на режим работы клубов в майские праздники: 1–4 мая — 08:00–22:00, 5 мая (суббота) — по обычному расписанию.',
 '2026-04-25 10:00:00+00'),
(2194,
 'Апрель — время обновлений! Мы обновили оборудование в зоне свободных весов. Новые стойки, штанги и гантели уже ждут вас.',
 '2026-04-10 12:00:00+00');
