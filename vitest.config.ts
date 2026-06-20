import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      include: [
        "src/utils/counsel.ts",
        "src/utils/date.ts",
        "src/utils/contentUtils.ts",
        "src/hooks/useCounselingPrompt.ts",
      ],
      reporter: ["text", "html"],
    },
  },
});
