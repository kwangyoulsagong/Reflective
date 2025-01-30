type LogLevel = "info" | "warn" | "error";

interface LoggerOptions {
  enabled?: boolean;
  prefix?: string;
}

export function useLogger(context: string, options: LoggerOptions = {}) {
  const enabled = options.enabled ?? process.env.NODE_ENV === "development";

  const log = (level: LogLevel, message: string, data?: unknown) => {
    if (!enabled) return;

    const timestamp = new Date().toISOString();
    console[level](`[${timestamp}][${context}][${level}] ${message}`, data);
  };

  return {
    info: (message: string, data?: unknown) => log("info", message, data),
    warn: (message: string, data?: unknown) => log("warn", message, data),
    error: (message: string, data?: unknown) => log("error", message, data),
  };
}
