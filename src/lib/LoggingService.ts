import {Constants} from "./Constants";

export class LoggingService {
    static LOG_SHEET = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(Constants.SHEET_LOGS);
    static TZ = SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone();

    public static logSheet(message: string) {
        var d = Utilities.formatDate(new Date(), LoggingService.TZ, 'yyyy-MM-dd HH:mm:ss');
        var row = [d, "google.script", message];
        LoggingService.LOG_SHEET.appendRow(row);
    }

    public static logUi(message: string): void {
        SpreadsheetApp.getActive().toast(message);
    }
}