/* 
# Blue Ocean Discovery Platform Schema
1. New Tables
  - `profiles`: User skills, budget, and availability
  - `opportunities`: Discovered blue ocean market gaps
  - `concepts`: Refined SaaS product ideas
  - `experiments`: Validation tests for concepts
  - `signals`: Recorded data from validation experiments
2. Security
  - RLS enabled on all tables
  - Policies for users to manage their own data
*/

-- User Profiles
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name text,
  experience_level text DEFAULT 'intermediate',
  tech_stack text[] DEFAULT '{}',
  weekly_hours integer DEFAULT 20,
  budget numeric DEFAULT 1000,
  interests text[] DEFAULT '{}',
  avoid_domains text[] DEFAULT '{}',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own profile" ON profiles FOR ALL USING (auth.uid() = id);

-- Opportunities
CREATE TABLE IF NOT EXISTS opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  title text NOT NULL,
  niche text NOT NULL,
  audience text,
  blue_ocean_angle text,
  difficulty integer DEFAULT 5,
  potential_arpu numeric DEFAULT 0,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own opportunities" ON opportunities FOR ALL USING (auth.uid() = user_id);

-- SaaS Concepts
CREATE TABLE IF NOT EXISTS concepts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id uuid REFERENCES opportunities ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  name text NOT NULL,
  tagline text,
  one_liner text,
  variant text,
  lean_canvas jsonb DEFAULT '{}',
  risks jsonb DEFAULT '{}',
  pricing_model text,
  build_time_estimate text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE concepts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own concepts" ON concepts FOR ALL USING (auth.uid() = user_id);

-- Experiments & Signals
CREATE TABLE IF NOT EXISTS experiments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  concept_id uuid REFERENCES concepts ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  name text NOT NULL,
  type text NOT NULL,
  status text DEFAULT 'ready',
  results jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE experiments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own experiments" ON experiments FOR ALL USING (auth.uid() = user_id);