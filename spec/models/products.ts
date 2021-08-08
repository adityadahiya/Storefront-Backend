import { Product, ProductStore } from '../../src/models/product';

const store = new ProductStore();
const product: Product = {
    name: 'Nike eqt',
    price: 1,
    category: 'Footwear'
  }
let productId: number;
describe("PRODUCT MODEL TESTS", () => {
  beforeAll(async (done) => {
    const productObj = await store.create(product);
    productId = productObj.id!;
    done();
  });
describe("Product model create test", () => {
  it("should create new product", async () => {
    const productObj = await store.create(product);
    expect(productObj.name).toEqual('Nike eqt');
    expect(productObj.category).toEqual('Footwear');
  });
});
describe("Product model index test", () => {
  it("should return all products", async () => {
    const products = await store.index();
    expect(products?.length).toBeGreaterThan(0);
  });
});
describe("Product model show test", () => {
  it("should return product of given ID", async () => {
    const productObj = await store.show(productId.toString());
    expect(productObj.id).toEqual(productId);
    expect(productObj.price).toEqual(product.price);
    expect(productObj.name).toEqual(product.name);
    expect(productObj.category).toEqual(product.category);
  });
});
describe("Product model delete test", () => {
  it("should delete product", async () => {
    await store.delete(productId.toString());
    const productObj = await store.show(productId.toString());
    expect(productObj).toBeFalsy();
  });
});
});
