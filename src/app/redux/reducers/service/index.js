import * as Actions from "../../actions/service/index";

const initialState = {
  loading: false,
  serviceData: [],
  companyData: [],
  serviveArrayData: null,
  userData: [],
  serviceDataById: [],
  serviceEditId: "",
  initParams: {
    pageSize: 10,
    pageIndex: 1,
    status: "",
  },
  message: "",
  error: false,
};

const ServiceReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_SERVICE_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case Actions.GET_SERVICE: {
      return {
        ...state,
        serviceData: action?.payload,
        loading: true,
      };
    }
    case Actions.GET_COMPANY: {
      return {
        ...state,
        companyData: action?.payload,
        loading: true,
      };
    }
    case Actions.GET_USERS: {
      return {
        ...state,
        userData: action?.payload,
        loading: true,
      };
    }
    case Actions.SERVICE_ERROR: {
      return {
        ...state,
        loading: false,
        message: action?.payload?.errorMessage,
        error: true,
      };
    }
    case Actions.DELETE_SERVICE: {
      return {
        ...state,
        message: "Delete Successfully",
        loading: false,
      };
    }
    case Actions.DELETE_SERVICE_ERROR: {
      return {
        ...state,
        loading: false,
        message: action.payload.errorMessage,
        error: true,
      };
    }
    case Actions.ADD_SERVICE: {
      return {
        ...state,
        loading: true,
        message: "Add Successfully",
      };
    }
    case Actions.ADD_SERVICE_ERROR: {
      return {
        ...state,
        loading: false,
        message: action.payload.errorMessage,
        error: true,
      };
    }
    case "SERVICE_ARRAY_DATA": {
      return {
        ...state,
        serviveArrayData: action?.payload,
        loading: true,
      };
    }
    case Actions.GET_SERVICE_ID: {
      return {
        ...state,
        serviceDataById: action?.payload,
        loading: true,
      };
    }
    case Actions.GET_SERVICE_ID_ERROR: {
      return {
        ...state,
        loading: false,
        message: action?.payload?.errorMessage,
        error: true,
      };
    }
    case Actions.UPDATE_SERVICE: {
      return {
        ...state,
        loading: false,
        message: "Update Successfully",
      };
    }
    case Actions.UPDATE_SERVICE_ERROR: {
      return {
        ...state,
        loading: false,
        message: action?.payload?.errorMessage,
        error: true,
      };
    }
    case Actions.GETDATA_PARAMS: {
      return {
        ...state,
        initParams: action?.payload,
        loading: true,
      };
    }

    default: {
      return state;
    }
  }
};

export default ServiceReducer;
