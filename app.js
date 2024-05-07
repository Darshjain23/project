import express from 'express'
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import cookieParser from 'cookie-parser';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import bodyParser from 'body-parser';
import { setmail, sendmail } from './mail.js';
import { insertdata, setDB, checkEmail } from './database.js';
import { Console } from 'console';
import { getProductDetails, insertProduct, getAllProductDetails, getAllProductId, getAllProductDetailsByCategory } from './product.js';
import { getOrderDetails } from './order.js';
// import { getUserDetails } from './user.js';
import { getAllOrderDetails } from './order.js';
import { insertCart, getAllCartDetails, totalCartPrice, clearAllCart } from './cart.js';
import { setUserAndSessionId, getUserAndSessionId, deleteUserSession, cookieExist } from './session.js';



const app = express()
const saltRounds = 10;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname + '\\public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())


var trans = setmail()

var client = setDB()


app.get('/', function (req, res) {
  res.render('index.ejs')
})

app.get('/login', async function (req, res) {
  if (await cookieExist(req.cookies.Trendify)) {
    res.redirect('/logout')
  }
  else {
    res.render('login.ejs', {
      'status': ''
    })
  }
})

app.get('/footer', function (req, res) {
  res.render('template\\footer.ejs')
})


app.get('/men', function (req, res) {
  res.render('men.ejs')
})

app.get('/women', function (req, res) {
  res.render('women.ejs')
})

app.get('/kids', function (req, res) {
  res.render('kids.ejs')
})

app.get('/logout', function (req, res) {
  res.render('logout.ejs')
})

app.post('/logout', async function (req, res) {

  await deleteUserSession(req.cookies.Trendify)
  // console.log(req.cookies.Trendify)
  // res.clearCookie(req.cookies.Trendify)
  res.redirect('/login')
  // res.end()
})



app.get('/list', async function (req, res) {
  var product = await getAllProductDetailsByCategory(client, req.query.category_id)
  // console.log(product)
  res.render('list.ejs', {
    'product': product
  })
})

app.get('/product', async function (req, res) {
  var idExist = false
  var allProductId = await getAllProductId(client)
  allProductId.forEach(function (id, index) {
    // console.log(id.id)
    if (id.id == req.query.id)
      idExist = true
  });
  // console.log(idExist)
  if (idExist) {
    var product = await getProductDetails(client, req.query.id)

    //  console.log(product)
    res.render('product.ejs', product)
  }
  else {
    res.redirect('/list')
  }

})


app.post('/product', async function (req, res) {
  var userDetail = await getUserAndSessionId(req.cookies.Trendify)
  insertCart(client, userDetail.id, req.query.id, req.body.size, req.body.qty)
  res.redirect('cart')
})

app.get('/cart', async function (req, res) {

  if (await cookieExist(req.cookies.Trendify)) {

    // Get users detail from cookies
    var userDetail = await getUserAndSessionId(req.cookies.Trendify)
    console.log(userDetail)



    var cartDetail = await getAllCartDetails(client, userDetail.id)
    var product = await getAllProductDetails(client)
    var total = await totalCartPrice(client, userDetail.id)
    // console.log(total)
    res.render('cart.ejs', {
      'cartDetail': cartDetail,
      'product': product,
      'total': total[0].sum
    })
  }
  else {
    res.redirect('/login')
  }
})

app.post('/clearcart', async function (req, res) {
  await clearAllCart(client)
  res.redirect('cart')
})



app.get('/admin', function (req, res) {
  res.render('admin.ejs')
})

app.post('/admin', function (req, res) {
  var userdatalist = Object.values(req.body)
  // console.log(userdatalist)
  insertProduct(client, userdatalist)
  res.render('admin.ejs')
})


app.get('/order', async function (req, res) {
  var userDetail = await getUserAndSessionId(req.cookies.Trendify)
  var order = await getAllOrderDetails(client, userDetail.id)
  // console.log(order)
  var product = await getAllProductDetails(client)
  res.render('order.ejs', {
    'order': order,
    'product': product
  })

})



app.get('/register', async function (req, res) {
  if (await cookieExist(req.cookies.Trendify)) {
    res.redirect('/logout')
  }
  else {
    res.render('register.ejs', {
      'status': ''
    })
  }
})

app.post('/register', async function (req, res) {

  var data = await checkEmail(req.body.email, client)
  if (data.rowCount > 0) {
    console.log("User already exist please login")
    res.render('register.ejs', {
      'status': 'user already exist'
    });
  }
  else {
    bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
      if (hash) {
        insertdata(req.body.fname, req.body.email, hash, client)
      } else {
        Console.log(err)
      }
    });

    sendmail(req.body.email, req.body.fname, trans);

    res.render('thanks.ejs', {
      'name': req.body.fname
    });
  }

})


app.post('/login', async function (req, res) {


  var data = await checkEmail(req.body.email, client)

  if (data.rowCount > 0) {

    bcrypt.compare(req.body.password, data.rows[0].pass, async function (err, result) {
      if (result) {
        console.log("User login successfully")
        var sessionId = uuidv4();
        await setUserAndSessionId(sessionId, data.rows[0])
        // console.log(sessionId)
        res.cookie('Trendify', sessionId)
        // res.render('index.ejs', {
        //   'name': req.body.fname
        // });
        res.redirect('/')
      }
      else {
        console.log("Incorrect password")
        res.render('login.ejs', {
          'status': 'Incorrect password'
        })
      }
    });
  }
  else {
    console.log("No user")
    res.render('login.ejs', {
      'status': 'No user'
    })
  }
})





app.listen(3000, function (req, res) {
  console.log("server started")
})