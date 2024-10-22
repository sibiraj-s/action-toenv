import fs from 'node:fs/promises';
import path from 'node:path';
import * as core from '@actions/core';

const defaultEnvFilePath = path.join(process.cwd(), '.env');

async function ensureDir(dir: string): Promise<void> {
  const dirExists = await fs
    .access(dir)
    .then(() => true)
    .catch(() => false);
  if (!dirExists) await fs.mkdir(dir, { recursive: true });
}

const getEnvFilePath = (): string => {
  const inputPath = core.getInput('envpath');
  if (!inputPath) return defaultEnvFilePath;
  return path.resolve(process.cwd(), inputPath);
};

export async function run(): Promise<void> {
  try {
    const env = core.getMultilineInput('env');
    const envFilePath = getEnvFilePath();

    await ensureDir(path.dirname(envFilePath));

    const envFile =
      env
        .map(line => line.split(/=(.*)/))
        .map(([key, value]) => `${key}=${value}`)
        .join('\n') + '\n';

    await fs.writeFile(envFilePath, envFile);
    core.setOutput('envpath', envFilePath);
    core.info(`Wrote environment variables to: ${envFilePath}`);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}
