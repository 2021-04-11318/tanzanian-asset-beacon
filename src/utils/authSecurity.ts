
import { supabase } from '@/integrations/supabase/client';

// Enhanced auth state cleanup utility
export const cleanupAuthState = () => {
  try {
    // Remove standard auth tokens
    localStorage.removeItem('supabase.auth.token');
    
    // Remove all Supabase auth keys from localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
    
    // Remove from sessionStorage if in use
    Object.keys(sessionStorage || {}).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        sessionStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.warn('Error cleaning up auth state:', error);
  }
};

// Enhanced sign out with security cleanup
export const secureSignOut = async () => {
  try {
    // Clean up auth state first
    cleanupAuthState();
    
    // Attempt global sign out
    await supabase.auth.signOut({ scope: 'global' });
    
    // Force page reload for clean state
    window.location.href = '/auth';
  } catch (error) {
    console.error('Error during secure sign out:', error);
    // Force redirect even if sign out fails
    window.location.href = '/auth';
  }
};

// Rate limiting utility
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export const isRateLimited = (key: string, maxRequests = 10, windowMs = 60000): boolean => {
  const now = Date.now();
  const userRequests = requestCounts.get(key);
  
  if (!userRequests || now > userRequests.resetTime) {
    requestCounts.set(key, { count: 1, resetTime: now + windowMs });
    return false;
  }
  
  if (userRequests.count >= maxRequests) {
    return true;
  }
  
  userRequests.count++;
  return false;
};

// Input sanitization utilities
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential XSS characters
    .substring(0, 1000); // Limit length
};

export const validateAssetInput = (asset: {
  name: string;
  type: string;
  purchasePrice: number;
  currentPrice: number;
  quantity: number;
}) => {
  const errors: string[] = [];
  
  // Validate name
  if (!asset.name || sanitizeInput(asset.name).length < 2) {
    errors.push('Asset name must be at least 2 characters');
  }
  
  // Validate type
  if (!['Share', 'Bond', 'Unit'].includes(asset.type)) {
    errors.push('Invalid asset type');
  }
  
  // Validate numeric fields
  if (asset.purchasePrice <= 0 || asset.purchasePrice > 1000000) {
    errors.push('Purchase price must be between 0 and 1,000,000');
  }
  
  if (asset.currentPrice <= 0 || asset.currentPrice > 1000000) {
    errors.push('Current price must be between 0 and 1,000,000');
  }
  
  if (asset.quantity <= 0 || asset.quantity > 1000000 || !Number.isInteger(asset.quantity)) {
    errors.push('Quantity must be a positive integer up to 1,000,000');
  }
  
  return errors;
};
