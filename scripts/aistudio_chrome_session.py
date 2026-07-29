import os
import shutil
import time
from playwright.sync_api import sync_playwright

def run():
    print("Setting up AI Studio with Chrome profile...")
    source_dir = "/home/ae/.config/google-chrome"
    target_dir = "/tmp/chrome_aistudio_profile"
    
    # Create temp profile directory if needed
    if not os.path.exists(target_dir):
        os.makedirs(target_dir, exist_ok=True)
    
    with sync_playwright() as p:
        try:
            print("Launching Playwright with Chrome User Data Dir...")
            context = p.chromium.launch_persistent_context(
                user_data_dir=target_dir,
                headless=True,
                args=[
                    "--no-sandbox",
                    "--disable-setuid-sandbox",
                    "--disable-dev-shm-usage"
                ],
                viewport={"width": 1440, "height": 900}
            )
            
            page = context.new_page()
            base_dir = "/home/ae/.gemini/antigravity-cli/brain/9c103a4a-4afb-4926-a043-c4d51e05b025"
            
            print("Navigating to https://aistudio.google.com/app/prompts/new_chat ...")
            page.goto("https://aistudio.google.com/app/prompts/new_chat", wait_until="domcontentloaded")
            time.sleep(5)
            
            url = page.url
            title = page.title()
            print(f"URL: {url}")
            print(f"Title: {title}")
            
            page.screenshot(path=f"{base_dir}/aistudio_chrome_preview.png")
            print(f"Saved preview screenshot to {base_dir}/aistudio_chrome_preview.png")
            
            context.close()
        except Exception as e:
            print(f"Error launching persistent context: {e}")

if __name__ == "__main__":
    run()
