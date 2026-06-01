import type { RuleEngine, FlightData, EligibilityResult, RegulationType } from './types';

// Standard EU/EEA/UK country codes for EU261/UK261 applicability
const euCountries = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'CH', 'NO', 'IS', 'LI'];

export class EU261Engine implements RuleEngine {
  regulation: RegulationType = 'EU261';

  isApplicable(flight: FlightData): boolean {
    // EU261 applies to flights departing from EU, or arriving in EU on an EU airline.
    // For broad coverage, we check if either departure or arrival is in the EU.
    return euCountries.includes(flight.departureCountry) || euCountries.includes(flight.arrivalCountry);
  }

  evaluate(flight: FlightData): EligibilityResult {
    // Extraordinary circumstances are exempt
    const exemptReasons = ['weather', 'atc', 'security', 'strike_airport', 'bird_strike', 'medical'];
    if (exemptReasons.includes(flight.disruptionReason)) {
      return {
        isEligible: false,
        compensationAmount: 0,
        currency: 'EUR',
        regulationApplied: this.regulation,
        reason: 'Extraordinary circumstances (e.g. weather, strike) are exempt from EU261 compensation.'
      };
    }

    if (flight.isCancelled || flight.delayMinutes >= 180) {
      return {
        isEligible: true,
        compensationAmount: 400, // Standard mid-tier compensation
        currency: 'EUR',
        regulationApplied: this.regulation,
        reason: flight.isCancelled ? 'Flight was cancelled within airline control' : 'Flight delayed over 3 hours within airline control'
      };
    }

    return {
      isEligible: false,
      compensationAmount: 0,
      currency: 'EUR',
      regulationApplied: this.regulation,
      reason: 'Delay was less than 3 hours, which does not meet the EU261 threshold.'
    };
  }
}
