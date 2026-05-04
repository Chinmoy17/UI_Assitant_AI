import * as fs from 'fs'
import * as path from 'path'

const STORAGE_DIR = path.join(process.cwd(), '.vscode', 'ui-assistant')
const CONTEXT_FILE = path.join(STORAGE_DIR, 'context.json')
const HISTORY_FILE = path.join(STORAGE_DIR, 'history.json')

const HISTORY_LIMIT = 10

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

function ensureStorageDir(): void {
  if (!fs.existsSync(STORAGE_DIR)) {
    fs.mkdirSync(STORAGE_DIR, { recursive: true })
  }
}

export function initStorage(): void {
  ensureStorageDir()

  if (!fs.existsSync(CONTEXT_FILE)) {
    fs.writeFileSync(CONTEXT_FILE, JSON.stringify(DEFAULT_CONTEXT, null, 2))
  }

  if (!fs.existsSync(HISTORY_FILE)) {
    fs.writeFileSync(HISTORY_FILE, JSON.stringify([], null, 2))
  }
}

export function loadContext(): ProjectContext {
  initStorage()
  try {
    const raw = fs.readFileSync(CONTEXT_FILE, 'utf-8')
    const parsed = JSON.parse(raw) as ProjectContext
    // migrate older versions missing new fields
    return { ...DEFAULT_CONTEXT, ...parsed }
  } catch {
    return { ...DEFAULT_CONTEXT }
  }
}

export function saveContext(updates: Partial<ProjectContext>): void {
  initStorage()
  const current = loadContext()
  const merged = {
    ...current,
    ...updates,
    brand: { ...current.brand, ...(updates.brand ?? {}) },
  }
  fs.writeFileSync(CONTEXT_FILE, JSON.stringify(merged, null, 2))
}

export function appendHistory(entry: Omit<HistoryEntry, 'timestamp'>): void {
  initStorage()
  let history: HistoryEntry[] = []

  try {
    const raw = fs.readFileSync(HISTORY_FILE, 'utf-8')
    history = JSON.parse(raw) as HistoryEntry[]
  } catch {
    history = []
  }

  history.unshift({ ...entry, timestamp: new Date().toISOString() })

  if (history.length > HISTORY_LIMIT) {
    history = history.slice(0, HISTORY_LIMIT)
  }

  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2))
}
