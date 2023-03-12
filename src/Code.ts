import Sheet = GoogleAppsScript.Spreadsheet.Sheet;
import {InitService} from "./_InitService";

/**
 * Install dynamic functions
 */

InitService.instance.onInit(this, true, false);

function onOpen() {
    InitService.instance.onOpen();
}

/*function onEdit() {
    InitService.instance.onEdit();
}*/

function sayHello(name: string): string {
    const currentSheet: Sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    return `Hello ${name}, you are in sheet ${currentSheet.getName()}`;
}

