import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { CodexPrompt } from '@/types';

export async function loadCodexPrompt(): Promise<CodexPrompt> {
  const filePath = path.join(process.cwd(), 'codex.prompt.json');
  const raw = await readFile(filePath, 'utf8');
  return JSON.parse(raw) as CodexPrompt;
}
