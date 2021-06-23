import { Transfer, Table } from 'antd';
import difference from 'lodash/difference';

const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
    <Transfer
        {...restProps}
        locale={{
            searchPlaceholder: "Хайх",
            itemUnit: 'эрх',
            itemsUnit: "эрх",
            selectAll: 'Бүгдийг нь сонгох',
            selectInvert: false
        }}
        showSelectAll={false}>
        {({
            direction,
            filteredItems,
            onItemSelectAll,
            onItemSelect,
            selectedKeys: listSelectedKeys,
        }) => {
            const columns = direction === 'left' ? leftColumns : rightColumns;
            const title = direction === 'left' ? 'Тохируулаагүй эрх' : 'Тохируулсан эрх';
            const rowSelection = {
                onSelectAll(selected, selectedRows) {
                    const treeSelectedKeys = selectedRows
                        .filter(item => !item.disabled)
                        .map(({ key }) => key);
                    const diffKeys = selected
                        ? difference(treeSelectedKeys, listSelectedKeys)
                        : difference(listSelectedKeys, treeSelectedKeys);
                    onItemSelectAll(diffKeys, selected);
                },
                onSelect({ key }, selected) {
                    onItemSelect(key, selected);
                },
                selectedRowKeys: listSelectedKeys,
            };

            return (
                <>
                    <h3 style={{ marginLeft: '10px' }}>{title}</h3>
                    <Table
                        scroll={{ y: 300 }}
                        locale={{ emptyText: 'Бичлэг олдсонгүй.' }}
                        pagination={false}
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={filteredItems}
                        size="small"
                        onRow={({ key, disabled: itemDisabled }) => ({
                            onClick: () => {
                                onItemSelect(key, !listSelectedKeys.includes(key));
                            },
                        })}
                    />
                </>
            );
        }}
    </Transfer>
);

export default TableTransfer;