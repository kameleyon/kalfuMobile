import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientBackground } from '../components/GradientBackground';
import { SimpleBackground } from '../components/SimpleBackground';
import { colors, spacing, typography } from '../theme';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabase';
import { Ionicons } from '@expo/vector-icons';

export const SettingsScreen = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [usageCount, setUsageCount] = useState(0);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    loadProfile();
    loadUsage();
  }, []);

  const loadProfile = async () => {
    if (!user) return;

    try {
      const { data } = await (supabase
        .from('profiles') as any)
        .select('*')
        .eq('id', user.id)
        .single();

      if (data) {
        setProfile(data);
        setIsPremium(data.is_premium || false);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const loadUsage = async () => {
    if (!user) return;

    try {
      const { data } = await (supabase
        .from('usage_tracking') as any)
        .select('readings_this_month')
        .eq('user_id', user.id)
        .single();

      if (data) {
        setUsageCount(data.readings_this_month || 0);
      }
    } catch (error) {
      console.error('Error loading usage:', error);
    }
  };

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
            } catch (error: any) {
              Alert.alert('Error', error.message);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <GradientBackground />
      <SimpleBackground />
      
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>Kalfu</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={true}
        indicatorStyle="white"
        scrollIndicatorInsets={{ right: 1 }}
        style={styles.scrollView}
      >
        <View style={styles.bentoGrid}>
          <View style={styles.row1}>
            <View style={[styles.box, styles.box1]}>
              <Text style={styles.boxTitle}>Account</Text>
              <Text style={styles.boxLabel}>Email</Text>
              <Text style={styles.boxValue}>{user?.email}</Text>
              <Text style={styles.boxLabel}>Username</Text>
              <Text style={styles.boxValue}>{profile?.username || 'Not set'}</Text>
            </View>

            <View style={styles.col1}>
              <View style={[styles.box, styles.box2]}>
                <Text style={styles.boxTitle}>Plan</Text>
                <Text style={styles.planText}>{isPremium ? 'Premium' : 'Free'}</Text>
              </View>
              
              <View style={[styles.box, styles.box3]}>
                <Text style={styles.boxTitle}>Usage</Text>
                <Text style={styles.usageText}>{usageCount} / {isPremium ? '∞' : '5'}</Text>
              </View>
            </View>
          </View>

          <View style={[styles.box, styles.box4]}>
            <Text style={styles.boxTitle}>Preferences</Text>
            <View style={styles.prefRow}>
              <Text style={styles.prefLabel}>Notifications</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.whiteAlpha[85]} />
            </View>
          </View>

          <View style={styles.row2}>
            <View style={[styles.box, styles.box5]}>
              <TouchableOpacity onPress={handleSignOut} style={styles.signOutBox}>
                <Ionicons name="log-out-outline" size={32} color={colors.rebeccaPurple} />
                <Text style={styles.signOutText}>Sign Out</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.box, styles.box6]}>
              <Text style={styles.boxTitle}>Theme</Text>
              <Text style={styles.themeText}>Dark</Text>
            </View>
          </View>
        </View>

        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  logo: {
    width: 36,
    height: 36,
  },
  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.normal,
    color: colors.whiteAlpha[90],
    letterSpacing: 2,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  bentoGrid: {
    gap: spacing.md,
  },
  row1: {
    flexDirection: 'row',
    gap: spacing.md,
    height: 220,
  },
  col1: {
    flex: 1,
    gap: spacing.md,
  },
  row2: {
    flexDirection: 'row',
    gap: spacing.md,
    height: 180,
  },
  box: {
    borderRadius: 20,
    padding: spacing.lg,
  },
  box1: {
    flex: 2,
    backgroundColor: colors.whiteAlpha[10],
  },
  box2: {
    flex: 1,
    backgroundColor: colors.whiteAlpha[30],
  },
  box3: {
    flex: 1,
    backgroundColor: colors.whiteAlpha[20],
  },
  box4: {
    backgroundColor: colors.whiteAlpha[10],
    paddingVertical: spacing.lg,
  },
  box5: {
    flex: 1,
    backgroundColor: colors.whiteAlpha[30],
  },
  box6: {
    flex: 1,
    backgroundColor: colors.whiteAlpha[20],
  },
  boxTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.whiteAlpha[90],
    marginBottom: spacing.md,
  },
  boxLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.whiteAlpha[60],
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  boxValue: {
    fontSize: typography.fontSize.base,
    color: colors.whiteAlpha[90],
  },
  planText: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.medium,
    color: colors.whiteAlpha[90],
  },
  usageText: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.medium,
    color: colors.whiteAlpha[90],
  },
  prefRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  prefLabel: {
    fontSize: typography.fontSize.base,
    color: colors.whiteAlpha[90],
  },
  signOutBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  signOutText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.whiteAlpha[90],
  },
  themeText: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.medium,
    color: colors.whiteAlpha[90],
  },
  versionText: {
    textAlign: 'center',
    color: colors.whiteAlpha[50],
    fontSize: typography.fontSize.sm,
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
});