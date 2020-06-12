export class Note {
    uuid: string;
    title: string;
    message: string;
    isProposed: boolean;

    constructor() {
        this.uuid = '';
        this.title = '';
        this.message = '';
        this.isProposed = false;
    }
}

export class EditNote {
    uuid: string;
    noteUuid: string;
    title: string;
    message: string;

    constructor() {
        this.uuid = '';
        this.noteUuid = '';
        this.title = '';
        this.message = '';
    }
}