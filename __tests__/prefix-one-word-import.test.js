const { ESLint } = require("eslint");

const eslint = new ESLint({
  useEslintrc: false,
  overrideConfig: {
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: "module"
    },
    plugins: ["greenwich"],
    rules: {
      "greenwich/prefix-one-word-import": [
        "error",
        {
          prefixes: ["V"],
          paths: ["/components/"]
        }
      ]
    }
  },
  extensions: ["js", "vue"]
});

describe("ESLint Plugin Tests", () => {
  it("should not pass single-word import without prefix", async () => {
    const code = "import Button from '@/components/Button.vue';";

    const [result] = await eslint.lintText(code);

    expect(result.errorCount).toBe(1);
    expect(result.messages[0].ruleId).toBe("greenwich/prefix-one-word-import");
  });

  it("should not pass single-word import with incorrect prefix", async () => {
    const code = "import CrmButton from '@/components/Button.vue';";

    const [result] = await eslint.lintText(code);

    expect(result.errorCount).toBe(1);
    expect(result.messages[0].ruleId).toBe("greenwich/prefix-one-word-import");
  });

  it("should pass single-word import with correct prefix", async () => {
    const code = "import VButton from '@/components/Button.vue';";

    const [result] = await eslint.lintText(code);

    expect(result.errorCount).toBe(0);
  });

  it("should not check for multi words import", async () => {
    const code = "import DragDropZone from '@/components/DragDropZone.vue';";

    const [result] = await eslint.lintText(code);

    expect(result.errorCount).toBe(0);
  });
});
