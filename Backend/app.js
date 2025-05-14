const express=require("express");
const mongoose=require("mongoose");
const cors=require('cors')
const app=new express();
const {verifytoken,isAdmin}=require("./middleware/middleware")
const authroutes=require("./controllers_routes/auth")
const adminOrderRoutes=require("./controllers_routes/admin-order")
const customerRoutes=require("./controllers_routes/customer")
const productRoutes=require("./controllers_routes/product")
const categoryRoutes=require("./controllers_routes/category");
const brandRoutes=require("./controllers_routes/brand");
app.use(express.text()); // Parse text/plain bodies
app.use(cors());
app.use(express.json());
app.use("/auth",authroutes)
app.use("/customer",verifytoken,customerRoutes)
app.use("/admin",verifytoken,adminOrderRoutes)
app.use("/product",verifytoken,isAdmin,productRoutes);
app.use("/category",verifytoken,isAdmin,categoryRoutes);
app.use("/brand",verifytoken,isAdmin,brandRoutes)
async function connection(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce_db");
};


connection().then(()=>{
    {
        console.log("Database Connection Success");
    }
}).catch((error)=>{
    console.log("failed to connect"+error);
});


app.listen(3000,()=>{
   console.log("listening on port 3000");
})
      