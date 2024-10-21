import fs from 'node:fs/promises';
import path from 'node:path';
import * as core from '@actions/core';

const defaultEnvFilePath = path.join(process.cwd(), '.env');

export async function run(): Promise<void> {
  try {
    const env = core.getMultilineInput('env');
    const inputPath = core.getInput('envpath');
    const envFilePath = inputPath ? path.resolve(process.cwd(), inputPath) : defaultEnvFilePath;

    const envFile = env
      .map(line => line.split('='))
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    await fs.writeFile(envFilePath, envFile + '\n');
    core.setOutput('envpath', envFilePath);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}
