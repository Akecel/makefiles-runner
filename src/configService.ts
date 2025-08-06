// src/configuration/ConfigService.ts
import * as vscode from 'vscode';

export interface ExtensionConfig {
    sortAlphabetically: boolean;
    displayDescriptionCommentsInPanel: boolean;
    alwaysCreateNewTerminal: boolean;
    reuseMatchingTerminal: boolean;
}

export class ConfigService {
    private static instance: ConfigService;
    private config: ExtensionConfig;
    private readonly extensionName = 'makefilesRunner';

    private constructor() {
        this.config = this.loadConfig();
        // Listen for configuration changes
        vscode.workspace.onDidChangeConfiguration(this.handleConfigChange.bind(this));
    }

    public static getInstance(): ConfigService {
        if (!ConfigService.instance) {
            ConfigService.instance = new ConfigService();
        }
        return ConfigService.instance;
    }

    private loadConfig(): ExtensionConfig {
        const config = vscode.workspace.getConfiguration(this.extensionName);
        return {
            sortAlphabetically: config.get<boolean>('sortAlphabetically', false),
            displayDescriptionCommentsInPanel: config.get<boolean>('displayDescriptionCommentsInPanel', true),
            alwaysCreateNewTerminal: config.get<boolean>('alwaysCreateNewTerminal', false),
            reuseMatchingTerminal: config.get<boolean>('reuseMatchingTerminal', false)
        };
    }

    private handleConfigChange(event: vscode.ConfigurationChangeEvent): void {
        if (event.affectsConfiguration(this.extensionName)) {
            this.config = this.loadConfig();
        }
    }

    // Getter methods for each configuration value
    public get sortAlphabetically(): boolean {
        return this.config.sortAlphabetically;
    }

    public get displayDescriptionCommentsInPanel(): boolean {
        return this.config.displayDescriptionCommentsInPanel;
    }

    public get alwaysCreateNewTerminal(): boolean {
        return this.config.alwaysCreateNewTerminal;
    }

    public get reuseMatchingTerminal(): boolean {
        return this.config.reuseMatchingTerminal;
    }
}