 mocha --compilers js:babel-core/register --recursive test/mocha/partial/
 
 
 
 
 ### Set up IDEA
 
 Configure all the librairies to have a good code completion [https://blog.jetbrains.com/webstorm/2014/07/how-webstorm-works-completion-for-javascript-libraries/](https://blog.jetbrains.com/webstorm/2014/07/how-webstorm-works-completion-for-javascript-libraries/)
 
 Debug mocha test 
 - Add a mocha test configuration with test directory
 - Configure the launcher with the Extra moch option `--compilers js:babel-core/register`