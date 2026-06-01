import { supabase } from './supabaseClient';
import type { FlightData, EligibilityResult } from '../engine/types';

export const submitClaim = async (
  data: FlightData, 
  result: EligibilityResult
): Promise<{ success: boolean; claimId?: string; message: string }> => {
  
  if (!supabase) {
    return {
      success: false,
      message: 'Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env.local file.'
    };
  }

  try {
    // Insert the claim into the Supabase 'claims' table
    // Note: We intentionally do NOT use .select() here because anonymous users 
    // do not have SELECT permissions on this table for security reasons.
    const { error } = await supabase
      .from('claims')
      .insert([
        {
          flight_number: data.flightNumber,
          departure_icao: data.departure,
          arrival_icao: data.arrival,
          date: data.date,
          delay_minutes: data.delayMinutes,
          is_cancelled: data.isCancelled || false,
          disruption_reason: data.disruptionReason,
          is_eligible: result.isEligible,
          compensation_amount: result.compensationAmount,
          currency: result.currency,
          regulation_applied: result.regulationApplied
        }
      ]);

    if (error) {
      console.error('Supabase Insert Error:', error);
      return {
        success: false,
        message: `Database error: ${error.message}`
      };
    }

    if (result.isEligible) {
      return {
        success: true,
        message: 'Claim successfully submitted and saved to database. We will be in touch shortly.'
      };
    } else {
      return {
        success: false,
        message: `Claim ineligible and logged: ${result.reason}`
      };
    }
  } catch (err: any) {
    console.error('Network/Unexpected Error:', err);
    return {
      success: false,
      message: `An unexpected network error occurred: ${err.message}`
    };
  }
};

export const signIn = async (email: string, password: string) => {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  if (!supabase) return;
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getAllClaims = async () => {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase
    .from('claims')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
};
