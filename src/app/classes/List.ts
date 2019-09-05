export class List{
    id : string
    title : string
    date : Date
    isMain : boolean
    constructor(title : string, date : Date = new Date()){
        this.title = title
        this.date = date
    }
}