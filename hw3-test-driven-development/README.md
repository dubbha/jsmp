[Task Description](https://kb.epam.com/display/EUXDCC/Test+Driven+Development)

# Navigation List
- The Calculator should support five major operators:
  + \+   addition
  + \-   substraction
  + /   division
  + \*   multiplication
  + \*\* exponentiation
- Should work with two numeric operands
- Should parse the passed sting to check if it is valid
- Should return a number representing the result
- Should return NaN if passed operation can't be evaluated
- Should distinguish properly between multiplication and exponentiation cases (* and **)
- Any number of spaces is allowed between operands, and at the beginning and end of the input
- Tests covering the requirements should exist before the functionality is impemented
- Helper functions to be written for parsing and verification steps, following the DRY approach
- An interface page should have an input field for the input string and a submit button
- No input validation or filtering will be implemented to be able to check the behaviour
- Output will be displayed in a span effectively converting number to string

# Test Coverage
```
> jest "--coverage"

 PASS  src\utils\calc.test.js
 PASS  src\utils\math.test.js
 PASS  src\utils\valid.test.js
 PASS  src\utils\unspace.test.js
 PASS  src\components\App.test.jsx (6.791s)
-------------|----------|----------|----------|----------|----------------|
File         |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
-------------|----------|----------|----------|----------|----------------|
All files    |    98.77 |       95 |      100 |    98.46 |                |
 components  |      100 |      100 |      100 |      100 |                |
  App.jsx    |      100 |      100 |      100 |      100 |                |
 utils       |    97.96 |    94.44 |      100 |    97.06 |                |
  calc.js    |    93.75 |     87.5 |      100 |    93.33 |             29 |
  math.js    |      100 |      100 |      100 |      100 |                |
  unspace.js |      100 |      100 |      100 |      100 |                |
  valid.js   |      100 |      100 |      100 |      100 |                |
-------------|----------|----------|----------|----------|----------------|

Test Suites: 5 passed, 5 total
Tests:       57 passed, 57 total
Snapshots:   1 passed, 1 total
Time:        15.193s
Ran all test suites.
```

# Run the tests
Run Jest tests
```
npm run test
```

Run Jest tests coverage
```
npm run coverage
```

# Web UI
Run dev server with live reload
```
npm run dev
```

Build prod dist
```
npm run build
```

Serve http from prod dist [globally installed static-server required]
```
npm install -g static-server
npm run dist
```
