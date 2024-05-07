async function insertCart(client,user_id,product_id,size,qty) {
    var query1 = "insert into cart (user_id,product_id,size,qty) values ($1,$2,$3,$4)"
    var data = await client.query(query1,[user_id,product_id,size,qty])
    console.log("Data inserted into cart successfully")
}

async function getAllCartDetails(client,user_id) {
    var query3 = "SELECT SUM(qty) as quantity, product_id, size FROM cart where user_id = $1 GROUP BY product_id,size"
    var data1 = await client.query(query3,[user_id])
    return(data1.rows)
}

async function totalCartPrice(client,user_id) {
    var query1 = "Select sum( price*qty) from (SELECT  price, qty, product_id, p_name FROM cart LEFT JOIN products ON cart.product_id = products.id where user_id = $1)"
    var data = await client.query(query1,[user_id])
    return(data.rows)
    // console.log("Data inserted into cart successfully")
}

async function clearAllCart(client){
    var query6 ="delete from cart where id>0"
    var data = await client.query(query6)
}



export{insertCart,getAllCartDetails,totalCartPrice,clearAllCart}