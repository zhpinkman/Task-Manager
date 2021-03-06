import {List} from './List'
export class Task {
    _id : string
    title : string
    description : string
    done : boolean
    date : Date
    list : List
    constructor(title : string, description : string, list : List, date : Date = new Date()) {
        this.title = title
        this.description = description
        this.list = list
        this.date = date
        this.done = false
    }
}