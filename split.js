const fs = require('fs')
const path = require('path')
const bundle = require('./bundlereader.js')

const beautify = require('js-beautify').js_beautify

const named_dir = "jsout_name"
const numbered_dir = "jsout_num"
const svg_dir = "svg"

if (!fs.existsSync(named_dir)) fs.mkdirSync(named_dir)
if (!fs.existsSync(numbered_dir)) fs.mkdirSync(numbered_dir)
if (!fs.existsSync(svg_dir)) fs.mkdirSync(svg_dir)

let filesSaved = {}

const bundleModulesCount = Object.keys(bundle.modules).length
let bundleModuleIndex = 0

for (module in bundle.modules) {

    process.stdout.write(++bundleModuleIndex + "/" + bundleModulesCount + '\r')

    const fname = named_dir + "/" + (bundle.namebynum[module] ? bundle.namebynum[module] : module) + ".js"
    const fnumname = numbered_dir + "/" + module + (bundle.namebynum[module] ? "." + bundle.namebynum[module] : "") + ".js"
    const fsvgname = svg_dir + "/" + (bundle.namebynum[module] ? bundle.namebynum[module] : module) + ".svg"

    const contents = '' + bundle.modules[module]

    let butifiedContents = beautify("//n(" + module + ")\n" + contents)

    const nMatched = contents.replace(/\s/g, "").match(/function\([A-Za-z_\\$]+,[A-Za-z_\\$]+,([A-Za-z_\\$]+)\)/)
    if (nMatched) {
        const requireFnName = nMatched[1]
        butifiedContents = butifiedContents.replace(new RegExp('\\b' + requireFnName + '\\((\\d+)\\)', 'g'), function (str, modnum) {
            if (undefined === bundle.namebynum[modnum]) return str
            return requireFnName + '(' + modnum + ' /* ' + bundle.namebynum[modnum] + ' */)'
        })
    }

    if (contents.match(/\.exports\s*=\s*'[^']*?\<svg/g)) {
        let moduleInfo = {}
        new Function("return " + contents)()(moduleInfo, null)
        if (moduleInfo.exports)
            fs.writeFileSync(fsvgname, moduleInfo.exports, 'utf8')
    }

    filesSaved[fname] = true

    fs.writeFileSync(fname, butifiedContents, 'utf8')
    fs.writeFileSync(fnumname, butifiedContents, 'utf8')
}