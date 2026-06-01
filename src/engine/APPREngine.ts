import type { RuleEngine, FlightData, EligibilityResult, RegulationType } from './types';

export class APPREngine implements RuleEngine {
  regulation: RegulationType = 'APPR';

  isApplicable(flight: FlightData): boolean {
    // APPR applies to flights to, from, and within Canada
    return flight.departureCountry === 'CA' || flight.arrivalCountry === 'CA';
  }

  evaluate(flight: FlightData): EligibilityResult {
    // Disruption was required for safety or outside airline control
    const exemptReasons = ['weather', 'atc', 'security', 'strike_airport', 'bird_strike', 'medical'];
    if (exemptReasons.includes(flight.disruptionReason)) {
      return {
        isEligible: false,
        compensationAmount: 0,
        currency: 'CAD',
        regulationApplied: this.regulation,
        reason: 'Under APPR, disruptions outside the airline’s control or required for safety (e.g., weather, strikes, some technical issues) do not qualify for compensation.'
      };
    }

    // Delay >= 3 hours (180 mins) or Cancellation within airline control
    if (flight.delayMinutes >= 180 || flight.isCancelled) {
       return {
         isEligible: true,
         compensationAmount: 400, // Large airline 3-6 hours is 400 CAD for MVP
         currency: 'CAD',
         regulationApplied: this.regulation,
         reason: 'Flight was delayed 3+ hours or cancelled for reasons within the airline’s control.'
       };
    }

    return {
      isEligible: false,
      compensationAmount: 0,
      currency: 'CAD',
      regulationApplied: this.regulation,
      reason: 'Delay was less than 3 hours, which does not meet the APPR threshold.'
    };
  }
}
