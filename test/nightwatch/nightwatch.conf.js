'use strict';

module.exports = (function(settings) {
    settings['src_folders'] = process.env.NIGHTWATCH_SRC_FOLDERS? process.env.NIGHTWATCH_SRC_FOLDERS.split(','): ['/tests'];
    settings['output_folder'] = process.env.NIGHTWATCH_OUTPUT_FOLDER || '/results';
    settings['test_settings'].default['screenshots'].path = process.env.NIGHTWATCH_OUTPUT_FOLDER || '/results';
    settings['test_settings'].default.launch_url = process.env.NIGHTWATCH_LAUNCH_URL || 'http://localhost';
    settings['test_settings'].default.selenium_host = process.env.SELENIUM_HOST || process.env.NIGHTWATCH_SELENIUM_HOST || 'localhost';
    settings['test_settings'].default.selenium_port = process.env.SELENIUM_PORT || process.env.NIGHTWATCH_SELENIUM_PORT || 4444;
    settings['disable_colors'] = (settings['test_settings'].default.selenium_host !== 'localhost');
    return settings;
})(require('./nightwatch.json'));
