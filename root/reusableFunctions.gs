var constants = {
  docId: worksheetID(),
  sheet1: 'Daily Report',
  sheet2: 'Accounts',
  sheet3: 'User Update'
}

var accountsArray = [
	[
      'id', //a1
      'company_name', //'Sprinklr' will this value ever be different?
      'user_name', //c1 do you want preferred name to override employee name?
      'user_login', //d1
      'user_title', //f1
      'user_department', //g1
      'manager_login', //i1
      'location', //j1
      'hire_date' //k1 does this need specific date format
    ]
];

var userUpdateArray = [
	[
      'first name', // c1 slice
      'last name', // c1 slice
      'email', // e1
      'reportsTo', // g1
      'department', // h1 or i1... name or email??
      'region', // j1
      'status' //'invited' will this value ever be different?
     ]
]

function clearSheet(sheetName){
  var docID = SpreadsheetApp.openById(constants.docId);
  docID.getSheetByName(sheetName).clear();
}

function greaterValue(a,b){
  return (a > b)? a:b;
}

function preferredName(fullName, preferredName){
  this.fullName = fullName.split(" ");
  this.firstName = this.fullName[0];
  this.lastName = this.fullName[1];

  if(preferredName.length > 0) {
    this.preferredName = preferredName.split(" ");
    this.firstName = this.preferredName[0];

    if (this.preferredName[1] != null){
      this.lastName = this.preferredName[1];
    }
  }
  this.fullName = this.firstName + ' ' + this.lastName;
}
