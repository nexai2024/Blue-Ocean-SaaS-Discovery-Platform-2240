/* 
# Initial Schema for Blue Ocean Discovery

1. New Tables
  - `profiles_1740480000000`
    - `id` (uuid, primary key, references auth.users)
    - `full_name` (text)
    - `experience_level` (text, default 'intermediate')
    - `tech_stack` (text array)
    - `weekly_hours` (int, default 20)
    - `budget` (numeric, default 1000)
    - `interests` (text array)
    - `avoid_domains` (text array)
  - `opportunities_1740480000000`
    - `id` (uuid, primary key)
    - `user_id` (uuid, references auth.users)
    - `title` (text)
    - `niche` (text)
    - `audience` (text)
    - `blue_ocean_angle` (text)
    - `difficulty` (int)
    - `potential_arpu` (numeric)
    - `status` (text)
  - `concepts_1740480000000`
    - `id` (uuid, primary key)
    - `opportunity_id` (uuid, references opportunities)
    - `user_id` (uuid, references auth.users)
    - `name` (text)
    - `tagline` (text)
    - `one_liner` (text)
    - `lean_canvas` (jsonb)
    - `risks` (jsonb)
    - `pricing_model` (text)
    - `build_time_estimate` (text)
  - `experiments_1740480000000`
    - `id` (uuid, primary key)
    - `concept_id` (uuid, references concepts)
    - `user_id` (uuid, references auth.users)
    - `name` (text)
    - `type` (text)
    - `status` (text)
    - `results` (jsonb)

2. Security
  - Enable RLS on all tables
  - Add policies for authenticated users to manage their own data
*/

-- Profiles Table
CREATE TABLE IF NOT EXISTS profiles_1740480000000 (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name text DEFAULT '',
  experience_level text DEFAULT 'intermediate',
  tech_stack text[] DEFAULT '{}',
  weekly_hours integer DEFAULT 20,
  budget numeric DEFAULT 1000,
  interests text[] DEFAULT '{}',
  avoid_domains text[] DEFAULT '{}',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles_1740480000000 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own profile" 
ON profiles_1740480000000 FOR ALL 
USING (auth.uid() = id);

-- Opportunities Table
CREATE TABLE IF NOT EXISTS opportunities_1740480000000 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  title text NOT NULL,
  niche text NOT NULL,
  audience text DEFAULT '',
  blue_ocean_angle text DEFAULT '',
  difficulty integer DEFAULT 5,
  potential_arpu numeric DEFAULT 0,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE opportunities_1740480000000 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own opportunities" 
ON opportunities_1740480000000 FOR ALL 
USING (auth.uid() = user_id);

-- Concepts Table
CREATE TABLE IF NOT EXISTS concepts_1740480000000 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id uuid REFERENCES opportunities_1740480000000 ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  name text NOT NULL,
  tagline text DEFAULT '',
  one_liner text DEFAULT '',
  lean_canvas jsonb DEFAULT '{}',
  risks jsonb DEFAULT '{}',
  pricing_model text DEFAULT '',
  build_time_estimate text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE concepts_1740480000000 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own concepts" 
ON concepts_1740480000000 FOR ALL 
USING (auth.uid() = user_id);

-- Experiments Table
CREATE TABLE IF NOT EXISTS experiments_1740480000000 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  concept_id uuid REFERENCES concepts_1740480000000 ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  name text NOT NULL,
  type text NOT NULL,
  status text DEFAULT 'ready',
  results jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE experiments_1740480000000 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own experiments" 
ON experiments_1740480000000 FOR ALL 
USING (auth.uid() = user_id);