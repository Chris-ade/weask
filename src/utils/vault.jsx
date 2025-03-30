import DeepVault from "deepvault";

export const userVault = new DeepVault("userData");
export const tokenVault = new DeepVault("key");

export const getUserData = async () => {
  try {
    return await userVault.getDecryptedData();
  } catch {
    return false;
  }
};

export const setUserData = async (data) => {
  try {
    return await userVault.encryptAndSaveData(data);
  } catch {
    return false;
  }
};

export const updateUserData = async (data) => {
  try {
    return await userVault.updateData(data);
  } catch {
    return false;
  }
};

export const deleteData = async () => {
  try {
    return await userVault.deleteData();
  } catch {
    return false;
  }
};

export const getToken = async () => {
  try {
    return await tokenVault.getDecryptedData();
  } catch {
    return false;
  }
};

export const setToken = async (token) => {
  try {
    return await tokenVault.encryptAndSaveData(token);
  } catch {
    return false;
  }
};

export const updateToken = async (token) => {
  try {
    return await tokenVault.updateData(token);
  } catch {
    return false;
  }
};

export const deleteToken = async () => {
  try {
    return await tokenVault.deleteData();
  } catch {
    return false;
  }
};
