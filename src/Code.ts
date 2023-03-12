import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

installFunctions();

function onOpen() {
    var menu = SpreadsheetApp.getUi().createMenu("⚙️ Starter");
    menu.addItem("Current Time", "menu_currentTime");

    SpreadsheetApp.getActiveSpreadsheet().getSheets().forEach(s => {
        menu.addItem(`Go To Sheet ${s.getName()}`, "goToSheet_" + s.getSheetId());
    });

    menu.addToUi();
}

function menu_currentTime() {
    SpreadsheetApp.getActive().toast("Time is " + new Date());
}

function sayHello(name: string): string {
    const currentSheet: Sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    return `Hello ${name}, you are in sheet ${currentSheet.getName()}`;
}

function installFunctions() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    ss.getSheets().forEach(s => {
        const id = s.getSheetId();
        this[`goToSheet_${id}`] = () => ss.getSheetByName(s.getName()).activate();
    })
}
