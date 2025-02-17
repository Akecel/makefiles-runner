import * as assert from "assert";
import {Commands, commandRegex} from "../../parser";

const buildCommands = (content: string[]): Commands => {
  const commands: Commands = [];

  for (const line of content) {
    const match = line.trim().match(commandRegex);
    if (match) {
      commands.push({
        command: match[1],
        comment: match[2] || "", // Default to empty string if no comment
      });
    }
  }
  return commands;
};

suite("Makefile Command Extraction", () => {
  test("should extract a simple command without a comment", () => {
    const input = ["build:"];
    const expected = [{ command: "build", comment: "" }];
    assert.deepStrictEqual(buildCommands(input), expected);
  });

  test("should extract a command with a comment", () => {
    const input = ["deploy: ## Deploy the project"];
    const expected = [{ command: "deploy", comment: "Deploy the project" }];
    assert.deepStrictEqual(buildCommands(input), expected);
  });

  test("should extract multiple commands", () => {
    const input = [
      "build:",
      "deploy: ## Deploy to production",
      "test: ## Run all tests",
    ];
    const expected = [
      { command: "build", comment: "" },
      { command: "deploy", comment: "Deploy to production" },
      { command: "test", comment: "Run all tests" },
    ];
    assert.deepStrictEqual(buildCommands(input), expected);
  });

  test("should handle targets with dashes, underscores, and dots", () => {
    const input = [
      "build-all: ## Builds everything",
      "test_suite: ## Runs test suite",
      ".PHONY: ## Special built-in target",
    ];
    const expected = [
      { command: "build-all", comment: "Builds everything" },
      { command: "test_suite", comment: "Runs test suite" },
      { command: ".PHONY", comment: "Special built-in target" },
    ];
    assert.deepStrictEqual(buildCommands(input), expected);
  });

  test("should handle targets with slashes (subdirectories)", () => {
    const input = ["test/integration: ## Runs integration tests"];
    const expected = [
      { command: "test/integration", comment: "Runs integration tests" },
    ];
    assert.deepStrictEqual(buildCommands(input), expected);
  });

  test("should ignore lines that are not valid targets", () => {
    const input = [
      "# A comment",
      "  ", // Empty line
      "random text",
      "build: ## A valid target",
    ];
    const expected = [{ command: "build", comment: "A valid target" }];
    assert.deepStrictEqual(buildCommands(input), expected);
  });

  test("should handle a mix of valid and invalid lines", () => {
    const input = [
      "  # Comment",
      "build: ## Build the project",
      "   ", // Empty line
      "test:", // Valid but no comment
      "echo 'not a target'", // Invalid line
    ];
    const expected = [
      { command: "build", comment: "Build the project" },
      { command: "test", comment: "" },
    ];
    assert.deepStrictEqual(buildCommands(input), expected);
  });

  test("should handle missing comments gracefully", () => {
    const input = ["run:", "clean: "];
    const expected = [
      { command: "run", comment: "" },
      { command: "clean", comment: "" },
    ];
    assert.deepStrictEqual(buildCommands(input), expected);
  });

  test("should not match dependency lists as targets", () => {
    const input = ["build: main.o utils.o"];
    const expected: Commands = []; // No match because there's no `##` comment
    assert.deepStrictEqual(buildCommands(input), expected);
  });

  test("should handle Makefile targets with whitespace before/after", () => {
    const input = ["  build:  ## Build the project  "];
    const expected = [{ command: "build", comment: "Build the project" }];
    assert.deepStrictEqual(buildCommands(input), expected);
  });
});
