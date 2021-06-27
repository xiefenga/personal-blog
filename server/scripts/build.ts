import { join } from 'path'
import { exec } from 'child_process'
import { access, rm, mkdir, readdir, copyFile } from 'fs/promises'

const copyList: string[][] = [
  [join(__dirname, '../caches'), join(__dirname, '../dist/caches')],
  [join(__dirname, '../configs'), join(__dirname, '../dist/configs')]
];

const checkExist = async (path: string) => {
  try {
    await access(path);
    return true;
  } catch (__) { }
  return false;
}

const copyDir = async (src: string, dest: string) => {
  await mkdir(dest, { recursive: true });
  const files = await readdir(src, { withFileTypes: true });
  await Promise.all(files.map(async file => {
    const srcPath = join(src, file.name);
    const destPath = join(dest, file.name);
    if (file.isFile()) {
      await copyFile(srcPath, destPath);
    } else if (file.isDirectory()) {
      await copyDir(srcPath, destPath);
    }
  }));
}

const startBuild = async () => {
  const path = join(__dirname, '../dist');
  const existed = await checkExist(path);
  if (existed) {
    try {
      await rm(path, { recursive: true, force: true });
    } catch (error) {
      console.log('删除目录失败');
      process.exit();
    }
  }
  const worker = exec('tsc');
  worker.on('exit', async () => {
    await Promise.all(copyList.map(([src, dest]) => copyDir(src, dest)));
  });
}

startBuild();