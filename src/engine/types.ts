export type RegulationType = 'EU261' | 'APPR' | 'UK261' | 'US DOT' | 'ANAC 400' | 'SHY-PASS' | 'GACA' | 'MC99' | 'None' | 'UNKNOWN';

export interface FlightData {
  flightNumber: string;
  departure: string; // ICAO code
  departureCountry: string;
  arrival: string;   // ICAO code
  arrivalCountry: string;
  date: string;
  delayMinutes: number;
  isCancelled: boolean;
  disruptionReason: 'weather' | 'atc' | 'technical' | 'crew' | 'knock_on' | 'security' | 'strike_airline' | 'strike_airport' | 'bird_strike' | 'medical' | 'denied_boarding' | 'other';
  airline: string;
}

export interface EligibilityResult {
  isEligible: boolean;
  compensationAmount: number;
  currency: string;
  regulationApplied: RegulationType;
  reason?: string;
}

export interface RuleEngine {
  regulation: RegulationType;
  /** Determines if this regulation applies to the given flight route/airline */
  isApplicable(flight: FlightData): boolean;
  /** Evaluates the claim to determine eligibility and compensation amount */
  evaluate(flight: FlightData): EligibilityResult;
}
