var person, fullName, firstName, lastName, hireDate, rehireDate, adjustedServiceDate;

function worksheetID() {
  return SpreadsheetApp.getActiveSpreadsheet().getId()
}

function clearSheets(){
  clearSheet(constants.sheet1);
  clearSheet(constants.sheet2);
  clearSheet(constants.sheet3);
}

function updateReports(){
  var docID = SpreadsheetApp.openById(constants.docId);
  var sheet = docID.getSheetByName(constants.sheet1);
  var startingRow = 2; //for row 2
  var firstRow = 1; //for row 1
  var firstCol = 1; //for col A
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn() + 1;
  var values = sheet.getRange(startingRow,firstCol, lastRow-1, lastCol).getValues();

  accountsReport(values);
  userUpdateReport(values);
}

function accountsReport(dailyReport){
  var docID = SpreadsheetApp.openById(constants.docId);
  var sheet = docID.getSheetByName(constants.sheet1);
  var startingRow = 2; //for row 2
  var firstRow = 1; //for row 1
  var firstCol = 1; //for col A
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn() + 1;
  var values = sheet.getRange(startingRow,firstCol, lastRow-1, lastCol).getValues();
  clearSheet(constants.sheet2);

  //for-in loop used to search each row  in Daily Reports
  for (x in dailyReport) {

      //////////////////////////////////
     ///////  Preferred Name    ///////
    //////////////////////////////////
    person = new preferredName(dailyReport[x][2], dailyReport[x][3]);

      /////////////////////////////////
     ///////  Compare Dates    ///////
    /////////////////////////////////
    hireDate = dailyReport[x][10];
    rehireDate = dailyReport[x][11];
    adjustedServiceDate = dailyReport[x][12];

    if (rehireDate != null) {
      var hireDate = greaterValue(hireDate, rehireDate);
    }

    if (adjustedServiceDate != null) {
      var hireDate = greaterValue(hireDate, adjustedServiceDate);
    }

      ////////////////////////////////
     ///////  Build Array    ////////
    ////////////////////////////////
    accountsArray.push(
      [
        dailyReport[x][0],  //id
        'Sprinklr',         //company_name
        person.fullName,    //users preferred full name
        dailyReport[x][4],  //user_login
        dailyReport[x][5],  //user_title
        dailyReport[x][6],  //user_department
        dailyReport[x][8],  //manager_login
        dailyReport[x][9],  //location
        //dailyReport[x][10]
        hireDate            //most current date
       ]
    );
  }

 //paste array values in new sheet
 docID.getSheetByName(constants.sheet2).getRange(firstRow, firstCol, accountsArray.length, accountsArray[0].length).setValues(accountsArray);
}

function userUpdateReport(dailyReport){
  var docID = SpreadsheetApp.openById(constants.docId);
  var sheet = docID.getSheetByName(constants.sheet1);
  var startingRow = 2; //for row 2
  var firstRow = 1; //for row 1
  var firstCol = 1; //for col A
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn() + 1;
  var values = sheet.getRange(startingRow,firstCol, lastRow-1, lastCol).getValues();

  clearSheet(constants.sheet3);

  for (x in dailyReport) {
    person = new preferredName(dailyReport[x][2], dailyReport[x][3]);

    userUpdateArray.push(
      [
        person.firstName,   //users preferred first name
        person.lastName,    //users preferred last name
        dailyReport[x][4],  //email
        dailyReport[x][8],  //reports to
        dailyReport[x][6],  //department
        dailyReport[x][9],  //region
        'invited'           //status
       ]
    );
  }

 docID.getSheetByName(constants.sheet3).getRange(firstRow, firstCol, userUpdateArray.length, userUpdateArray[0].length).setValues(userUpdateArray);
}
