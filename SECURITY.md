# Security Policy

The **OOTD (Outfit Of The Day)** team takes the security and integrity of our codebase and community seriously. We appreciate your efforts to responsibly disclose vulnerabilities to help us keep our users and contributors safe.

---

## 🛡️ Supported Versions

We actively support the latest version of the repository on the `main` branch with security patches and critical bug fixes.

| Version / Branch | Supported          | Status |
| :--- | :---: | :--- |
| `main` (Latest) | :white_check_mark: | Actively supported with patches |
| `< 0.1.0` (Pre-release) | :x: | Unsupported |

---

## 🚨 Reporting a Vulnerability

If you discover a security vulnerability or potential threat within this project, **please do NOT open a public issue**. Publicly disclosing a vulnerability can put users and contributors at risk before a fix is available.

### Preferred Contact Channel

Please report all security vulnerabilities privately via email to:

📧 **[azfaralam.ops@gmail.com](mailto:azfaralam.ops@gmail.com)**

Alternatively, you may use [GitHub Private Vulnerability Reporting](https://github.com/mdazfar2/Outfit-of-the-day/security/advisories/new) if enabled on the repository.

### What to Include in Your Report

To help us investigate and resolve the issue as swiftly as possible, please include:

1. **Vulnerability Type**: A clear, concise title describing the category of vulnerability (e.g., XSS, dependency vulnerability, injection, denial of service).
2. **Impact**: An explanation of what an attacker could achieve by exploiting this vulnerability.
3. **Reproduction Steps**: Step-by-step instructions or a minimal Proof of Concept (PoC) demonstrating how to trigger the vulnerability.
4. **Environment**:
   - Operating System and Version
   - Node.js & npm versions
   - Browser name and version (if applicable)
5. **Mitigation Suggestions** *(optional)*: Any recommended fixes or workarounds.

---

## ⏱️ Response & Resolution Timeline

When a vulnerability report is submitted:

- **Initial Response**: We will acknowledge receipt of your report within **24 to 48 hours**.
- **Assessment**: We will investigate and confirm the vulnerability within **3 to 5 business days**.
- **Fix & Patch**: A fix will be developed and verified on a private branch.
- **Coordinated Disclosure**: Once the fix is released on `main`, public disclosure will occur, and you will be credited for the discovery (unless you request anonymity).

---

## 🔒 Security Best Practices for Contributors

When contributing code to this repository:

- **Dependencies**: Keep all npm packages updated. Run `npm audit` periodically to inspect dependencies for known CVEs.
- **Sanitization**: Never render unsanitized user input directly to the DOM or WebGL contexts.
- **Secrets & Credentials**: Never commit API keys, private tokens, or credentials to Git. Use environment variables (`.env.local`) which are ignored by `.gitignore`.

---

## 🏆 Hall of Fame & Acknowledgements

We believe in recognizing responsible security researchers. If you discover a valid vulnerability and follow responsible disclosure practices, we will gladly credit you in our release notes and repository acknowledgements.

---

*Thank you for helping keep **OOTD** safe and secure!*
