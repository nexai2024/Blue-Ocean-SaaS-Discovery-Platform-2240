/* 
# Phase 2 Schema - Deep Dives & Validation Signals

1. New Tables
  - `deep_dives_1740480000000`
    - Stores AI-generated niche deep-dive analysis results
    - `id` (uuid, primary key)
    - `user_id` (uuid, references auth.users)
    - `niche` (text)
    - `geography` (text)
    - `analysis_data` (jsonb) - full AI response
    - `created_at` (timestamptz)
  - `validation_signals_1740480000000`
    - Stores real-time validation metrics for concept testing
    - `id` (uuid, primary key)
    - `user_id` (uuid, references auth.users, unique)
    - `concept_id` (uuid, references concepts, nullable)
    - `visits` (integer, default 0)
    - `signups` (integer, default 0)
    - `calls` (integer, default 0)
    - `preorders` (integer, default 0)
    - `updated_at` (timestamptz)

2. Security
  - RLS enabled on all new tables
  - Users can only manage their own data
*/

-- Deep Dives Table
CREATE TABLE IF NOT EXISTS deep_dives_1740480000000 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  niche text NOT NULL,
  geography text DEFAULT 'global',
  analysis_data jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE deep_dives_1740480000000 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own deep dives" 
ON deep_dives_1740480000000 FOR ALL 
USING (auth.uid() = user_id);

-- Validation Signals Table (one row per user, upsert pattern)
CREATE TABLE IF NOT EXISTS validation_signals_1740480000000 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL UNIQUE,
  concept_id uuid REFERENCES concepts_1740480000000 ON DELETE SET NULL,
  visits integer DEFAULT 0,
  signups integer DEFAULT 0,
  calls integer DEFAULT 0,
  preorders integer DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE validation_signals_1740480000000 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own validation signals" 
ON validation_signals_1740480000000 FOR ALL 
USING (auth.uid() = user_id);
