

import { signupWithEmail, loginWithEmail } from './auth';

const BASE_URL = "https://691db2c6d58e64bf0d372c91.mockapi.io";


async function handleRes(res) {
  const text = await res.text();
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch (e) { }

  if (!res.ok) {

    const msg = (json && (json.message || json.error)) || text || res.statusText || `HTTP ${res.status}`;
    throw new Error(msg);
  }

  return json;
}


export async function signup({ fullName, email, password }) {

  let cred;
  try {
    cred = await signupWithEmail(email, password);
  } catch (err) {

    throw new Error(err?.message || String(err));
  }
  const uid = cred?.user?.uid;
  if (!uid) throw new Error("Failed to create auth user.");


  const res = await fetch(`${BASE_URL}/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName,
      email,
      authId: uid,
      balance: 0,
      createdAt: new Date().toISOString()
    })
  });

  return handleRes(res);
}


export async function login(email, password) {
  let cred;
  try {
    cred = await loginWithEmail(email, password);
  } catch (err) {
    throw new Error(err?.message || String(err));
  }

  const uid = cred?.user?.uid;
  if (!uid) throw new Error("Auth login succeeded but no uid returned.");


  const res = await fetch(`${BASE_URL}/user?authId=${encodeURIComponent(uid)}`);
  const users = await handleRes(res);

  let user = (users || [])[0];

  if (!user) {
    
    const res2 = await fetch(`${BASE_URL}/users?email=${encodeURIComponent(email)}`);
    const byEmail = await handleRes(res2);
    user = (byEmail || [])[0];
  }

  if (!user) {
    throw new Error("User record not found on MockAPI. Create a profile in MockAPI for this account.");
  }

  return user;
}



export async function getUser(userId) {
  if (!userId) throw new Error("getUser: missing userId");
  const res = await fetch(`${BASE_URL}/users/${encodeURIComponent(userId)}`);
  return handleRes(res);
}

export async function updateUser(userId, data) {
  if (!userId) throw new Error("updateUser: missing userId");
  const res = await fetch(`${BASE_URL}/users/${encodeURIComponent(userId)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return handleRes(res);
}



export async function getTransactions(userId) {
  if (!userId) return [];
  const res = await fetch(`${BASE_URL}/transactions?userId=${encodeURIComponent(userId)}&sortBy=date&order=desc`);
  return handleRes(res);
}


export async function sendMoney({ userId, amount, category = "transfer", description = "" }) {
  if (!userId) throw new Error("sendMoney: missing userId");
  if (!amount || isNaN(amount)) throw new Error("sendMoney: invalid amount");

  const payload = {
    userId: String(userId),
    amount: -Math.abs(Number(amount)),
    type: "send",
    category,
    description,
    date: new Date().toISOString()
  };

  const txRes = await fetch(`${BASE_URL}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const tx = await handleRes(txRes);


  try {
    const user = await getUser(userId);
    const newBalance = Number(user.balance || 0) - Number(amount);
    await updateUser(userId, { ...user, balance: newBalance });
  } catch (e) {

    console.warn("Balance update failed:", e?.message || e);
  }

  return tx;
}