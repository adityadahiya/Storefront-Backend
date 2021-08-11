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
    it("should create new order", async () => {
      const orderObj = await store.create(order);
      expect(orderObj.status).toEqual('Active');
    });

    it("should return all orders", async () => {
      const orders = await store.index();
      expect(orders?.length).toBeGreaterThan(0);
    });

    it("should return order of given ID", async () => {
      const orderObj = await store.show(orderId.toString());
      expect(orderObj.id).toEqual(orderId);
      expect(orderObj.status).toEqual(order.status);
    });

    it("should delete order", async () => {
      await store.delete(orderId.toString());
      const orderObj = await store.show(orderId.toString());
      expect(orderObj).toBeFalsy();
    });
});
