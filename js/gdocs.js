// http://code.google.com/apis/gdata/samples/spreadsheet_sample.html

/**
 * Lists the entries from the specified JSON feed
 * by creating a new 'dl' element in the DOM.
 * Each 'dt' is the title of the row, and each 'dd' 
 * is the content of the row. 
 */

var spreadsheet_id;
var spreadsheet_value = "od6";

function listEntries(json) {
 
  removeOldResults();
  
  var dl = document.createElement('dl');
  dl.setAttribute('id', 'output');
 
  for (var i = 0; i < json.feed.entry.length; i++) {
    
    var entry = json.feed.entry[i];
    
    var dt = document.createElement('dt');
    var title = document.createTextNode(entry.title.$t);
    dt.appendChild(title);
    
    var dd = document.createElement('dd');
    var content = document.createTextNode(entry.content.$t);
    dd.appendChild(content);
  
    dl.appendChild(dt);
    dl.appendChild(dd);
  }
 
  document.getElementById('data').appendChild(dl);
 
  // Re-enable the ok button.
  var ok_button = document.getElementById('ok_button');
  ok_button.removeAttribute('disabled');
}
 
/**
 * Lists the entries from the specified JSON feed
 * by inserting the cells into a new 'table' 
 * element in the DOM.  Each 'tr' represents a 
 * row in the spreadsheet, and each 'td' is a cell
 * within that row.
 */
function cellEntries(json) {
 
  removeOldResults();
 
  var table = document.createElement('table');
  table.setAttribute('id', 'output');
  var tbody = document.createElement('tbody');
  
  var tr;
  
  for (var i=0; i < json.feed.entry.length; i++) {
 
    var entry = json.feed.entry[i];
    if (entry.gs$cell.col == '1') {
      if (tr != null) {
        tbody.appendChild(tr);
      }
 
      tr = document.createElement('tr');
      if(i==0){
          tr.className = 'bold';
      }
    }
    
    if (entry.gs$cell.col == '2') {
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(entry.content.$t));
        tr.appendChild(td);
    }

    if (entry.gs$cell.col == '3') {
        var td = document.createElement('td');
        var text = entry.content.$t;
        if (text.search('http')==0) {
            var a = document.createElement('a');
            a.href = text;
            a.appendChild(document.createTextNode(text));
            td.appendChild(a);
        } else {
            td.appendChild(document.createTextNode(text));
        }
        tr.appendChild(td);
    }
  } 
 
  tbody.appendChild(tr);
  table.appendChild(tbody);
  document.getElementById('data').appendChild(table);
 
}
 
/**
 * Called when the user clicks the 'OK' button to
 * retrieve a spreadsheet's JSON feed.  Creates a new 
 * script element in the DOM whose source is the JSON feed, 
 * and specifies that the callback function is 
 * 'listEntries' for a list feed and 'cellEntries' for a
 * cells feed (above).
 */
function displayResults() {
  var query = document.getElementById('spreadsheet_form');
  removeOldJSONScriptNodes();
  removeOldResults();
 
  // Show a "Loading..." indicator.
  var div = document.getElementById('data');
  var p = document.createElement('p');
  p.appendChild(document.createTextNode('Loading...'));
  div.appendChild(p);
  
  // Retrieve the JSON feed.
  var script = document.createElement('script');
 
  script.setAttribute('src', 'http://spreadsheets.google.com/feeds/'
                       + 'cells'
                       + '/' + spreadsheet_id
                       + '/' + spreadsheet_value + '/public/values' +
                      '?alt=json-in-script&callback=cellEntries');
  
  script.setAttribute('id', 'jsonScript');
  script.setAttribute('type', 'text/javascript');
  document.documentElement.firstChild.appendChild(script);;
}
 
/**
 * Removes the script element from the previous result.
 */
function removeOldJSONScriptNodes() {
  var jsonScript = document.getElementById('jsonScript');
  if (jsonScript) {
    jsonScript.parentNode.removeChild(jsonScript);
  }
}
 
/**
 * Removes the output generated from the previous result.
 */
function removeOldResults() {
  var div = document.getElementById('data');
  if (div.firstChild) {
    div.removeChild(div.firstChild);
  }
}
