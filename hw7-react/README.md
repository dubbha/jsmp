# Task Description

[https://kb.epam.com/pages/viewpage.action?pageId=416040350](https://kb.epam.com/pages/viewpage.action?pageId=416040350)

A Hero App in React.


# Evaluation
0. Nothing done
1. "Dashboard" screen in place
2. "Dashboard" + "Heroes" screens
3. "Edit name" screen is implemented
4. Unit tests for implemented functionality
5. All screen implemented with React Router 
6. Implement application using Redux architecture

# Features
- React
- Redux
- React Router v4
- React-Redux [connect]
- Redux Persist [LocalStorage]
- Reselect [memoized selectors]
- Redux Devtools Extension
- Jest [spanshot testing]
- Enzyme [shallow rendering]

# Run in Development
```
npm run dev
```

# Run in Production
```
npm run build
npm run prod
```

# Test covarage

```
Test Suites: 12 passed, 12 total
Tests:       32 passed, 32 total
Snapshots:   8 passed, 8 total
Time:        4.984s
Ran all test suites.
-----------------------------|----------|----------|----------|----------|----------------|
File                         |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
-----------------------------|----------|----------|----------|----------|----------------|
All files                    |      100 |      100 |      100 |      100 |                |
 src                         |      100 |      100 |      100 |      100 |                |
  configureStore.js          |      100 |      100 |      100 |      100 |                |
 src/components/app          |      100 |      100 |      100 |      100 |                |
  App.jsx                    |      100 |      100 |      100 |      100 |                |
  index.js                   |      100 |      100 |      100 |      100 |                |
 src/components/dashboard    |      100 |      100 |      100 |      100 |                |
  Dashboard.jsx              |      100 |      100 |      100 |      100 |                |
  DashboardTopHero.jsx       |      100 |      100 |      100 |      100 |                |
  DashboardTopHeroes.jsx     |      100 |      100 |      100 |      100 |                |
  index.js                   |      100 |      100 |      100 |      100 |                |
 src/components/hero-details |      100 |      100 |      100 |      100 |                |
  HeroDetails.jsx            |      100 |      100 |      100 |      100 |                |
  index.js                   |      100 |      100 |      100 |      100 |                |
 src/components/heroes       |      100 |      100 |      100 |      100 |                |
  Heroes.jsx                 |      100 |      100 |      100 |      100 |                |
  HeroesHero.jsx             |      100 |      100 |      100 |      100 |                |
  HeroesSelectedHero.jsx     |      100 |      100 |      100 |      100 |                |
  heroes.actions.js          |      100 |      100 |      100 |      100 |                |
  heroes.reducer.js          |      100 |      100 |      100 |      100 |                |
  heroes.selectors.js        |      100 |      100 |      100 |      100 |                |
  index.js                   |      100 |      100 |      100 |      100 |                |
-----------------------------|----------|----------|----------|----------|----------------|
```