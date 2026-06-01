import type { FlightData, EligibilityResult, RuleEngine, RegulationType } from './types';

export class UK261Engine implements RuleEngine {
  regulation: RegulationType = 'UK261';

  isApplicable(flight: FlightData): boolean {
    return flight.departureCountry === 'GB' || flight.arrivalCountry === 'GB';
  }

  evaluate(flight: FlightData): EligibilityResult {
    const exemptReasons = ['weather', 'atc', 'security', 'strike_airport', 'bird_strike', 'medical'];
    if (exemptReasons.includes(flight.disruptionReason)) {
      return {
        isEligible: false,
        compensationAmount: 0,
        currency: 'GBP',
        regulationApplied: this.regulation,
        reason: 'Extraordinary circumstances are exempt from compensation under UK261.'
      };
    }

    if (flight.isCancelled || flight.delayMinutes >= 180) {
      return {
        isEligible: true,
        compensationAmount: 520, // Max payout assumed for simplicity
        currency: 'GBP',
        regulationApplied: this.regulation,
        reason: 'Eligible for fixed compensation under UK261.'
      };
    }

    return {
      isEligible: false,
      compensationAmount: 0,
      currency: 'GBP',
      regulationApplied: this.regulation,
      reason: 'Delay is under the 3-hour threshold for UK261.'
    };
  }
}
