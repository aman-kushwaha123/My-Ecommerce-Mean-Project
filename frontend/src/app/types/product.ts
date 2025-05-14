export interface Product{
    _id?:String;
    name:String;
    shortdescription:String;
    description:String;
    price:Number;
    discount:Number;
    images:Array<String>;
    categoryid:String;
    brandid:String;
    isfeatured:Boolean,
    isNewproduct:Boolean,
}