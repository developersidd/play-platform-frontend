import { fetchWithAuth } from ".";

const retrieveCurrentUser = async () => {
  try {
    const res = await fetchWithAuth("/api/v1/users/current-user");
    console.log("res:", res);
    return {
      data: res,
    };
  } catch (e) {
    return {
      error: e,
    };
  }
};

export { retrieveCurrentUser };
