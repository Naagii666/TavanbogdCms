import axios from "axios";
import { showMessage } from "../utils/message";
import {
  messageType,
  defaultMsg,
  dataType,
  searchOp,
} from "@constants/constants";
import baseAxios from "./baseAxios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASEURL;

/* #region Datatable, Form main funtions */
const sListInfo = async (code) => {
  return callGet(`slist/info/${code}`);
};

const sList = async (data) => {
  if (!data.pagination) {
    data.pagination = {
      current: 1,
    };
  }

  if (data.customFilter) {
    const customFilter = data.customFilter;
    delete data.customFilter;
    customFilter.map((cfil) => {
      data.filter = {
        [cfil.key]: {
          filterType: cfil.type ? cfil.type : dataType.NUMBER,
          filter: cfil.val,
          type: searchOp.EQUALS,
        },
      };
    });
  }

  return callPost(`slist/${data.code}`, data);
};

const deleteSList = async (code, id) => {
  return callPost(`ds/crud/delete/${code}`, { id: id });
};

/* #endregion */

const callGet = async (command) => {
  const result = await baseAxios.get(command);
  return result.status === 200 ? result.data : [];
};

const execData = async (code, data, child, deletedIds) => {
  return callPost(`ds/crud/exec/${code}`, {
    data: Array.isArray(data) ? data : [data],
    child: child,
    deletedIds: deletedIds,
  });
};

const callPost = async (command, data) => {
  const result = await baseAxios.post(command, data);
  if (result.status === 403) {
    showMessage(messageType.FAILED.type, result.message);
    return;
  }

  if (result.status !== 200 || !result.data) {
    showMessage(messageType.FAILED.type, defaultMsg.error);
    return;
  }

  const resultData = result.data;
  if (resultData.status) {
    if (resultData.msgList && resultData.msgList.length > 0) {
      resultData.msgList.map((m) => {
        showMessage(resultData.status, m.text);
      });
    } else {
      showMessage(
        resultData.status,
        defaultMsg[resultData.status.toLowerCase()]
      );
    }
  }

  return resultData;
};

const apiList = {
  set: "set",
  dsList: "dsList",
  adminProfile: "adminProfile",
  adminMenu: "adminMenu",
  statAddress: "statAddress",
  statAge: "statAge",
  statUsersByYear: "statUsersByYear",
  statUsersBySeason: "statUsersBySeason",
  statUsersByMonth: "statUsersByMonth",
  statUsersByWeek: "statUsersByWeek",
  statBalance: "statBalance",
  statBroker: "statBroker",
  dashboardCard: "dashboardCard",
  moreUserFileList: "moreUserFileList",
  formInfo: "/ds/crud/list/config",
  permission: "permission",
  permissionSelected: "permissionSelected",
  rolePermissionCreate: "rolePermissionCreate",
  reloadPermission: "/ds/crud/reload/permission",
  changePassword: "/user/change/password",
  userDepositNotification: "userDepositNotification",
  userDepositQPayInvoices: "userDepositQpayInvoices",
  callRegUserInfo:"callRegUserInfo",
  callCreate:"/call/create",
  loanInfoReport:"loanInfoReport",
  configUpdate: "/config/update",
  loanUserInfo:"loanUserInfo",
  loanSingle:"/loan/single",
  loanSavingInfo:"/loan/saving/info",
  chartUser:"chartUser",
  chartGender:"chartGender",
  chartAge:"chartAge",
  chartBank:"chartBank",
  chartActiveLoan:"chartActiveLoan",
  chartAimag:"chartAimag",
  chartSoum:"chartSoum",
  chartLoanIssued:"chartLoanIssued",
};

export { sListInfo, sList, deleteSList, callGet, callPost, execData, apiList };
