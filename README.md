# novpets
Unified Pet Health Records

Organize below:

Code:
- React, TypeScript, bootstrapped with vite


Process:
1. Review project requirements; note clear concepts, like Pets, Medical Records
2. Review novellia site, see user paths presented on https://novellia.com/how-it-works and https://novellia.com/how-it-works
3. Focus on UI elements, how they're laid out
4. Other concept from site review: Data Sources
5. Layout App
   - (Page) PetHome
     - (No Pets) Add Pet Block
     - (Has Pets) PetCard(s)
       - Connect Data Source
       - Sync Data Source
       - See Medical Records
       - Manage Pet
         - Edit Name, Picture
         - Remove Pet
   - (Page) Records
     - Top - Search & Clickable Pet Badges
     - Add Record Card
       - From New Data Source
       - From Existing Data Source
       - From User
     - Record Card
       - View Record
       - Manage Record
         - Remove Record
   - (Page) Overview
     - PetCard
       - Some sort of status

Decisions:
- Keep it simple for submission; did not use libraries (e.g. Styled Components)

Improvements (Not in-scope for a take-home, but needed for a real-world MVP):
- CSS
- Better Form Validation
- Are You Sure? Modal before deleting
- Check if a Pet exists already
- Check if a Data Source 
- Adding records to a Data Source from the Data Source page

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
