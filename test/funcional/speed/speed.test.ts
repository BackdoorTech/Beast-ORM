import { PluginManager } from "live-plugin-manager";
import { PerformanceTestRunner } from "performance-test-runner";
import { runAndReport } from "performance-test-runner/lib/suite-console-printer";
import { performance } from "perf_hooks";
const manager = new PluginManager();

describe("PerFormance", () => {

  it('Teste dependecies', async () => {

    await manager.install("beast-orm","1.1.1");

    expect('time not exceeded').toBe('time not exceeded');
    
  }, 60000)


  it('Filter', async () => {

    const ptr = new PerformanceTestRunner();
    const {measure, speed} = ptr;

    measure('timestamp', () => {
      speed('performance.now', {performance}, () => {
        global.performance.now();
      });
  
      speed('Date.now', () => {
        Date.now();
      });
    });
  
    runAndReport(ptr);

    expect('time not exceeded').toBe('time not exceeded');
    
  }, 9000)

})