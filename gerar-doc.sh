#!/usr/bin/env bash
node_modules/jsdoc/jsdoc.js --configure node_modules/angular-jsdoc/common/conf.json --template node_modules/angular-jsdoc/angular-template --destination build/docs --readme README.md --recurse www/js/directives www/js/services www/js/controllers
