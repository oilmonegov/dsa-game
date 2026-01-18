import initSqlJs, { Database as SqlJsDatabase } from 'sql.js';
import type { ModuleId, AttemptRecord, QuestionAttempt, ModuleScore } from '@/types';

// Initialize sql.js with the WASM file
let db: SqlJsDatabase | null = null;
let dbInitPromise: Promise<SqlJsDatabase> | null = null;

const DB_STORAGE_KEY = 'dsa_game_db';

// Schema definitions
const SCHEMA = `
  -- Users table (for future multi-user support)
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT DEFAULT 'Student',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Module scores
  CREATE TABLE IF NOT EXISTS scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER DEFAULT 1,
    module TEXT NOT NULL,
    correct INTEGER NOT NULL,
    total INTEGER NOT NULL,
    points INTEGER DEFAULT 0,
    time_spent INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  -- Question attempts for analytics
  CREATE TABLE IF NOT EXISTS attempts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER DEFAULT 1,
    question_id INTEGER NOT NULL,
    module TEXT NOT NULL,
    correct BOOLEAN NOT NULL,
    time_taken INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  -- Settings key-value store
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );

  -- Insert default user if not exists
  INSERT OR IGNORE INTO users (id, name) VALUES (1, 'Student');
`;

export async function initDatabase(): Promise<SqlJsDatabase> {
  if (db) return db;
  if (dbInitPromise) return dbInitPromise;

  dbInitPromise = (async () => {
    try {
      const SQL = await initSqlJs({
        locateFile: (file) => `https://sql.js.org/dist/${file}`,
      });

      // Try to load existing database from localStorage
      const savedDb = localStorage.getItem(DB_STORAGE_KEY);
      if (savedDb) {
        const uint8Array = new Uint8Array(
          atob(savedDb)
            .split('')
            .map((c) => c.charCodeAt(0))
        );
        db = new SQL.Database(uint8Array);
      } else {
        db = new SQL.Database();
        db.run(SCHEMA);
        saveDatabase();
      }

      return db;
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  })();

  return dbInitPromise;
}

function saveDatabase(): void {
  if (!db) return;
  try {
    const data = db.export();
    const buffer = new Uint8Array(data);
    const base64 = btoa(String.fromCharCode(...buffer));
    localStorage.setItem(DB_STORAGE_KEY, base64);
  } catch (error) {
    console.error('Failed to save database:', error);
  }
}

export async function getDatabase(): Promise<SqlJsDatabase> {
  if (!db) {
    return initDatabase();
  }
  return db;
}

// Score Operations
export async function saveScore(
  module: ModuleId,
  correct: number,
  total: number,
  points: number,
  timeSpent: number
): Promise<number> {
  const database = await getDatabase();
  database.run(
    `INSERT INTO scores (module, correct, total, points, time_spent)
     VALUES (?, ?, ?, ?, ?)`,
    [module, correct, total, points, timeSpent]
  );
  saveDatabase();

  const result = database.exec('SELECT last_insert_rowid() as id');
  return result[0]?.values[0]?.[0] as number;
}

export async function getModuleScores(module: ModuleId): Promise<AttemptRecord[]> {
  const database = await getDatabase();
  const result = database.exec(
    `SELECT id, module, correct, total, points, time_spent as timeSpent,
            ROUND(correct * 100.0 / total, 0) as percentage,
            created_at as timestamp
     FROM scores
     WHERE module = ?
     ORDER BY created_at DESC`,
    [module]
  );

  if (!result[0]) return [];

  return result[0].values.map((row) => ({
    id: row[0] as number,
    module: row[1] as ModuleId,
    correct: row[2] as number,
    total: row[3] as number,
    points: row[4] as number,
    timeSpent: row[5] as number,
    percentage: row[6] as number,
    timestamp: row[7] as string,
  }));
}

export async function getLatestModuleScore(module: ModuleId): Promise<ModuleScore | null> {
  const database = await getDatabase();
  const result = database.exec(
    `SELECT correct, total, points, time_spent, COUNT(*) as attempts,
            MAX(created_at) as lastAttempt
     FROM scores
     WHERE module = ?
     GROUP BY module`,
    [module]
  );

  if (!result[0]?.values[0]) return null;

  const row = result[0].values[0];
  return {
    correct: row[0] as number,
    total: row[1] as number,
    points: row[2] as number,
    timeSpent: row[3] as number,
    attempts: row[4] as number,
    lastAttempt: row[5] as string,
  };
}

export async function getAllModuleScores(): Promise<Record<ModuleId, ModuleScore>> {
  const database = await getDatabase();
  const modules: ModuleId[] = ['theory', 'diagrams', 'traversals', 'realWorld', 'codeCompletion'];
  const scores: Record<ModuleId, ModuleScore> = {} as Record<ModuleId, ModuleScore>;

  for (const module of modules) {
    const result = database.exec(
      `SELECT
        COALESCE(SUM(correct), 0) as correct,
        COALESCE(SUM(total), 0) as total,
        COALESCE(SUM(points), 0) as points,
        COALESCE(SUM(time_spent), 0) as timeSpent,
        COUNT(*) as attempts,
        MAX(created_at) as lastAttempt
       FROM scores WHERE module = ?`,
      [module]
    );

    const row = result[0]?.values[0];
    scores[module] = {
      correct: (row?.[0] as number) || 0,
      total: (row?.[1] as number) || 0,
      points: (row?.[2] as number) || 0,
      timeSpent: (row?.[3] as number) || 0,
      attempts: (row?.[4] as number) || 0,
      lastAttempt: (row?.[5] as string) || null,
    };
  }

  return scores;
}

// Question Attempt Operations
export async function saveQuestionAttempt(
  questionId: number,
  module: ModuleId,
  correct: boolean,
  timeTaken: number
): Promise<void> {
  const database = await getDatabase();
  database.run(
    `INSERT INTO attempts (question_id, module, correct, time_taken)
     VALUES (?, ?, ?, ?)`,
    [questionId, module, correct ? 1 : 0, timeTaken]
  );
  saveDatabase();
}

export async function getQuestionAttempts(module: ModuleId): Promise<QuestionAttempt[]> {
  const database = await getDatabase();
  const result = database.exec(
    `SELECT id, question_id as questionId, module, correct, time_taken as timeTaken,
            created_at as timestamp
     FROM attempts
     WHERE module = ?
     ORDER BY created_at DESC`,
    [module]
  );

  if (!result[0]) return [];

  return result[0].values.map((row) => ({
    id: row[0] as number,
    questionId: row[1] as number,
    module: row[2] as ModuleId,
    correct: Boolean(row[3]),
    timeTaken: row[4] as number,
    timestamp: row[5] as string,
  }));
}

export async function getMostMissedQuestions(
  module: ModuleId,
  limit: number = 10
): Promise<{ questionId: number; missCount: number }[]> {
  const database = await getDatabase();
  const result = database.exec(
    `SELECT question_id, COUNT(*) as miss_count
     FROM attempts
     WHERE module = ? AND correct = 0
     GROUP BY question_id
     ORDER BY miss_count DESC
     LIMIT ?`,
    [module, limit]
  );

  if (!result[0]) return [];

  return result[0].values.map((row) => ({
    questionId: row[0] as number,
    missCount: row[1] as number,
  }));
}

// Settings Operations
export async function getSetting(key: string): Promise<string | null> {
  const database = await getDatabase();
  const result = database.exec('SELECT value FROM settings WHERE key = ?', [key]);
  return result[0]?.values[0]?.[0] as string | null;
}

export async function setSetting(key: string, value: string): Promise<void> {
  const database = await getDatabase();
  database.run(
    `INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)`,
    [key, value]
  );
  saveDatabase();
}

// Overall Progress
export async function getOverallProgress(): Promise<{
  correct: number;
  total: number;
  percentage: number;
  totalTime: number;
  passed: boolean;
}> {
  const database = await getDatabase();
  const result = database.exec(
    `SELECT
      COALESCE(SUM(correct), 0) as correct,
      COALESCE(SUM(total), 0) as total,
      COALESCE(SUM(time_spent), 0) as totalTime
     FROM scores`
  );

  const row = result[0]?.values[0];
  const correct = (row?.[0] as number) || 0;
  const total = (row?.[1] as number) || 0;
  const totalTime = (row?.[2] as number) || 0;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  return {
    correct,
    total,
    percentage,
    totalTime,
    passed: percentage >= 70,
  };
}

// Clear all data
export async function clearAllData(): Promise<void> {
  const database = await getDatabase();
  database.run('DELETE FROM attempts');
  database.run('DELETE FROM scores');
  database.run('DELETE FROM settings');
  saveDatabase();
}

// Export database for debugging
export async function exportDatabase(): Promise<Uint8Array> {
  const database = await getDatabase();
  return database.export();
}
