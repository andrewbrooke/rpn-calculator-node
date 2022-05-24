# rpn-calculator-node

## Background & Rationale

`rpn-calculator-node` runs as a command line tool to perform the calculation of arithmetic expressions using Reverse Polish notation (RPN).

Upon running, the program listens for user input. Users may provide full or partial RPN expressions, and upon execution will be displayed the result. A stack is maintained in memory to calculate the result of the expression, and multiple commands are exposed to the user to interact with the stack.

### Commands

`stack` (alias: `s`): Display the current stack.

e.g.

```
> 5
5
> stack
[ 5 ]
```

`clear` (alias: `c`): Clear the current stack.

e.g.

```
> 5
5
> clear
[ ]
```

`quit` (alias: `q`): Quit the program.

### Project Structure

The entry point for the application at runtime is located at `index.js`. This sets up the read/write interface for interacting via the command line, and houses calls to the business logic handler functions.

- `handlers/input` - Auxiliary logic layer for handling input strings and application commands.
- `handlers/arithmetic` - Main logic layer for calculating the result of Reverse Polish notation expressions.

The logic is split up in the aforementioned way to keep the code readable and maintainable - depending on the future needs of the program, additional logic may be added to the appropriate layer without much hassle.


### Considerations & Tradeoffs

For now, I added the logic only for the main four arithmetic functions (+, -, *, /).
A future expansion of this project could add additional logic for more functions, including sqrt, exponents, etc. The arithmetic functions could also be updated with aliases to make the interface potentially more user friendly (allowing × for multiplication, or ÷ for division)

The testing framework could be likely be improved - for best practice the `--forceExit` argument should not be used with the test runner Jest, but I left out a fix for this for now for time constraints. The business logic functions are sufficiently tested, but the setup/teardown with the main CLI component acts a little squirrely with Jest when `process.exit` is mocked (tests hang indefinitely), so I left that out for now.

Additional thoughts for improvement would be to provide in-program documentation for end users, and add custom error classes and logging for completeness. For the initial version output is intentionally very minimal, but could certainly be expanded if required.

## Setting up your development environment

Install a compatible version Node.js and npm (recommended Node v18.2.0, npm v8.9.0).

Install Node.js packages with `npm install`.

## Running the program

Run with `npm run start`

Additional debug logs can be output by running with `npm run start:verbose` instead.

## Testing

Testing is handled via [Jest](https://www.npmjs.com/package/jest), tests are located in `test/` and can be run with the following:

`npm run test`
