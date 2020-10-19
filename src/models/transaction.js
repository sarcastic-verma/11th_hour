export default class Transaction {
    constructor(date, status, transactionId, id, courseIds, amount) {
        this.date = date;
        this.status = status;
        this.transactionId = transactionId;
        this.id = id;
        this.courseIds = courseIds;
        this.amount = amount;
    }
}