const fs = require('fs');
const path = require('path');
var bundle = require('./bundlereader.js');

var beautify = require('js-beautify').js_beautify;


if (!fs.existsSync("jsout_name"))
    fs.mkdirSync("jsout_name");
if (!fs.existsSync("jsout_num"))
    fs.mkdirSync("jsout_num");

var filesSaved = {};

var bundleModulesCount = Object.keys(bundle.modules).length;
var bundleModuleIndex = 0;

for (module in bundle.modules) {

    process.stdout.write(++bundleModuleIndex + "/" + bundleModulesCount + '\r');

    var fname = "jsout_name/" + (undefined !== bundle.namebynum[module] ? bundle.namebynum[module] : module) + ".js";
    var fnumname = "jsout_num/" + module + (undefined !== bundle.namebynum[module] ? "." + bundle.namebynum[module] : "") + ".js";

    var contents;

    contents = '' + bundle.modules[module];

    var n = null;
    var nMatched = contents.replace(/\s/g, "").match(/function\([A-Za-z_\\$]+,[A-Za-z_\\$]+,([A-Za-z_\\$]+)\)/);
    if (nMatched) {
        n = nMatched[1];
    }

    contents = beautify("//n(" + module + ")\n" + contents);

    if (n) {
        contents = contents.replace(new RegExp('\\b' + n + '\\((\\d+)\\)', 'g'), function(str, modnum) {
            if (undefined === bundle.namebynum[modnum]) return str;
            return n + '(' + modnum + ' /* ' + bundle.namebynum[modnum] + ' */)';
        });
    }

    filesSaved[fname] = true;

    fs.writeFileSync(fname, contents, 'utf8');
    fs.writeFileSync(fnumname, contents, 'utf8');
}