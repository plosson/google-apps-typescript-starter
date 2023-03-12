import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

function sayHello(name: string): string {
    const currentSheet: Sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    return `Hello ${name}, you are in sheet ${currentSheet.getName()}`;
}