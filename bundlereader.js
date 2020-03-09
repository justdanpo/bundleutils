(function () {

    const fs = require('fs');

    var _moduleMap = {};
    var _moduleNames = {};
    var _modules = {};

    const fastProcessModules = false;

    function makeSignatures() {
        let jsxNames = {
            // "ActionLog": "ActionLog.jsx",
            // "Appearance": "Appearance.jsx",
            // "BlockedContentNotificator": "BlockedContentNotificator.jsx",
            // "HistorySearch": "HistorySearch.jsx",
            // "TitleBar": "titlebar.jsx",
            // "TopMenu": "TopMenu.jsx",
        }

        let moduleSignatures = {
            "_BookmarkBarActions": ["Error removing bookmark tree:"],
            "_getPrintableKeyName": ['"BrowserForward"', '"PrintScreen"'],
            "_KeyCodes": ["KEY_CANCEL:"],
            "_PageZoom": ["onUIZoomChanged.addListener"],
            "_ShowUI": ['document.getElementById("app")', "JS init startup"],
            "_UIActions": ["_maybeShowSettingsInWindow"],
            "_VivaldiSettings": ["_vivaldiSettingsListener"],
            "_WindowActions": [".windowPrivate.onMaximized"],

            // "_svg_addressbar_btn_backward": ["M17.6 20.4l-1.6 1.6-9-9 9-9 1.6 1.6-7.2 7.4 7.2 7.4z"],
            // "_svg_addressbar_btn_fastbackward": ["M19 6l-7 5.6v-5.6h-2v12h2v-5.6l7 5.6z"],
            // "_svg_addressbar_btn_fastforward": ["M10 6l7 5.6v-5.6h2v12h-2v-5.6l-7 5.6z"],
            // "_svg_addressbar_btn_forward": ["M15.2 13l-7.2 7.4 1.6 1.6 9-9-9-9-1.6 1.6 7.2 7.4z"],
            // "_svg_addressbar_btn_home": ["10h3.5v8h14v-8h3.5l-10.5-10zm5 16h-3v-5h-4v5h-3v"],
            // "_svg_addressbar_btn_reload": ["M4 13c0 4.95 4.05 9 9 9 4.162 0 7.65-2.924 8.662-6.75h-2.362c-.9 2"],
            // "_svg_addressbar_btn_reload_stop": ["M9.4 18l-1.4-1.4 4.6-4.6-4.6-4.6 1.4-1.4 4.6 4.6 4.6-4.6 1.4 1.4-4.6 4.6 "],
            // "_svg_bookmarked": ["M4,1 L4,14 L8,12 L12,14 L12,1 L4,1 Z M6,3 L10,3 L10,10.763"],
            // "_svg_bookmarks_toolbar_import": ["M13 18l4-4H9l4 4zM12 8v6h2V8h-2z"],
            "_svg_bookmarks_update_thumbnail": ["M12.6 7C9.507 7 7 9.506 7"],
            "_svg_btn_delete": ["M13.5 6l-1.4-1.4-3.1 3-3.1-3L4.5"],
            // "_svg_btn_dropdown": ["M8 11l4-6H4l4 6z"],
            // "_svg_btn_minus": ["M9 14h8v-2H9v2z"],
            // "_svg_btn_paneltoggle": ["195v12h-16v-12h16zm-10"],
            // "_svg_btn_plus": ["M11.975 14.04H9.02v-2.036h2.955V9h2.037v3.004h2.982v2.037h-2.982v2.934h-2.037V14.04z"],
            "_svg_button_restart": ["M13 13H6V6l7 7z"],
            // "_svg_menu_bookmarks": ["M3 2v12l5-2 5 2V2H3zm8 9L8 9.646 5 11V4h6v8-1z"],
            // "_svg_menu_contacts": ["M10.4 7.43c1.02 0 1.8-.744 1.8-1.716"],
            // "_svg_menu_downloads": ["M8.914 6.995V3H6.057v3.995c0"],
            // "_svg_menu_mail": ["3v10h14V3H1zm7"],
            // "_svg_menu_notes": ["2v12h10V2H3zm9 11H4V4h8v9z"],
            // "_svg_menu_settings": ["M12.55 8v.592l1.325 1.014c.088.084.177.253.088.338l-1.236"],
            // "_svg_menu_vivaldi": ["M10.428 5.038c-.42-.85.027-1.804.943-2.008.747-.167 1.518.386 1.617"],
            "_svg_notes_add_attachment": [".436.28.97.7.97h5.95c.98 0 1.75-1.043 1.75-2.06 0-1.02-.77-1.82-1.75"],
            // "_svg_notes_happynote": ['id="eye"'],
            // "_svg_pageactionchooser": ["M5.3 9.8L.8 6.5l4.6-3.3L6.6 5 4.2 6.4l2.3 1.7-1.2 1.6M10.7"],
            // "_svg_panel_bookmarks": ["v-11h8v11l-4"],
            // "_svg_panel_contacts": ["M15.6 19h5.4v-2.2c0-1.5-3-2.8-4.7-2.8-.7"],
            // "_svg_panel_downloads": ["M15 6h-4v5h-4l6 6 6-6h-4v-5zm-9"],
            "_svg_panel_downloads_btn_resume": ["M16 13l-6 5V8l6 5z"],
            // "_svg_panel_downloads_btn_stop": ["M9 9h8v8H9z"],
            // "_svg_panel_history": ["M13.5 21a7.5 7.5 0 1 0 0-15 7.5 7.5"],
            // "_svg_panel_mail": ["8v11h16V8H5zm8"],
            // "_svg_panel_notes": ["20h12v-14h-12v14zm2-11h8v9h"],
            // "_svg_panel_settings": ["M10.982 17.576v.424l.404 1.704c0 .197.101.296.303.296h2.725c.101"],
            // "_svg_search_change_engine": ["M-182.6 201.9c.4-.7.7-1.5.7-2.3"],
            // "_svg_settings_category_addressbar": ["M0 0v10h16v-10h-16zm2"],
            // "_svg_settings_category_all": ["M16 9.077v-2.155l-1.913-.68c"],
            // "_svg_settings_category_appearance": ["4h16v10H0V4zm2"],
            // "_svg_settings_category_bookmarks": ["M3 2v13.333l5-1.666"],
            // "_svg_settings_category_downloads": ["M2 14h12v2h-12v-2zm12-4h2v6h-2v-6zm-14"],
            // "_svg_settings_category_keyboard": ["M0 4v9h16v-9h-16zm7"],
            // "_svg_settings_category_mail": ["M0 0v12h16v-12h-16zm8"],
            "_svg_settings_category_mouse": ["M7.5 0c-3.025 0-5.5 2.314-5.5"],
            // "_svg_settings_category_network": ["M9 8v2h-2v-2h-4v2h-2v-4h6v-2h-2v-4h6v4h"],
            // "_svg_settings_category_panel": ["M16 0v12h-16v-12h16zm-10"],
            "_svg_settings_category_privacy": ["M8 13c3.636 0 6.764-2.067"],
            // "_svg_settings_category_qc": ["M8 7.042l-4-4.042h3l4"],
            // "_svg_settings_category_search": ["M11.172 9.757l4.192 4.192-1.414"],
            // "_svg_settings_category_start_page": ["2h7v6h-7zm8 0h7v6h-7zm-8"],
            // "_svg_settings_category_startup": ["M9.96 2.446c-.498-1.02.032-2.164"],
            // "_svg_settings_category_tabs": ["M0 9h16v2h-16v-2zm0"],
            "_svg_settings_category_themes": ["M5.976 11c-1.92.537-1.91"],
            // "_svg_settings_category_webpages": ["M8 1c-3.9 0-7 3.1-7 7s3.1"],
            "_svg_sorting_selector_descending": ["M5.5.133l.11-.11 4.456"],
            // "_svg_speeddial_update_thumbnail": ["M13 4c-4.95 0-9 4.05-9 9s4.05 9 9 9c4.163"],
            // "_svg_startpage_newfolder": ['id="smallplus"'],
            // "_svg_tabstrip_btn_newtab": ["M7 9h-4v-2h4v-4h2v4h4v2h-4v4h-2v-4zm-7-9v16h16v-16h-16z"],
            "_svg_tabstrip_btn_trashcan": ['"trashicon-content"'],
            // "_svg_toggleimages_noimages": ["M16 2H0v12h16V2zM4.89"],
            "_svg_window_close": ["0h2v1H6V2zm1-1h2v1H7V1zM3"],
            "_svg_window_close_mac": ["window-close-glyph dpi-standard"],
            "_svg_window_close_win10": ["M10.2.5l-.7-.7L5 4.3.5-.2l-.7.7L4.3"],
            "_svg_window_minimize": ["M1 7h8v2H1z"],
            "_svg_window_minimize_mac": ["window-minimize-glyph dpi-standard"],
            "_svg_window_minimize_win10": ["M0 5H10V6H0V5Z"],
            "_svg_window_zoom": ["7h10v1H0V8zm0-6h1v6H0V2zm9"],
            "_svg_window_zoom_mac": ["window-zoom-glyph dpi-standard"],
            "_svg_window_zoom_win10": ["0H2v2H0v8h8V8h2V0H3zm4"],
            //todo:
            // "_svg_notes_tree_note": ["2h10v12h-10v-12zm1 2h8v9h-8v-9zm1"],
            // "_svg_notes_tree_note_has_url": ["M13 8v-6h-10v12h7v2l2.5-2"],
            // "_svg_vivaldi_horizontal_menu": ['id="horizontal-menu-button'],
            // "_svg_vivaldi_title": ['id="vivrect1"'],
            // "_svg_vivaldi_v": ["M14.726 7.446c-.537-1.023.035-2.164 1.2-2.41.948-.2"],
        }

        const slashre = new RegExp("\\\\\\\\", 'g')

        for (const modIndex in _modules) {
            let found = false

            function AddAndCheck(modIndex, moduleName) {
                if (("undefined" !== typeof _moduleMap[moduleName]) && (_moduleMap[moduleName] != modIndex))
                    console.log(`repeated module name "${moduleName}"`)

                if (_moduleNames[modIndex]) {
                    console.log(`multiple names for module ${modIndex}: ${moduleName}, ${_moduleNames[modIndex]}...`)
                    return true
                }

                _moduleMap[moduleName] = modIndex
                _moduleNames[modIndex] = moduleName

                return true
            }

            const fntxt = _modules[modIndex].toString()
            const fntxtPrepared = fntxt.replace(slashre, "/").toLowerCase()

            const re = /components\/([\w\/]+?)\.jsx\"/gi
            const matchJsxRe = fntxtPrepared.match(re)
            if (matchJsxRe && matchJsxRe.length == 1) { AddAndCheck(modIndex, re.exec(fntxtPrepared)[1].replace(/\//g, "_")) }

            for (const jsxModuleName in jsxNames) {
                if (-1 !== fntxtPrepared.indexOf(jsxNames[jsxModuleName].toLowerCase())) {
                    found = AddAndCheck(modIndex, jsxModuleName)
                    if (fastProcessModules) delete jsxNames[jsxModuleName]
                    break
                }
            }


            if (fastProcessModules && found) continue

            //signatures
            for (const moduleName in moduleSignatures) {
                if (moduleSignatures[moduleName].every(i => -1 < fntxt.indexOf(i))) {
                    found = AddAndCheck(modIndex, moduleName)
                    if (fastProcessModules) delete moduleSignatures[moduleName]
                    break
                }
            }
        }

        function checkUnknown(obj) {
            for (const moduleName in obj)
                if (!_moduleMap[moduleName]) {
                    console.log('unknown module', moduleName);
                }
        }

        checkUnknown(jsxNames)
        checkUnknown(moduleSignatures)

        //wrappers
        for (const modIndex in _modules) {
            var fntxt = _modules[modIndex].toString();
            var n = fntxt.match(/\.exports\s*=\s*n\((\d+)\)/);
            if (n) {
                var wrapNum = n[1];
                if ("undefined" !== typeof _moduleNames[wrapNum]) {
                    moduleName = _moduleNames[wrapNum] + '_wrapper';
                    _moduleMap[moduleName] = modIndex;
                    _moduleNames[modIndex] = moduleName;
                }
            }
        }
    };


    function loadBundleFile(file) {
        if (!fs.existsSync(file))
            return;

        const fileContents = fs.readFileSync(file, 'utf8');
        if (0 === fileContents.indexOf('(window.webpackJsonp')) {
            eval(fileContents);
        } else if (0 === fileContents.search(/^(!\s*function\((\w+)\)\s*\{)/)) {
            let bundleModules = {};
            eval(fileContents.replace(/^(!\s*function\((\w+)\)\s*\{)/, "$1bundleModules=$2;return;"));
            for (const m in bundleModules) _modules[m] = bundleModules[m];
        } else {
            console.log('cannot parse ' + file);
        }
        return fileContents;
    }

    window = {}

    loadBundleFile('background-bundle.js');
    loadBundleFile('background-common-bundle.js');
    //////loadBundleFile('devtools.js');
    loadBundleFile('inject-all-bundle.js');
    loadBundleFile('inject-all-spatnav-bundle.js');
    loadBundleFile('inject-root-bundle.js');
    loadBundleFile('vendor-bundle.js');
    var bundle = loadBundleFile('bundle.js');

    window.webpackJsonp.forEach(mpack => { for (const [key, value] of Object.entries(mpack[1])) { _modules[key] = value } })

    var time1 = new Date();
    makeSignatures();
    console.log("modules have been processed in", new Date() - time1, "ms");

    module.exports = {
        numbyname: _moduleMap,
        namebynum: _moduleNames,
        modules: _modules,
        fileContents: bundle
    };

})()
