
const BASE_URL = "https://691db2c6d58e64bf0d372c91.mockapi.io";

async function handleRes(res) {
  const text = await res.text();
  let json = null;

  try { json = text ? JSON.parse(text) : null } catch (e) {}

  if (!res.ok) {
    
    const msg = (json && (json.message || json.error)) || text || res.statusText;
    throw new Error(msg || 'Request failed');
  }

  return json;
}

/* AUTH (mock) */
export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/user?email=${encodeURIComponent(email)}`);
  const users = await handleRes(res);
  const user = (users || []).find(u => u.password === password);
  if (!user) throw new Error("Invalid email or password");
  return user;
}

export async function signup({ fullName, email, password }) {
  const res = await fetch(`${BASE_URL}/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName,
      email,
      password,
      balance: 0,
      createdAt: new Date().toISOString()
    })
  });
  return handleRes(res);
}

/* USER */
export async function getUser(userId) {
  if (!userId) throw new Error('getUser: missing userId');
  const id = String(userId);
  const res = await fetch(`${BASE_URL}/users/${encodeURIComponent(id)}`);
  return handleRes(res);
}


export async function updateUser(userId, data) {
  const res = await fetch(`${BASE_URL}/user/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return handleRes(res);
}

/* TRANSACTIONS */
export async function getTransactions(userId) {
  const res = await fetch(`${BASE_URL}/transactions?userId=${userId}&sortBy=date&order=desc`);
  return handleRes(res);
}

export async function sendMoney({ userId, amount, category = "transfer", description = "" }) {
  
  const txRes = await fetch(`${BASE_URL}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: String(userId),
      amount: -Math.abs(Number(amount)),
      type: "send",
      category,
      description,
      date: new Date().toISOString()
    })
  });
  const tx = await handleRes(txRes);


  try {
    const user = await getUser(userId);
    const newBalance = Number(user.balance) - Number(amount);
    await updateUser(userId, { ...user, balance: newBalance });
  } catch (err) {
    console.warn("Failed to update user balance:", err.message || err);
  }

  return tx;
}