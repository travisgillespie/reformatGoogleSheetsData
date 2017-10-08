function onOpen(e){
  SpreadsheetApp.getUi()
  .createMenu('Reporting')
  .addItem("Clear Sheets", 'clearSheets')
  .addItem("Update Reports", 'updateReports')
  .addToUi();
}
