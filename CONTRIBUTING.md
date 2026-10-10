# Contributing to OOTD ✦

Thank you for your interest in contributing to **OOTD (Outfit Of The Day)**! We welcome contributions ranging from bug fixes and documentation improvements to new celestial features and styling categories.

Please take a moment to review this guide to ensure a smooth and productive collaboration.

---

## 📜 Code of Conduct

All contributors and participants are expected to adhere to our [Code of Conduct](CODE_OF_CONDUCT.md). Please treat everyone with respect, empathy, and professionalism.

---

## 🚀 Quick Setup & Workflow

Follow these steps to set up the project locally:

### 1. Fork & Clone
```bash
# 1. Fork the repo on GitHub, then clone your fork:
git clone https://github.com/<your-username>/Outfit-of-the-day.git
cd Outfit-of-the-day

# 2. Add upstream remote to stay in sync:
git remote add upstream https://github.com/mdazfar2/Outfit-of-the-day.git
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ How to Contribute

### 🐛 1. Reporting Bugs
- Check existing [GitHub Issues](https://github.com/mdazfar2/Outfit-of-the-day/issues) to avoid duplicates.
- If not reported, open a new issue detailing:
  - Clear title and summary
  - Steps to reproduce
  - Expected vs. actual behavior
  - Screenshots or browser console errors (if any)

### 💡 2. Suggesting Features & Enhancements
- Open a feature request issue explaining the motivation, use case, and proposed solution.
- For UI or 3D visual changes, mockups or design references are highly encouraged.

### 🔀 3. Submitting a Pull Request (PR)

1. **Create a descriptive branch**:
   ```bash
   git checkout -b feat/celestial-orbit-controls
   # or
   git checkout -b fix/mobile-hero-aspect-ratio
   ```

2. **Commit your changes** using conventional commit messages:
   - `feat:` New features (e.g., `feat: add audio cue to planet selection`)
   - `fix:` Bug fixes (e.g., `fix: resolve HUD card clipping on mobile`)
   - `docs:` Documentation updates (e.g., `docs: update setup steps`)
   - `style:` Design, styling, or formatting changes
   - `refactor:` Code reorganization without functionality changes

3. **Verify locally before pushing**:
   ```bash
   # Ensure TypeScript and Next.js build cleanly
   npm run build

   # Check for lint issues
   npm run lint
   ```

4. **Push and create PR**:
   ```bash
   git push origin feat/your-feature-name
   ```
   Open a Pull Request on GitHub against the `main` branch. Provide a clear summary of changes and reference any related issue (e.g., `Closes #12`).

---

## 🎨 Code & Design Standards

- **Aesthetic**: Maintain the *quiet luxury*, celestial, and dark-themed visual design system.
- **TypeScript**: Write clean, strictly-typed TypeScript code. Avoid `any`.
- **CSS**: Use Tailwind CSS v4 utility classes and predefined theme tokens.
- **Performance**: Keep Three.js 3D animations lightweight, cleanup event listeners on unmount, and avoid unnecessary re-renders.

---

## 💬 Questions & Support

If you have questions or need assistance:
- Open a discussion or issue on [GitHub Issues](https://github.com/mdazfar2/Outfit-of-the-day/issues).
- Reach out to the maintainer via email: **[azfaralam.ops@gmail.com](mailto:azfaralam.ops@gmail.com)**.

*Happy coding, and thank you for building the cosmos with us! ✨*
