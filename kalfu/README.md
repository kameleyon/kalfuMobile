# Kalfu - AI Tarot Reading App

A modern, native React mobile app for AI-powered tarot readings built with Expo.

## Features

- 🔮 AI-powered tarot readings with streaming responses
- 💬 Conversational interface with Agent Kalfu
- 📚 Reading history with favorites
- 🌙 Beautiful dark theme with glassmorphism design
- 🔐 Secure authentication with Supabase
- ⭐ Subscription tiers (Free, Basic, Pro, Premium)

## Setup

### Prerequisites

- Node.js 20.x or higher
- Expo CLI
- Supabase account
- OpenRouter API key
- Stripe account (for payments)

### Installation

1. Clone the repository
2. Install dependencies:
```bash
cd kalfu
npm install
```

3. Copy `.env` file with your credentials (already provided)

4. Set up Supabase database with the schema below

5. Run the app:
```bash
npm start
```

## Database Schema

Run these SQL commands in your Supabase SQL editor:

```sql
-- Profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  bio TEXT,
  birth_date DATE,
  preferences JSONB DEFAULT '{}'::jsonb,
  reading_count INTEGER DEFAULT 0,
  is_premium BOOLEAN DEFAULT false,
  premium_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Readings table
CREATE TABLE readings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT,
  question TEXT NOT NULL,
  spread_type TEXT NOT NULL,
  cards JSONB NOT NULL DEFAULT '[]'::jsonb,
  interpretation TEXT NOT NULL,
  ai_interpretation TEXT,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  is_public BOOLEAN DEFAULT false,
  is_favorite BOOLEAN DEFAULT false,
  share_token TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Custom spreads table
CREATE TABLE custom_spreads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  card_count INTEGER NOT NULL,
  positions JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_public BOOLEAN DEFAULT false,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reading sessions table
CREATE TABLE reading_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  reading_id UUID REFERENCES readings(id) ON DELETE SET NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'completed', 'expired')),
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  plan TEXT NOT NULL CHECK (plan IN ('free', 'basic', 'pro', 'premium')),
  status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'expired')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Usage tracking table
CREATE TABLE usage_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  readings_this_month INTEGER DEFAULT 0,
  last_reset TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tarot cards reference table
CREATE TABLE tarot_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  arcana TEXT NOT NULL CHECK (arcana IN ('major', 'minor')),
  suit TEXT CHECK (suit IN ('cups', 'pentacles', 'swords', 'wands')),
  number INTEGER,
  keywords TEXT[] DEFAULT ARRAY[]::TEXT[],
  upright_meaning TEXT NOT NULL,
  reversed_meaning TEXT NOT NULL,
  element TEXT,
  zodiac TEXT,
  image_url TEXT
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_spreads ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_tracking ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own readings" ON readings FOR SELECT USING (auth.uid() = user_id OR is_public = true);
CREATE POLICY "Users can create own readings" ON readings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own readings" ON readings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own readings" ON readings FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own sessions" ON reading_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own sessions" ON reading_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own sessions" ON reading_sessions FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own subscription" ON subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own usage" ON usage_tracking FOR SELECT USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_readings_user_id ON readings(user_id);
CREATE INDEX idx_readings_created_at ON readings(created_at DESC);
CREATE INDEX idx_sessions_user_id ON reading_sessions(user_id);
CREATE INDEX idx_sessions_status ON reading_sessions(status);
```

## Tech Stack

- **Frontend**: React Native + Expo
- **Language**: TypeScript
- **Navigation**: React Navigation
- **State**: React Context API
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **AI**: OpenRouter (Claude Sonnet 4.5)
- **Payments**: Stripe
- **UI**: Custom glassmorphism design

## Project Structure

```
kalfu/
├── src/
│   ├── components/       # Reusable UI components
│   ├── screens/          # App screens
│   │   ├── auth/         # Authentication screens
│   │   ├── ChatScreen.tsx
│   │   ├── HistoryScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── navigation/       # Navigation setup
│   ├── services/         # API services
│   ├── context/          # React contexts
│   ├── hooks/            # Custom hooks
│   ├── types/            # TypeScript types
│   ├── theme/            # Design tokens
│   └── utils/            # Utility functions
├── assets/               # Images and fonts
├── .env                  # Environment variables
└── app.config.js         # Expo configuration
```

## Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS (macOS only)
- `npm run web` - Run on web

## Environment Variables

All environment variables are prefixed with `EXPO_PUBLIC_` and configured in `.env`:

- Supabase credentials
- OpenRouter API key
- Stripe keys
- Other service keys

## License

Proprietary