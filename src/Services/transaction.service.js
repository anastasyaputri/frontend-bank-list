import http from "../http-common";

class TransactionService {
    getTransactionList() {
        return http.get("/fakebank/accounts");
    }
}

export default new TransactionService();