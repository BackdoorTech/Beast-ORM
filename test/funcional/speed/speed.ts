const PluginManager = require('live-plugin-manager').PluginManager
const path = require('path')
const manager1 = new PluginManager({
  pluginsPath: "plugin_packages/beast-orm/1.1.1"
});



(async() => {
  await manager1.install("beast-orm","1.1.1");
  // const models = manager.require("beast-orm/src");

  // measure('timestamp', () => {
  //   speed('performance.now', {performance}, () => {
  //     global.performance.now();
  //   });
  
  //   speed('Date.now', () => {
  //     Date.now();
  //   });
  // });
  // runAndReport(defaultTestRunner);
  // await manager.uninstallAll();
})()
