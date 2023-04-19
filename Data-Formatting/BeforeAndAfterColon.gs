/*
This function formats the text in a Google Sheets document to bold the text before a colon and
set the text after the colon to a smaller font size. The function loops through each column in
the sheet and each row in the column. For each cell with a string value containing a colon, it
creates a new rich text value with the formatted text, and sets the cell value to the formatted
text. The function can be modified to use a different character as the separator or to adjust the
formatting of the bold and smaller font text.
*/


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
        var colonIndex = value.indexOf('-');
        // Check if a colon was found in the string.
        if (colonIndex >= 0) {
          // Get the bold text before the colon and the normal text after the colon.
          var boldText = value.slice(0, colonIndex);
          var normalText = value.slice(colonIndex + 1);
          // Create a new rich text value with the formatted text.
          var formattedText = SpreadsheetApp.newRichTextValue()
              .setText(value)
              .setTextStyle(0, colonIndex, SpreadsheetApp.newTextStyle().setBold(true).build())
              .setTextStyle(colonIndex + 1, value.length, SpreadsheetApp.newTextStyle().setItalic(true).build())
              .build();
          // Set the cell value to the formatted text.
          sheet.getRange(j+1, i+1).setRichTextValue(formattedText);
        }
      }
    }
  }
}
