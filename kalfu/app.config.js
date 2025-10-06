export default {
  expo: {
    name: 'Kalfu',
    slug: 'kalfu',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'dark',
    newArchEnabled: true,
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#0F0116',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.kalfu.app',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#0F0116',
      },
      package: 'com.kalfu.app',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: ['expo-secure-store', 'expo-font'],
    extra: {
      EXPO_PUBLIC_SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL,
      EXPO_PUBLIC_SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
      EXPO_PUBLIC_SUPABASE_SERVICE_KEY: process.env.EXPO_PUBLIC_SUPABASE_SERVICE_KEY,
      EXPO_PUBLIC_OPENROUTER_API_KEY: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY,
      EXPO_PUBLIC_OPENROUTER_MODEL: process.env.EXPO_PUBLIC_OPENROUTER_MODEL,
      EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      EXPO_PUBLIC_STRIPE_SECRET_KEY: process.env.EXPO_PUBLIC_STRIPE_SECRET_KEY,
    },
  },
};