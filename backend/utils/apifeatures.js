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
}

module.exports = ApiFeatures;