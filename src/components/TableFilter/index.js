import { useState, useEffect } from "react";
import css from "./_.module.css";
import { Input, DatePicker, Select, Button, Form, Divider } from "antd";
import { dataType, datePickerLocale, searchOp } from "@constants/constants";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";
import moment from "moment";

const { RangePicker } = DatePicker;

const TableFilter = ({ code, searchColumns, filter, setFilter, setPagination }) => {
  const [valueMap, setValueMap] = useState(new Map());
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [numberRange] = Form.useForm();

  const updateValue = (key, value) => {
    setValueMap(new Map(valueMap.set(key, value)));
  };

  useEffect(() => {
    return () => {
      clear();
    };
  }, [code])

  const filterCase = (type, value, column) => {
    switch (type) {
      case dataType.NUMBER:
        return {
          filter: value,
          type: searchOp.EQUALS,
        };
      case dataType.TEXT:
      case dataType.TEXTAREA:
        return {
          filter: value,
          type: searchOp.CONTAINS,
        };
      case dataType.SELECT:
        return {
          filter: value,
          filterType: column.st || "text",
          type: searchOp.EQUALS,
        };
      case dataType.DATE:
        return {
          filter: value[0],
          filterTo: value[1],
          type: searchOp.IN_RANGE,
        };
      case dataType.AMOUNT:
        return {
          filter: value.min_amount,
          filterTo: value.max_amount,
          filterType: "number",
          type: searchOp.IN_RANGE
        }
      default:
        break;
    }
  };

  const search = () => {
    let _filter = filter;

    searchColumns.forEach((column) => {
      let type = column.tp;
      let key = column.sk || column.k;
      let value = valueMap.get(key);
      if (
        value === "" ||
        value === undefined ||
        (type === dataType.DATE && (value[0] === "" || value[1] === ""))
      ) {
        delete _filter[key];
      } else {
        _filter = {
          ..._filter,
          [key]: {
            filterType: type,
            ...filterCase(type, value, column),
          },
        };
      }
    });

    if (Object.keys(_filter).length === 0) reloadList({});
    else reloadList(_filter);
  };

  const clear = () => {
    setValueMap(new Map());
    reloadList({});
  };

  const reloadList = (_filter) => {
    setFilter(_filter);
    // ehnii huudas ruu usreh
    setPagination(prev => ({
      ...prev,
      current: 1,
    }));
  };

  const filterComponent = (column) => {
    let key = column.k;
    let type = column.tp;
    let title = column.t;
    let options = column.opts;
    let searchKey = column.sk;

    return (
      <div key={key} className={type === dataType.SEPARATOR && css.separator}>
        {type === dataType.SEPARATOR && <Divider />}
        <div className={type === dataType.SEPARATOR && css.separatorTitle}>{title}</div>
        {(type === dataType.TEXT || type === dataType.NUMBER || type === dataType.TEXTAREA) && (
          <Input
            allowClear
            placeholder={`${title}...`}
            value={valueMap.get(key)}
            onChange={(e) => updateValue(key, e.target.value)}
            onPressEnter={search}
            className={`${css.filter} filterField`}
          />
        )}
        {type === dataType.SELECT && (
          <Select
            showSearch
            allowClear
            placeholder="-Сонгох-"
            value={valueMap.get(searchKey || key)}
            className={`${css.filter} filterField`}
            onChange={(value) => {
              updateValue(searchKey || key, value);
            }}
            onClear={() => {
              updateValue(searchKey || key, "");
            }}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {options.map((el) => (
              <Select.Option key={el.id} value={el.id}>
                {el.name}
              </Select.Option>
            ))}
          </Select>
        )}
        {(type === dataType.DATE || type === dataType.DATETIME) && (
          <RangePicker
            locale={datePickerLocale}
            onChange={(date, dateString) => {
              updateValue(key, dateString);
            }}
            placeholder={['Эхлэх огноо', 'Дуусах огноо']}
            className={`${css.filter} filterField`}
            size="default"
            value={
              valueMap.get(key)
                ? [
                  valueMap.get(key)[0] !== "" ? moment(valueMap.get(key)[0], "YYYY-MM-DD") : null,
                  valueMap.get(key)[1] !== "" ? moment(valueMap.get(key)[1], "YYYY-MM-DD") : null,
                ]
                : [null, null]
            }
          />
        )}
        {type === dataType.AMOUNT && (
          <Form className={css.rowContainer} onValuesChange={(changedValues, allValues) => updateValue(key, allValues)}>
            <Form.Item name="min_amount" noStyle>
              <Input
                allowClear
                placeholder={'-с их'}
                value={valueMap.get(key) ? valueMap.get(key).min_amount : ""}
                // onChange={(e) => updateValue(key, [e.target.value, form.getFieldValue("max_amount")])}
                onPressEnter={search}
                className={`${css.filter} filterField`}
              />
            </Form.Item>
            <Form.Item name="max_amount" noStyle>
              <Input
                allowClear
                placeholder={'-с бага'}
                value={valueMap.get(key) ? valueMap.get(key).max_amount : ""}
                // onChange={(e) => updateValue(key, [numberRange.getFieldValue("min_amount"), e.target.value])}
                onPressEnter={search}
                className={`${css.filter} filterField`}
              />
            </Form.Item>
          </Form>
        )}
        {/* {type === "separator" && (
          <div className={css.separatorTitle}>{title}</div>
        )} */}
      </div>
    )
  };

  return (
    <>
      <div className={css.banner} onClick={() => setIsSearchVisible(prev => !prev)}>
        <SearchOutlined /> Хайх
      </div>
      {isSearchVisible && (
        <div className={css.container}>
          <div className={css.searchColumns}>
            {searchColumns && searchColumns.map((el) => filterComponent(el))}
          </div>
          <div className={css.btnContainer}>
            <Button type="dashed" danger className={css.btn} onClick={clear}>
              <ClearOutlined /> Цэвэрлэх
            </Button>
            <Button type="dashed" className={css.searchBtn} onClick={search}>
              <SearchOutlined /> Хайх
            </Button>
          </div>
        </div>)
      }
    </>
  );
};

export default TableFilter;
