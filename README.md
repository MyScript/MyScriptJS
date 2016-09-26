 ### Running mocha
 
 mocha --compilers js:babel-core/register --recursive test/mocha/partial/
 
 
 
 
 ### Set up IDEA
 
 Configure all the librairies to have a good code completion [https://blog.jetbrains.com/webstorm/2014/07/how-webstorm-works-completion-for-javascript-libraries/](https://blog.jetbrains.com/webstorm/2014/07/how-webstorm-works-completion-for-javascript-libraries/)
 
 Debug mocha test 
 - Add a mocha test configuration with test directory
 - Configure the launcher with the Extra moch option `--compilers js:babel-core/register`
 
 
 Activate ESLint checks
 
 
 
 ### ESLINT
 
 You can use the disable synthax. Each time it should be with a comment
   // We make usage of a DOM object here
   // eslint-disable-next-line no-undef
 
 
 /* eslint-disable no-param-reassign */
 
 I am anoyed by no-restricted synthax
 https://github.com/airbnb/javascript/issues/851