import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { GradientBackground } from '../../components/GradientBackground';
import { GlassCard } from '../../components/GlassCard';
import { colors, spacing, typography } from '../../theme';

export const ForgotPasswordScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    try {
      setLoading(true);
      await resetPassword(email);
      Alert.alert(
        'Success',
        'Password reset link sent! Please check your email.',
        [{ text: 'OK', onPress: () => navigation.navigate('SignIn') }]
      );
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <GradientBackground />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>Enter your email to receive a reset link</Text>

          <GlassCard style={styles.card}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={colors.whiteAlpha[50]}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleResetPassword}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Text>
            </TouchableOpacity>
          </GlassCard>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>Back to Sign In</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.medium,
    color: colors.rebeccaPurple,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
    color: colors.whiteAlpha[85],
    textAlign: 'center',
    marginBottom: spacing['2xl'],
  },
  card: {
    marginBottom: spacing.lg,
  },
  input: {
    backgroundColor: colors.whiteAlpha[10],
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    color: colors.whiteAlpha[90],
    fontSize: typography.fontSize.base,
    borderWidth: 1,
    borderColor: colors.whiteAlpha[20],
  },
  button: {
    backgroundColor: colors.rebeccaPurple,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: colors.whiteAlpha[90],
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
  },
  backButton: {
    alignItems: 'center',
  },
  backText: {
    color: colors.rebeccaPurple,
    fontSize: typography.fontSize.base,
  },
});