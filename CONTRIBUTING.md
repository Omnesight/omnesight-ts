# Contributing to Omnesight TypeScript SDK

Thank you for contributing to **`@omnesight/sdk`**!

---

## 🛠️ Local Development & Testing

1. **Install dependencies**:
   ```bash
   pnpm install # or npm install / yarn
   ```

2. **Build TypeScript and CommonJS bridge**:
   ```bash
   npm run build
   ```

3. **Run unit tests**:
   ```bash
   npm test
   ```

4. **Typecheck**:
   ```bash
   npm run typecheck
   ```

---

## 🚀 Publishing to NPM (Maintainers)

This package uses GitHub Actions for automated, secure publishing with npm provenance.

1. **Bump version in `package.json`**:
   ```bash
   npm version patch # or minor / major
   ```
2. **Push tag to GitHub**:
   ```bash
   git push origin master --tags
   ```
3. Create a GitHub Release matching the tag (e.g. `v1.2.0`). The workflow [`.github/workflows/publish-npm.yml`](.github/workflows/publish-npm.yml) will automatically build, test, and publish to the public npm registry with zero token leakage.
