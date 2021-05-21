class FileInfo {
  constructor(file, content) {
    this.size = file.size;
    this.name = file.name;
    this.lastModified = file.lastModified;
    this.content = content;
  }
}

const createDownloadURL = data => {
  const blob = new Blob([data], { type: 'text/plain' })
  return URL.createObjectURL(blob);
}

function download(url, fileName) {
  const download = document.createElement('a');
  download.display = 'none';
  download.href = url;
  download.download = fileName;
  document.body.appendChild(download);
  download.click();
  document.body.removeChild(download);
}

function exportFile(data, fileName) {
  if (data == null) {
    throw new Error('导出文件为空');
  } else if (fileName == null || fileName === '') {
    throw new Error('缺少文件名');
  }
  const url = createDownloadURL(data);
  download(url, fileName);
  URL.revokeObjectURL(url);
}

async function importFile(file, extLimits = []) {
  const names = file.name.split('.');
  const ext = names.pop();
  if (extLimits.length && !extLimits.includes(ext) && !names.length) {
    throw new Error(`文件格式不支持`);
  }
  return new FileInfo(file, await readFile(file));
}

const readerToPromise = reader => new Promise((resolve, reject) => {
  reader.addEventListener('load', () => resolve(reader.result));
  // reader.error：读取文件时发生的错误
  // 1（未找到文件）、2（安全错误）、3（读取被中断）、4（文件不可读）、 5（编码错误）
  reader.addEventListener('error', () => reject(reader.error));
});

const createReader = onprogress => {
  const reader = new FileReader();
  onprogress && reader.addEventListener('progress', onprogress);
  const promise = readerToPromise(reader);
  return [reader, promise];
}

async function readFile(blob, onprogress) {
  const [reader, promise] = createReader(onprogress);
  reader.readAsText(blob);
  return promise;
}

async function getBase64(blob, onprogress) {
  const [reader, promise] = createReader(onprogress);
  reader.readAsDataURL(blob);
  return promise;
}

export { createDownloadURL, exportFile, download, readFile, importFile, getBase64 }