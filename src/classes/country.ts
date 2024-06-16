export default class Country {
    id: string;
    name: string;
    additionalData: { [key: string]: any };

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.additionalData = {};
    }

    addData(columnId: string, value: any) {
        this.additionalData[columnId] = value;
    }
}
