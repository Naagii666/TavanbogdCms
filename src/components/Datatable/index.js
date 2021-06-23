import Link from "next/link";
import Icon, {
  DeleteFilled,
  EditFilled,
  PlusCircleOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import { deleteSList, sList, sListInfo } from "@api/api";
import TableFilter from "@components/TableFilter";
import { messageType, sortType } from "@constants/constants";
import { Layout, Button, Popconfirm, Table, Tooltip } from "antd";
import { useEffect, useState, useContext } from "react";
import MainModal from "@components/MainModal";
import Form from "@components/Form";
import css from "./_.module.css";
import CsvDownloader from "react-csv-downloader";
import Context from "@context/Context";

const { Content } = Layout;

const Datatable = ({
  code,
  addOperations,
  handleDtAction,
  opWidth,
  addListItem = false,
  showSummaryBy = null,
  showTitle = true,
  params = null,
  checkbox = false,
  doesFilter = true,
  reload = false,
  info = null
}) => {
  const ctx = useContext(Context);
  //#region States
  const [searchColumns, setSearchColumns] = useState([]);
  const [columns, setColumns] = useState([]);
  const [title, setTitle] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showTotal: (total, range) =>
      `(Нийт ${total}) ${range[0]} ээс ${range[1]} харагдаж байна.`,
    pageSizeOptions: [5, 10, 25, 50, 100, 500, 1000, 5000],
    locale: {
      items_per_page: "",
      prev_page: "Өмнөх хуудас",
      next_page: "Дараагийн хуудас",
    },
  });
  const [sort, setSort] = useState([]);
  const [isChange, setIsChange] = useState(0);
  const [filter, setFilter] = useState(() => {
    if (params) {
      delete params.code;
      return Object.fromEntries(
        Object.entries(params).map((entry) => {
          entry[1] = {
            filter: entry[1],
            filterType: "number",
            type: "equals",
          };
          return entry;
        })
      );
    } else {
      return {};
    }
  });
  const [dataSource, setDataSource] = useState([]);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [editData, setEditData] = useState({});
  const [csvFetched, setCsvFetched] = useState(false);
  const [fetchingCsv, setFetchingCsv] = useState(false);
  const [csvColumns, setCsvColumns] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchData, setFetchData] = useState(false);
  const [isPaginate, setIsPaginate] = useState(true);
  //#endregion
  //#region Actions
  const handleAdd = (id) => {
    setEditData({});
    setIsShowEditModal(true);
  };

  const handleEdit = async (id) => {
    ctx.setIsLoading(true);
    const result = await sList({
      code: `${code}`,
      customFilter: [{ key: "id", val: id }],
    });
    setEditData(result.data[0]);
    setIsShowEditModal(true);
    ctx.setIsLoading(false);
  };

  const handleDelete = async (id) => {
    ctx.setIsLoading(true);
    const result = await deleteSList(code, id);
    if (result && result.status === messageType.SUCCESS.type) {
      setIsChange(Math.random());
    }
    ctx.setIsLoading(false);
  };

  const onModalCancel = () => {
    setIsShowEditModal(false);
  };

  const onFinishSuccess = () => {
    onModalCancel();
    setIsChange(Math.random());
  };

  const handleTableChange = async (_pagination, filters, sorter) => {
    setPagination((pagination) => ({
      ...pagination,
      current: _pagination.current,
      pageSize: _pagination.pageSize,
    }));

    if (sorter.column) {
      setSort([
        {
          colId: sorter.field,
          sort: sortType[sorter.order.toUpperCase()],
        },
      ]);
    }

    setIsChange(Math.random());
  };

  const exportCsv = async () => {
    setFetchingCsv(true);
    const result = await sList({ code, filter, sort });
    setCsvData(result.data);
    setCsvFetched(true);
    setFetchingCsv(false);
  };
  //#endregion
  //#region useEffect
  /**
   * huudas anh neegdhed husnegtiin baganiin utguudiig tataj awchirna,
   * huudas soligdhod filter, pagination-g cleanup hiine
   */
  useEffect(() => {
    const getColumns = async () => {
      let listInfo = info;
      if (listInfo === null) {
        listInfo = await sListInfo(code);
      }
      const resultColumns = listInfo.cols;
      setTitle(listInfo.name);
      setIsAdd(listInfo.isadd);
      
      if(listInfo.ispaginate === 0) {
        setPagination({current: 1});
        setIsPaginate(false);
      }
      
      setFetchData(true);


      if (resultColumns !== null) {
        setSearchColumns(resultColumns);

        let columns = resultColumns.map((column) => {
          let cmn = {
            title: column["t"],
            key: column["k"],
            dataIndex: column["k"],
            width: column["w"],
            sorter: column["s"],
            isc: column["isc"],
          };

          if (column["ln"]) {
            let ln = column["ln"].split("#");
            cmn.render = (text, record) => {
              return (
                <Link href={`${ln[0]}/${record[ln[1]]}`.replaceAll("=/", "=")}>
                  <a>
                    {text}
                  </a>
                </Link>
              );
            };
          }
          return cmn;
        });

        //isc 1 bol table iin bagana dr haruulna
        columns = columns.filter((item) => item.isc === 1);

        if (
          (listInfo.isd === 1 &&
            ctx.state.permissions[code.toUpperCase() + "_DELETE"]) ||
          (listInfo.isedit === 1 &&
            ctx.state.permissions[code.toUpperCase() + "_CREATE"]) ||
          (addOperations !== undefined &&
            addOperations !== null &&
            addOperations.length > 0)
        ) {
          columns.push({
            title: "Үйлдэл",
            dataIndex: "operation",
            key: "operation",
            align: "center",
            width: opWidth || "8%",
            render: (_, record) => {
              let addEl = [];
              let deleteEl;
              let editEl;

              if (addOperations !== undefined) {
                addOperations.map((addOp) => {
                  addEl.push(
                    <Tooltip
                      placement="bottom"
                      title={addOp.title}
                      color={addOp.color}
                      key={addOp.key}
                    >
                      <Icon
                        component={addOp.icon}
                        onClick={() => handleDtAction(addOp.key, record)}
                        style={{
                          fontSize: "16px",
                          color: addOp.color,
                          marginRight: "15px",
                        }}
                      />
                    </Tooltip>
                  );
                });
              }

              if (listInfo.isd === 1) {
                deleteEl = (
                  <Popconfirm
                    key="delete-confirm"
                    title="Устгахдаа итгэлтэй байна уу?"
                    okText="Тийм"
                    cancelText="Үгүй"
                    onConfirm={() => handleDelete(record.id)}
                  >
                    <Tooltip
                      placement="bottom"
                      title="Устгах"
                      color="#f5222d"
                      key="delete-tooltip"
                    >
                      <DeleteFilled
                        style={{
                          fontSize: "16px",
                          color: "#f5222d",
                          marginLeft: "15px",
                        }}
                      />
                    </Tooltip>
                  </Popconfirm>
                );
              }

              if (listInfo.isedit === 1) {
                editEl = (
                  <Tooltip
                    placement="bottom"
                    title="Засах"
                    color="#00d5dd"
                    key="edit-tooltip"
                  >
                    <EditFilled
                      onClick={() => handleEdit(record.id)}
                      style={{ fontSize: "16px", color: "#00d5dd" }}
                    />
                  </Tooltip>
                );
              }

              return (
                <>
                  {addEl}
                  {editEl}
                  {deleteEl}
                </>
              );
            },
          });
        }

        setColumns([
          {
            title: "№",
            key: "index",
            align: "center",
            render: (text, record, index) => index + 1,
            width: "5%",
          },
          ...columns,
        ]);
      }
    };

    getColumns();

    return () => {
      setSort([]);
      setFilter({});
      setPagination({
        ...pagination,
        current: 1,
        pageSize: 10,
      });
      setFetchData(false);
    };
  }, [code]);

  /**
   * table iin dugaarlaltiin baganiig render hiih function pagination.current-s hamaarch baigaa
   * tul page soligdoh uyd function dahin shinechilegdeh heregtei
   */
  useEffect(() => {
    setColumns((columns) => [
      {
        ...columns[0],
        render: (text, record, index) =>
          (pagination.current - 1) * pagination.pageSize + index + 1,
      },
      ...columns.slice(1),
    ]);
  }, [pagination.current]);

  /**
   * page pageer ugugdul tataj awchirah
   */
  useEffect(() => {
    const getSList = async () => {
      setIsLoading(true);
      const result = await sList({ code, filter, pagination, sort });
      setDataSource(result?.data);
      setPagination({ ...pagination, total: result?.meta.total });
      setIsLoading(false);
    };

    if(fetchData) getSList();
  }, [sort, filter, isChange, fetchData, reload]);

  useEffect(() => {
    let cols = columns
      .slice(1)
      .map((col) => ({
        id: col.key,
        displayName: col.title,
      }))
      .filter((col) => col.id !== "operation");
    setCsvColumns(cols);
  }, [columns]);

  /**
   * Table-n mur songoh
   */
  const onSelectChange = (selectedRowKeys) => {
    setselectedRowKeys(selectedRowKeys);
    console.log("selectedRowKeys changed: ", selectedRowKeys);
  };
  const rowSelection = {
    columnWidth: "5%",
    selectedRowKeys,
    onChange: onSelectChange,
  };
  //#endregion
  return (
    <>
      <h1 className="main-title">{showTitle ? title : ""}</h1>
      {
        doesFilter && (
          <TableFilter
            code={code}
            searchColumns={searchColumns}
            filter={filter}
            setFilter={setFilter}
            setPagination={setPagination}
          />
        )
      }
      <Content style={{ padding: "0", background: "#fff" }}>
        <div className={css.topBox}>
          {ctx.state.permissions[code.toUpperCase() + "_CREATE"] && isAdd ? (
            <Button
              type="primary"
              className="add-btn"
              onClick={handleAdd}
              style={{ marginLeft: "15px" }}
            >
              <PlusCircleOutlined /> Нэмэх
            </Button>
          ) : (
            ""
          )}

          {addListItem &&
            addListItem.map((addItem) => {
              return (
                <Button
                  key={addItem.key}
                  type="primary"
                  onClick={() => handleDtAction(addItem.key, selectedRowKeys)}
                  className={addItem.className}
                  style={{ marginLeft: "15px", width: addItem.width }}
                >
                  <Icon component={addItem.icon} />
                  {addItem.label}
                </Button>
              );
            })}
          <section className={css.rightAligned}>
            <Button
              type="primary"
              className="add-btn"
              loading={fetchingCsv}
              onClick={exportCsv}
            >
              <VerticalAlignBottomOutlined /> Export
            </Button>
            {csvFetched && (
              <CsvDownloader
                filename={title}
                columns={csvColumns}
                datas={csvData}
              >
                <Button
                  style={{ border: "none", outline: "none" }}
                  onClick={() => setCsvFetched(false)}
                >
                  Энд дарж татаж авна уу.
                </Button>
              </CsvDownloader>
            )}
          </section>
        </div>
        <Table
          key={code}
          columns={columns}
          dataSource={dataSource}
          rowSelection={checkbox ? rowSelection : null}
          rowKey="id"
          pagination={isPaginate ? pagination : false}
          onChange={handleTableChange}
          bordered
          scroll={{ x: "max-content" }}
          loading={isLoading}
          locale={{
            emptyText: "Бичлэг олдсонгүй.",
            triggerAsc: "Өсөхөөр эрэмбэлэх",
            triggerDesc: "Буурахаар эрэмбэлэх",
            cancelSort: "",
            
          }}
          summary={(pageContent) => {
            if (pageContent.length !== 0 && showSummaryBy !== null) {
              let total = 0;

              total = pageContent
                .map((el) => el[showSummaryBy])
                .reduce((a, b) => a + b);

              return (
                <Table.Summary.Row>
                  {Object.keys(pageContent[0]).map((el, i) => {
                    return (
                      <Table.Summary.Cell index={i} key={i}>
                        {i === 0 && "Нийт:"}
                        {el === showSummaryBy && total}
                      </Table.Summary.Cell>
                    );
                  })}
                  {/* <Table.Summary.Cell index={2} colSpan={Object.keys(pageContent[0]).length - 1}>{total}</Table.Summary.Cell> */}
                </Table.Summary.Row>
              );
            }
          }}
        />
      </Content>

      <MainModal
        title="Засах"
        visible={isShowEditModal}
        width="80%"
        footer={null}
        onCancel={onModalCancel}
      >
        <Form
          code={`${code}Create`}
          editData={editData}
          onFinishSuccess={onFinishSuccess}
        />
      </MainModal>
    </>
  );
};

export default Datatable;
