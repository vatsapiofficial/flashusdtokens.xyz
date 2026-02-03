import Constants from 'expo-constants';

export const generateAPIUrl = (relativePath: string) => {
  const origin = Constants.experienceUrl?.replace('exp://', 'http://') || 'http://localhost:8081';

  const path = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;

  if (process.env.NODE_ENV === 'development') {
    return origin.concat(path);
  }

  if (!process.env.EXPO_PUBLIC_API_BASE_URL) {
    // Fallback to origin for production if not defined, though documentation says it must be defined.
    return (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : origin).concat(path);
  }

  return process.env.EXPO_PUBLIC_API_BASE_URL.concat(path);
};
