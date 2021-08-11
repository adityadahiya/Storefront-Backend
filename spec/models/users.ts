import { User, UserStore } from '../../src/models/user';

const store = new UserStore();
const user: User = {
  username: 'aditya123',
  firstname: 'Aditya',
  lastname: 'Dahiya',
  password: 'password'
  }
let userId:number;
describe("User MODEL TESTS", () => {
  beforeAll(async (done) => {
    const userObj = await store.create(user);
    userId = userObj.id!;
    done();
  });

  it("should create new user", async () => {
    const userObj = await store.create(user);
    expect(userObj.id).toBeTruthy();
  });

  it("should return all users", async () => {
    const users = await store.index();
    expect(users?.length).toBeGreaterThan(0);
  });

  it("should return user of given ID", async () => {
    const userObj = await store.show(userId.toString());
    expect(userObj.id).toEqual(userId);
    expect(userObj.firstname).toEqual(user.firstname);
    expect(userObj.lastname).toEqual(user.lastname);
    expect(userObj.username).toEqual(user.username);
  });

  it("should delete user", async () => {
    await store.delete(userId.toString());
    const userObj = await store.show(userId.toString());
    expect(userObj).toBeFalsy();
  });
});
