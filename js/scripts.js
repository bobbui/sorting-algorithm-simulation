/*
 * Project: src
 * File: scripts.js
 *
 * Copyright (c) 9/2015, Thang Bui - thang.buinguyen at gmail.com, - All Rights Reserved
 *
 * Free to use under the MIT license. Use at your own risk!!!!
 *
 * Last modified  9/2/15 11:12 AM
 *
 */

var algors = ["Bubble sort", "Quick sort", "Merge Sort"];
var information1 = {
    name: "Bubble sort",
    bestcase: "n",
    averagecase: "n<sup>2</sup>",
    worstcase: "n<sup>2</sup>",
    description: "Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that works by repeatedly stepping through the a to be sorted, comparing each pair of adjacent items and swapping them if they are in the wrong order.",
    moreinfo: "http://en.wikipedia.org/wiki/Bubble_sort",
    codelisting: code["bubble sort"],
    command: commands["bubble sort"]
};
var information2 = {
    name: "Quick sort",
    bestcase: "n log n",
    averagecase: " n log n",
    worstcase: "n<sup>2</sup>",
    description: "Quicksort, or partition-exchange sort, is a sorting algorithm developed by Tony Hoare that, on average, makes O(n log n) comparisons to sort n items. In the worst case, it makes O(n2) comparisons, though this behavior is rare. Quicksort is often faster in practice than other O(n log n) algorithms.",
    moreinfo: "http://en.wikipedia.org/wiki/Quicksort",
    codelisting: code["quick sort"],
    command: commands["quick sort"]
};
var information3 = {
    name: "Merge sort",
    bestcase: "n log n",
    averagecase: " n log n",
    worstcase: "n log n",
    description: "Merge sort (also commonly spelled mergesort) is an O(n log n) comparison-based sorting algorithm. Most implementations produce a stable sort, which means that the implementation preserves the input order of equal elements in the sorted output. Mergesort is a divide and conquer algorithm that was invented by John von Neumann in 1945",
    moreinfo: "http://en.wikipedia.org/wiki/Merge_sort",
    codelisting: code["merge sort"],
    command: commands["merge sort"]
};
var informations = [information1, information2, information3];
var config = {};
var a = [];
var stopped, stop, autoStep;
var running = false;
var stack = [];
var recDepth;
var SortData;

function toggle() {
    if (step == -1) {
        reset();
    } else if (running) {
        auto = false;
        running = false;
        //click pause
        if (step > 0) {
            $("#startautorun").text("Continue");
        } else {
            $("#startautorun").text("Auto Run");
        }
        $("#next").removeAttr("disabled");
    } else {
        running = true;
        auto = true;
        //click run/continue
        $("#startautorun").text("Pause");
        $("#next").attr("disabled", "true");
    }
    nextStep();
}

function resetCodeListingColor() {
    for (var i = 0; i < config.information.codelisting.length; i++) {
        $("#s" + i).css("background-color", "");
    }
    $($("#codelisting tr")[$("#codelisting tr").length - 1]).css("background-color", "");
}
function highlightStepVars(number) {
    resetCodeListingColor();
    $("#s" + number).css("background-color", "yellow");

    resetDataRowVarLocation();
    if (i > 0) {
        $("#varLocation" + i).html("i &rarr;");
    }
    if (j > 0) {
        $("#varLocation" + j).html("j &rarr;");
    }
}

function resetDataRowVarLocation() {
    var datarow = $("#simulation td.varLocation");
    for (var index = 0; index < datarow.length; index++) {
        $(datarow[index]).text("");
    }
}

function reset() {
    stop = true;
    clearTimeout(autoStep);
    refreshSimulation();
    resetCodeListingColor();
    resetDataRowVarLocation();
    $("#startautorun").text("Auto Run");
    $("#next").removeAttr("disabled");
    running = false;
    size = a.length;
    stopped = false;
    stop = false;
    j = -1;
    i = -1;
    step = 0;
    comparisonNo = 0;
    swapNo = 0;
    totalComparisonNo = 0;
    totalSwapNo = 0;
    recDepth = 0;
    SortData = false;

    $("#totalSwapNo").html("0");
    $("#totalComparisonNo").html("0");
    $("#swapNo").html("");
    $("#comparisonNo").html("");
}
function nextStep() {
    if (stop) {
        stopped = true;
        return;
    }
    if (step == -1) {
        resetDataRowVarLocation();
        resetCodeListingColor();
        $($("#codelisting tr")[$("#codelisting tr").length - 1]).css("background-color", "yellow");
        $("#startautorun").text("New AutoRun");
        return;
    }
    if (step > config.information.command.length - 1) {
        console.log("ERROR OCCURED, STOP NOW");
        return;
    }

    highlightStepVars(step);

    with (SortData) {

        if (step == config.information.command.length - 1 && config.information.name == "Bubble sort") {
            eval(config.information.command[step]);
        } else {
            eval(config.information.command[step++]);
        }
    }
    if (auto) {
        autoStep = setTimeout('nextStep()', config.delay);
    }
}

$(function () {
    populateAlgorithmList();

    //onchange load algorithm information from database
    initializeAllDropDown();

    onchangeAlgorithmList();

    loadAlgorInformation();

    $("#startautorun").click(function () {
        toggle();
    });
    $("#restart").click(function () {
        reset();
    });
    $("#next").click(function () {
        nextStep();
    });

    reset();
});

function populateAlgorithmList() {
//populate to the first dropdown
    var option = "";
    for (i = 0; i < algors.length; i++) {
        option += '<li> <a href="#">' + algors[i] + '</a></li>';
    }
    $('#items').append(option);

    $("#algorName .dropdown-menu").append(option);
}

function refreshSimulation() {
    //load config
    var dropdown = $(".dropdown-menu");
    for (var i = 0; i < dropdown.length; i++) {
        var $3 = $(dropdown[i]);
        var value = $($3.siblings("button")[0]).text();
        config[$3.attr("data")] = value.toLowerCase();
    }

    //gen a
    //TODO: handle few distinct
    a = [];
    if (config.gentype == "few distinct") {

        var b = [];
        var number = Math.round(config.size / 3);
        for (var i = 0; i < number; i++) {
            if (config.type == "word") {
                b.push(genRandomString());
            } else {
                b.push(Math.round(Math.random() * 200));
            }
        }
        for (var i = 0; i < config.size; i++) {
            var randomIndex = Math.ceil(Math.random() * (b.length)) - 1;
            if (randomIndex > b.length - 1 || randomIndex < 0) {
                randomIndex = 0;
            }
            a.push(b[randomIndex]);
        }
    } else {
        for (var i = 0; i < config.size; i++) {
            if (config.type == "word") {
                a.push(genRandomString());
            } else {
                a.push(Math.round(Math.random() * 200));
            }
        }
        //remix a
        if (config.gentype == "nearly sorted") {
            a = nearlyBubbleSort(a);
        } else if (config.gentype == "sorted") {
            a = mergeSort(a);
        } else if (config.gentype == "reversed order") {
            a = reverseBubbleSort(a);
        }
    }
    //draw simulation table

    if (config.type == "bar") {
        maxBarItem = Math.max.apply(Math, a);
    }
    var table = $("#simulation");
    var markup = "";
    for (var i = 0; i < a.length; i++) {
        var itemMarkup = "<tr><td class='varLocation' id ='varLocation" + i + "'></td> <td class='varValue'>";

        var itemVal = a[i];
        if (config.type == "number") {
            itemMarkup += itemVal;
        } else if (config.type == "word") {
            itemMarkup += itemVal;
        } else {
            var width = Math.round(itemVal / maxBarItem * 100);
            itemMarkup += "<div class='barItem' style='width:" + width + "%'> </div>";
        }
        itemMarkup += "</td></tr>";
        markup += itemMarkup;
    }

    table.html("");
    table.html(markup);
}

Array.max = function (array) {
    return Math.max.apply(Math, array);
};

function genRandomString() {
    return Math.random().toString(36).substring(7);
}

function initializeAllDropDown() {
    //onchange event all dropdown
    $(".dropdown-menu li a").click(function () {
        var message = $($(this).closest("ul").siblings("button")[0]);
        message.text($(this).text());
        message.val($(this).text());

        //Handle refresh action
        refreshSimulation();
    });

    //set default on
    $(".dropdown-menu").each(function () {
        var child = $(this).children()[0];
        var innerHTML = $(child).children()[0].innerHTML;
        $(this).siblings("button")[0].innerHTML = innerHTML;

    });
}

function onchangeAlgorithmList() {
    $("#algorName .dropdown-menu li a").click(function () {
        loadAlgorInformation($(this).text());
    });
}

function loadAlgorInformation(text) {
    var information;
    if (typeof text == "undefined") {
        information = informations[0];
    } else if (text.toLocaleLowerCase() == "bubble sort") {
        information = informations[0];
    } else if (text.toLocaleLowerCase() == "quick sort") {
        information = informations[1];
    } else {
        information = informations[2];
    }

    //update information
    var k;
    for (prop in information) {
        if (prop == "codelisting") {
            var tablemarkup = "";
            for (var i = 0; i < information["codelisting"].length; i++) {
                var s = information["codelisting"][i];

                while (s.indexOf('@') >= 0) {
                    s = s.replace(/@/, '<span id="');
                    s = s.replace(/:/, '">');
                    s = s.replace(/@/, '</span>');
                }
                for (k = 0; s.charAt(0) == ' '; k++)
                    s = s.slice(1);
                s = spaces(5 * k) + s;

                tablemarkup += "<tr><td> " + s + "</td></tr>";
            }
            $("#" + prop).html(tablemarkup);
        } else if (prop == "moreinfo") {
            $("#" + prop).attr("href", information[prop]);
        } else {
            $("#" + prop).html(information[prop]);
        }
    }
    config.information = information;
    reset();
}
function spaces(n) {
    var s = '';
    for (var j = 0; j < n; j++)
        s += '&nbsp;';
    return s;
}