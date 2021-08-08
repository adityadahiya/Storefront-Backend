import {Product} from '../../src/models/product';
import request from 'request';
import { User } from "../../src/models/user";

let token: string;
let productId: number;
const product: Product = {
    name: 'Adidas Neo',
    price: 3999,
    category: 'Footwear'
  }

describe("Product endpoint tests", () => {
  beforeAll( (done) => {
    const user: User = {
        username: 'aditya123',
        firstname: 'Aditya',
        lastname: 'Dahiya',
        password: 'password'
        }

    const  postConfig = {
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
    it("should create new product", async () => {
        const  postConfig = {
            url:'http://localhost:3000/products',
            headers : {
                "Authorization" : token
            },
            body: product,
            json: true
        };

        request.post(postConfig, (err, httpResponse, body)=>{
            expect(httpResponse.statusCode).toBe(200);
        });
      });
      
      it("should get product info", async () => {
        request.get(
            'http://localhost:3000/products/' + productId,
            (error, response, body) => {
                expect(response.statusCode).toBe(200);
            }
          );
      });
    
      it("should get list of products", async () => {
        request.get(
            'http://localhost:3000/products',
            (error, response, body) => {
                expect(response.statusCode).toBe(200);
            }
          );
      });
    
      it("should delete product", async () => {
        const getConfig = {
            url:'http://localhost:3000/products/'+ productId,
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
