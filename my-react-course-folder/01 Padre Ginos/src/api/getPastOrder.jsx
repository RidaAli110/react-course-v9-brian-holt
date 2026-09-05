export default async function getPastOrder(orderNumber) {
  const res = await fetch(`/api/past-order/${orderNumber}`);
  const data = await res.json();
  return data;
}
