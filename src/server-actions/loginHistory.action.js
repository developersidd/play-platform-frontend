const { fetchWithAuth } = require("@/axios");

// get user login history
const getUserLoginHistory = async () => {
  try {
    const res = await fetchWithAuth(`/login-history/`);
    return {
      data: res.data,
    };
  } catch (e) {
    console.log(" e:", e);
    return {
      error: e.message,
    };
  }
};

// check if user has any login history
const hasLoginHistory = async () => {
  try {
    const res = await fetchWithAuth(`/login-history/has`);

    if (res?.data?.hasLoginHistory) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

export { getUserLoginHistory, hasLoginHistory };
