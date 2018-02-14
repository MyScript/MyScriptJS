# Environment setup

## Configure project

1. Download sources
2. Install dependencies.
    * `npm install`
3. Build the project using gulp.
    * `gulp`
4. Run the browser using gulp.
    * `gulp serve`. Examples will be available on `http://localhost:8080/examples/index.html`
    
**Start coding**

5. Debug using your favorite browser dev tools. The sources will be available under the webpack source folder (for chrome dev tools). Every change in sources will trigger a rebuild with linter and basic tests.

## Set up your IDE

At MyScript, we use WebStorm to develop our library. You can find below some help to configure WebStorm like we do. Obviously, feel free to use any code editor as the configuration can be adapted for any editor.

### WebStorm

Configure all the librairies to have a good code completion [https://blog.jetbrains.com/webstorm/2014/07/how-webstorm-works-completion-for-javascript-libraries/](https://blog.jetbrains.com/webstorm/2014/07/how-webstorm-works-completion-for-javascript-libraries/)

Configure the code format by going in Files -> Settings the Editor -> Code Style -> Javascript and press the button manage. Load the configuration file locate in ./dev/AIRBNB. This will allow you to reformat the javascript code with IDEA formatter as expected by most of configured ES6 rules. 

Debug mocha test 
- Add a mocha test configuration with test directory
- Configure the launcher with the extra mocha option `--compilers js:babel-core/register`

Activate ESLint checks [https://www.jetbrains.com/help/webstorm/2016.2/eslint.html](https://www.jetbrains.com/help/webstorm/2016.2/eslint.html) and use the automatic search option.
