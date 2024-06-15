export default class Country {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.additionalData = {};
    }

    addData(columnId, value) {
        this.additionalData[columnId] = value;
    }
}