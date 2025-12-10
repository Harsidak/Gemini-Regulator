
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { RegulatorReport, ProcessedFile, RegulatoryNewsData, NewsSource } from "../types";
import { GEMINI_MODEL, SYSTEM_INSTRUCTION } from "../constants";

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    extracted_evidence: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of key facts, entities, and data points extracted from the documents."
    },
    red_flags: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          severity: { type: Type.STRING, enum: ["Critical", "High", "Medium", "Low"] },
          issue: { type: Type.STRING },
          description: { type: Type.STRING },
          source_document: { type: Type.STRING, description: "Name of the file where this was found" }
        },
        required: ["severity", "issue", "description"]
      }
    },
    risk_scores: {
      type: Type.OBJECT,
      properties: {
        financial_risk: { type: Type.NUMBER, description: "Score 0-100" },
        operational_risk: { type: Type.NUMBER, description: "Score 0-100" },
        legal_risk: { type: Type.NUMBER, description: "Score 0-100" },
        fraud_probability: { type: Type.NUMBER, description: "Score 0-100" }
      },
      required: ["financial_risk", "operational_risk", "legal_risk", "fraud_probability"]
    },
    evidence_backed_explanations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
            explanation: { type: Type.STRING },
            source: { type: Type.STRING, description: "The specific document and page/row citation."}
        },
        required: ["explanation", "source"]
      },
      description: "Detailed explanations citing specific document fragments for risks found."
    },
    executive_fix_plan: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          step: { type: Type.STRING },
          rationale: { type: Type.STRING },
          priority: { type: Type.STRING, enum: ["Immediate", "High", "Medium", "Low"] }
        },
        required: ["step", "rationale", "priority"]
      }
    },
    c_suite_summary: {
      type: Type.STRING,
      description: "A 120-word executive summary."
    },
    timeline: {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                date: { type: Type.STRING },
                event: { type: Type.STRING },
                source: { type: Type.STRING }
            },
            required: ["date", "event", "source"]
        },
        description: "Chronological list of key events extracted from the documents."
    },
    entities: {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                name: { type: Type.STRING },
                type: { type: Type.STRING, enum: ["Person", "Organization", "Money", "Location"] },
                details: { type: Type.STRING }
            },
            required: ["name", "type", "details"]
        },
        description: "Key people, organizations, and financial figures found."
    },
    compliance_matrix: {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                regulation: { type: Type.STRING },
                status: { type: Type.STRING, enum: ["Pass", "Fail", "Warning"] },
                notes: { type: Type.STRING }
            },
            required: ["regulation", "status", "notes"]
        }
    }
  },
  required: ["extracted_evidence", "red_flags", "risk_scores", "evidence_backed_explanations", "executive_fix_plan", "c_suite_summary", "timeline", "entities", "compliance_matrix"]
};

export const analyzeDocuments = async (files: ProcessedFile[]): Promise<RegulatorReport> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Construct parts: Text prompt + Files
  const parts: any[] = [
    { text: "Analyze the attached documents and generate a full Regulatory & Risk Intelligence Report. Pay special attention to extracting a timeline of events, key entities involved, and performing a compliance audit against standard frameworks." }
  ];

  files.forEach(file => {
    parts.push({
      inlineData: {
        mimeType: file.mimeType,
        data: file.data
      }
    });
  });

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: {
        role: "user",
        parts: parts
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2, // Low temperature for more analytical/deterministic output
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response received from Gemini.");
    }

    return JSON.parse(text) as RegulatorReport;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};

export const fetchRegulatoryNews = async (contextSummary: string): Promise<RegulatoryNewsData> => {
    if (!process.env.API_KEY) {
        throw new Error("API Key is missing.");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // We do NOT use responseSchema for googleSearch requests as we want the natural language summary + grounding metadata
    const prompt = `
      Context: The user is analyzing business documents with the following summary: "${contextSummary}".
      
      Task: Search for the latest real-world regulatory news, compliance updates, enforcement actions, or financial regulations that are relevant to this context. 
      Focus on recent events (last 12 months) that might impact a business in this domain.
      
      Output: Provide a concise summary of the top 3 relevant news items or regulations.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }]
            }
        });

        // Extract text summary
        const summary = response.text || "No news found.";

        // Extract grounding chunks (URLs)
        const sources: NewsSource[] = [];
        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        
        if (groundingChunks) {
            groundingChunks.forEach((chunk: any) => {
                if (chunk.web) {
                    sources.push({
                        title: chunk.web.title || "Source Link",
                        uri: chunk.web.uri
                    });
                }
            });
        }

        // Deduplicate sources based on URI
        const uniqueSources = sources.filter((v, i, a) => a.findIndex(t => (t.uri === v.uri)) === i);

        return { summary, sources: uniqueSources };

    } catch (error) {
        console.error("News Fetch Error:", error);
        throw new Error("Failed to fetch regulatory news.");
    }
};
