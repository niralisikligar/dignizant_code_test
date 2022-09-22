import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {
  SuccessToast,
  ErrorToast,
} from "../../../components/AlertToastification/index";

import {
  getServices,
  getCompanies,
  getUsers,
  deleteService,
  addService,
  getServiceById,
  updateServices,
} from "../../../services/service/index";
export const GET_SERVICE_LOADING = "[SERVICE] GET_SERVICE_LOADING";
export const GET_SERVICE = "[SERVICE] GET_SERVICE";
export const SERVICE_ERROR = "[SERVICE] SERVICE_ERROR";

export const DELETE_SERVICE = "[SERVICE] DELETE_SCHOOL";
export const DELETE_SERVICE_ERROR = "[SERVICE] DELETE_SCHOOL_ERROR";

export const ADD_SERVICE = "[SERVICE] ADD_SERVICE";
export const ADD_SERVICE_ERROR = "[SERVICE] ADD_SERVICE_ERROR";

export const GET_SERVICE_ID = "[SERVICE] GET_SERVICE_ID";
export const GET_SERVICE_ID_ERROR = "[SERVICE] GET_SERVICE_ID_ERROR";

export const UPDATE_SERVICE = "[SERVICE] UPDATE_SERVICE";
export const UPDATE_SERVICE_ERROR = "[SERVICE] UPDATE_SERVICE_ERROR";

export const GET_COMPANY_LOADING = "[COMPANY] GET_COMPANY_LOADING";
export const GET_COMPANY = "[COMPANY] GET_COMPANY";
export const COMPANY_ERROR = "[COMPANY] COMPANY_ERROR";

export const GET_USER_LOADING = "[USER] GET_USER_LOADING";
export const GET_USERS = "[USER] GET_USERS";
export const USERS_ERROR = "[USER] USERS_ERROR";

export const GETDATA_PARAMS = "[SERVICE] GETDATA_PARAMS";

export function getAllService(queries) {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_SERVICE_LOADING,
        payload: true,
      });
      const response = await getServices(queries);
      dispatch({
        type: GET_SERVICE,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: SERVICE_ERROR,
        payload: { errorMessage: error.message },
      });
    }
  };
}



export function removeService(serviceId) {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_SERVICE_LOADING,
        payload: true,
      });
      const response = await deleteService(serviceId);
      dispatch({
        type: DELETE_SERVICE,
        payload: response,
      });
      toast.success(SuccessToast(response.message || "Deleted Successfully"), {
        hideProgressBar: true,
        autoClose: "100",
      });
    } catch (error) {
      toast.error(ErrorToast(error.message), {
        hideProgressBar: true,
        autoClose: "100",
      });
      dispatch({
        type: DELETE_SERVICE_ERROR,
        payload: { admin: false, errorMessage: error.message },
      });
    }
  };
}

export function addNewService(values) {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_SERVICE_LOADING,
        payload: true,
      });
      const response = await addService(values);
      dispatch({
        type: ADD_SERVICE,
        payload: response,
      });
      toast.success(SuccessToast(response.message || "Add Successfully"), {
        hideProgressBar: true,
        autoClose: "100",
      });
    } catch (error) {
      toast.error(ErrorToast(error.message), {
        hideProgressBar: true,
        autoClose: "100",
      });
      dispatch({
        type: ADD_SERVICE_ERROR,
        payload: { admin: false, errorMessage: error.message },
      });
    }
  };
}

export function getByServiceId(id) {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_SERVICE_LOADING,
        payload: true,
      });
      const response = await getServiceById(id);

      dispatch({
        type: GET_SERVICE_ID,
        payload: response,
      });
      return response;
    } catch (error) {
      dispatch({
        type: GET_SERVICE_ID_ERROR,
        payload: { errorMessage: error.message },
      });
    }
  };
}
export function updateService(serviceData) {
  const { id, data } = serviceData || {};

  return async (dispatch) => {
    try {
      dispatch({
        type: GET_SERVICE_LOADING,
        payload: true,
      });
      const response = await updateServices(id, data);

      dispatch({
        type: UPDATE_SERVICE,
        payload: response,
      });
      toast.success(SuccessToast(response.message || "Update Successfully"), {
        hideProgressBar: true,
        autoClose: "100",
      });
    } catch (error) {
      toast.error(ErrorToast(error.message), {
        hideProgressBar: true,
        autoClose: "100",
      });
      dispatch({
        type: UPDATE_SERVICE_ERROR,
        payload: { errorMessage: error.message },
      });
    }
  };
}

export function updateServiceParams() {}
