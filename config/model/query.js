const query = {}

query.getAllAccount = () => {
    let sql = `select * from test.account`
    return sql
}

query.createAccount = (payload) => {
    let data = {
        nama : payload['nama'],
        amount : payload['amount']
    }
    
    let sql = `insert into test.account(name, amount) 
               values (${data['nama']}, ${data['amount']})`
    
    return sql
}


module.exports = query