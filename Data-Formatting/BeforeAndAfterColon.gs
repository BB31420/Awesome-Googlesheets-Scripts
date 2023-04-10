/*
Modification examples:
To search for colons in column C, change var range = sheet.getRange("D:D"); to var range = sheet.getRange("C:C");.
To make the text after the colon italic instead of small, change .setFontSize(8) to .setItalic(true) in the formattedText variable.
To search for semicolons instead of colons, change value.indexOf(':') to value.indexOf(';').
To limit the search range to a specific range of rows and columns, modify the argument passed to getValues(). For example, to search for colons only in rows 1-10 and columns A-D, change sheet.getDataRange().getValues() to sheet.getRange("A1:D10").getValues().
*/

// This function formats the text in column D of a Google Sheets document to bold the text before a colon.
function boldBeforeColon() {
  // Get the active sheet of the Google Sheets document.
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  // Get the range of column D in the sheet.
  var range = sheet.getRange("D:D");
  // Get all the values in column D.
  var values = range.getValues();

  // Loop through each row in column D.
  for (var i = 0; i < values.length; i++) {
    // Get the value of the cell in the current row of column D.
    var value = values[i][0];
    // Check if the value is a string.
    if (typeof value === 'string') {
      // Find the index of the first colon in the string.
      var colonIndex = value.indexOf(':');
      // Check if a colon was found in the string.
      if (colonIndex >= 0) {
        // Get the bold text before the colon.
        var boldText = value.slice(0, colonIndex);
        // Create a new rich text value with the formatted text.
        var formattedText = SpreadsheetApp.newRichTextValue()
            .setText(value)
            .setTextStyle(0, colonIndex, SpreadsheetApp.newTextStyle().setBold(true).build())
            .build();
        // Set the cell value in column A to the formatted text.
        range.getCell(i+1, 1).setRichTextValue(formattedText);
      }
    }
  }
}


// This function formats the text in a Google Sheets document to bold the text before a colon and set the text after the colon to a smaller font size.
function boldBeforeColonSmallFontAfter() {
  // Get the active sheet of the Google Sheets document.
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  // Get the index of the last column with data in the sheet.
  var lastColumn = sheet.getLastColumn();
  // Get all the values in the sheet.
  var values = sheet.getDataRange().getValues();

  // Loop through each column in the sheet.
  for (var i = 0; i < lastColumn; i++) {
    // Loop through each row in the sheet.
    for (var j = 0; j < values.length; j++) {
      // Get the value of the cell in the current row and column.
      var value = values[j][i];
      // Check if the value is a string.
      if (typeof value === 'string') {
        // Find the index of the first colon in the string.
        var colonIndex = value.indexOf(':');
        // Check if a colon was found in the string.
        if (colonIndex >= 0) {
          // Get the bold text before the colon and the normal text after the colon.
          var boldText = value.slice(0, colonIndex);
          var normalText = value.slice(colonIndex + 1);
          // Create a new rich text value with the formatted text.
          var formattedText = SpreadsheetApp.newRichTextValue()
              .setText(value)
              .setTextStyle(0, colonIndex, SpreadsheetApp.newTextStyle().setBold(true).build())
              .setTextStyle(colonIndex + 1, value.length, SpreadsheetApp.newTextStyle().setFontSize(8).build())
              .build();
          // Set the cell value to the formatted text.
          sheet.getRange(j+1, i+1).setRichTextValue(formattedText);
        }
      }
    }
  }
}
