export function extractCitations(text) {
  const citations = [];
  
  // 1. Bluebook reporter citations (e.g., 410 U.S. 113)
  const regexBluebook = /\b(\d+)\s+([A-Za-z0-9\.\s]+?)\s+(\d+)\b/g;
  
  // 2. Neutral citations with optional case name (e.g., Ahluwalia v. Ahluwalia (2026 SCC))
  const regexNeutral = /([A-Za-z\s]+v\.\s+[A-Za-z\s]+)?\(?(\d{4})\s+([A-Za-z]+)(?:\s+(\d+))?\)?/g;
  
  // Helper to extract context
  const getContext = (match) => {
      const beforeStr = text.substring(0, match.index);
      const afterStr = text.substring(match.index + match[0].length);
      const lastPeriod = beforeStr.lastIndexOf('.');
      const startIdx = lastPeriod === -1 ? 0 : lastPeriod + 1;
      const nextPeriod = afterStr.indexOf('.');
      const endIdx = nextPeriod === -1 ? text.length : match.index + match[0].length + nextPeriod + 1;
      return text.substring(startIdx, endIdx).trim();
  };

  let match;
  // Run Bluebook
  while ((match = regexBluebook.exec(text)) !== null) {
    const reporter = match[2].trim();
    const lowerReporter = reporter.toLowerCase();
    const isDate = ['january','february','march','april','may','june','july','august','september','october','november','december'].some(dw => lowerReporter.includes(dw));
    const isCommonWord = ['and', 'the', 'or', 'of', 'in', 'at'].includes(lowerReporter);
    
    if (reporter.length > 1 && !isDate && !isCommonWord) {
      citations.push({
        full: match[0].trim(),
        index: match.index,
        length: match[0].length,
        context: getContext(match)
      });
    }
  }

  // Run Neutral
  while ((match = regexNeutral.exec(text)) !== null) {
    const reporter = match[3].trim();
    if (reporter.length > 1) {
      citations.push({
        full: match[0].trim(),
        index: match.index,
        length: match[0].length,
        context: getContext(match)
      });
    }
  }

  // Deduplicate
  const uniqueCitations = [];
  const seenIndexes = new Set();
  for (const cit of citations) {
    if (!seenIndexes.has(cit.index)) {
      seenIndexes.add(cit.index);
      uniqueCitations.push(cit);
    }
  }

  return uniqueCitations;
}
