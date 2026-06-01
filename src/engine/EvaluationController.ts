import type { FlightData, EligibilityResult, RuleEngine } from './types';
import { EU261Engine } from './EU261Engine';
import { APPREngine } from './APPREngine';
import { UK261Engine } from './UK261Engine';
import { USDOTEngine } from './USDOTEngine';
import { ANAC400Engine } from './ANAC400Engine';
import { SHYPASSEngine } from './SHYPASSEngine';
import { GACAEngine } from './GACAEngine';
import { MC99Engine } from './MC99Engine';

export class EvaluationController {
  private engines: RuleEngine[];

  constructor() {
    this.engines = [
      new EU261Engine(),
      new UK261Engine(),
      new APPREngine(),
      new USDOTEngine(),
      new ANAC400Engine(),
      new SHYPASSEngine(),
      new GACAEngine(),
      new MC99Engine() // MC99 is the global fallback
    ];
  }

  evaluateClaim(flight: FlightData): EligibilityResult {
    const applicableEngines = this.engines.filter(engine => engine.isApplicable(flight));

    if (applicableEngines.length === 0) {
      return {
        isEligible: false,
        compensationAmount: 0,
        currency: 'USD',
        regulationApplied: 'None',
        reason: 'No matching regulatory framework found for this flight route.'
      };
    }

    const results = applicableEngines.map(engine => engine.evaluate(flight));
    const eligibleResults = results.filter(r => r.isEligible);
    
    if (eligibleResults.length > 0) {
      // Return the first eligible result based on the array order priority
      return eligibleResults[0];
    }

    // If none are eligible, return the rejection from the most specific framework
    return results[0];
  }

  evaluateAll(flight: FlightData): EligibilityResult[] {
    const applicableEngines = this.engines.filter(engine => engine.isApplicable(flight));
    
    if (applicableEngines.length === 0) {
      return [{
        isEligible: false,
        compensationAmount: 0,
        currency: 'USD',
        regulationApplied: 'None',
        reason: 'No matching regulatory framework found for this flight route.'
      }];
    }

    return applicableEngines.map(engine => engine.evaluate(flight));
  }
}
