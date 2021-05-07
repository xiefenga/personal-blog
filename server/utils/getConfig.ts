import { readFileSync } from 'fs'
import { readFile } from 'fs/promises'

async function getConfig<T>(path: string): Promise<T> {
  return JSON.parse(
    (await readFile(path)).toString('utf-8')
  );
}

function getConfigSync<T>(path: string): T {
  return JSON.parse(readFileSync(path, { encoding: 'utf-8' }));
}

function updateConfig() {

}

export { getConfig, getConfigSync }