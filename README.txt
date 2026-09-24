MAJISTA'S MH29 FUN N FOOD — WEBSITE

The site now includes a Current / Recent Screenings panel backed by cinema-data.json.
A GitHub Actions workflow refreshes that data periodically. The BookMyShow button remains the official live booking destination.

Important: BookMyShow's official third-party integration route is the preferred long-term source. The included scheduled updater is a fallback and may need adjustment if BookMyShow changes its page structure.

FILES
- index.html = website structure/content
- style.css = design/responsive styling
- script.js = interactions + cinema data rendering
- cinema-data.json = current cached movie listing
- .github/workflows/update-cinema.yml = scheduled updater
- tools/update-cinema.py = updater script
