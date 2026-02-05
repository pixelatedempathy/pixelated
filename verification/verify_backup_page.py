from playwright.sync_api import sync_playwright, expect

def verify_backup_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Go to the backup security page
        url = "http://localhost:5173/admin/backup-security"
        print(f"Navigating to {url}")
        page.goto(url)

        # Wait for the heading to be visible
        expect(page.get_by_role("heading", name="Backup Security Management")).to_be_visible()

        # Take a screenshot
        page.screenshot(path="verification/backup_page.png")
        print("Screenshot saved to verification/backup_page.png")

        # Check if the tabs are present
        expect(page.get_by_role("tab", name="Backup Status")).to_be_visible()
        expect(page.get_by_role("tab", name="Configuration")).to_be_visible()

        browser.close()

if __name__ == "__main__":
    verify_backup_page()
