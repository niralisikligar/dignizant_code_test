import axiosInstance from "../axiosConfig";


export const getServices = async () => {
  const response = await axiosInstance.get("/products");
  const data = await response.data;
  console.log("gel all data-->",data);
  return data;
};




export const deleteService = async ( id ) => {
 
  const response = await axiosInstance.delete(`/products/${id}`);
  console.log("delete response",response);
  return response;
};



export const addService = async (serviceData) => {
  const response = await axiosInstance.post(
    `/product`,
    serviceData
  );
  console.log("response service add", response);
  const data = await response;
  return data;
};

export const getServiceById = async (id) => {

  const response = await axiosInstance.get(`/products/${id}`);
console.log("response by id",response);
  const data = response;
  return data;
};

export const updateServices = async (   id,formData ) => {
console.log("id,formData",id,formData);
  const response = await axiosInstance.put(`/products/${id}`, formData 
  );
  console.log("response update", response);
  return response;
};
