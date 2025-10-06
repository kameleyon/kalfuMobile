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
  Image,
  ScrollView,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { GradientBackground } from '../../components/GradientBackground';
import { SimpleBackground } from '../../components/SimpleBackground';
import { colors, spacing, typography } from '../../theme';

export const SignInScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      await signIn(email, password);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <GradientBackground />
      <SimpleBackground />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Image
              source={require('../../../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          
            <Text style={styles.subtitle}>At a crossroad, take a leap</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.formCard}>
              <Text style={styles.formTitle}>Welcome</Text>
              <Text style={styles.formSubtitle}>Sign in to continue </Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>EMAIL</Text>
                <TextInput
                  style={styles.input}
                  placeholder="hello@example.com"
                  placeholderTextColor={colors.whiteAlpha[40]}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>PASSWORD</Text>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor={colors.whiteAlpha[40]}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity
                style={styles.forgotButton}
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.signInButton, loading && styles.buttonDisabled]}
                onPress={handleSignIn}
                disabled={loading}
              >
                <Text style={styles.signInButtonText}>
                  {loading ? 'Signing In...' : 'Sign In'}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.signUpButton}
              onPress={() => navigation.navigate('SignUp')}
            >
              <Text style={styles.signUpText}>
                Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing['3xl'],
    paddingBottom: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: spacing.md,
  },
  appName: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.normal,
    color: colors.whiteAlpha[90],
    letterSpacing: 8,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.whiteAlpha[60],
    letterSpacing: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  formCard: {
    backgroundColor: colors.whiteAlpha[5],
    borderRadius: 24,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.whiteAlpha[10],
  },
  formTitle: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.normal,
    color: colors.whiteAlpha[90],
    marginBottom: spacing.xs,
  },
  formSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.whiteAlpha[60],
    marginBottom: spacing.xl,
  },
  inputGroup: {
    marginBottom: spacing.lg,
  },
  inputLabel: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.normal,
    color: colors.whiteAlpha[85],
    marginBottom: spacing.xs,
    letterSpacing: 1.5,
  },
  input: {
    backgroundColor: colors.whiteAlpha[10],
    borderRadius: 16,
    padding: spacing.md + 2,
    color: colors.whiteAlpha[90],
    fontSize: typography.fontSize.base,
    borderWidth: 1,
    borderColor: colors.whiteAlpha[20],
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: spacing.lg,
  },
  forgotText: {
    fontSize: typography.fontSize.sm,
    color: colors.rebeccaPurple,
  },
  signInButton: {
    backgroundColor: colors.rebeccaPurple,
    borderRadius: 16,
    paddingVertical: spacing.md + 4,
    alignItems: 'center',
    shadowColor: colors.rebeccaPurple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  signInButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
    color: colors.whiteAlpha[90],
    letterSpacing: 0.5,
  },
  signUpButton: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  signUpText: {
    fontSize: typography.fontSize.sm,
    color: colors.whiteAlpha[85],
  },
  signUpLink: {
    color: colors.rebeccaPurple,
    fontWeight: typography.fontWeight.normal,
  },
});