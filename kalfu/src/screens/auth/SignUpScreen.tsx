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
  ScrollView,
  Image,
  Keyboard,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { GradientBackground } from '../../components/GradientBackground';
import { SimpleBackground } from '../../components/SimpleBackground';
import { colors, spacing, typography } from '../../theme';

export const SignUpScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSignUp = async () => {
    // Dismiss keyboard first
    Keyboard.dismiss();

    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      await signUp(email, password, username);
      Alert.alert(
        'Success',
        'Account created! Please check your email to verify your account.',
        [
          {
            text: 'OK',
            onPress: () => {
              Keyboard.dismiss();
              navigation.navigate('SignIn');
            },
          },
        ]
      );
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToSignIn = () => {
    Keyboard.dismiss();
    navigation.navigate('SignIn');
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
          showsVerticalScrollIndicator={true}
          indicatorStyle="white"
          scrollIndicatorInsets={{ right: 1 }}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <Image
                source={require('../../../assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.appName}>KALFU</Text>
              <Text style={styles.subtitle}>Your AI Tarot Reader</Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.formCard}>
                <Text style={styles.formTitle}>Create Account</Text>
                <Text style={styles.formSubtitle}>Start your mystical journey</Text>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>USERNAME</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Your name"
                    placeholderTextColor={colors.whiteAlpha[40]}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    returnKeyType="next"
                    editable={!loading}
                  />
                </View>

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
                    returnKeyType="next"
                    editable={!loading}
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
                    returnKeyType="next"
                    editable={!loading}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>CONFIRM PASSWORD</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    placeholderTextColor={colors.whiteAlpha[40]}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    returnKeyType="done"
                    onSubmitEditing={handleSignUp}
                    editable={!loading}
                  />
                </View>

                <TouchableOpacity
                  style={[styles.signUpButton, loading && styles.buttonDisabled]}
                  onPress={handleSignUp}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  <Text style={styles.signUpButtonText}>
                    {loading ? 'Creating Account...' : 'Sign Up'}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.signInButton}
                onPress={handleNavigateToSignIn}
                activeOpacity={0.7}
              >
                <Text style={styles.signInText}>
                  Already have an account? <Text style={styles.signInLink}>Sign In</Text>
                </Text>
              </TouchableOpacity>
            </View>
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
  },
  content: {
    flex: 1,
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
    color: colors.whiteAlpha[85],
    letterSpacing: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  formCard: {
    backgroundColor: colors.whiteAlpha[5],
    borderRadius: 24,
    padding: spacing.xl,
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
    color: colors.whiteAlpha[85],
    marginBottom: spacing.lg,
  },
  inputGroup: {
    marginBottom: spacing.md,
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
  signUpButton: {
    backgroundColor: colors.rebeccaPurple,
    borderRadius: 16,
    paddingVertical: spacing.md + 4,
    alignItems: 'center',
    marginTop: spacing.md,
    shadowColor: colors.rebeccaPurple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  signUpButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
    color: colors.whiteAlpha[90],
    letterSpacing: 0.5,
  },
  signInButton: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  signInText: {
    fontSize: typography.fontSize.sm,
    color: colors.whiteAlpha[85],
  },
  signInLink: {
    color: colors.rebeccaPurple,
    fontWeight: typography.fontWeight.normal,
  },
});