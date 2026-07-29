import sys
import time
from playwright.sync_api import sync_playwright

def run():
    print("Starting Playwright Python for Google AI Studio Setup...")
    with sync_playwright() as p:
        # Launch Chromium browser with --no-sandbox
        browser = p.chromium.launch(
            headless=True,
            args=["--no-sandbox", "--disable-setuid-sandbox"]
        )
        
        context = browser.new_context(
            viewport={"width": 1440, "height": 900},
            user_agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        )
        
        page = context.new_page()
        base_dir = "/home/ae/.gemini/antigravity-cli/brain/9c103a4a-4afb-4926-a043-c4d51e05b025"
        
        print("Navigating to https://aistudio.google.com/app/prompts/new_chat ...")
        page.goto("https://aistudio.google.com/app/prompts/new_chat", wait_until="domcontentloaded")
        time.sleep(4)
        
        current_url = page.url
        title = page.title()
        print(f"Current Page URL: {current_url}")
        print(f"Current Page Title: {title}")
        
        screenshot_path = f"{base_dir}/aistudio_app_preview.png"
        page.screenshot(path=screenshot_path)
        print(f"Saved screenshot: {screenshot_path}")
        
        browser.close()

if __name__ == "__main__":
    run()
