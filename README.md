# rpn-calculator-node

## Background & Rationale

`rpn-calculator-node` runs as a command line tool to perform the calculation of arithmetic expressions using Reverse Polish notation (RPN).

Upon running, the program listens for user input. Users may provide full or partial RPN expressions, and upon execution will be displayed the result. A stack is maintained in memory to calculate the result of the expression, and multiple commands are exposed to the user to interact with the stack.

### Commands

`s` (alias: `stack`): Display the current stack.

e.g.

```
> 5
5
> stack
[ 5 ]
```

`c` (alias: `clear`): Clear the current stack.

e.g.

```
> 5
5
> clear
[ ]
```

`q` (alias: `quit`): Quit the program.

`h` (alias: `help`): Display a help screen.


### Example Input/Output

Single step expression examples

```
> 5 5 +
10
```

```
> 8 9 + 4 - 2 * 3 /
8.66666666666667
```

Multi-step expression examples
```
> 5 5 5 8 + + -
-13
> 13 +
0
```

```
> -3
-3
> -2
-2
> *
6
> 5
5
> +
11
```

### Project Structure

The entry point for the application at runtime is located at `index.js`. This sets up the read/write interface for interacting via the command line, and houses calls to the business logic handler functions.

- `handlers/input` - Auxiliary logic layer for handling input strings and application commands.
- `handlers/arithmetic` - Main logic layer for calculating the result of Reverse Polish notation expressions.

The logic is split up in the aforementioned way to keep the code readable and maintainable - depending on the future needs of the program, additional logic may be added to the appropriate layer without much hassle.


### Considerations & Tradeoffs

For now, I added the logic only for the main four arithmetic functions (+, -, *, /).
A future expansion of this project could add additional logic for more functions, including sqrt, exponents, etc. The arithmetic functions could also be updated with aliases to make the interface potentially more user friendly (allowing × for multiplication, or ÷ for division)

The testing framework could be likely be improved - for best practice the `--forceExit` argument should not be used with the test runner Jest, but I left out a fix for this for now due to time constraints. The business logic functions are sufficiently tested, but the setup/teardown with the main CLI component acts a little squirrely with Jest when `process.exit` is mocked (tests hang indefinitely), so I left that out for now.

I decided to use [mathjs](https://mathjs.org/) as a simple way to perform arithmetic and format output to avoid rounding errors. This might be considered a little heavy for a simple program, but it helped keep the code clean and save some time. Could be dropped in the future.

## Setting up your development environment

Install a compatible version Node.js and npm (recommended Node v18.2.0, npm v8.9.0, see `.nvmrc`).

Install Node.js packages with `npm install`.

## Running the program

Run with `npm run start`

Additional debug logs can be output by running with `npm run start:verbose` instead.

## Testing

Testing is handled via [Jest](https://www.npmjs.com/package/jest), tests are located in `test/` and can be run with the following:

`npm run test`

More verbose output can be achieved with the following:

`npm run test:verbose`
