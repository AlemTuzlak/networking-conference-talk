/**
 * Hook to check and use Chrome's built-in AI (Gemini Nano)
 * Uses the new LanguageModel API (not window.ai which is deprecated)
 */

// Extend global scope for Chrome AI LanguageModel API
declare global {
  interface LanguageModel {
    availability: () => Promise<"readily" | "after-download" | "downloadable" | "downloading" | "unavailable">;
    create: (options?: {
      initialPrompts?: Array<{ role: "system" | "user" | "assistant"; content: string }>;
      expectedInputs?: Array<{ type: "text" | "image" | "audio"; languages?: string[] }>;
      expectedOutputs?: Array<{ type: "text"; languages?: string[] }>;
      temperature?: number;
      topK?: number;
      signal?: AbortSignal;
      monitor?: (monitor: { addEventListener: (event: string, callback: (e: any) => void) => void }) => void;
    }) => Promise<any>;
    params: () => Promise<{
      defaultTemperature: number;
      maxTemperature: number;
      defaultTopK: number;
      maxTopK: number;
    }>;
  }

  var LanguageModel: LanguageModel;
}

export async function checkAIAvailability(): Promise<boolean> {
  if (!('LanguageModel' in self)) {
    return false;
  }

  try {
    const availability = await self.LanguageModel.availability();
    return availability !== 'unavailable';
  } catch {
    return false;
  }
}

export async function improveNoteWithAI(content: string): Promise<string> {
  if (!('LanguageModel' in self)) {
    throw new Error('Chrome AI is not available');
  }

  try {
    const session = await self.LanguageModel.create({
      expectedInputs: [
        { type: 'text', languages: ['en' /* system prompt */, 'en' /* user prompt */] }
      ],
      expectedOutputs: [
        { type: 'text', languages: ['en'] }
      ],
      initialPrompts: [
        {
          role: 'system',
          content: `You are a helpful writing assistant. Improve the following note by:
- Fixing grammar and spelling errors
- Improving clarity and readability
- Making it more concise while preserving all important information
- Maintaining the original tone and style

Only return the improved text, nothing else.`
        }
      ]
    });

    const result = await session.prompt(content, {
      outputLanguage: 'en'
    });
    session.destroy();
    return result;
  } catch (error) {
    console.error('AI improvement failed:', error);
    throw error;
  }
}
