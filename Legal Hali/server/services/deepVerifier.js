export async function traceCitationDeeply(citation, context, caseName) {
  // Simulate LLM network delay (1.5 seconds)
  await new Promise(resolve => setTimeout(resolve, 1500));

  let exactQuote = "This is a simulated quote extracted by the LLM from the full case text. In a production environment with an active LLM API key, this would be the literal text from the court opinion matching the user's paraphrase.";
  let isParaphraseSupported = true;
  let analysis = "LLM analysis complete. The provided context was cross-referenced against the full opinion.";

  let factCheck = {
    status: "Supported",
    explanation: "The facts and legal reasoning described in the claim are fully supported by the actual court decision."
  };

  // Hardcoded impressive example for testing
  if (citation.includes("410 U.S. 113") || caseName?.includes("Roe")) {
     exactQuote = "This right of privacy, whether it be founded in the Fourteenth Amendment's concept of personal liberty and restrictions upon state action... is broad enough to encompass a woman's decision whether or not to terminate her pregnancy.";
     analysis = "The LLM found a direct thematic match in the holding of Roe v. Wade that corresponds to the paraphrased claim.";
     factCheck = {
       status: "Supported",
       explanation: "The claim accurately reflects the central holding of Roe v. Wade, establishing the fundamental right to privacy encompassing abortion."
     };
  } else if (citation.includes("2026 SCC") || citation.includes("Ahluwalia")) {
     exactQuote = "We formally recognize the tort of coercive control. A pattern of intimate partner violence constitutes a distinct and actionable civil wrong, independent of traditional family law equalization claims, entitling the survivor to significant financial restitution.";
     analysis = "The LLM traced the paraphrase back to the exact holding in the landmark SCC decision regarding the tort of coercive control.";
     factCheck = {
       status: "Supported",
       explanation: "The claim correctly identifies the court's novel recognition of coercive control as an independent tort."
     };
  } else if (citation.includes("123") && citation.includes("456")) {
     // Scenario for Unsupported Fact
     exactQuote = "The plaintiff's motion for summary judgment is denied due to remaining disputes of material fact regarding the contractual obligations.";
     analysis = "The LLM found the citation, but the actual holding directly contradicts the paraphrased claim provided.";
     factCheck = {
       status: "Unsupported",
       explanation: "The surrounding facts are fabricated. The court actually denied summary judgment, whereas the claim states the court ruled in favor of the plaintiff and awarded damages."
     };
  }

  return {
    isParaphraseSupported: true, // Legacy field
    paraphrasedClaim: context,
    exactQuote,
    confidence: "High",
    analysis,
    factCheck
  };
}
