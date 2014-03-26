function storeIntResult(options, keyword) {
    var value = $("#" + keyword).val();
    value = parseInt(value, 10);
    if (!isNaN(value)) {
	options[keyword] = value;
    }
}
function storeStringResult(options, keyword) {
    var value = $("#" + keyword).val();
    if (value) {
	options[keyword] = value;
    }
}

var storeResults = [];

function makeOption(keyword, label, options, storeResult) {
    var role = "slider";
    if (options) {
	role = "select";
    } else {
	options = [[0, 'Off'], [1, 'On']];
    }
    if (!storeResult) {
	storeResult = storeIntResult;
    }
    storeResults.push([keyword, storeResult]);

    document.write('<div data-role="fieldcontain"><label for="' + keyword + '">' + label + '</label><select name="' + keyword + '" id="' + keyword + '" data-role="' + role + '">');
    var key = $.url().param(keyword);
    for (var oi in options) {
	if (key == options[oi][0]) {
	    document.write('<option value="' + options[oi][0] + '" selected>' + options[oi][1] + '</option>');
	} else {
	    document.write('<option value="' + options[oi][0] + '">' + options[oi][1] + '</option>');
	}
    }
    document.write('</select></div>');
};

makeOption("second_hand", "Second hand");

if ($.url().param("sweep_seconds") != undefined) {
    makeOption("sweep_seconds", "Smooth-sweep seconds (heavy battery use)");
}	

var num_faces = $.url().param("num_faces");
if (num_faces > 1) {
    var faces = [
	[ 0, 'One' ],
	[ 1, 'Two' ],
	[ 2, 'Three' ],
	[ 3, 'Four' ],
	[ 4, 'Five' ],
    ];
    makeOption("face_index", "Select face variant", faces.slice(0, num_faces));
}

makeOption("draw_mode", "Invert colors");

if ($.url().param("chrono_dial") != undefined) {
    makeOption("chrono_dial", "Bottom chrono dial shows",
	       [[0, 'Off'], [1, 'Tenths'], [2, 'Hours'], [3, 'Dual (tenths, then hours)']]);
}

// This list is duplicated in resources/make_lang.py.
var langs = [
    [ 'ar_SA', 'Arabic', 'rtl' ],
    [ 'hy_AM', 'Armenian', 'extended' ],
    [ 'zh_CN', 'Chinese', 'cjk' ],
    [ 'cs_CZ', 'Czech', 'latin' ],
    [ 'da_DK', 'Danish', 'latin' ],
    [ 'nl_NL', 'Dutch', 'latin' ],
    [ 'en_US', 'English', 'latin' ],
    [ 'fa_IR', 'Farsi', 'rtl' ],
    [ 'fr_FR', 'French', 'latin' ],
    [ 'de_DE', 'German', 'latin' ],
    [ 'el_GR', 'Greek', 'extended' ],
    [ 'he_IL', 'Hebrew', 'rtl' ],
    [ 'hi_IN', 'Hindi', 'extended' ],
    [ 'hu_HU', 'Hungarian', 'latin' ],
    [ 'is_IS' ,'Icelandic', 'latin' ],
    [ 'it_IT', 'Italian', 'latin' ],
    [ 'ja_JP', 'Japanese', 'cjk' ],
    [ 'ko_KR', 'Korean', 'cjk' ],
    [ 'pl_PL', 'Polish', 'latin' ],
    [ 'pt_PT', 'Portuguese', 'latin' ],
    [ 'ru_RU', 'Russian', 'extended' ],
    [ 'es_ES', 'Spanish', 'latin' ],
    [ 'sv_SE', 'Swedish', 'latin' ],
    [ 'tl', 'Tagalog', 'extended' ],
    [ 'ta_IN', 'Tamil', 'extended' ],
    [ 'th_TH', 'Thai', 'extended' ],
    [ 'tr_TR', 'Turkish', 'extended' ],
];

if ($.url().param("show_day") != undefined) {
    makeOption("show_day", "Show weekday or month",
	       [[0, 'Off'], [1, 'Weekday'], [2, 'Month']]);
    makeOption("display_lang", "Language for day/month", langs, storeStringResult);
}

if ($.url().param("show_date") != undefined) {
    makeOption("show_date", "Show numeric date");
}

makeOption("hour_buzzer", "Vibrate at each hour");
makeOption("keep_battery_gauge", "Keep battery visible");
makeOption("keep_bluetooth_indicator", "Keep bluetooth visible");

function saveOptions() {
    var options = {
    };

    for (var ri in storeResults) {
	var keyword = storeResults[ri][0];
	var storeResult = storeResults[ri][1];
	storeResult(options, keyword);
    }
    return options;
}
