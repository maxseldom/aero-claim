import type { FlightData, EligibilityResult, RuleEngine, RegulationType } from './types';

export class ANAC400Engine implements RuleEngine {
  regulation: RegulationType = 'ANAC 400';

  isApplicable(flight: FlightData): boolean {
    return flight.departureCountry === 'BR' || flight.arrivalCountry === 'BR';
  }

  evaluate(flight: FlightData): EligibilityResult {
    if (flight.isCancelled || flight.delayMinutes >= 240 || flight.disruptionReason === 'denied_boarding') {
      return {
        isEligible: true,
        compensationAmount: 0,
        currency: 'BRL',
        regulationApplied: this.regulation,
        reason: 'Eligible for material assistance (food/hotel) and potential Moral Damages via Brazilian courts under ANAC Res 400.'
      };
    }

    return {
      isEligible: false,
      compensationAmount: 0,
      currency: 'BRL',
      regulationApplied: this.regulation,
      reason: 'Delay is under the 4-hour threshold for ANAC 400 assistance.'
    };
  }
}
