# Makefiles-Runner for VsCode

>Make runner for VsCode. Simplify your development by easily running your makefiles commands directly from your IDE interface.

## Usage

- Create your "Makefile" at the root of your project
- Show the Makefiles-Runner panel
- Run any command with one click 🚀
  
## Feature

Makefile allows you to simply run your makefile commands from the side bar panel.

<br />

<img src="https://raw.githubusercontent.com/Akecel/makefiles-runner/main/assets/doc/feature.gif" alt="Usage demo" />

## Extension Settings

- `sortAlphabetically`: Sorts the makefile commands shown in the panel in alphabetical order, defaults to false.  When disabled, commands are shown in the same order as they appear within the makefile itself.
- `displayDescriptionCommentsInPanel"`: Optionally shows the convention-based comment about each command in the makefile as text next to each command in the panel, defaults to true.  Descriptions will be shown on-hover regardless of the value of this setting.
- `alwaysCreateNewTerminal`: Creates a new terminal rather than reusing an existing one when set true, defaults to false.
- `reuseMatchingTerminal`: Reuses the first terminal with a matching command label when set true, defaults to false.  Overrides alwaysCreateNewTerminal if both set true, so new terminals will only be created when running a command with no matching terminal.

## Contributing

Please read [CONTRIBUTING.md](https://github.com/Akecel/makefiles-runner/tree/main/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

- [**Akecel**](https://github.com/Akecel) - *Extension author*

## Licence

This project is licensed under the [MIT License](https://opensource.org/licenses)  - see the [LICENSE.md](https://github.com/Akecel/makefiles-runner/blob/master/LICENSE) file for details.

## Show your support

Give a ⭐️ if this project helped you!
