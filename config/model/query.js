const query = {}

query.getAllAccount = () => {
    let sql = `select * from test.account`
    return sql
}

query.createAccount = (payload) => {
    let data = {
        name : payload['name'],
        amount : payload['amount']
    }

    console.log('data query',data);
    
    let sql = `insert into test.account(name, amount) 
               values ('${data['name']}', ${data['amount']})`
    
    return sql
}



module.exports = query