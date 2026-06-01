import type { FlightData, EligibilityResult, RuleEngine, RegulationType } from './types';

export class USDOTEngine implements RuleEngine {
  regulation: RegulationType = 'US DOT';

  isApplicable(flight: FlightData): boolean {
    return flight.departureCountry === 'US' || flight.arrivalCountry === 'US';
  }

  evaluate(flight: FlightData): EligibilityResult {
    if (flight.disruptionReason === 'denied_boarding') {
      return {
        isEligible: true,
        compensationAmount: 1550, // Max US DOT bumping compensation
        currency: 'USD',
        regulationApplied: this.regulation,
        reason: 'Involuntary denied boarding (bumping) guarantees up to 400% of one-way fare under US DOT rules.'
      };
    }

    return {
      isEligible: false,
      compensationAmount: 0,
      currency: 'USD',
      regulationApplied: this.regulation,
      reason: 'US DOT only mandates fixed cash compensation for Involuntary Denied Boarding, not simple delays or cancellations.'
    };
  }
}
