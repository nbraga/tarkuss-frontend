import { api, requestConfig } from "../utils/config";

// Update user details
const updateAdress = async (data, token) => {
  const config = requestConfig("PUT", data, token, true);

  try {
    const res = await fetch(api + "/adress/", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};



const adressService = {
  updateAdress,
};

export default adressService;