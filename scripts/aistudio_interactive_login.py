import os
import time
from playwright.sync_api import sync_playwright

def run():
    print("Launching headed browser for Google AI Studio login...")
    target_dir = os.path.expanduser("~/.config/aistudio_browser_profile")
    os.makedirs(target_dir, exist_ok=True)

    with sync_playwright() as p:
        context = p.chromium.launch_persistent_context(
            user_data_dir=target_dir,
            headless=False,
            args=["--no-sandbox", "--disable-setuid-sandbox"],
            viewport={"width": 1440, "height": 900}
        )
        page = context.new_page()
        print("Navigating to https://aistudio.google.com ...")
        page.goto("https://aistudio.google.com/app/prompts/new_chat")
        
        print("\n" + "="*60)
        print("Please log into your Google Account in the browser window.")
        print("Once logged in, your session will be saved for future automation!")
        print("="*60 + "\n")
        
        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            print("Closing browser context.")
            context.close()

if __name__ == "__main__":
    run()
