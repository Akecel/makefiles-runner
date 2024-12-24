// src/configuration/ConfigService.ts
import * as vscode from 'vscode';

export interface extensionConfig {
    sortAlphabetically: boolean;
    displayDescriptionCommentsInPanel: boolean;
    alwaysCreateNewTerminal: boolean;
}

export class configService {
    private static instance: configService;
    private config: extensionConfig;
    private readonly extensionName = 'makefilesRunner';

    private constructor() {
        this.config = this.loadConfig();
        // Listen for configuration changes
        vscode.workspace.onDidChangeConfiguration(this.handleConfigChange.bind(this));
    }

    public static getInstance(): configService {
        if (!configService.instance) {
            configService.instance = new configService();
        }
        return configService.instance;
    }

    private loadConfig(): extensionConfig {
        const config = vscode.workspace.getConfiguration(this.extensionName);
        return {
            sortAlphabetically: config.get<boolean>('sortAlphabetically', false),
            displayDescriptionCommentsInPanel: config.get<boolean>('displayDescriptionCommentsInPanel', true),
            alwaysCreateNewTerminal: config.get<boolean>('alwaysCreateNewTerminal', false),
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
}