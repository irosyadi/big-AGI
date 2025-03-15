import type { OpenAIWire_API_Models_List } from '~/modules/aix/server/dispatch/wiretypes/openai.wiretypes';

import { LLM_IF_HOTFIX_NoTemperature, LLM_IF_HOTFIX_StripImages, LLM_IF_HOTFIX_Sys0ToUsr0, LLM_IF_OAI_Chat, LLM_IF_OAI_Complete, LLM_IF_OAI_Fn, LLM_IF_OAI_Json, LLM_IF_OAI_NeedsAudio, LLM_IF_OAI_PromptCaching, LLM_IF_OAI_Realtime, LLM_IF_OAI_Reasoning, LLM_IF_OAI_Vision } from '~/common/stores/llms/llms.types';

import type { ModelDescriptionSchema } from '../../llm.server.types';
import { fromManualMapping, ManualMappings } from './models.data';


// [Azure] / [OpenAI]
// https://platform.openai.com/docs/models
export const _knownOpenAIChatModels: ManualMappings = [

  /// [OpenAI, 2025-03-11] NEW `v1/responses` API MODELS - UNSUPPORTED YET

  // Computer Use Preview - INTERNAL MODEL FOR AGENTS - UNSUPPORTED YET
  {
    idPrefix: 'computer-use-preview',
    label: 'Computer Use Preview',
    description: 'Preview release for computer interaction capabilities. Points to computer-use-preview-2025-03-11.',
    symLink: 'computer-use-preview-2025-03-11',
    hidden: true, // we prefer versioned models to symlinked
    // copied from symlinked
    contextWindow: 8192,
    maxCompletionTokens: 1024,
    trainingDataCutoff: 'Sep 30, 2023',
    interfaces: [/* not actually a CHAT API model - this is here temporarily for debugging, before moving to /responses */],
    chatPrice: { input: 3, output: 12 },
    isPreview: true,
  },
  {
    hidden: true, // UNSUPPORTED YET
    // isLatest: true, // preview doesn't get highlighted
    idPrefix: 'computer-use-preview-2025-03-11',
    label: 'Computer Use Preview (2025-03-11)',
    description: 'Specialized model for computer use tool. Optimized for computer interaction capabilities.',
    contextWindow: 8192,
    maxCompletionTokens: 1024,
    trainingDataCutoff: 'Sep 30, 2023',
    interfaces: [/* not actually a CHAT API model - this is here temporarily for debugging, before moving to /responses */],
    chatPrice: { input: 3, output: 12 },
    isPreview: true,
  },


  /// `v1/chat/completions` Models

  // GPT-4.5
  {
    idPrefix: 'gpt-4.5-preview',
    label: 'GPT-4.5 Preview',
    description: 'Largest GPT model, good for creative tasks and agentic planning. Currently points to gpt-4.5-preview-2025-02-27.',
    symLink: 'gpt-4.5-preview-2025-02-27',
    hidden: true,
    // copied from symlinked
    contextWindow: 128000,
    maxCompletionTokens: 16384,
    trainingDataCutoff: 'Oct 2023',
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Vision, LLM_IF_OAI_Fn, LLM_IF_OAI_Json, LLM_IF_OAI_PromptCaching],
    chatPrice: { input: 75, cache: { cType: 'oai-ac', read: 37.5 }, output: 150 },
  },
  {
    isLatest: true,
    idPrefix: 'gpt-4.5-preview-2025-02-27',
    label: 'GPT-4.5 Preview (2025-02-27)',
    description: 'Research preview of GPT-4.5, our largest and most capable GPT model yet. Deep world knowledge and better understanding of user intent makes it good at creative tasks and agentic planning.',
    contextWindow: 128000,
    maxCompletionTokens: 16384,
    trainingDataCutoff: 'Oct 2023',
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Vision, LLM_IF_OAI_Fn, LLM_IF_OAI_Json, LLM_IF_OAI_PromptCaching],
    chatPrice: { input: 75, cache: { cType: 'oai-ac', read: 37.5 }, output: 150 },
    isPreview: true,
  },

  // GPT-4o
  {
    idPrefix: 'gpt-4o',
    label: 'GPT-4o',
    description: 'High-intelligence flagship model. Currently points to gpt-4o-2024-08-06.',
    symLink: 'gpt-4o-2024-08-06',
    hidden: true,
    // copied from symlinked
    contextWindow: 128000,
    maxCompletionTokens: 16384,
    trainingDataCutoff: 'Oct 2023',
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Vision, LLM_IF_OAI_Fn, LLM_IF_OAI_Json, LLM_IF_OAI_PromptCaching],
    chatPrice: { input: 2.5, cache: { cType: 'oai-ac', read: 1.25 }, output: 10 },
    benchmark: { cbaElo: 1288 }, // no direct CSV match, left as-is (1286 + 2 → 1288)
  },
  {
    isLatest: true,
    idPrefix: 'gpt-4o-2024-11-20',
    label: 'GPT-4o (2024-11-20)',
    description: 'Snapshot of gpt-4o from November 20th, 2024.',
    contextWindow: 128000,
    maxCompletionTokens: 16384,
    trainingDataCutoff: 'Oct 2023',
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Vision, LLM_IF_OAI_Fn, LLM_IF_OAI_Json, LLM_IF_OAI_PromptCaching], // + Structured Outputs
    chatPrice: { input: 2.5, cache: { cType: 'oai-ac', read: 1.25 }, output: 10 },
    benchmark: { cbaElo: 1365 },
  },
  {
    idPrefix: 'gpt-4o-2024-08-06',
    label: 'GPT-4o (2024-08-06)',
    description: 'Snapshot that supports Structured Outputs. gpt-4o currently points to this version.',
    contextWindow: 128000,
    maxCompletionTokens: 16384,
    trainingDataCutoff: 'Oct 2023',
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Vision, LLM_IF_OAI_Fn, LLM_IF_OAI_Json, LLM_IF_OAI_PromptCaching], // + Structured Outputs
    chatPrice: { input: 2.5, cache: { cType: 'oai-ac', read: 1.25 }, output: 10 },
    benchmark: { cbaElo: 1265 },
    hidden: true,
  },
  {
    idPrefix: 'gpt-4o-2024-05-13',
    label: 'GPT-4o (2024-05-13)',
    description: 'Original gpt-4o snapshot from May 13, 2024.',
    contextWindow: 128000,
    maxCompletionTokens: 4096,
    trainingDataCutoff: 'Oct 2023',
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Vision, LLM_IF_OAI_Fn, LLM_IF_OAI_Json],
    chatPrice: { input: 5, output: 15 },
    benchmark: { cbaElo: 1285 },
    hidden: true,
  },
  {
    idPrefix: 'chatgpt-4o-latest',
    label: 'ChatGPT-4o Latest',
    description: 'The chatgpt-4o-latest model version continuously points to the version of GPT-4o used in ChatGPT, and is updated frequently.',
    contextWindow: 128000,
    maxCompletionTokens: 16384,
    trainingDataCutoff: 'Oct 2023',
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Vision, LLM_IF_OAI_Json], // does not support Tools
    chatPrice: { input: 5, output: 15 },
    benchmark: { cbaElo: 1377 },
  },

  // GPT-4o Search Preview: When using Chat Completions, the model always retrieves information from the web before responding to your query.
  {
    idPrefix: 'gpt-4o-search-preview',
    label: 'GPT-4o Search Preview 🌐',
    description: 'GPT model for web search in Chat Completions. Currently points to gpt-4o-search-preview-2025-03-11.',
    symLink: 'gpt-4o-search-preview-2025-03-11',
    hidden: true,
    // copied from symlinked
    contextWindow: 128000,
    maxCompletionTokens: 16384,
    trainingDataCutoff: 'Sep 30, 2023',
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Json, LLM_IF_HOTFIX_NoTemperature], // NOTE: 2025-03-15: confirmed on 'playground' that this model does not support images
    parameterSpecs: [{ paramId: 'llmVndOaiWebSearchContext' }, { paramId: 'llmVndOaiWebSearchGeolocation' }],
    chatPrice: { input: 2.5, output: 10 },
    isPreview: true,
  },
  {
    // isLatest: true, // preview doesn't get highlighted
    idPrefix: 'gpt-4o-search-preview-2025-03-11',
    label: 'GPT-4o Search Preview (2025-03-11) 🌐',
    description: 'Latest snapshot of the GPT-4o model optimized for web search capabilities.',
    contextWindow: 128000,
    maxCompletionTokens: 16384,
    trainingDataCutoff: 'Sep 30, 2023',
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Json, LLM_IF_HOTFIX_NoTemperature], // NOTE: 2025-03-15: confirmed on 'playground' that this model does not support images
    parameterSpecs: [{ paramId: 'llmVndOaiWebSearchContext' }, { paramId: 'llmVndOaiWebSearchGeolocation' }],
    chatPrice: { input: 2.5, output: 10 },
    isPreview: true,
  },

  // GPT-4o Audio Preview
  {
    idPrefix: 'gpt-4o-audio-preview',
    label: 'GPT-4o Audio Preview',
    description: 'Preview release for audio inputs in chat completions.',
    symLink: 'gpt-4o-audio-preview-2024-12-17',
    hidden: true,
    // copied from symlinked
    contextWindow: 128000,
    maxCompletionTokens: 16384,
    trainingDataCutoff: 'Oct 2023',
    interfaces: [LLM_IF_OAI_NeedsAudio],
    chatPrice: { input: 2.5, output: 10 /* AUDIO PRICING UNSUPPORTED 40/80 */ },
    isPreview: true,
  },
  {
    idPrefix: 'gpt-4o-audio-preview-2024-12-17',
    label: 'GPT-4o Audio Preview (2024-12-17)',
    description: 'Snapshot for the Audio API model.',
    contextWindow: 128000,
    maxCompletionTokens: 16384,
    trainingDataCutoff: 'Oct 2023',
    interfaces: [LLM_IF_OAI_NeedsAudio],
    chatPrice: { input: 2.5, output: 10 /* AUDIO PRICING UNSUPPORTED 40/80 */ },
    isPreview: true,
    hidden: true,
  },
  {
    idPrefix: 'gpt-4o-audio-preview-2024-10-01',
    label: 'GPT-4o Audio Preview (2024-10-01)',
    description: 'Snapshot for the Audio API model.',
    contextWindow: 128000,
    maxCompletionTokens: 16384,
    trainingDataCutoff: 'Oct 2023',
    interfaces: [LLM_IF_OAI_NeedsAudio],
    chatPrice: { input: 2.5, output: 10 /* AUDIO PRICING UNSUPPORTED IS 40/80 */ },
    isPreview: true,
    hidden: true,
  },

  // GPT-4o Realtime Preview
  {
    idPrefix: 'gpt-4o-realtime-preview',
    label: 'GPT-4o Realtime Preview',
    description: 'Preview release for the Realtime API. Points to: gpt-4o-realtime-preview-2024-12-17.',
    symLink: 'gpt-4o-realtime-preview-2024-12-17',
    hidden: true,
    // copied from symlinked
    contextWindow: 128000,
    maxCompletionTokens: 4096,
    trainingDataCutoff: 'Oct 2023',
    interfaces: [LLM_IF_OAI_Realtime /* TBA FC, AUDIO */],
    chatPrice: { input: 5, cache: { cType: 'oai-ac', read: 2.5 }, output: 20 /* AUDIO PRICING UNSUPPORTED 40/80 */ },
    isPreview: true,
  },
  {
    idPrefix: 'gpt-4o-realtime-preview-2024-12-17',
    label: 'GPT-4o Realtime Preview (2024-12-17)',
    description: 'Snapshot for the Realtime API model.',
    contextWindow: 128000,
    maxCompletionTokens: 4096,
    trainingDataCutoff: 'Oct 2023',
    interfaces: [LLM_IF_OAI_Realtime],
    chatPrice: { input: 5, cache: { cType: 'oai-ac', read: 2.5 }, output: 20 /* AUDIO PRICING UNSUPPORTED 40/80 */ },
    isPreview: true,
    hidden: true,
  },
  {
    idPrefix: 'gpt-4o-realtime-preview-2024-10-01',
    label: 'GPT-4o Realtime Preview (2024-10-01)',
    description: 'Snapshot for the Realtime API model.',
    contextWindow: 128000,
    maxCompletionTokens: 4096,
    trainingDataCutoff: 'Oct 2023',
    interfaces: [LLM_IF_OAI_Realtime /* TBA FC, AUDIO */],
    chatPrice: { input: 5, cache: { cType: 'oai-ac', read: 2.5 }, output: 20 /* AUDIO PRICING UNSUPPORTED 40/80 */ },
    isPreview: true,
    hidden: true,
  },


  // GPT-4o mini
  {
    idPrefix: 'gpt-4o-mini',
    label: 'GPT-4o mini',
    description: 'gpt-4o-mini currently points to this version.',
    symLink: 'gpt-4o-mini-2024-07-18',
    hidden: true,
    // copied from symlinked
    contextWindow: 128000,
    maxCompletionTokens: 16384,
    trainingDataCutoff: 'Oct 2023',
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Vision, LLM_IF_OAI_Fn, LLM_IF_OAI_Json, LLM_IF_OAI_PromptCaching],
    chatPrice: { input: 0.15, cache: { cType: 'oai-ac', read: 0.075 }, output: 0.6 },
    benchmark: { cbaElo: 1273 },
  },
  {
    idPrefix: 'gpt-4o-mini-2024-07-18',
    label: 'GPT-4o Mini (2024-07-18)',
    description: 'Affordable model for fast, lightweight tasks. GPT-4o Mini is cheaper and more capable than GPT-3.5 Turbo.',
    contextWindow: 128000,
    maxCompletionTokens: 16384,
    trainingDataCutoff: 'Oct 2023',
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Vision, LLM_IF_OAI_Fn, LLM_IF_OAI_Json, LLM_IF_OAI_PromptCaching],
    chatPrice: { input: 0.15, cache: { cType: 'oai-ac', read: 0.075 }, output: 0.6 },
    benchmark: { cbaElo: 1273 },
  },
  {
    idPrefix: 'gpt-4o-mini-audio-preview',
    label: 'GPT-4o Mini Audio Preview',
    description: 'Preview release for audio inputs in chat completions.',
    symLink: 'gpt-4o-mini-audio-preview-2024-12-17',
    hidden: true,
    // copied from symlinked
    contextWindow: 128000,
    maxCompletionTokens: 16384,
    trainingDataCutoff: 'Oct 2023',
    interfaces: [LLM_IF_OAI_NeedsAudio],
    chatPrice: { input: 0.15, output: 0.6 /* AUDIO PRICING UNSUPPORTED 10/20 */ },
    isPreview: true,
  },
  {
    idPrefix: 'gpt-4o-mini-audio-preview-2024-12-17',
    label: 'GPT-4o Mini Audio Preview (2024-12-17)',
    description: 'Snapshot for the Audio API model.',
    contextWindow: 128000,
    maxCompletionTokens: 16384,
    trainingDataCutoff: 'Oct 2023',
    interfaces: [LLM_IF_OAI_NeedsAudio],
    chatPrice: { input: 0.15, output: 0.6 /* AUDIO PRICING UNSUPPORTED 10/20 */ },
    isPreview: true,
    hidden: true,
  },
  {
    idPrefix: 'gpt-4o-mini-realtime-preview',
    label: 'GPT-4o Mini Realtime Preview',
    description: 'Preview release for the Realtime API. Points to: gpt-4o-mini-realtime-preview-2024-12-17.',
    symLink: 'gpt-4o-mini-realtime-preview-2024-12-17',
    hidden: true,
    // copied from symlinked
    contextWindow: 128000,
    maxCompletionTokens: 4096,
    trainingDataCutoff: 'Oct 2023',
    interfaces: [LLM_IF_OAI_Realtime],
    chatPrice: { input: 0.6, cache: { cType: 'oai-ac', read: 0.3 }, output: 2.4 },
    isPreview: true,
  },
  {
    idPrefix: 'gpt-4o-mini-realtime-preview-2024-12-17',
    label: 'GPT-4o Mini Realtime Preview (2024-12-17)',
    description: 'Snapshot for the Realtime API model.',
    contextWindow: 128000,
    maxCompletionTokens: 4096,
    trainingDataCutoff: 'Oct 2023',
    interfaces: [LLM_IF_OAI_Realtime],
    chatPrice: { input: 0.6, cache: { cType: 'oai-ac', read: 0.3 }, output: 2.4 },
    isPreview: true,
    hidden: true,
  },

  // GPT-4o Mini Search Preview: When using Chat Completions, the model always retrieves information from the web before responding to your query.
  {
    idPrefix: 'gpt-4o-mini-search-preview',
    label: 'GPT-4o Mini Search Preview 🌐',
    description: 'Fast, affordable small model for web search. Currently points to gpt-4o-mini-search-preview-2025-03-11.',
    symLink: 'gpt-4o-mini-search-preview-2025-03-11',
    hidden: true,
    // copied from symlinked
    contextWindow: 128000,
    maxCompletionTokens: 16384,
    trainingDataCutoff: 'Sep 30, 2023',
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Json, LLM_IF_HOTFIX_NoTemperature], // NOTE: this support function calling, but only its own, not a Custom Function
    parameterSpecs: [{ paramId: 'llmVndOaiWebSearchContext' }, { paramId: 'llmVndOaiWebSearchGeolocation' }],
    chatPrice: { input: 0.15, output: 0.6 },
    isPreview: true,
  },
  {
    // isLatest: true, // preview doesn't get highlighted
    idPrefix: 'gpt-4o-mini-search-preview-2025-03-11',
    label: 'GPT-4o Mini Search Preview (2025-03-11) 🌐',
    description: 'Latest snapshot of the GPT-4o Mini model optimized for web search capabilities.',
    contextWindow: 128000,
    maxCompletionTokens: 16384,
    trainingDataCutoff: 'Sep 30, 2023',
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Json, LLM_IF_HOTFIX_NoTemperature], // NOTE: this support function calling, but only its own, not a Custom Function
    parameterSpecs: [{ paramId: 'llmVndOaiWebSearchContext' }, { paramId: 'llmVndOaiWebSearchGeolocation' }],
    chatPrice: { input: 0.15, output: 0.6 },
    isPreview: true,
  },


  // o3-mini
  {
    idPrefix: 'o3-mini',
    label: 'o3 Mini',
    description: 'Points to the most recent o3-mini snapshot: o3-mini-2025-01-31',
    symLink: 'o3-mini-2025-01-31',
    hidden: true,
    // copied from symlinked
    contextWindow: 200000,
    maxCompletionTokens: 100000,
    trainingDataCutoff: 'Oct 2023',
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Fn, LLM_IF_OAI_Json, LLM_IF_OAI_Reasoning, LLM_IF_OAI_PromptCaching, LLM_IF_HOTFIX_StripImages],
    parameterSpecs: [{ paramId: 'llmVndOaiReasoningEffort' }, { paramId: 'llmVndOaiRestoreMarkdown' }],
    chatPrice: { input: 1.1, cache: { cType: 'oai-ac', read: 0.55 }, output: 4.4 },
    benchmark: { cbaElo: 1307 },
  },
  {
    isLatest: true,
    idPrefix: 'o3-mini-2025-01-31',
    label: 'o3 Mini (2025-01-31)',
    description: 'Latest o3-mini model snapshot. High intelligence at the same cost and latency targets of o1-mini. Excels at science, math, and coding tasks.',
    contextWindow: 200000,
    maxCompletionTokens: 100000,
    trainingDataCutoff: 'Oct 2023',
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Fn, LLM_IF_OAI_Json, LLM_IF_OAI_Reasoning, LLM_IF_OAI_PromptCaching, LLM_IF_HOTFIX_StripImages],
    parameterSpecs: [{ paramId: 'llmVndOaiReasoningEffort' }, { paramId: 'llmVndOaiRestoreMarkdown' }],
    chatPrice: { input: 1.1, cache: { cType: 'oai-ac', read: 0.55 }, output: 4.4 },
    benchmark: { cbaElo: 1307 },
  },

  // o1
  {
    idPrefix: 'o1',
    label: 'o1',
    description: 'Points to the most recent snapshot of the o1 model: o1-2024-12-17',
    symLink: 'o1-2024-12-17',
    hidden: true,
    // copied from symlinked
    contextWindow: 200000,
    maxCompletionTokens: 100000,
    trainingDataCutoff: 'Oct 2023',
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Fn, LLM_IF_OAI_Json, LLM_IF_OAI_Vision, LLM_IF_OAI_Reasoning, LLM_IF_OAI_PromptCaching],
    parameterSpecs: [{ paramId: 'llmVndOaiReasoningEffort' }, { paramId: 'llmVndOaiRestoreMarkdown' }],
    chatPrice: { input: 15, cache: { cType: 'oai-ac', read: 7.5 }, output: 60 },
    benchmark: { cbaElo: 1352 },
  },
  {
    idPrefix: 'o1-2024-12-17',
    label: 'o1 (2024-12-17)',
    description: 'Latest o1 model.',
    contextWindow: 200000,
    maxCompletionTokens: 100000,
    trainingDataCutoff: 'Oct 2023',
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Fn, LLM_IF_OAI_Json, LLM_IF_OAI_Vision, LLM_IF_OAI_Reasoning, LLM_IF_OAI_PromptCaching],
    parameterSpecs: [{ paramId: 'llmVndOaiReasoningEffort' }, { paramId: 'llmVndOaiRestoreMarkdown' }],
    chatPrice: { input: 15, cache: { cType: 'oai-ac', read: 7.5 }, output: 60 },
    benchmark: { cbaElo: 1352 },
  },

  // o1-preview
  {
    idPrefix: 'o1-preview',
    label: 'o1 Preview',
    description: 'Points to the most recent snapshot of the o1 preview model: o1-preview-2024-09-12',
    symLink: 'o1-preview-2024-09-12',
    // copied from symlinked
    contextWindow: 128000,
    maxCompletionTokens: 32768,
    trainingDataCutoff: 'Oct 2023',
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Reasoning, LLM_IF_OAI_PromptCaching, LLM_IF_HOTFIX_StripImages, LLM_IF_HOTFIX_Sys0ToUsr0],
    chatPrice: { input: 15, cache: { cType: 'oai-ac', read: 7.5 }, output: 60 },
    benchmark: { cbaElo: 1335 },
    isPreview: true,
    hidden: true,
  },
  {
    idPrefix: 'o1-preview-2024-09-12',
    label: 'o1 Preview (2024-09-12)', // ⏱️
    description: 'Latest o1 preview model snapshot. This model takes longer to run and does not support streaming. New reasoning model for complex tasks that require broad general knowledge.',
    contextWindow: 128000,
    maxCompletionTokens: 32768,
    trainingDataCutoff: 'Oct 2023',
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Reasoning, LLM_IF_OAI_PromptCaching, LLM_IF_HOTFIX_StripImages, LLM_IF_HOTFIX_Sys0ToUsr0],
    chatPrice: { input: 15, cache: { cType: 'oai-ac', read: 7.5 }, output: 60 },
    benchmark: { cbaElo: 1335 },
    isPreview: true,
    hidden: true,
  },

  // o1-mini
  {
    idPrefix: 'o1-mini',
    label: 'o1 Mini',
    description: 'Points to the most recent o1-mini snapshot: o1-mini-2024-09-12',
    symLink: 'o1-mini-2024-09-12',
    hidden: true,
    // copied from symlinked
    contextWindow: 128000,
    maxCompletionTokens: 65536,
    trainingDataCutoff: 'Oct 2023',
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Reasoning, LLM_IF_OAI_PromptCaching, LLM_IF_HOTFIX_StripImages, LLM_IF_HOTFIX_Sys0ToUsr0],
    chatPrice: { input: 1.1, cache: { cType: 'oai-ac', read: 0.55 }, output: 4.4 },
    benchmark: { cbaElo: 1304 },
  },
  {
    idPrefix: 'o1-mini-2024-09-12',
    label: 'o1 Mini (2024-09-12)', // ⏱️
    description: 'Latest o1-mini model snapshot. Fast, cost-efficient reasoning model tailored to coding, math, and science use cases.',
    contextWindow: 128000,
    maxCompletionTokens: 65536,
    trainingDataCutoff: 'Oct 2023',
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Reasoning, LLM_IF_OAI_PromptCaching, LLM_IF_HOTFIX_StripImages, LLM_IF_HOTFIX_Sys0ToUsr0],
    chatPrice: { input: 1.1, cache: { cType: 'oai-ac', read: 0.55 }, output: 4.4 },
    benchmark: { cbaElo: 1304 },
  },


  // GPT-4 Turbo
  {
    idPrefix: 'gpt-4-turbo',
    label: 'GPT-4 Turbo',
    description: 'GPT-4 Turbo with Vision. Currently points to gpt-4-turbo-2024-04-09.',
    symLink: 'gpt-4-turbo-2024-04-09',
    hidden: true,
    // copied from symlinked
    contextWindow: 128000,
    maxCompletionTokens: 4096,
    trainingDataCutoff: 'Dec 2023',
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Vision, LLM_IF_OAI_Fn, LLM_IF_OAI_Json],
    chatPrice: { input: 10, output: 30 },
    benchmark: { cbaElo: 1256 },
  },
  {
    idPrefix: 'gpt-4-turbo-2024-04-09',
    label: 'GPT-4 Turbo (2024-04-09)',
    description: 'GPT-4 Turbo with Vision model. Vision requests can now use JSON mode and function calling. gpt-4-turbo currently points to this version.',
    contextWindow: 128000,
    maxCompletionTokens: 4096,
    trainingDataCutoff: 'Dec 2023',
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Vision, LLM_IF_OAI_Fn, LLM_IF_OAI_Json],
    chatPrice: { input: 10, output: 30 },
    benchmark: { cbaElo: 1256 },
    hidden: true,
  },
  {
    idPrefix: 'gpt-4-0125-preview',
    label: 'GPT-4 Turbo (0125)',
    description: 'GPT-4 Turbo preview model intended to reduce cases of "laziness" where the model doesn\'t complete a task.',
    contextWindow: 128000,
    maxCompletionTokens: 4096,
    trainingDataCutoff: 'Dec 2023',
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Fn, LLM_IF_OAI_Json],
    chatPrice: { input: 10, output: 30 },
    benchmark: { cbaElo: 1245 },
    hidden: true,
  },
  {
    idPrefix: 'gpt-4-1106-preview', // GPT-4 Turbo preview model
    label: 'GPT-4 Turbo (1106)',
    description: 'GPT-4 Turbo preview model featuring improved instruction following, JSON mode, reproducible outputs, parallel function calling, and more.',
    contextWindow: 128000,
    maxCompletionTokens: 4096,
    trainingDataCutoff: 'Apr 2023',
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Fn, LLM_IF_OAI_Json],
    chatPrice: { input: 10, output: 30 },
    benchmark: { cbaElo: 1250 },
    hidden: true,
  },
  {
    idPrefix: 'gpt-4-turbo-preview',
    label: 'GPT-4 Turbo Preview',
    description: 'GPT-4 Turbo preview model. Currently points to gpt-4-0125-preview.',
    symLink: 'gpt-4-0125-preview',
    hidden: true,
    isLegacy: true,
    // copied from symlinked
    contextWindow: 128000,
    maxCompletionTokens: 4096,
    trainingDataCutoff: 'Dec 2023',
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Fn, LLM_IF_OAI_Json],
    chatPrice: { input: 10, output: 30 },
    benchmark: { cbaElo: 1251 },
  },

  // GPT4-32k's
  {
    idPrefix: 'gpt-4-32k',
    label: 'GPT-4 32k',
    description: 'Currently points to gpt-4-32k-0613. This model was never rolled out widely in favor of GPT-4 Turbo.',
    symLink: 'gpt-4-32k-0613',
    hidden: true,
    // copied from symlinked
    contextWindow: 32768,
    trainingDataCutoff: 'Sep 2021',
    interfaces: [LLM_IF_OAI_Chat],
    chatPrice: { input: 60, output: 120 },
    isLegacy: true,
  },
  {
    idPrefix: 'gpt-4-32k-0613',
    label: 'GPT-4 32k (0613)',
    description: 'Snapshot of gpt-4-32k from June 13th 2023 with improved function calling support. This model was never rolled out widely in favor of GPT-4 Turbo.',
    contextWindow: 32768,
    trainingDataCutoff: 'Sep 2021',
    interfaces: [LLM_IF_OAI_Chat],
    chatPrice: { input: 60, output: 120 },
    hidden: true,
    isLegacy: true,
  },
  {
    idPrefix: 'gpt-4-32k-0314',
    label: 'GPT-4 32k (0314)',
    description: 'Snapshot of gpt-4-32k from March 14th 2023. Will be deprecated on June 13th 2024 at the earliest.',
    contextWindow: 32768,
    trainingDataCutoff: 'Sep 2021',
    interfaces: [LLM_IF_OAI_Chat],
    chatPrice: { input: 60, output: 120 },
    hidden: true,
    isLegacy: true,
  },

  // GPT4's
  {
    idPrefix: 'gpt-4',
    label: 'GPT-4',
    description: 'Currently points to gpt-4-0613.',
    symLink: 'gpt-4-0613',
    hidden: true,
    // copied from symlinked
    contextWindow: 8192,
    trainingDataCutoff: 'Sep 2021',
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Fn],
    chatPrice: { input: 30, output: 60 },
    benchmark: { cbaElo: 1163 },
    isLegacy: true,
  },
  {
    idPrefix: 'gpt-4-0613',
    label: 'GPT-4 (0613)',
    description: 'Snapshot of gpt-4 from June 13th 2023 with improved function calling support. Data up to Sep 2021.',
    contextWindow: 8192,
    trainingDataCutoff: 'Sep 2021',
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Fn],
    chatPrice: { input: 30, output: 60 },
    benchmark: { cbaElo: 1163 },
    hidden: true,
    isLegacy: true,
  },
  {
    idPrefix: 'gpt-4-0314',
    label: 'GPT-4 (0314)',
    description: 'Snapshot of gpt-4 from March 14th 2023 with function calling data. Data up to Sep 2021.',
    contextWindow: 8192,
    trainingDataCutoff: 'Sep 2021',
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Fn],
    chatPrice: { input: 30, output: 60 },
    benchmark: { cbaElo: 1186 },
    hidden: true,
    isLegacy: true,
  },

  // 3.5
  // Note: As of July 2024, gpt-4o-mini should be used in place of gpt-3.5-turbo, as it is cheaper, more capable, multimodal, and just as fast.
  // As such, many 3.5 models are in the 'deny list' below, and not even returned to the UI.
  {
    idPrefix: 'gpt-3.5-turbo',
    label: '3.5-Turbo',
    description: 'Currently points to gpt-3.5-turbo-0125. As of July 2024, gpt-4o-mini should be used in place of gpt-3.5-turbo, as it is cheaper, more capable, multimodal, and just as fast.',
    symLink: 'gpt-3.5-turbo-0125',
    // copied
    contextWindow: 16385,
    maxCompletionTokens: 4096,
    trainingDataCutoff: 'Sep 2021',
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Fn],
    chatPrice: { input: 0.5, output: 1.5 },
    benchmark: { cbaElo: 1106 },
    hidden: true,
  },
  {
    idPrefix: 'gpt-3.5-turbo-0125',
    label: '3.5-Turbo (2024-01-25)',
    description: 'The latest GPT-3.5 Turbo model with higher accuracy at responding in requested formats and a fix for a bug which caused a text encoding issue for non-English language function calls.',
    contextWindow: 16385,
    maxCompletionTokens: 4096,
    trainingDataCutoff: 'Sep 2021',
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Fn],
    chatPrice: { input: 0.5, output: 1.5 },
    benchmark: { cbaElo: 1106 },
    hidden: true,
  },
  {
    idPrefix: 'gpt-3.5-turbo-1106',
    label: '3.5-Turbo (1106)',
    description: 'GPT-3.5 Turbo model with improved instruction following, JSON mode, reproducible outputs, parallel function calling, and more.',
    contextWindow: 16385,
    maxCompletionTokens: 4096,
    trainingDataCutoff: 'Sep 2021',
    interfaces: [LLM_IF_OAI_Chat, LLM_IF_OAI_Fn],
    chatPrice: { input: 1, output: 2 },
    benchmark: { cbaElo: 1068 },
    hidden: true,
  },
  {
    idPrefix: 'gpt-3.5-turbo-instruct',
    label: '3.5-Turbo Instruct',
    description: 'Similar capabilities as GPT-3 era models. Compatible with legacy Completions endpoint and not Chat Completions.',
    contextWindow: 4096,
    trainingDataCutoff: 'Sep 2021',
    interfaces: [/* NO: LLM_IF_OAI_Chat,*/ LLM_IF_OAI_Complete],
    chatPrice: { input: 1.5, output: 2 },
    hidden: true,
  },


  // Azure variants - because someone forgot the dot
  {
    idPrefix: 'gpt-35-turbo-16k',
    label: '3.5-Turbo 16k',
    description: 'Fair speed and smarts, large context',
    contextWindow: 16384,
    interfaces: [LLM_IF_OAI_Chat], // as azure doesn't version model id's (in the deployments), let's assume no function calling
    hidden: true,
  },
  {
    idPrefix: 'gpt-35-turbo',
    label: '3.5-Turbo',
    contextWindow: 4096,
    description: 'Fair speed and smarts',
    interfaces: [LLM_IF_OAI_Chat], // as azure doesn't version model id's (in the deployments), let's assume no function calling
    hidden: true,
  },

  // Fallback - unknown
  {
    idPrefix: '',
    label: '?:',
    description: 'Unknown, please let us know the ID. Assuming a context window of 128k tokens, and a maximum output of 4k tokens.',
    contextWindow: 128000,
    maxCompletionTokens: 4096,
    interfaces: [LLM_IF_OAI_Chat],
    // hidden: true,
  },

];

const openAIModelsDenyList: string[] = [
  // [OpenAI, 2025-03-11] FIXME: NOT YET SUPPORTED - "RESPONSES API"
  // 'computer-use-preview', 'computer-use-preview-2025-03-11',

  // Legacy GPT models
  'gpt-3.5-turbo-0301',
  'gpt-3.5-turbo-0613',
  'gpt-3.5-turbo-16k',
  'gpt-3.5-turbo-16k-0613',

  // Other unwanted GPT models
  'gpt-4-turbo-preview',

  // Non-chat GPT models
  '-turbo-instruct', 'davinci-', 'babbage-',

  // Embedding models: /v1/embeddings
  'text-embedding-3-small', 'text-embedding-3-large', 'text-embedding-ada-002',

  // TTS Models: /v1/audio/speech
  'tts-1-hd', 'tts-1',

  // STT models: /v1/audio/transcriptions, /v1/audio/translations
  'whisper-1',

  // Image models: /v1/images/generations
  'dall-e-3', 'dall-e-2',

  // Moderation models
  'omni-moderation-latest', 'omni-moderation-2024-09-26',
];

export function openAIModelFilter(model: OpenAIWire_API_Models_List.Model) {
  return !openAIModelsDenyList.some(deny => model.id.includes(deny));
}

export function openAIModelToModelDescription(modelId: string, modelCreated: number | undefined, modelUpdated?: number): ModelDescriptionSchema {
  return fromManualMapping(_knownOpenAIChatModels, modelId, modelCreated, modelUpdated);
}


const _manualOrderingIdPrefixes = [
  // Computer use models
  'computer-use-20',
  'computer-use-preview',
  // Reasoning models
  'o3-20',
  'o3-mini-',
  'o3-',
  'o1-20',
  'o1-preview-',
  'o1-mini-',
  'o1-',
  // GPT-4.5
  'gpt-4.5-20',
  'gpt-4.5-preview',
  'gpt-4.5-',
  // Preferred models
  'gpt-4o-20',
  'gpt-4o-search-20',
  'gpt-4o-search-preview',
  'gpt-4o-mini-20',
  'gpt-4o-mini-search-20',
  'gpt-4o-mini-search-preview',
  'gpt-4o-mini',
  'gpt-4o-',
  // ChatGPT models
  'chatgpt-',
  // ...rest
  // 'gpt-4-turbo-',
  // 'gpt-4-',
  // ...
];


export function openAISortModels(a: ModelDescriptionSchema, b: ModelDescriptionSchema) {
  // bottom: links
  const aLink = a.label.startsWith('🔗');
  const bLink = b.label.startsWith('🔗');
  if (aLink !== bLink) return aLink ? 1 : -1;

  // bottom: non-chatGenerate
  const aChat = a.interfaces.includes(LLM_IF_OAI_Chat);
  const bChat = b.interfaces.includes(LLM_IF_OAI_Chat);
  if (aChat !== bChat) return aChat ? -1 : 1;

  // sort by manual ordering (if not present is implicitly at the bottom)
  const aOrder = _manualOrderingIdPrefixes.findIndex(prefix => a.id.startsWith(prefix));
  const bOrder = _manualOrderingIdPrefixes.findIndex(prefix => b.id.startsWith(prefix));
  if (aOrder !== bOrder) {
    if (aOrder === -1) return 1;
    if (bOrder === -1) return -1;
    return aOrder - bOrder;
  }

  // fix the OpenAI model names to be chronologically sorted
  function remapReleaseDate(id: string): string {
    return id
      .replace('0314', '2023-03-14')
      .replace('0613', '2023-06-13')
      .replace('1106', '2023-11-06')
      .replace('0125', '2024-01-25')
      .replace('0409', '2024-04-09');
  }

  // due to using by-label, sorting doesn't require special cases anymore
  return remapReleaseDate(b.label).localeCompare(remapReleaseDate(a.label));

  // move models with the link emoji (🔗) to the bottom
  // const aLink = a.label.includes('🔗');
  // const bLink = b.label.includes('🔗');
  // if (aLink !== bLink)
  //   return aLink ? 1 : -1;

  // sort by model name
  // return b.label.replace('🌟 ', '').localeCompare(a.label.replace('🌟 ', ''));

  // sort by model ID~ish
  // const aId = a.id.slice(0, 5);
  // const bId = b.id.slice(0, 5);
  // if (aId === bId) {
  //   const aCount = a.id.split('-').length;
  //   const bCount = b.id.split('-').length;
  //   if (aCount === bCount)
  //     return a.id.localeCompare(b.id);
  //   return aCount - bCount;
  // }
  // return bId.localeCompare(aId);
}


// [Azure]

export function azureModelToModelDescription(azureDeploymentRef: string, openAIModelIdBase: string, modelCreated: number, modelUpdated?: number): ModelDescriptionSchema {
  // if the deployment name mataches an OpenAI model prefix, use that
  const known = _knownOpenAIChatModels.find(base => azureDeploymentRef == base.idPrefix);
  return fromManualMapping(_knownOpenAIChatModels, known ? azureDeploymentRef : openAIModelIdBase, modelCreated, modelUpdated, undefined, true);
}
