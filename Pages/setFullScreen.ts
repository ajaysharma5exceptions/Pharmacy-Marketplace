import { chromium } from 'playwright';
export async function launchMaximizedBrowser() {
    const browser = await chromium.launch({
      headless: false, // Set to 'false' to see the UI
      args: ['--start-maximized'] // Start the browser maximized
    });
  
    // const context = await browser.newContext({
    //   viewport: null // Allows the browser to use the full screen size
    // });
  
    // const page = await context.newPage();
    
    // return { browser, page };
  }
