const fs = require('fs');
const path = require('path');
var bundle = require('./bundlereader.js');

function escapeRegExp(str) {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

var updatePatch = function(fname) {

    var patch = fs.readFileSync(fname, 'utf8');

    var updated = false;
    var newPatch = "";
    var errors = 0;

    var error = function(linenum, text) {
        errors++;
        console.log("- " + fname + "(" + (linenum + 1) + "): " + text);
    };

    var greplaces = {};
    var greplacespattern = "";
    var lreplaces = {};
    var lreplacestransp = {};
    var lreplacespattern = "";
    var lregexp = [];

    function clearLocal() {
        lreplaces = {};
        lreplacestransp = {};
        lreplacespattern = "";
    }

    var portModulePattern = /^#(n\((\d+)\)):([A-Za-z_\$]+)/;
    var portVarPattern = /^(#([A-Za-z_\$]+)=(([A-Za-z_\$]+):n\(([A-Za-z_\$]+)\)))/;

    var patchLines = patch.split(/\r?\n/);
    while (patchLines.length && patchLines[patchLines.length - 1] == "") patchLines = patchLines.slice(0, patchLines.length - 1);

    patchLines.forEach(function(line, idx) {
        var matched;

        if (matched = line.match(portModulePattern)) {
            //#n(274):punycode (global)
            (function(matched) {
                var oldstr = matched[1];
                var oldmoduleidx = matched[2];
                var modulename = matched[3];
                if (undefined !== bundle.numbyname[modulename]) {
                    var newmoduleidx = bundle.numbyname[modulename];
                    var newstr = "n(" + newmoduleidx + ")";
                    greplaces[oldstr] = newstr;
                    greplacespattern += "|\\b" + escapeRegExp(oldstr);

                    line = line.replace(oldstr, newstr);
                    if (oldstr !== newstr)
                        updated = true;
                } else {
                    error(idx, "unknown module " + modulename);
                }
            })(matched);
        } else

        if (matched = line.match(portVarPattern)) {
            //#o=_decodeDisplayURL:n(_UrlUtility) (local)
            (function(matched) {
                var oldStr = matched[1];
                var varName = matched[2];
                var modulesPattern = matched[3];
                var usedInModuleName = matched[4];
                var moduleName = matched[5];
                if (undefined === bundle.numbyname[usedInModuleName]) {
                    error(idx, "unknown module " + usedInModuleName);
                } else
                if (undefined === bundle.numbyname[moduleName]) {
                    error(idx, "unknown module " + moduleName);
                } else {
                    var usedInModuleIdx = bundle.numbyname[usedInModuleName];
                    var moduleIdx = bundle.numbyname[moduleName];
                    var matched = ('' + bundle.modules[usedInModuleIdx]).match(new RegExp('\\b([A-Za-z_\\$]+)=n\\(' + moduleIdx + '\\)'));
                    if (matched) {
                        var newVarName = matched[1];
                        lreplaces[varName] = newVarName;
                        lreplacestransp[newVarName] = varName;
                        lreplacespattern += "|\\b" + escapeRegExp(varName) + "\\b";

                        line = line.replace(oldStr, '#' + newVarName + '=' + modulesPattern);

                        if (varName !== newVarName)
                            updated = true;

                    } else {
                        error(idx, "can't find var", line);
                    }
                }

            })(matched);
        } else

        if (matched = line.replace(/\s/g, "").match(portModulePattern)) {
            error(idx, "extra spaces: " + line);
        } else

        if (matched = line.replace(/\s/g, "").match(portVarPattern)) {
            error(idx, "extra spaces: " + line);
        } else


        if (matched = line.match(/^#re:(.+)/)) {
            //#re:lineNumber:\d+
            lregexp.push(matched[1]);
        } else


        if (matched = line.match(/^ \[-(.*)-\] \{\+(.*)\+\}/)) {
            //patch pattern
            (function(matched) {
                var olds = matched[1];
                var news = matched[2];

                var replacespattern = greplacespattern + lreplacespattern;
                if (replacespattern.length > 0) {
                    var replacesregexp = new RegExp(replacespattern.substr(1), 'g');
                    var replaces = Object.assign(greplaces, lreplaces);

                    var fixedolds = olds.replace(replacesregexp, function($0) {
                        return replaces[$0] //return replaces[$0] != undefined ? replaces[$0] : $0;
                    });
                    var fixednews = news.replace(replacesregexp, function($0) {
                        return replaces[$0] //return replaces[$0] != undefined ? replaces[$0] : $0;
                    });

                    if (fixedolds != olds) {
                        olds = fixedolds;
                        updated = true;
                    }
                    if (fixednews != news) {
                        news = fixednews;
                        updated = true;
                    }
                }

                if (bundle.fileContents.indexOf(olds) === -1) {
                    var escapedold = escapeRegExp(olds);

                    var oldvars = escapedold.match(/\b[A-Z_\$]{1,2}\b/gi);
                    var oldpattern = escapedold.replace(/\b[A-Z_\$]{1,2}\b/gi, "([A-Za-z_\\$]{1,2})");

                    lregexp.forEach(function(re) {
                        var matchlre;
                        while (matchlre = oldpattern.match(re)) {
                            oldpattern = oldpattern.replace(matchlre[0], re);
                        }
                    });

                    var matchedolds = bundle.fileContents.match(new RegExp(oldpattern));
                    if (matchedolds) {

                        var fixedolds = matchedolds[0];
                        if (fixedolds != olds) {
                            olds = fixedolds;
                            updated = true;
                        }
                        var varreplaces = {};
                        var varreplacespattern = "";
                        for (var i = 0; i < oldvars.length; i++) {
                            if (undefined === varreplaces[oldvars[i]]) {
                                varreplaces[oldvars[i]] = matchedolds[1 + i];
                            } else if (varreplaces[oldvars[i]] !== matchedolds[1 + i]) {
                                error(idx, "can't port variables");
                                break;
                            }
                        }
                        var fixednews = news.replace(/\b[A-Z_\$]{1,2}\b/gi, function($0) {
                            if (undefined != lreplacestransp[$0])
                                return $0;

                            if (undefined !== varreplaces[$0])
                                return varreplaces[$0];

                            if ($0 === "if" || $0 === "n") return $0;

                            //todo: до переменной не должно быть точки?
                            console.log("? " + fname + "(" + (idx + 1) + "): unknown variable " + $0);
                            return $0;

                        });

                        if (fixednews != news) {
                            news = fixednews;
                            updated = true;
                        }

                    } else {
                        error(idx, "search pattern not found: " + olds);
                    }
                }

                line = " [-" + olds + "-] {+" + news + "+}";

                clearLocal();
            })(matched);

        } else

        if ("" === line || line.match(/^\uFEFF?[#=]/)) {
            //todo: check empty lines at the end of a file
        } else {
            //        	console.log(fname+": bad line",idx+1,": "+line);
            error(idx, "bad line: " + line);
        }


        newPatch += line + "\n";
    });

    if (patch != newPatch && 0 === errors) {
        console.log("ok: " + fname);
        if (!fs.existsSync("fixed"))
            fs.mkdirSync("fixed");
        fs.writeFileSync("fixed/" + fname, newPatch, 'utf8');
    }

    if (errors) {
        if (!fs.existsSync("bad"))
            fs.mkdirSync("bad");
        fs.writeFileSync("bad/" + fname, newPatch, 'utf8');
    }
};



fs.readdirSync('.').forEach(function(fname) {
    if (path.extname(fname).toLowerCase() === ".patch")
        updatePatch(fname);
});

console.log('done');