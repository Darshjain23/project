
async function getProductDetails(client,id) {
    var query3 = "select * from products where id = $1"
    var data1 = await client.query(query3,[id])
    // console.log(data1)
    return(data1.rows[0])
}


async function getAllProductDetails(client) {
    var query3 = "select * from products ORDER BY id ASC"
    var data1 = await client.query(query3)
    // console.log(data1)
    return(data1.rows)
}

async function getAllProductId(client) {
    var query3 = "select id from products"
    var data1 = await client.query(query3)
    // console.log(data1)
    return(data1.rows)
}


async function insertProduct(client,userdata) {
    var query1 = "insert into products (p_name,price,p_desc,img_1,img_2,img_3,img_4,related_1,related_2,related_3,related_4,category_id) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)"
    var data = await client.query(query1, userdata)
    console.log("Data inserted successfully")
}


async function getAllProductDetailsByCategory(client,category_id) {
    var query3 = "select * from products where category_id = $1"
    var data1 = await client.query(query3,[category_id])
    // console.log(data1)
    return(data1.rows)
}


export{getProductDetails,insertProduct,getAllProductDetails,getAllProductId,getAllProductDetailsByCategory}