import type { RunningScriptOptions } from 'node:vm';
import type { PoolConfig } from 'pg';

declare namespace config {
  export interface ServerSettings {
    host?: string;
    port: number;
  }
}

/** Database settings */
export const DB: PoolConfig;
/** Configuration of the network servers by supported types */
export const SERVERS: {
  static: config.ServerSettings;
  http: config.ServerSettings;
  ws: config.ServerSettings;
  [apiTransportKey: string]: config.ServerSettings;
};
/**
 * Selected network transport for API. Available values:
 * - `http` handled by Node's native http module
 * - `ws` WebSocket handled by `WS` package
 */
export const transport: 'http' | 'ws';
/** Logger service settings */
export const LOGGER: {
  /** Selected logger service */
  serviceKey: 'native' | 'custom';
  /** Path to the folder to store log files in. Relative path allowed. */
  logPath: string;
};
/** Crypto module settings for the hashing algorithm */
export const HASHING: {
  saltLength: number;
  keyLength: number;
};
/** Sandboxes settings */
export const SANDBOX_RUN_OPTIONS: RunningScriptOptions;
