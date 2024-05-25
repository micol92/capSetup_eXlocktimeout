const cds = require('@sap/cds')
const { setMaxIdleHTTPParsers } = require('http')
const { Books } = cds.entities ('sap.capire.bookshop')

class CatalogService extends cds.ApplicationService { init(){


  // Get the CSN definition for Reviews from the db schema for sub-sequent queries
  // ( Note: we explicitly specify the namespace to support embedded reuse )
  const { Books } = this.entities ('sap.capire.bookshop')


  // Reduce stock of ordered books if available stock suffices
  this.on ('submitOrder', async req => {
    console.log("hey submitOrder!");

    const {book,quantity} = req.data
    try {
      let {stock} = await SELECT `stock` .from (Books,book).forUpdate()
      if (stock >= quantity) {

        await UPDATE (Books,book) .with (`stock -=`, quantity)

      return { stock }
      }
      else return req.error (409,`${quantity} exceeds stock for book #${book}`)
        
    } catch (e) {
      console.log("failed to acquire lock, likely because of timeout");
      return req.error (409,`failed to acquire lock for book #201`)

    }
    console.log("submitOrder done!");


  })

  this.on ('UPDATE', 'Books', async req => {
    console.log("hey Update!");

    var quantity = 1;
    var book = 201;

    try {
      let {stock} = await SELECT `stock` .from (Books,book).forUpdate()
      if (stock >= quantity) {

        await UPDATE (Books,book) .with (`stock -=`, quantity)

        return { stock }
      }
      else return req.error (409,`${quantity} exceeds stock for book #${book}`)
        
    } catch (e) {
       console.log("failed to acquire lock, likely because of timeout");
       return req.error (409,`failed to acquire lock for book #201`);

    }
  })

  const sleep = (ms) => {
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
  }

  // Add some discount for overstocked books
  this.after ('READ','ListOfBooks', each => {
    if (each.stock > 111) each.title += ` -- 11% discount!`
  })

  return super.init()
}}

module.exports = { CatalogService }
