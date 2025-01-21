const port = 4000;
const express = require("express")
const app = express();
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const cors = require('cors');
const mongoSanitize=require('express-mongo-sanitize')
const cloudinary = require("cloudinary").v2;
const { Readable } = require("stream");
const methodOverride = require('method-override'); 
const bcrypt = require('bcrypt'); 
require("dotenv").config();
const dburl=process.env.DB_URL
const saltRounds = parseInt(process.env.SALT,10)
  
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true })); 
app.use(methodOverride('_method')); 
// app.use(express.static(path.join(__dirname, 'public')));
app.use(mongoSanitize({
  replaceWith: '_'
}))

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});


mongoose.connect(dburl)
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.get("/",(req,res)=>{
    res.send("Express App is running")
})



const upload = multer();

app.use('/images',express.static('upload/images'))

app.post("/upload", upload.single("product"), (req, res) => {
  try {
    const stream = cloudinary.uploader.upload_stream(
        { folder: "images" }, // Cloudinary folder
        (error, result) => {
            if (error) {
                return res.status(500).json({ success: 0, error: error.message });
            }
            res.json({ success: 1, image_url: result.secure_url });
        }
    );

    Readable.from(req.file.buffer).pipe(stream);
} catch (error) {
    res.status(500).json({ success: 0, error: error.message });
}
});
const Product = mongoose.model("Product", {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    new_price: {
      type: Number,
      required: true,
    },
    old_price: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    available: {
      type: Boolean,
      default: true,
    },
});
app.post("/addproduct", async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
      let last_product_array = products.slice(-1);
      let last_product = last_product_array[0];
      id = last_product.id + 1;
    } else {
      id = 1;
    }
  
    const product = new Product({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved product");
    res.json({
      success: true,
      name: req.body.name,
    });
});

app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name,
    })
})

app.get("/allproducts", async (req, res) => {
    let products = await Product.find({});
    console.log("got");
    res.send(products);
});


const User = mongoose.model('User',{
  name:{
    type:String,
  },
  email:{
    type:String,
    unique:true,
  },
  password:{
    type:String,
  },
  cartData:{
    type:Object,
  },
  date:{
    type:Date,
    default:Date.now,
  },
})

app.post("/signup", async (req, res) => {
  let check = await User.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({success: false,errors: "Existing user found with same email address",});
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  const user = new User({
    name: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    cartData: cart,
  });
  await user.save();

  const data = {
    user: {
      is: user.id,
    },
  };
  const token = jwt.sign(data, "secret_ecom");
  res.json({
    success: true,
    token,
  });
});

app.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    const passMatch = await bcrypt.compare(req.body.password, user.password);;
    if (passMatch) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({
        success: true,
        token,
      });
    } else {
      res.json({
        success: false,
        errors: "Incorrect password",
      });
    }
  } else {
    res.json({
      success: false,
      errors: "Incorrect email address",
    });
  }
});

app.get('/newcollections',async(req,res)=>{
  let product=await Product.find({});
  let newcollection = product.slice(1).slice(-8);
  console.log("Newcollection Fetched")
  res.send(newcollection)
})

app.get('/popularproducts',async(req,res)=>{
  let products = await Product.find({category:"men"});
  let popularproducts=products.slice(0,4);
  console.log("popular products Fetcher");
  res.send(popularproducts);
})

const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ errors: "Please authenticate using a valid login" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      return res
        .status(401)
        .send({ errors: "Please authenticate using a valid token" });
    }
  }
};

app.post("/addtocart", fetchUser, async (req, res) => {
  // console.log(req.body, req.user);
  // res.status(200).json({ message: "Item added to cart successfully" });
  // console.log("Added", req.body.itemId);
  let userData = await User.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData }
  );
  res.send('Added');
});

app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("Removed", req.body.itemId);
let userData = await User.findOne({ _id: req.user.id });
if (userData.cartData[req.body.itemId] > 0)
  userData.cartData[req.body.itemId] -= 1;
await User.findOneAndUpdate( { _id: req.user.id },{ cartData: userData.cartData }
);
res.send('Removed');
});

app.post('/getcart', fetchUser, async(req, res) => {
  console.log('get cart data');
  let userData = await User.findOne({_id:req.user.id});
  res.json(userData.cartData)
})

app.listen(port,(error)=>{
    if(!error){
        console.log("Server is running on port" + port);
    }
    else{
        console.log("Error:"+error);
    }
})