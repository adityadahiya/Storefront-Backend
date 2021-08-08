import request from 'request';
import {User} from '../../src/models/user';

let token: string;
let userId: number;

const user: User = {
    username: 'aditya123',
    firstname: 'Aditya',
    lastname: 'Dahiya',
    password: 'password'
    }

describe("User endpoint tests", () => {
  beforeAll(async (done) => {
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

  it("User Authentication test", async () => {
    const body = {
        username: 'aditya123',
        password: 'password'
    };
    const  postConfig = {
        url:'http://localhost:3000/users/authenticate',
        body: user,
        json: true
    };

    request.post(postConfig, (err, httpResponse, body)=>{
        expect(httpResponse.statusCode).toBe(200);
    });
  });

  it("should create new user", async () => {
    const  postConfig = {
        url:'http://localhost:3000/users',
        body: user,
        json: true
    };

    request.post(postConfig, (err, httpResponse, body)=>{
        expect(httpResponse.statusCode).toBe(200);
    });
  });

  it("should get list of users", async () => {
    const getConfig = {
        url:'http://localhost:3000/users',
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

  it("should get user info", async () => {
    const getConfig = {
        url:'http://localhost:3000/users/1',
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


  it("should delete user", async () => {
    const getConfig = {
        url:'http://localhost:3000/users/1',
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