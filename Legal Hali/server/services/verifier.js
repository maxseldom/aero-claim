export async function verifyCitation(citationText) {
  try {
    // Simulate API network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Hardcoded hallucination for demo
    if (citationText.includes("928 F.3d 339") || citationText.includes("999")) {
      return { status: "Hallucination", message: "Citation not found in database. High probability of AI hallucination." };
    } 

    // Assume all others are verified for demo
    return { 
      status: "Verified", 
      message: `Found 1 result(s).`, 
      details: {
        caseName: citationText.includes("410 U.S. 113") ? "Roe v. Wade" : "Sample Court Case",
        court: "Supreme Court of the United States",
        dateFiled: "1973-01-22"
      }
    };
  } catch (error) {
    console.error("Verification error:", error);
    return { status: "Error", message: "Failed to verify citation due to API error." };
  }
}
