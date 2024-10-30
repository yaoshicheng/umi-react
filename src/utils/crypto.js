import CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse('6g5tergdfvdfer00'); // 十六位十六进制数作为密钥

const API_KEY = '6g5tergdfvdfer00'; // 十六位十六进制数作为密钥

// 解密方法
export function Decrypt(word) {
  const decrypt = CryptoJS.AES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    // padding: CryptoJS.pad.Pkcs7,
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

// 加密方法
export function Encrypt(word) {
  // let srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    // padding: CryptoJS.pad.Pkcs7,
  });
  const encryptedHexStr = CryptoJS.enc.Hex.parse(
    encrypted.ciphertext.toString(),
  );
  return CryptoJS.enc.Base64.stringify(encryptedHexStr);
}

export function signByMD5(data, apiKey) {
  // 假设apiConfig.getMap()和apiKey已经定义好，这里直接使用apiSecret
  const sortedObj = Object.fromEntries(
    Object.entries(data).sort(([keyA], [keyB]) => keyA.localeCompare(keyB)),
  );
  const sb = `params={${JSON.stringify(sortedObj)}}`;
  const message = `${API_KEY}${sb}${API_KEY}`;
  // console.log(11111, message)
  // 使用crypto-js计算MD5哈希
  const hash = CryptoJS.MD5(message).toString();

  // 将hash转换为32位的十六进制字符串
  let md5code = hash;
  while (md5code.length < 32) {
    md5code = '0' + md5code;
  }

  return md5code;
}
