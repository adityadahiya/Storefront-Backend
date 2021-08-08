import {Order} from '../../src/models/order';
import { User } from "../../src/models/user";
import request from 'request';
import { Product } from "../../src/models/product";

let token: string;
let orderId: number;
const order: Order = {
    status: 'Active'
  }
describe("Order endpoints tests", () => {
  beforeAll((done) => {
    const user: User = {
        username: 'aditya123',
        firstname: 'Aditya',
        lastname: 'Dahiya',
        password: 'password'
        }

    const postConfig = {
        url:'http://localhost:3000/users',
        body: user,
        json: true
    };

    request.post(postConfig, (err, httpResponse, body)=>{
        token = 'Bearer ' + body.token.replace(/['"]+/g, '');
        done();
    });
  });

  describe("Product CRUD tests", () => {
    beforeAll( (done) => {
        const  postConfig = {    
            url:'http://localhost:3000/orders',
            headers : {
                "Authorization" : token
            },
            body: order,
            json: true
        };
        request.post(postConfig, (err, httpResponse, body)=>{
            orderId = body.id;
            done();
        });
    }); 
    it("should create new order", async () => {
        const  postConfig = {    
            url:'http://localhost:3000/orders',
            headers : {
                "Authorization" : token
            },
            body: order,
            json: true
        };
        request.post(postConfig, (err, httpResponse, body)=> {
            expect(httpResponse.statusCode).toBe(200);
        });
    });
    
    it("should get order info", async () => {
        const getConfig = {
            url:'http://localhost:3000/orders/' + orderId,
            headers : {
                "Authorization" : token
            }
        }
        request.get(
            getConfig,
            (error, response, body) => {
                expect(response.statusCode).toBe(200);
            }
          );
      });
    
      it("should get list of orders", async () => {
        const getConfig = {
            url:'http://localhost:3000/orders',
            headers : {
                "Authorization" : token
            }
        }
        request.get(
            getConfig,
            (error, response, body) => {
                expect(response.statusCode).toBe(200);
            }
          );
      });
    
         
      describe("Tests for order_products table" ,() => {
        let productId: number;
        beforeAll((done) => {
            const product: Product = {
                name: 'Adidas EQT basketball',
                price: 5999,
                category: 'Footwear'
              }
            const  postConfig = {
                url:'http://localhost:3000/products',
                headers : {
                    "Authorization" : token
                },
                body: product,
                json: true
            };

            request.post(postConfig, (err, httpResponse, body)=>{
                productId = body.id;
                done();  
            });
        });
        it("should add product to order", async (done) => {
            const body = {
                productId: productId,
                quantity: 10
            }
            const  postConfig = {
                url:'http://localhost:3000/orders/' + orderId + '/products',
                headers : {
                    "Authorization" : token
                },
                body: body,
                json: true
            };

            request.post(postConfig, (err, httpResponse, body)=>{
                expect(httpResponse.statusCode).toBe(200); 
                done();  
            });
          });
        
          it("should remove product from order", async (done) => {
            const body = {
                productId: productId
            }
            const  postConfig = {
                url:'http://localhost:3000/orders/' + orderId + '/products',
                headers : {
                    "Authorization" : token
                },
                body: body,
                json: true
            };
            request.delete(
                postConfig,
                (error, response, body) => {
                    expect(response.statusCode).toBe(200);
                    done();
                }
              );
          });
          it("should delete order", async () => {
            const getConfig = {
                url:'http://localhost:3000/orders/'+ orderId,
                headers : {
                    "Authorization" : token
                }
            }
            request.delete(
                getConfig,
                (error, response, body) => {
                    expect(response.statusCode).toBe(200);
                }
              );
          });
      });
});

});
