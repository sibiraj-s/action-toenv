import fs from 'node:fs/promises';
import * as core from '@actions/core';
import { describe, it, beforeEach, expect, vi } from 'vitest';

import * as main from '../src/main';

// Mock the action's main function
const runMock = vi.spyOn(main, 'run');

// Mock the GitHub Actions core library
const getInputMock = vi.spyOn(core, 'getMultilineInput').mockReturnValue([]);
const setOutputMock = vi.spyOn(core, 'setOutput').mockImplementation(() => {});

describe('action', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('writes the env file', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation((name: string): string[] => {
      if (name === 'env') {
        return ['FOO=BAR', 'BAZ=QUX'];
      }
      return [];
    });

    await main.run();
    expect(runMock).toHaveReturned();

    const envFilePath = setOutputMock.mock.calls[0][1];
    const envFile = await fs.readFile(envFilePath, 'utf8');
    expect(envFile).toBe('FOO=BAR\nBAZ=QUX\n');

    // Verify that all of the core library functions were called correctly
    expect(setOutputMock).toHaveBeenNthCalledWith(1, 'envpath', expect.any(String));
  });
});
