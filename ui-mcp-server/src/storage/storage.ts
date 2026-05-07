import * as fs from 'fs'
import * as path from 'path'

const HISTORY_LIMIT = 10
const STORAGE_DIRNAME = 'ui-assistant'
const WORKSPACE_DIR_ENV = 'UI_CRAFT_WORKSPACE_DIR'
const STORAGE_DIR_ENV = 'UI_CRAFT_STORAGE_DIR'

export interface ProjectContext {
  version: string
  project_name: string
  stack: string
  audience: string
  industry: string
  brand: {
    primary_color: string
    font: string
    theme: 'light' | 'dark' | 'custom'
  }
  device_targets: string[]
  custom_rules: string[]
}

export interface HistoryEntry {
  timestamp: string
  tool: string
  input: Record<string, unknown>
  summary: string
}

export interface StorageState {
  current_stage: 'INIT' | 'DESIGN' | 'GENERATE' | 'IMPROVE' | 'DONE'
  last_tool: string
  updated_at: string
}

const DEFAULT_CONTEXT: ProjectContext = {
  version: '1.0',
  project_name: '',
  stack: '',
  audience: '',
  industry: '',
  brand: {
    primary_color: '',
    font: '',
    theme: 'light',
  },
  device_targets: [],
  custom_rules: [],
}

const DEFAULT_STATE: StorageState = {
  current_stage: 'INIT',
  last_tool: '',
  updated_at: '',
}

function isLikelyInstallPath(candidate: string): boolean {
  const normalized = candidate.toLowerCase()
  return normalized.includes('node_modules') || normalized.includes('npm-cache')
}

function resolveWorkspaceRoot(): string {
  const configuredStorageDir = process.env[STORAGE_DIR_ENV]
  if (configuredStorageDir) {
    return path.resolve(configuredStorageDir)
  }

  const configuredWorkspaceDir = process.env[WORKSPACE_DIR_ENV]
  if (configuredWorkspaceDir) {
    return path.join(path.resolve(configuredWorkspaceDir), '.vscode', STORAGE_DIRNAME)
  }

  const seeds = [process.env.INIT_CWD, process.cwd()].filter(Boolean) as string[]
  const preferredSeed = seeds.find(seed => !isLikelyInstallPath(seed)) ?? seeds[0] ?? process.cwd()
  return path.join(path.resolve(preferredSeed), '.vscode', STORAGE_DIRNAME)
}

function getStoragePaths() {
  const storageDir = resolveWorkspaceRoot()
  return {
    storageDir,
    contextFile: path.join(storageDir, 'context.json'),
    stateFile: path.join(storageDir, 'state.json'),
    historyFile: path.join(storageDir, 'history.json'),
    notesFile: path.join(storageDir, 'notes.md'),
  }
}

function ensureStorageDir(): ReturnType<typeof getStoragePaths> {
  const storagePaths = getStoragePaths()

  if (!fs.existsSync(storagePaths.storageDir)) {
    fs.mkdirSync(storagePaths.storageDir, { recursive: true })
  }

  return storagePaths
}

export function initContextSystem(): void {
  const storagePaths = ensureStorageDir()

  if (!fs.existsSync(storagePaths.contextFile)) {
    fs.writeFileSync(storagePaths.contextFile, JSON.stringify(DEFAULT_CONTEXT, null, 2))
  }

  if (!fs.existsSync(storagePaths.stateFile)) {
    fs.writeFileSync(storagePaths.stateFile, JSON.stringify(DEFAULT_STATE, null, 2))
  }

  if (!fs.existsSync(storagePaths.historyFile)) {
    fs.writeFileSync(storagePaths.historyFile, JSON.stringify([], null, 2))
  }

  if (!fs.existsSync(storagePaths.notesFile)) {
    fs.writeFileSync(storagePaths.notesFile, '# UI Craft Notes\n\n')
  }
}

export const initStorage = initContextSystem

export function loadContext(): ProjectContext {
  initContextSystem()
  const { contextFile } = getStoragePaths()

  try {
    const raw = fs.readFileSync(contextFile, 'utf-8')
    const parsed = JSON.parse(raw) as ProjectContext
    // migrate older versions missing new fields
    return { ...DEFAULT_CONTEXT, ...parsed }
  } catch {
    return { ...DEFAULT_CONTEXT }
  }
}

export function saveContext(updates: Partial<ProjectContext>): void {
  initContextSystem()
  const current = loadContext()
  const { contextFile } = getStoragePaths()
  const merged = {
    ...current,
    ...updates,
    brand: { ...current.brand, ...(updates.brand ?? {}) },
  }
  fs.writeFileSync(contextFile, JSON.stringify(merged, null, 2))
}

export function appendHistory(entry: Omit<HistoryEntry, 'timestamp'>): void {
  initContextSystem()
  let history: HistoryEntry[] = []
  const { historyFile, stateFile } = getStoragePaths()

  try {
    const raw = fs.readFileSync(historyFile, 'utf-8')
    history = JSON.parse(raw) as HistoryEntry[]
  } catch {
    history = []
  }

  history.unshift({ ...entry, timestamp: new Date().toISOString() })

  if (history.length > HISTORY_LIMIT) {
    history = history.slice(0, HISTORY_LIMIT)
  }

  fs.writeFileSync(historyFile, JSON.stringify(history, null, 2))
  fs.writeFileSync(stateFile, JSON.stringify({
    ...DEFAULT_STATE,
    current_stage: 'DESIGN',
    last_tool: entry.tool,
    updated_at: new Date().toISOString(),
  }, null, 2))
}
