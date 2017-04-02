const fs = require('fs');

var _moduleMap = {};
var _moduleNames = {};
var _modules = {};

function webpackJsonp(chunkIds, modules) {
    for (var m in modules) _modules[m] = modules[m];
}

function processModules() {
    //-build module names--------------------------------------------------

    var moduleSignatures = {
        "path": ["Arguments to path.resolve must be strings"],
        "process": ["process.binding is not supported"],
        "punycode": ['"Overflow: input needs wider integers to process",'],
        "url": [".prototype.parseHost"],
        "classnames": ["http://jedwatson.github.io/classnames"],
        "dexie": ['"Dexie specification of currently installed DB version is missing"'],
        "chroma": ['"Logarithmic scales are only possible for values > 0"'],
        "MailSender": ['"Failed to send message"'],
        "categoryConstantToString": ['"Mail"', '"Page"'],
        "SpeedDialDrawer": ["toggleStartpageDrawer", '"add-dial-submit primary"'],
        "SpeedDialView": ["startpage-folder-navigation"],
        "SpeedDialAddContent": ["dials dial-suggestions"],
        "SpeedDial": ["handleRemoveDial"],
        "SpeedDialAddButton": ['"openAddSpeedDial"', '"thumbnail-image"'],
        "EditableSpeedDialTitle": ['editable-title-container'],
        "OkChangeButton": ['("OK")', '("Change")'],
        "HistoryStoreSubscription": ['_onStoreChange:', 'historyFilter:', '"searchResultsReady"'],
        "InputMixin": ['renderOption:', 'renderInputField:'],
        "AddressBarShortcuts": ['("Open Address in New Tab")'],
        "BookmarksMock": ['otherBookmarksFolder', '"Other Bookmarks"', '.bookmarkItems'],
        "StorageMock": ['StorageMock', 'getBytesInUse:'],
        "TabsMock": ['captureVisibleTab'],
        "WindowsMock": ['getLastFocused', 'this.WINDOW_ID_CURRENT'],
        "progress_indicator": ['.createElement("progress"', 'bar:', 'circular:'],
        "css-layout": ['computeLayout:', 'fillNodes:'],
        "WebPageContent": ['WebPageContent.jsx'],
        "WebPageCollection": ['WebPageCollection.jsx'],
        "BlockedContentNotificator": ['BlockedContentNotificator.jsx'],
        "LocationPermissionDialog": ['locationPermissionDialog.jsx'],
        "LocationPermissionNotificator": ['locationPermissionNotificator.jsx'],
        "MediaPermissionDialog": ['mediaPermissionDialog.jsx'],
        "MediaPermissionNotificator": ['mediaPermissionNotificator.jsx'],
        "NotificationPermissionDialog": ['notificationPermissionDialog.jsx'],
        "NotificationPermissionNotificator": ['notificationPermissionNotificator.jsx'],
        "OmniDropdown": ['omnidropdown.jsx'],
        "PopupBlockerDialog": ['popupblockerDialog.jsx'],
        "PopupBlockerNotificator": ['popupblockerNotificator.jsx'],
        "SearchField": ['searchfield.jsx'],
        "SiteInfoButton": ['SiteInfoButton.jsx'],
        "TypedHistory": ['typedhistory.jsx'],
        "UrlBar": ['urlbar.jsx'],
        "UrlField": ['urlfield.jsx'],

        "nm_immutable": ["Expected Array or iterable object of [k, v] entries"], //node_modules\immutable\dist\immutable.js
        "nm_buffer": ["The buffer module from node.js"],

        "chromeWrapper": ["window.chrome.tabs"],
        "chrome": ["savedpasswords:", "topSites:"],
        "events": [".EventEmitter", ".listenerCount"],
        "keyMirror": ["keyMirror(...): Argument must be an object."],
        "isEventSupported": ["Checks if an event is supported in the current execution environment."],

        "_ActionList_DataTemplate": ["CHROME_SET_SESSION:", "CHROME_TABS_ACTIVATED:"],
        "_ActionManager": ["runAction:"],
        "_BGTaskActions": ["setBackgroundTasks:"],
        "_BookmarkBarActions": ["setBookmarkBarFolder:"],
        "_Bookmarks": ["getBookmark:"],
        "_BookmarkStore": ['getDefault("BOOKMARKS_BAR_FOLDER_IDS")', "getBookmarksBar"],
        "_BookmarkThumbnailActions": [".BOOKMARK_THUMBNAIL_QUEUE_ADD_ITEM,"],
        "_Clipboard": ["pasteAsPlainText:"],
        "_CommandManager": ["getUserEditableCommands:"],
        "_ContentScriptActions": ["addContentScript:"],
        "_ContentScriptStore": [".CONTENT_SCRIPT_LOAD:", ".CONTENT_SCRIPT_PAGE_REMOVE:"],
        "_GetPlatform": ['navigator.platform.indexOf("Linux")', '"linux"', 'navigator.platform.indexOf("MacIntel")', '"mac"', '"win"'],
        "_HandleActions": ["handleChromeAction:"],
        "_KeyboardShortcuts": ['keyComboFromEvent:'],
        "_KeyCodes": ["KEY_CANCEL:"],
        "_KeyNameToChar": [".replace(/capslock/g,"],
        "_MailActions": [".MAIL_ADD_MESSAGES,"],
        "_MouseGesturesHandler": ['.get("MOUSE_GESTURES_ENABLED"'],
        "_NavigationActions": ["setNavigationState:", "setProgressState:"],
        "_NavigationState": ["getNavigationInfo:"],
        "_NavigationButtonActions": ["navigateRewind:"],
        "_NotesHandler": [".CHROME_NOTES_CREATED,"],
        "_NoteStore": [".NOTES_LOAD_ALL:", ".NOTES_REMOVE_ITEM:"],
        "_OmniSettings_DataTemplate": ["OMNI_RESULT_COUNT:"],
        "_PageActions": [".CHROME_TABS_CREATED,", ".CHROME_TABS_REMOVED,"],
        "_WebPageViewActions": ["showFindInPageToolbar:"],
        "_PageStore": [".PAGE_TOGGLE_PINNED:", ".PAGE_SET_TARGET_URL:"],
        "_PanelActions": ["showNextPanel:"],
        "_PanelContainerActions": ["getFirstAvailablePanel:"],
        "_SearchFieldActions": [".SEARCH_FIELD_SET_STATE,"],
        "_SearchSuggestActions": ["suggest:", ".SEARCH_SUGGEST_RESULT"],
        "_SessionManager": ["restoreWindow:"],
        "_SettingsData_Common": ['["ctrl+shift+v"]', 'COMMAND_CLIPBOARD_PASTE_AS_PLAIN_TEXT_OR_PASTE_AND_GO:'],
        "_SettingsData_MAC": ['["shift+meta+v"]', 'COMMAND_CLIPBOARD_PASTE_AS_PLAIN_TEXT_OR_PASTE_AND_GO:'],
        "_SettingsData_Other": ['["ctrl+shift+w"]'],
        "_SpatNavHandler": [".SPATNAV_NAVIGATE,"],
        "_StatusActions": ["setStatus:"],
        "_TabActions": ["switchTabBackBySetting:"],
        "_Thumbnails": ["getPageThumbnail:"],
        "_TooltipActions": ["clearTooltip:", "showTooltip:"],
        "_TooltipStore": [".TOOLTIP_CLEAR:", ".TOOLTIP_SHOW:"],
        "_TypedHistory": ['.NAVIGATION_ADD_TYPED_HISTORY:'],
        "_TypedSearchHistory": ['getSearchEngine:', 'getSearchText:', 'getTypedSearchHistory:'],
        "_UIActions": ["showConfirmOpenBookmarkDialog:"],
        "_urlDecode": ['"%20"', '/\\+/g', "decodeURIComponent"],
        "_urlEncode": ["encodeURIComponent(", '"number"'],
        "_UrlFieldActions": ["setUrlfieldState:"],
        "_UrlValidation": [".isInternalURL", ".ensureURLProtocol", ".hasUnknownProtocol", ".isIgnoredURL"],
        "_UrlUtility": [".getDisplayTitle", 'this._defaultMapDisplayUrlToUrl'],
        "_UserAgentSpoofRules": ["navigator.userAgent.replace(/Vivaldi/,"],
        "_ViewActionHandler": [".TAB_NEW_TAB:"],
        "_VivaldiSettings": ["getKeysSync:", "getAllPrefs:"],
        "_WebPanelActions": ["copyWebPanelAdress:"],
        "_WebViewActions": ["setActiveWebView:"],
        "_trydecodeURI": ["return decodeURI(e)"],
        "_trydecodeURIComponent": ["return decodeURIComponent(e)"],
        "_getLocalizedMessage": [".i18n.getMessage"],
        "_decodeDisplayURL": [".removeTrailingSlashWhenNoPath(", ".getDisplayUrl(", "%2525"],
        "_ShowMenu": [".showMenu.onUrlHighlighted.addListener("],
        "_humanizedate": ['"about a minute ago"', '"in about an hour"'],
        "_ShowUI": ['document.getElementById("app")', 'show hidden application window because of missing current window'],
        "_SpeedDialChangeListener": ['bookmarksPrivate.updateSpeedDialsForWindowsJumplist'],
        "_getLocalizedStartPageHeader": ["SpeedDial:", '"Start Page"', "Bookmarks:", '"Bookmarks"'],
        "_SettingsMigration": ['"SETTINGS_MIGRATION_VERSION"'],
        "_SettingsMigration_1": ["preferenceKey:", '"vivaldi.home_page"'],
        "_SettingsMigration_2": ["keep_relations", ".TAB_CLOSE_ACTIVATION"],
        "_SettingsMigration_3": ['"Migrating Search Engines from"', ".SEARCH_ENGINES", '"to"'],
        "_SettingsMigration_4": ["6607C819-705B-493E-B85F-75D5FF8ECA5D"],
        "_SettingsMigration_5": ["A9AF7AAEA7E", "AD6C08C471A"],
        "_SettingsMigration_6": [".TABCOLOR_BEHIND_TABS", "TABCOLOR_BEHIND_TABS:", "on", "Promise"],
        "_SettingsMigration_7": ['.getSync("THEMES_SYSTEM")', ".THEMES_USER", "THEMES_USER:", ".cloneDeep"],
        "_SettingsAppearance": ['"Use Native Window"'],
        "_SettingsStartPage": ['"Speed Dial Layout"'],
        "_SettingsTabOptions": ['"Use Unread Indicators"'],
        "_SettingsTabPosition": ['"Show Tab Bar"', '"Tab Bar Position"'],
        "_treeSort": ['treeSort:', 'getDefaultComparator:'],
        "_clone": ['typeof Symbol.iterator', '"function"', '"symbol"', '"function"', '"object"', '.constructor()', '.hasOwnProperty('],
        "_getPrintableKeyName": ['"BrowserForward"', '"PrintScreen"'],
        "_updatePage": ['.tabToPage', '.updatePage', 'JSON.parse(', '"favIconUrl"'],
        "_bytes": ['hexToBytes:', 'bytesToHex:'],
        "_execScriptWrapper": ['typeof execScript', 'execScript(', 'eval.call('], //browser-bundle.js
        "_readability_js": ['Copyright (c) 2010 Arc90 Inc'], //browser-bundle.js
        "_purify_js": ['.DOMPurify', './dist/purify.'], //browser-bundle.js
        "_requestIdleCallback": ['return window.requestIdleCallback'],
        "_UrlValidation": ['ensureURLProtocol', 'isValidURL', 'hasUnknownProtocol', 'removeProtocol'],

        "vivaldi": ["bookmarksPrivate:"],
        "vivaldiWrapper": ["window.vivaldi?"], //doesn't work for beautified code

        "_languageList": ["ru:", "bg:"],
        "_mime_list": ["application/vnd.intercon.formnet"],
        "_zlibstream": ["Problem initializing deflate stream: ", "Problem initializing inflate stream: "],

        "_lodash_js_unk": ['"__lodash_hash_undefined__"', '"__lodash_placeholder__"', 'lodash.templateSources'],
        "_lodash_js_unk2": ['"bind bindKey curry curryRight partial partialRight"'],

        "_svg_addressbar_btn_backward": ["M17.6 20.4l-1.6 1.6-9-9 9-9 1.6 1.6-7.2 7.4 7.2 7.4z"],
        "_svg_addressbar_btn_fastbackward": ["M19 6l-7 5.6v-5.6h-2v12h2v-5.6l7 5.6z"],
        "_svg_addressbar_btn_fastforward": ["M10 6l7 5.6v-5.6h2v12h-2v-5.6l-7 5.6z"],
        "_svg_addressbar_btn_forward": ["M15.2 13l-7.2 7.4 1.6 1.6 9-9-9-9-1.6 1.6 7.2 7.4z"],
        "_svg_addressbar_btn_home": ['10h3.5v8h14v-8h3.5l-10.5-10zm5 16h-3v-5h-4v5h-3v'],
        "_svg_addressbar_btn_reload": ["M4 13c0 4.95 4.05 9 9 9 4.162 0 7.65-2.924 8.662-6.75h-2.362c-.9 2"],
        "_svg_addressbar_btn_reload_stop": ['M9.4 18l-1.4-1.4 4.6-4.6-4.6-4.6 1.4-1.4 4.6 4.6 4.6-4.6 1.4 1.4-4.6 4.6 '],
        "_svg_bookmarked": ['M4,1 L4,14 L8,12 L12,14 L12,1 L4,1 Z M6,3 L10,3 L10,10.763'],
        "_svg_bookmarks_toolbar_import": ['M13 18l4-4H9l4 4zM12 8v6h2V8h-2z'],
        "_svg_bookmarks_update_thumbnail": ['M12.6 7C9.507 7 7 9.506 7'],
        "_svg_btn_delete": ['M13.5 6l-1.4-1.4-3.1 3-3.1-3L4.5'],
        "_svg_btn_dropdown": ['M8 11l4-6H4l4 6z'],
        "_svg_btn_minus": ["M9 14h8v-2H9v2z"],
        "_svg_btn_paneltoggle": ['195v12h-16v-12h16zm-10'],
        "_svg_btn_plus": ["M11.975 14.04H9.02v-2.036h2.955V9h2.037v3.004h2.982v2.037h-2.982v2.934h-2.037V14.04z"],
        "_svg_button_restart": ['M13 13H6V6l7 7z'],
        "_svg_mail_unread": ['<circle cx="8" cy="8" r="3"/>'],
        "_svg_menu_bookmarks": ["M3 2v12l5-2 5 2V2H3zm8 9L8 9.646 5 11V4h6v8-1z"],
        "_svg_menu_contacts": ['M10.4 7.43c1.02 0 1.8-.744 1.8-1.716'],
        "_svg_menu_downloads": ['M8.914 6.995V3H6.057v3.995c0'],
        "_svg_menu_mail": ['3v10h14V3H1zm7'],
        "_svg_menu_notes": ['2v12h10V2H3zm9 11H4V4h8v9z'],
        "_svg_menu_settings": ['M12.55 8v.592l1.325 1.014c.088.084.177.253.088.338l-1.236'],
        "_svg_menu_vivaldi": ['M10.428 5.038c-.42-.85.027-1.804.943-2.008.747-.167 1.518.386 1.617'],
        "_svg_notes_add_attachment": ['.436.28.97.7.97h5.95c.98 0 1.75-1.043 1.75-2.06 0-1.02-.77-1.82-1.75'],
        "_svg_notes_happynote": ['id="eye"'],
        "_svg_notes_tree_note": ['2h10v12h-10v-12zm1 2h8v9h-8v-9zm1'],
        "_svg_notes_tree_note_has_url": ['M13 8v-6h-10v12h7v2l2.5-2'],
        "_svg_pageactionchooser": ["M5.3 9.8L.8 6.5l4.6-3.3L6.6 5 4.2 6.4l2.3 1.7-1.2 1.6M10.7"],
        "_svg_panel_bookmarks": ["v-11h8v11l-4"],
        "_svg_panel_contacts": ["M15.6 19h5.4v-2.2c0-1.5-3-2.8-4.7-2.8-.7"],
        "_svg_panel_downloads": ["M15 6h-4v5h-4l6 6 6-6h-4v-5zm-9"],
        "_svg_panel_downloads_btn_resume": ['M16 13l-6 5V8l6 5z'],
        "_svg_panel_downloads_btn_stop": ['M9 9h8v8H9z'],
        "_svg_panel_history": ["M13.5 21a7.5 7.5 0 1 0 0-15 7.5 7.5"],
        "_svg_panel_mail": ["8v11h16V8H5zm8"],
        "_svg_panel_notes": ["20h12v-14h-12v14zm2-11h8v9h"],
        "_svg_panel_settings": ["M10.982 17.576v.424l.404 1.704c0 .197.101.296.303.296h2.725c.101"],
        "_svg_search_change_engine": ['M-182.6 201.9c.4-.7.7-1.5.7-2.3'],
        "_svg_settings_category_addressbar": ['M0 0v10h16v-10h-16zm2'],
        "_svg_settings_category_all": ['M16 9.077v-2.155l-1.913-.68c'],
        "_svg_settings_category_appearance": ['4h16v10H0V4zm2'],
        "_svg_settings_category_bookmarks": ['M3 2v13.333l5-1.666'],
        "_svg_settings_category_downloads": ['M2 14h12v2h-12v-2zm12-4h2v6h-2v-6zm-14'],
        "_svg_settings_category_keyboard": ['M0 4v9h16v-9h-16zm7'],
        "_svg_settings_category_mail": ['M0 0v12h16v-12h-16zm8'],
        "_svg_settings_category_mouse": ['M7.5 0c-3.025 0-5.5 2.314-5.5'],
        "_svg_settings_category_network": ['M9 8v2h-2v-2h-4v2h-2v-4h6v-2h-2v-4h6v4h'],
        "_svg_settings_category_panel": ['M16 0v12h-16v-12h16zm-10'],
        "_svg_settings_category_privacy": ['M8 13c3.636 0 6.764-2.067'],
        "_svg_settings_category_qc": ['M8 7.042l-4-4.042h3l4'],
        "_svg_settings_category_search": ['M11.172 9.757l4.192 4.192-1.414'],
        "_svg_settings_category_start_page": ['2h7v6h-7zm8 0h7v6h-7zm-8'],
        "_svg_settings_category_startup": ['M9.96 2.446c-.498-1.02.032-2.164'],
        "_svg_settings_category_tabs": ['M0 9h16v2h-16v-2zm0'],
        "_svg_settings_category_themes": ['M5.976 11c-1.92.537-1.91'],
        "_svg_settings_category_webpages": ['M8 1c-3.9 0-7 3.1-7 7s3.1'],
        "_svg_sorting_selector_descending": ['M5.5.133l.11-.11 4.456'],
        "_svg_speeddial_update_thumbnail": ['M13 4c-4.95 0-9 4.05-9 9s4.05 9 9 9c4.163'],
        "_svg_startpage_newfolder": ['id="smallplus"'],
        "_svg_tabstrip_btn_newtab": ["M7 9h-4v-2h4v-4h2v4h4v2h-4v4h-2v-4zm-7-9v16h16v-16h-16z"],
        "_svg_tabstrip_btn_trashcan": ['"trashicon-content"'],
        "_svg_toggleimages_noimages": ['M16 2H0v12h16V2zM4.89'],
        "_svg_vivaldi_horizontal_menu": ['id="horizontal-menu-button'],
        "_svg_vivaldi_title": ['id="vivrect1"'],
        "_svg_vivaldi_v": ['M14.726 7.446c-.537-1.023.035-2.164 1.2-2.41.948-.2'],
        "_svg_window_close": ['0h2v1H6V2zm1-1h2v1H7V1zM3'],
        "_svg_window_close_mac": ['window-close-glyph dpi-standard'],
        "_svg_window_close_win10": ['M10.2.5l-.7-.7L5 4.3.5-.2l-.7.7L4.3'],
        "_svg_window_minimize": ['M1 7h8v2H1z'],
        "_svg_window_minimize_mac": ['window-minimize-glyph dpi-standard'],
        "_svg_window_minimize_win10": ['M0 0h10v1H0z'],
        "_svg_window_zoom": ['7h10v1H0V8zm0-6h1v6H0V2zm9'],
        "_svg_window_zoom_mac": ['window-zoom-glyph dpi-standard'],
        "_svg_window_zoom_win10": ['0H2v2H0v8h8V8h2V0H3zm4'],

        "react__invariant": ["Minified exception occurred; use the non-minified dev environment"],
        "react_AutoFocusUtils": ["focusDOMComponent:"],
        "react_BeforeInputEventPlugin": ["compositionUpdate:"],
        "react_createMicrosoftUnsafeLocalFunction": ["MSApp.execUnsafeLocalFunction"],
        "react_CSSCore": ["addClass:", "removeClass:", "hasClass:"],
        "react_CSSProperty": ["borderTopWidth:"],
        "react_CSSPropertyOperations": ['createMarkupForStyles:'],
        "react_DOMChildrenOperations": ['dangerouslyReplaceNodeWithMarkup:', 'replaceDelimitedText:'],
        "react_DOMLazyTree": [".insertTreeBefore", ".replaceChildWithTree", ".queueHTML"],
        "react_DOMNamespaces": ["mathml:", "http://www.w3.org/1998/Math/MathML"],
        "react_DOMProperty": ["ROOT_ATTRIBUTE_NAME:"],
        "react_DOMPropertyOperations": ['createMarkupForCustomAttribute:'],
        "react_emptyFunction": [".thatReturnsThis", ".thatReturnsArgument"],
        "react_EnterLeaveEventPlugin": ["mouseEnter:"],
        "react_EventPluginHub": ["enqueueEvents:"],
        "react_EventPluginRegistry": ["getPluginModuleForEvent:"],
        "react_EventPluginUtils": ["executeDirectDispatch:"],
        "react_EventPropagators": ["accumulateDirectDispatches:"],
        "react_ExecutionEnvironment": ["canUseDOM:", "canUseEventListeners:"],
        "react_FallbackCompositionState": ["getData:", "return this._fallbackText"],
        "react_findDOMNode": [".nodeType", ".render", ".getNodeFromInstance(", "Object.keys("],
        "react_getEventKey": ["19:", "MozPrintableKey:"],
        "react_getVendorPrefixedEventName": ["animationend:"],
        "react_HTMLDOMPropertyConfig": ["required:"],
        "react_instantiateReactComponent": ["_instantiateReactComponent:", ".createInstanceForText("],
        "react_LinkedValueUtils": ["You provided a `checked` prop to a form field without an `onChange` handler"],
        "react_PooledClass": ["twoArgumentPooler:"],
        "react_React": ["only:", "toArray:"],
        "react_ReactBrowserEventEmitter": ["listenTo:"],
        "react_ReactChildReconciler": ["instantiateChildren:"],
        "react_ReactChildren": ["mapIntoWithKeyPrefixInternal:"],
        "react_ReactClass": ["getChildContext:"],
        "react_ReactComponent": [".isReactComponent", ".enqueueForceUpdate("],
        "react_ReactComponentEnvironment": [".processChildrenUpdates", "replaceNodeWithMarkup:"],
        "react_ReactCompositeComponent": ["performInitialMountWithErrorHandling:"],
        "react_ReactDefaultBatchingStrategy": ["this.reinitializeTransaction()", "isBatchingUpdates:", "batchedUpdates:"],
        "react_ReactDOM": ["findDOMNode:"],
        "react_ReactDOMComponentFlags": ["hasCachedChildNodes:"],
        "react_ReactDOMComponentTree": ["getClosestInstanceFromNode:", '" react-text: "'],
        "react_ReactDOMFactories": ["samp:"],
        "react_ReactDOMFeatureFlags": ["useCreateElement:"],
        "react_ReactDOMInput": ["initialChecked:"],
        "react_ReactDOMOption": ["postMountWrapper:", "selected:", ".getSelectValueContext"],
        "react_ReactDOMSelect": ["getSelectValueContext:", "initialValue:", "wasMultiple:"],
        "react_ReactDOMSelection": ["getOffsets:"],
        "react_ReactDOMTextComponent": ['.getNodeFromInstance(', '.createDocumentFragment('],
        "react_ReactEmptyComponent": ["injectEmptyComponentFactory:"],
        "react_ReactErrorUtils": ["rethrowCaughtError:"],
        "react_ReactEventEmitterMixin": ["handleTopLevel:", ".extractEvents("],
        "react_ReactEventListener": ["_handleTopLevel:", "WINDOW_HANDLE:"],
        "react_ReactFeatureFlags": ["logTopLevelRenders:"],
        "react_ReactHostComponent": ["createInstanceForText:"],
        "react_ReactInjection": ["EventEmitter:"],
        "react_ReactInputSelection": ["hasSelectionCapabilities:"],
        "react_ReactInstanceMap": ["._reactInternalInstance"],
        "react_ReactList": ["ReactList", "getScrollParent", "getViewportSize", "getItemSizeAndItemsPerRow"],
        "react_ReactMarkupChecksum": ["canReuseMarkup:"],
        "react_ReactMount": ['_mountImageIntoNode:'],
        "react_ReactMultiChild": ["createChild:"],
        "react_ReactNodeTypes": ["EMPTY:", "COMPOSITE:"],
        "react_ReactOwner": ["removeComponentAsRefFrom:"],
        "react_ReactPropTypes": ["objectOf:"],
        "react_ReactRef": [".detachRefs", ".removeComponentAsRefFrom"],
        "react_ReactTransitionChildMapping": ["mergeChildMappings:"],
        "react_ReactTransitionEvents": ["removeEndEventListener:"],
        "react_ReactUpdateQueue": ["enqueueElementInternal:"],
        "react_ReactUpdates": ["injectBatchingStrategy:"],
        "react_renderSubtreeIntoContainer": [".renderSubtreeIntoContainer"],
        "react_SelectEventPlugin": ["focusOffset:"],
        "react_setInnerHTML": ["/<(!--|link|noscript|meta|script|style"],
        "react_SVGDOMPropertyConfig": ["requiredExtensions:"],
        "react_SyntheticAnimationEvent": ["animationName:"],
        "react_SyntheticClipboardEvent": ["clipboardData:"],
        "react_SyntheticDragEvent": ["dataTransfer:"],
        "react_SyntheticEvent": ["eventPhase:"],
        "react_SyntheticKeyboardEvent": ["charCode:"],
        "react_SyntheticWheelEvent": ["deltaZ:"],
        "react_Transaction": ["reinitializeTransaction:"],
        "react_ViewportMetrics": ["currentScrollLeft:"],
    };

    for (var modIndex in _modules) {

        //displayName
        var fntxt = ('' + _modules[modIndex]);
        var idx = fntxt.indexOf('displayName');
        if (idx > -1) {
            var n = fntxt.substring(idx - 1).match(/[^\.]displayName\s*[:=]\s*"(.*?)"/);
            if (n) {
                _moduleMap[n[1]] = modIndex;
                _moduleNames[modIndex] = n[1];
            }
        }

        //signatures
        for (var moduleName in moduleSignatures) {
            if (0 === moduleSignatures[moduleName].filter(function(i) {
                    return -1 === fntxt.indexOf(i)
                }).length) {

                if (("undefined" !== typeof _moduleMap[moduleName]) && (_moduleMap[moduleName] != modIndex))
                    console.log('jdhooks: repeated module name "' + moduleName + '"');

                _moduleMap[moduleName] = modIndex;
                _moduleNames[modIndex] = moduleName;

                break;
            }
        }

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

    var unknownModules = {};
    for (var sigModuleName in moduleSignatures)
        if (!_moduleMap[sigModuleName])
            console.log('jdhooks: unknown module', sigModuleName);
};


function loadBundleFile(file) {
    if (!fs.existsSync(file))
        return;

    var fileContents = fs.readFileSync(file, 'utf8');
    if (0 === fileContents.indexOf('webpackJsonp(')) {
        eval(fileContents);
    } else if (0 === fileContents.search(/^(!function\((\w+)\)\{)/)) {
        var bundleModules = {};
        eval(fileContents.replace(/^(!function\((\w+)\)\{)/, "$1bundleModules=$2;return;"));
        for (var m in bundleModules) _modules[m] = bundleModules[m];
    } else {
        console.log('cannot parse ' + file);
    }
    return fileContents;
}

loadBundleFile('background-common-bundle.js');
loadBundleFile('vendor-bundle.js');
var bundle = loadBundleFile('bundle.js');
processModules();

module.exports = {
    numbyname: _moduleMap,
    namebynum: _moduleNames,
    modules: _modules,
    fileContents: bundle
};