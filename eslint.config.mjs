import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import perfectionist from "eslint-plugin-perfectionist";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  plugins({
    perfectionist,
  }),
  rules({
    // Sorts standard JS/TS object keys
    "perfectionist/sort-objects": [
      "error",
      {
        type: "alphabetical",
        order: "asc",
        ignoreCase: true,
      },
    ],
    // Sorts TypeScript interfaces and type aliases
    "perfectionist/sort-interfaces": [
      "error",
      {
        type: "alphabetical",
        order: "asc",
        ignoreCase: true,
      },
    ],
    // Sorts React JSX props
    "perfectionist/sort-jsx-props": [
      "error",
      {
        type: "alphabetical",
        order: "asc",
        ignoreCase: true,
      },
    ],
  }),
]);

export default eslintConfig;
