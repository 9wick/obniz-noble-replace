// node-inking をロードし、`Linking` コンストラクタオブジェクトを取得
const Linking = require('node-linking');
// `Linking` オブジェクトを生成
const linking = new Linking();

// `LinkingDevice` オブジェクト
let device = null;

// `LinkingDevice` オブジェクトを初期化
linking.init().then(() => {
  // 名前が `Tukeru` で始まるデバイスを 5 秒間発見を試みる
  return linking.discover({
    duration: 5000,
    nameFilter: 'Sizuku_tha'
  });
}).then((device_list) => {
  if(device_list.length > 0) {
    // 発見したデバイスを表す `LinkingDevice` オブジェクト
    device = device_list[0];
    // デバイス名
    let name = device.advertisement.localName;
    console.log('`' + name + '` was found.');
    // デバイスに接続
    console.log('Connecting to `' + name + '`...');
    return device.connect();
  } else {
    throw new Error('No device was found.');
  }
}).then(() => {
  console.log('Connected.');
  console.log('This device suports:');
  for(let service_name in device.services) {
    if(device.services[service_name]) {
      console.log('- ' + service_name);
    }
  }
  // デバイスを切断
  console.log('Disconnecting...');
  return device.disconnect();
}).then(() => {
  console.log('Disconnected');
}).catch((error) => {
  console.log('[ERROR] ' + error.message);
  console.error(error);
});