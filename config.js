// config.js
// Configuration component that sets defaults or uses any configuration
// provided in configuration file or environment variables.

"use strict";

var pjson = require('./package.json');
var fs = require("fs");
var file_config = {};
var os = require("os");

console.info('Loading configuration');

// Conditionally import a config file that may be at the root of the project
var config_exists = fs.existsSync('config.json');

if (config_exists) {

    // found a config file
    console.info('Found local configuration file...');

    try {
        // read in the config file
        file_config = JSON.parse(fs.readFileSync('config.json'));
    } catch (e) {
        console.error('Error found in configuration file: ' + e);
    }

} else {

    // found a config file
    console.info('No local configuration file found...');

}

// function to properly handle boolean process environment vars
function stringToBoolean(string) {
    if (!string) return null;
    switch (string.toLowerCase().trim()) {
        case "true":
        case "yes":
        case "1":
            return true;
        case "false":
        case "no":
        case "0":
        case null:
            return false;
        default:
            return Boolean(string);
    }
}

// base config object
var config = {};
var popoto = {};
popoto.rest = {};

// All config options will be pulled in the order:
// file_config -> process environment -> default setting

config.debug = stringToBoolean(process.env.CONFIG_DEBUG) || false;

// server settings
config.server = {};
config.server.port = process.env.CONFIG_SERVER_PORT || 3000;
config.server.trustproxy = process.env.CONFIG_SERVER_TRUSTPROXY || false;

// app settings
config.app = {};
config.app.wwwroot = "/";
config.app.port = "3000";

// override and defaults or process envrionment vars from config
function mergeConfiguration(fromObj, toObj) {
    for (var property in fromObj) {
        if (fromObj.hasOwnProperty(property)) {
            // do stuff
            if (typeof fromObj[property] == 'object' && toObj.hasOwnProperty(property)) {
                //sub property; recurse
                mergeConfiguration(fromObj[property], toObj[property]);
            } else if (toObj.hasOwnProperty(property)) {
                toObj[property] = fromObj[property];
            }
        }
    }
}
mergeConfiguration(file_config, config);


module.exports = config;