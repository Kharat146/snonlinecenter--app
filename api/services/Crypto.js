const CryptoJS = require("crypto-js");
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const config = yaml.load(
  fs.readFileSync(path.join(__dirname + "/../../config.yaml"), "utf8")
);

module.exports = {
  encryptData: function (data) {
    try {
      const cipher = CryptoJS.AES.encrypt(
        data,
        config['PASSWORD_ENC_KEY']
      ).toString();
      return cipher;
    } catch (error) {
      console.log(error);
    }
  },
  decryptData: function (cipher) {
    const bytes = CryptoJS.AES.decrypt(cipher, config['PASSWORD_ENC_KEY']);
    const plainText = bytes.toString(CryptoJS.enc.Utf8);
    return plainText;
  },
};