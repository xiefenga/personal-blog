import OSS from 'ali-oss'

export const upload2ALiOSS = async (config, filename, file) => {
  const { customUrl, path, ...options } = config;
  if (customUrl) {
    options.cname = true;
    options.endpoint = customUrl;
  }
  const client = new OSS(options);
  return await client.put(path + filename, file);
}

