class ApiFeatures {

  // 'query' would be 'Product.find()' and 'queryStr' would be 'req.query' OR '..?keyword=xyz' part of the the url
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // for the 'search' feature in the app 
  search() {
    const keyword = this.queryStr.keyword   // 'this.queryStr.keyword' gives us 'xyz' from '..?keyword=xyz' url
      ? {
          name: {
            // '$regex' basically lets us search all possible products that INCLUDE the search term in its name
            // for ex - if we search for 'bat' it'll also give us 'baton'  
            $regex: this.queryStr.keyword,    // '$regex' (regular expression) is a mongodb operator
            $options: "i",            // '$options' again a mongodb operator where 'i' means case-insensitive
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  // for the 'filter' feature in the app
  filter() {

    // we make a copy ('queryCopy') of the 'queryStr' so that we can keep/use the original 
    const queryCopy = { ...this.queryStr };
    
    // Removing some fields (keyword/page/limit) from 'queryCopy' object
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]);


    // Filter For Price and Rating
    // We need to use 'gt'/'lt' (greater than/less than) for a price range filter but MongoDb reuires us to use '$' before these operators (gt/gte/lt/lte)
    // So in order to add that '$' we first convert our 'queryCopy' to string
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);  // We basically replace all possible operators with a '$' sign appended before the key 

    this.query = this.query.find(JSON.parse(queryStr));   // 'this.query' is basically 'Product.find()'. We also convert the string back to JSON format

    return this;
  }
}

module.exports = ApiFeatures;