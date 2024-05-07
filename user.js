async function getUserDetails(client,id) {
    var query3 = "select * from register1 where id = $1"
    var data1 = await client.query(query3,[id])
    // console.log(data1)
    return(data1.rows[0])
}

export{getUserDetails}