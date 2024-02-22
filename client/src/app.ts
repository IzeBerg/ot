import axios from "axios";

const API_URL = "http://localhost:3000/orders";

async function fetchOrders() {
  const response = await axios.get(API_URL);
  console.log(`Orders fetch status=${response.status}`, response.data);
}

async function createOrder(order: any) {
  var response;
  try {
    response = await axios.post(API_URL, order);
  } catch (error: any) {
    if (error.response) {
      response = error.response;
    } else {
      throw error;
    }
  }
  console.log(`Order create status=${response.status}`, response.data);
  return response.data;
}

async function updateOrder(orderId: number, order: any) {
  const response = await axios.put(API_URL + "/" + orderId, order);
  console.log(
    `Order update ${orderId} status=${response.status}`,
    response.data,
  );
}

async function deleteOrder(orderId: number) {
  const response = await axios.delete(API_URL + "/" + orderId);
  console.log(
    `Order delete ${orderId} status=${response.status}`,
    response.data,
  );
}

async function demo() {
  const order = await createOrder({
    brand: "Cool brand",
    name: "Sneakers",
    quantity: 10,
    price: 100,
  });
  await fetchOrders();
  await updateOrder(order.id, { brand: "Rebranded Cool brand", price: 200 });
  await fetchOrders();
  await deleteOrder(order.id);
  await fetchOrders();

  // send invalid data
  await createOrder({ brand: "", name: "", quantity: 0.4, price: 0 });
}

demo();
