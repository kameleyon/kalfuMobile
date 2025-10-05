export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Chat: undefined;
  History: undefined;
  Settings: undefined;
};

export type HistoryStackParamList = {
  HistoryList: undefined;
  ReadingDetail: { readingId: string };
};