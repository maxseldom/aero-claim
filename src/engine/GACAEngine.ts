import type { FlightData, EligibilityResult, RuleEngine, RegulationType } from './types';

export class GACAEngine implements RuleEngine {
  regulation: RegulationType = 'GACA';

  isApplicable(flight: FlightData): boolean {
    return flight.departureCountry === 'SA' || flight.arrivalCountry === 'SA';
  }

  evaluate(flight: FlightData): EligibilityResult {
    if (flight.isCancelled || flight.delayMinutes >= 360 || flight.disruptionReason === 'denied_boarding') {
      return {
        isEligible: true,
        compensationAmount: 100, // Denotes percentage
        currency: '% Ticket Value',
        regulationApplied: this.regulation,
        reason: 'Eligible for up to 100% of the original ticket value as compensation under Saudi Arabia GACA laws.'
      };
    }

    return {
      isEligible: false,
      compensationAmount: 0,
      currency: 'SAR',
      regulationApplied: this.regulation,
      reason: 'Delay is under the 6-hour threshold for full ticket value compensation under GACA.'
    };
  }
}
