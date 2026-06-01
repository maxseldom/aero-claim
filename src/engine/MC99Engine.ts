import type { FlightData, EligibilityResult, RuleEngine, RegulationType } from './types';

export class MC99Engine implements RuleEngine {
  regulation: RegulationType = 'MC99';

  isApplicable(flight: FlightData): boolean {
    // International flights between two different countries (which applies globally if both are MC99 signatories)
    return flight.departureCountry !== flight.arrivalCountry;
  }

  evaluate(flight: FlightData): EligibilityResult {
    // MC99 technically covers almost everything except extraordinary circumstances, 
    // but requires proven financial damages.
    const exemptReasons = ['weather', 'atc', 'security', 'strike_airport', 'medical'];
    if (exemptReasons.includes(flight.disruptionReason)) {
      return {
        isEligible: false,
        compensationAmount: 0,
        currency: 'USD',
        regulationApplied: this.regulation,
        reason: 'Extraordinary circumstances exempt the airline from liability under the Montreal Convention (MC99).'
      };
    }

    if (flight.isCancelled || flight.delayMinutes >= 120) {
      return {
        isEligible: true,
        compensationAmount: 7000, // Max SDR converted to USD approx
        currency: 'USD (Up to)',
        regulationApplied: this.regulation,
        reason: 'Under the Montreal Convention (MC99), you can claim up to ~$7000 for proven financial damages caused by this disruption (receipts required).'
      };
    }

    return {
      isEligible: false,
      compensationAmount: 0,
      currency: 'USD',
      regulationApplied: this.regulation,
      reason: 'Not eligible or no significant damages expected.'
    };
  }
}
