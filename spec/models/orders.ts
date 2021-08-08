import { Order, OrderStore } from '../../src/models/order';

const store = new OrderStore();
const order: Order = {
    status: 'Active'
  }
let orderId: number;
describe("ORDER MODEL TESTS", () => {
  beforeAll(async (done) => {
    const orderObj = await store.create(order);
    orderId = orderObj.id!;
    done();
  });
  describe("Order model create test", () => {
    it("should create new order", async () => {
      const orderObj = await store.create(order);
      expect(orderObj.status).toEqual('Active');
    });
  });
  describe("Order model index test", () => {
    it("should return all orders", async () => {
      const orders = await store.index();
      expect(orders?.length).toBeGreaterThan(0);
    });
  });
  describe("Order model show test", () => {
    it("should return order of given ID", async () => {
      const orderObj = await store.show(orderId.toString());
      expect(orderObj.id).toEqual(orderId);
      expect(orderObj.status).toEqual(order.status);
    });
  });
  describe("Order model delete test", () => {
    it("should delete order", async () => {
      await store.delete(orderId.toString());
      const orderObj = await store.show(orderId.toString());
      expect(orderObj).toBeFalsy();
    });
  });
});
