const defaultMsg = {
  success: 'Амжилттай',
  error: 'Та түр хүлээгээд дахин оролдоно уу.',
  permissionEmpty: 'Эрх сонгоно уу.',
  formErrorTxt: 'Формын утгыг үнэн зөв бөглөнө үү.',
  loginSuccessTxt: 'Амжилттай.',
  loginErrorTxt: 'Нэвтрэх нэр эсвэл нууц үг буруу байна.',
  newDeviceConfirmErrorTxt: 'Та шинэ төхөөрөмжөөс хандалт хийж байгаа тул баталгаажуулалт хийнэ үү.'
};

const dataType = {
  TEXT: "text",
  NUMBER: "number",
  AMOUNT: "amount",
  SELECT: "select",
  DATE: "date",
  DATETIME: "datetime",
  PASSWORD: "password",
  CHECKBOX: "checkbox",
  TEXTAREA: "textarea",
  BASE64: "base64",
  SEPARATOR: "separator"
};

const searchOp = {
  EQUALS: "equals",
  CONTAINS: "contains",
  IN_RANGE: "inRange"
};

const sortType = {
  ASCEND: "asc",
  DESCEND: "desc"
};

const messageType = {
  FAILED: {
    title: "Амжилтгүй",
    type: "Failed",
    msgType: "error"
  },
  SUCCESS: {
    title: "Амжилттай",
    type: "Success",
    msgType: "success"
  },
  WARNING: {
    title: "Анхааруулга",
    type: "Warning",
    msgType: "warning"
  }
};

const datePickerLocale = {
  lang: {
    locale: "mn_MN",
    yearFormat: "YYYY"
  }
};

const dateTimePickerLocale = {
  lang: {
    locale: "mn_MN",
    dateTimeFormat: "YYYY-MM-DD HH:mm",
    yearFormat: "YYYY",
    ok: "Ok"
  },
  dateTimeFormat: "YYYY-MM-DD HH:mm",
};

export {
  defaultMsg,
  dataType,
  searchOp,
  sortType,
  messageType,
  datePickerLocale,
  dateTimePickerLocale
}