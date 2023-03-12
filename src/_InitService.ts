import {LoggingService} from "./lib/LoggingService";

interface MenuItem {
    id: string,
    title: string,
    callback: () => void
}

const menus = [{
    id: "current_time",
    title: "Current Time", callback: () => {
        LoggingService.logUi("Time is " + new Date());
        LoggingService.logSheet("Time is " + new Date());
    }
}];

function Menu(id: string, title: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(target);
        InitService.instance.registerMenu(id, title, () => {
            descriptor.value();
        });
    };
}

/**
 * This class will be placed first by clasp. This won't be able to use any other service directly except in call backs
 * or onEdit/onOpen (once all has been loaded)
 */
export class InitService {

    private static _instance: InitService;
    private _items: MenuItem[] = [];

    private constructor() {
        this.defineMenus();
    }

    get items(): MenuItem[] {
        return this._items;
    }

    /**
     * install dynamic functions. This call should be placed on top of the main script
     * @param t a reference to this in the main script
     */
    public onInit(t: any) {
        const ss = SpreadsheetApp.getActiveSpreadsheet();
        ss.getSheets().forEach(s => {
            const id = s.getSheetId();
            this[`goToSheet_${id}`] = () => ss.getSheetByName(s.getName()).activate();
        })
        this.items.forEach(i => {
            console.log(`Adding menu item ${i.id}`);
            t[`menu_${i.id}`] = () => i.callback();
        });
    }

    registerMenu(id: string, title: string, callback: () => void) {
        this._items.push({id, title, callback});
    }


    @Menu('test', "This is a test")
    public currentTimeMenu() {
        LoggingService.logUi('This is a test');
    }

    /**
     * onEdit trigger
     */
    public onEdit() {

    }

    /**
     * onOpen trigger
     */
    public onOpen() {
        var menu = SpreadsheetApp.getUi().createMenu("⚙️ Starter");

        this.items.forEach(i => {
            menu.addItem(i.title, `menu_${i.id}`);
        });

        /*SpreadsheetApp.getActiveSpreadsheet().getSheets().forEach(s => {
            menu.addItem(`Go To Sheet ${s.getName()}`, "goToSheet_" + s.getSheetId());
        });*/

        menu.addToUi();
    }

    public static get instance(): InitService {
        if (!this._instance) {
            this._instance = new InitService();
        }
        return this._instance;
    }

    private defineMenus() {
        this._items = this._items.concat(menus);
        const ss = SpreadsheetApp.getActiveSpreadsheet();
        ss.getSheets().forEach(s => {
            const id = s.getSheetId();
            this._items.push({
                id: `goToSheet_${id}`,
                title: `Go To Sheet ${s.getName()}`,
                callback: () => ss.getSheetByName(s.getName()).activate()
            });
        })
    }
}