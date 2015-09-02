/*
 * Project: src
 * File: code.js
 *
 * Copyright (c) 9/2015, Thang Bui - thang.buinguyen at gmail.com, - All Rights Reserved
 *
 * Free to use under the MIT license. Use at your own risk!!!!
 *
 * Last modified  9/2/15 11:29 AM
 *
 */

var code = {};
var commands = {};

code["quick sort"] = [
    '@s0:QuickSort(low, high)@ {',
    ' @s1:if (high-low &lt;= 1)@ @s2:return@;',
    ' @s3:pivot = a[high-1]@;',
    ' @s4:split = low@;',
    ' for (@s5:i=low@; @s6:i&lt;high-1@; @s10:i++@)',
    '  @s7:if (a[i] &lt;pivot)@',
    '  {',
    '   @s8:swap a[i] and a[split]@;',
    '   @s9:split++@;',
    '  }',
    ' @s11:swap a[high-1] and a[split]@;',
    ' @s12:QuickSort(low, split)@;',
    ' @s13:QuickSort(split+1, high)@;',
    ' @s14:return@;',
    '}',
    "/*  FINISHED */"];

commands["quick sort"] = [
    'low = 0 ; high = a.length;', //dummy step
    'if (high-low > 1) step++;',
    'popAll(); if (recDepth < 0) step = -1;',
    'pivot = a[high-1];',
    'split = low;',
    'i = low;',
    'if (i>=high-1) step = 11;',
    'if (a[i]>=pivot) step = 10;',
    'swap(i,split);',
    'split++;',
    'i++; step = 6;',
    'swap(high-1,split);',
    'pushAll(); Sort(low,split);',
    'pushAll();  Sort(split+1,high);',
    'popAll(); if (recDepth < 0) step = -1;'];

function Sort(low, high) {
    if (high - low <= 1) return;
    var pivot = a[high - 1];
    var split = low;
    for (i = low; i < high - 1; i++)
        if (a[i] < pivot) {
            swap(i, split);
            split++;
        }
    a[high - 1] = a[split];
    a[split] = pivot;
    Sort(low, split);
    Sort(split + 1, high);
}

function QuickData(low, high) {
    this.subFlag = false;
    this.low = low;
    this.high = high;
    this.step = 0;
    this.pivot = this.split = this.i = undefined;
}
function popAll() {
    recDepth--;
    if (recDepth >= 0) SortData = stack[recDepth];
}
function pushAll() {
    stack[recDepth++] = SortData;
}

code["bubble sort"] = [
    '@s0:BubbleSort(size)@ {',
    ' for (@s1:i=size-1@; @s2:i > 0@; @s8:i--@)',
    ' {',
    '  for (@s3:j=0@; @s4:j &lt; i@; @s7:j++@)',
    '  {',
    '   @s5:if (a[j] > a[j+1])@',
    '    @s6:swap a[j] and a[j+1]@;',
    '  }',
    ' }',
    '}',
    "/*  FINISHED */"];
commands["bubble sort"] = [
    'size = size;',  //dummy step
    'i = size - 1;',
    'if (i <= 0) step = -1;',
    'j = 0;',
    'if (j>= i) step = 8;',
    'if (a[j] <= a[j+1]) { step++; comparisonNo++;totalComparisonNo++  }',  //skip next step if true
    'swap(j,j+1);',
    'j++; step = 4;',
    'i--; step = 2; appendSwapCompareNo();  swapNo = 0; comparisonNo = 0'];

function BubbleData(size) {
    this.i = this.j = this.swaps = undefined;
    this.size = size;
    this.step = 0;
    this.low = 0;
    this.high = size;
}

function swap(i, j) {
    var datarow = $("#simulation td.varValue");
    for (var index = 0; index < datarow.length; index++) {
        $(datarow[index]).css("background-color", "");
    }
    $(datarow[i]).css("background-color", "pink");
    $(datarow[j]).css("background-color", "pink");

    var t = a[i];
    a[i] = a[j];
    a[j] = t;

    var markup = $(datarow[i]).html();
    $(datarow[i]).html($(datarow[j]).html());
    $(datarow[j]).html(markup);

    swapNo++;
    totalSwapNo++;

    setTimeout(function () {
        $(datarow[i]).css("background-color", "");
        $(datarow[j]).css("background-color", "");
    }, config.delay / 3);
}

function appendSwapCompareNo() {
    $("#totalSwapNo").text(totalSwapNo);
    $("#totalComparisonNo").text(totalComparisonNo);
    $("#swapNo").append("<tr> <td class='swapValue'>" + swapNo + "</td> <td> <div class='barItem' style='width: " + Math.round(swapNo / size * 100) + "%'> </div></td> </tr>");
    $("#comparisonNo").append("<tr> <td class='swapValue'>" + comparisonNo + "</td><td> <div class='barItem' style='width: " + Math.round(comparisonNo / size * 100) + "%'> </div></td> </tr>");
}

function mergeSort(arr) {
    if (arr.length < 2)
        return arr;

    var middle = parseInt(arr.length / 2);
    var left = arr.slice(0, middle);
    var right = arr.slice(middle, arr.length);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    var result = [];

    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length)
        result.push(left.shift());

    while (right.length)
        result.push(right.shift());

    return result;
}
function reverseBubbleSort(list) {
    var endIndex = 0,
        len = list.length - 1;

    for (var i = 0; i < len; i++) {

        for (var j = 0, swapping, endIndex = len - i; j < endIndex; j++) {

            if (list[j] < list[j + 1]) {
                swapping = list[j];

                list[j] = list[j + 1];
                list[j + 1] = swapping;
            }
        }
    }
    return list;
}
function bubbleSort(list) {
    var endIndex = 0,
        len = list.length - 1;

    for (var i = 0; i < len; i++) {

        for (var j = 0, swapping, endIndex = len - i; j < endIndex; j++) {

            if (list[j] > list[j + 1]) {
                swapping = list[j];
                list[j] = list[j + 1];

                list[j + 1] = swapping;
            }
        }
    }
    return list;
}
function nearlyBubbleSort(list) {
    bubbleSort(list);
    //swap 20% of element
    var iteration = Math.round(list.length / 10);
    for (var i = 0; i < iteration; i++) {
        var randomIndex = Math.floor(Math.random() * (list.length));
        var randomIndex2 = Math.floor(Math.random() * (list.length));
        var temp = a [randomIndex];
        a[randomIndex] = a[randomIndex2];
        a[randomIndex2] = temp;
    }

    return list;
}


code["merge sort"] = [
    '@s0:MergeSort(low, high)@ {',
    ' @s1:if (high-low <= 1)@ @s2:return@;',
    ' @s3:split = (low+high) / 2@;',
    ' @s4:MergeSort(low, split)@;',
    ' @s5:MergeSort(split, high)@;',
    ' @s6:copy a[low ... split-1] to scratch array@;',
    ' @s7:m1 = 0@;',
    ' @s8:m2 = split@;',
    ' @s9:i = low@;',
    ' @s10:while (i &lt; m2 &amp;&amp; m2 &lt; high)@',
    '  @s11:if (scratch[m1] &lt;= a[m2])@',
    '   @s12:a[i++]=scratch[m1++]@;',
    '  else',
    '   @s13:a[i++]=a[m2++]@;',
    ' @s14:while (i &lt; m2)@',
    '  @s15:a[i++]=scratch[m1++]@;',
    '}',
    "/*  FINISHED */"];
commands["merge sort"] = [
    'low = 0 ; high = size-1; scratch = [high];console.log( low + " " +  high);console.log(scratch);',
    'if (high-low > 1) step++;',
    'popAll(); if (recDepth < 0) step = -1;',
    'split = Math.floor((low+high) / 2);',
    'pushAll(); SortData = new MergeData(low, split);',
    'pushAll(); SortData = new MergeData(split, high); console.log("aaaaa" + step)',
    'for (var j=low; j<split; j++) {scratch[j-low] = a[j];} scratchFlag = true;',
    'm1 = 0;',
    'm2 = split;',
    'i = low;',
    'if (i>=m2 || m2>=high) step = 14;',
    'if (scratch[m1]>a[m2]) step++;',
    'a[i++]=scratch[m1++];step = 10;',
    'a[i++]=a[m2++];step = 10;',
    'if (i>=m2) { popAll(); if (recDepth < 0) step = -1;}',
    'a[i++]=scratch[m1++];step = 14;'];

function MergeData(a, b) {
    this.i = this.split = this.m1 = this.m2 = undefined;
    this.scratch = [b - a];
    this.scratchFlag = false;
//    this.size = size;
    this.step = 0;
    this.low = a;
    this.high = b;
}

MergeData.prototype.toString = function () {
    return 'MergeSort(' + this.low + ',' + this.high + ');';
}
