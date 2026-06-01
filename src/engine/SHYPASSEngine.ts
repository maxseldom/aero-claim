import type { FlightData, EligibilityResult, RuleEngine, RegulationType } from './types';

export class SHYPASSEngine implements RuleEngine {
  regulation: RegulationType = 'SHY-PASS';

  isApplicable(flight: FlightData): boolean {
    return flight.departureCountry === 'TR' || flight.arrivalCountry === 'TR';
  }

  evaluate(flight: FlightData): EligibilityResult {
    const exemptReasons = ['weather', 'atc', 'security', 'strike_airport', 'bird_strike', 'medical'];
    if (exemptReasons.includes(flight.disruptionReason)) {
      return {
        isEligible: false,
        compensationAmount: 0,
        currency: 'EUR',
        regulationApplied: this.regulation,
        reason: 'Extraordinary circumstances are exempt under Turkish SHY-PASS regulations.'
      };
    }

    if (flight.isCancelled || flight.disruptionReason === 'denied_boarding' || flight.delayMinutes >= 180) {
      return {
        isEligible: true,
        compensationAmount: 600, // Max international assumed
        currency: 'EUR',
        regulationApplied: this.regulation,
        reason: 'Eligible for compensation under Turkish SHY-PASS passenger rights.'
      };
    }

    return {
      isEligible: false,
      compensationAmount: 0,
      currency: 'EUR',
      regulationApplied: this.regulation,
      reason: 'Delay does not meet the SHY-PASS compensation thresholds.'
    };
  }
}
