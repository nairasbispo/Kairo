import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, getDocFromServer, collection, getDocs, query, orderBy } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { UserProfile, LearnedWord } from '../types';
import { INITIAL_SKILL_PRIORITIES, INITIAL_CUSTOM_SCHEDULE } from '../data/mockData';
import { INITIAL_LEARNED_WORDS } from '../data/vocabData';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Clean zeroed profile for a brand new user account
export const createCleanUserProfile = (name: string, email: string): UserProfile => ({
  name: name || email.split('@')[0] || 'Novo Estudante',
  email: email,
  isLoggedIn: true,
  streakDays: 0,
  targetLanguage: 'EN',
  goal: 'conversar',
  customGoal: '',
  learningMethods: ['conversacao', 'artigos'],
  dailyMinutes: 30,
  studyDays: ['M', 'T', 'W', 'T', 'F'],
  selfLevel: 'beginner',
  skillPriorities: INITIAL_SKILL_PRIORITIES,
  diagnosticScore: {
    overallLevel: 'A1 Iniciante',
    comprehension: 0,
    reading: 0,
    vocabulary: 0,
    grammar: 0
  },
  languageLevels: {
    EN: 'A1',
    FR: 'A1',
    ES: 'A1',
    IT: 'A1'
  },
  hoursPerLanguage: {
    EN: 0,
    FR: 0,
    ES: 0,
    IT: 0
  },
  learnedWords: INITIAL_LEARNED_WORDS,
  customSchedule: INITIAL_CUSTOM_SCHEDULE.map(day => ({
    ...day,
    tasks: day.tasks.map(t => ({ ...t, completed: false }))
  })),
  totalHoursStudied: 0,
  weeklyGoalHours: 3.0
});

// Demo Profile
export const DEMO_USER_PROFILE: UserProfile = {
  name: 'Alex Silva',
  email: 'alex.estudante@kairo.edu',
  isLoggedIn: true,
  streakDays: 12,
  targetLanguage: 'EN',
  goal: 'conversar',
  customGoal: '',
  learningMethods: ['podcasts', 'conversacao', 'artigos', 'ia'],
  dailyMinutes: 45,
  studyDays: ['M', 'T', 'W', 'T', 'F'],
  selfLevel: 'intermediate',
  skillPriorities: INITIAL_SKILL_PRIORITIES,
  diagnosticScore: {
    overallLevel: 'B1 Intermediário',
    comprehension: 82,
    reading: 78,
    vocabulary: 65,
    grammar: 70
  },
  languageLevels: {
    EN: 'B1',
    FR: 'A2',
    ES: 'A1',
    IT: 'A1'
  },
  hoursPerLanguage: {
    EN: 12.5,
    FR: 6.2,
    ES: 3.5,
    IT: 2.0
  },
  learnedWords: INITIAL_LEARNED_WORDS,
  customSchedule: INITIAL_CUSTOM_SCHEDULE,
  totalHoursStudied: 18.5,
  weeklyGoalHours: 5.0
};

function getSafeDocId(email: string): string {
  return email.replace(/[^a-zA-Z0-9_-]/g, '_');
}

// Fetch user profile from Firebase Firestore
export async function fetchUserProfileFromFirebase(email: string, name?: string): Promise<UserProfile> {
  if (email === 'alex.estudante@kairo.edu') {
    return { ...DEMO_USER_PROFILE, email, isLoggedIn: true };
  }

  const docId = getSafeDocId(email);
  const userRef = doc(db, 'users', docId);

  try {
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        name: data.name || name || email.split('@')[0],
        email: data.email || email,
        isLoggedIn: true,
        streakDays: data.streakDays ?? 0,
        targetLanguage: data.targetLanguage || 'EN',
        goal: data.goal || 'conversar',
        customGoal: data.customGoal || '',
        learningMethods: data.learningMethods || ['conversacao', 'artigos'],
        dailyMinutes: data.dailyMinutes || 30,
        studyDays: data.studyDays || ['M', 'T', 'W', 'T', 'F'],
        selfLevel: data.selfLevel || 'beginner',
        skillPriorities: data.skillPriorities || INITIAL_SKILL_PRIORITIES,
        diagnosticScore: data.diagnosticScore || {
          overallLevel: 'A1 Iniciante',
          comprehension: 0,
          reading: 0,
          vocabulary: 0,
          grammar: 0
        },
        languageLevels: data.languageLevels || { EN: 'A1', FR: 'A1', ES: 'A1', IT: 'A1' },
        hoursPerLanguage: data.hoursPerLanguage || { EN: 0, FR: 0, ES: 0, IT: 0 },
        learnedWords: data.learnedWords || INITIAL_LEARNED_WORDS,
        customSchedule: data.customSchedule || INITIAL_CUSTOM_SCHEDULE,
        totalHoursStudied: data.totalHoursStudied ? Number(data.totalHoursStudied) : 0,
        weeklyGoalHours: data.weeklyGoalHours ? Number(data.weeklyGoalHours) : 3.0
      };
    }
  } catch (error) {
    console.warn('[Firebase Profile Fetch Warning]', error);
  }

  const freshProfile = createCleanUserProfile(name || email.split('@')[0], email);
  await syncUserProfileToFirebase(freshProfile);
  return freshProfile;
}

// Sync user profile to Firebase Firestore
export async function syncUserProfileToFirebase(user: UserProfile) {
  if (!user.email) return;

  const docId = getSafeDocId(user.email);
  const userRef = doc(db, 'users', docId);

  try {
    await setDoc(userRef, {
      email: user.email,
      name: user.name,
      streakDays: user.streakDays,
      targetLanguage: user.targetLanguage,
      goal: user.goal,
      customGoal: user.customGoal || '',
      learningMethods: user.learningMethods,
      dailyMinutes: user.dailyMinutes,
      studyDays: user.studyDays,
      selfLevel: user.selfLevel,
      skillPriorities: user.skillPriorities,
      diagnosticScore: user.diagnosticScore,
      languageLevels: user.languageLevels,
      hoursPerLanguage: user.hoursPerLanguage,
      totalHoursStudied: user.totalHoursStudied,
      weeklyGoalHours: user.weeklyGoalHours,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.warn('[Firebase Profile Sync Warning]', error);
  }
}

// Fetch learned words from Firebase
export async function fetchLearnedWordsFromFirebase(userEmail: string): Promise<LearnedWord[] | null> {
  const docId = getSafeDocId(userEmail);
  const wordsRef = collection(db, 'users', docId, 'learnedWords');

  try {
    const q = query(wordsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const words: LearnedWord[] = [];
    querySnapshot.forEach((d) => {
      words.push(d.data() as LearnedWord);
    });
    return words.length > 0 ? words : null;
  } catch (error) {
    console.warn('[Firebase Words Fetch Warning]', error);
    return null;
  }
}

// Save learned word to Firebase
export async function saveLearnedWordToFirebase(userEmail: string, word: LearnedWord) {
  const userDocId = getSafeDocId(userEmail);
  const wordRef = doc(db, 'users', userDocId, 'learnedWords', word.id);

  try {
    await setDoc(wordRef, {
      ...word,
      userId: userEmail,
      createdAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.warn('[Firebase Word Save Warning]', error);
  }
}

// Google Sign-In helper
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
}

// Sign Out helper
export async function signOutUser() {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}
