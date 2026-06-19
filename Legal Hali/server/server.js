import express from 'express';
import cors from 'cors';
import { extractCitations } from './services/citationExtractor.js';
import { verifyCitation } from './services/verifier.js';
import { traceCitationDeeply } from './services/deepVerifier.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/scan', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const citations = extractCitations(text);
    
    // Verify all citations in parallel
    const verifiedCitations = await Promise.all(
      citations.map(async (cit) => {
        const verification = await verifyCitation(cit.full);
        
        let deepTrace = null;
        if (verification.status === "Verified") {
           deepTrace = await traceCitationDeeply(cit.full, cit.context, verification.details.caseName);
        }

        return {
          ...cit,
          verification,
          deepTrace
        };
      })
    );

    res.json({ citations: verifiedCitations });
  } catch (error) {
    console.error("Error scanning text:", error);
    res.status(500).json({ error: "Internal server error during scan." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
