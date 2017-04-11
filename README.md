 # MyScriptJS
 
 # :warning: 2.0.0-alpha1 branch - For testing and prototyping purpose only.
 The underlying API may change in the upcoming beta versions.
  
 ## Environment setup
 
 ### Set up IDEA
 
 Configure all the librairies to have a good code completion [https://blog.jetbrains.com/webstorm/2014/07/how-webstorm-works-completion-for-javascript-libraries/](https://blog.jetbrains.com/webstorm/2014/07/how-webstorm-works-completion-for-javascript-libraries/)
 
 Configure the code format by going in Files -> Settings the Editor -> Code Style -> Javascript and press the button manage. Load the configuration file locate in DEV/AIRBNB. This will allow you to reformat the javascript code with IDEA formatter as expected by most of configured ES6 rules. 
 
 Debug mocha test 
 - Add a mocha test configuration with test directory
 - Configure the launcher with the extra mocha option `--compilers js:babel-core/register`
 
 
 Activate ESLint checks [https://www.jetbrains.com/help/webstorm/2016.2/eslint.html](https://www.jetbrains.com/help/webstorm/2016.2/eslint.html) and use the automatic search option.
 
 ### ESLint
 
 You can use the disable syntax. Each time it should be with a comment
 
     // We make usage of a DOM object here
     // eslint-disable-next-line no-undef
     /* eslint-disable no-param-reassign */
 
 I am annoyed by no-restricted syntax [https://github.com/airbnb/javascript/issues/851](https://github.com/airbnb/javascript/issues/851)
  
 ### Running mocha
 
 `mocha --compilers js:babel-core/register --recursive test/mocha/partial/`