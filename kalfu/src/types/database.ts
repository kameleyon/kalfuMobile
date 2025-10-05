export interface Profile {
  id: string;
  username: string;
  email: string;
  bio?: string;
  birth_date?: string;
  preferences?: Record<string, any>;
  reading_count: number;
  is_premium: boolean;
  premium_until?: string;
  created_at: string;
  updated_at: string;
}

export interface Reading {
  id: string;
  user_id: string;
  title?: string;
  question: string;
  spread_type: string;
  cards: TarotCard[];
  interpretation: string;
  ai_interpretation?: string;
  tags?: string[];
  is_public: boolean;
  is_favorite: boolean;
  share_token?: string;
  created_at: string;
  updated_at: string;
}

export interface TarotCard {
  id: string;
  name: string;
  arcana: 'major' | 'minor';
  suit?: 'cups' | 'pentacles' | 'swords' | 'wands';
  number?: number;
  keywords: string[];
  upright_meaning: string;
  reversed_meaning: string;
  element?: string;
  zodiac?: string;
  image_url?: string;
  reversed?: boolean;
  position?: string;
}

export interface CustomSpread {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  card_count: number;
  positions: SpreadPosition[];
  is_public: boolean;
  usage_count: number;
  created_at: string;
  updated_at: string;
}

export interface SpreadPosition {
  position: number;
  name: string;
  description: string;
}

export interface ReadingSession {
  id: string;
  user_id: string;
  reading_id?: string;
  status: 'active' | 'completed' | 'expired';
  messages: ChatMessage[];
  metadata?: Record<string, any>;
  expires_at: string;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  cards?: TarotCard[];
}

export interface Subscription {
  id: string;
  user_id: string;
  plan: 'free' | 'basic' | 'pro' | 'premium';
  status: 'active' | 'canceled' | 'expired';
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  current_period_end?: string;
  created_at: string;
  updated_at: string;
}

export interface UsageTracking {
  id: string;
  user_id: string;
  readings_this_month: number;
  last_reset: string;
  created_at: string;
  updated_at: string;
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>;
      };
      readings: {
        Row: Reading;
        Insert: Omit<Reading, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Reading, 'id' | 'created_at' | 'updated_at'>>;
      };
      tarot_cards: {
        Row: TarotCard;
        Insert: Omit<TarotCard, 'id'>;
        Update: Partial<Omit<TarotCard, 'id'>>;
      };
      custom_spreads: {
        Row: CustomSpread;
        Insert: Omit<CustomSpread, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<CustomSpread, 'id' | 'created_at' | 'updated_at'>>;
      };
      reading_sessions: {
        Row: ReadingSession;
        Insert: Omit<ReadingSession, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<ReadingSession, 'id' | 'created_at' | 'updated_at'>>;
      };
      subscriptions: {
        Row: Subscription;
        Insert: Omit<Subscription, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Subscription, 'id' | 'created_at' | 'updated_at'>>;
      };
      usage_tracking: {
        Row: UsageTracking;
        Insert: Omit<UsageTracking, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<UsageTracking, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
};