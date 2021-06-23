import { Form, Select } from "antd";

const { Option } = Select;

const CustomSelect = ({ restField, label, name, placeholder, fieldKey, options, message }) => {
    return (
        <Form.Item
            {...restField}
            label={label}
            name={name}
            fieldKey={fieldKey}
            rules={[
                {
                    required: message ? true : false,
                    message: message,
                }
            ]}
        >
            <Select placeholder={placeholder} style={{ width: 150 }}>
                {options.map(item => (
                    <Option key={item.key} value={item.key}>
                        {item.value}
                    </Option>
                ))}
            </Select>
        </Form.Item >

    );
};

export default CustomSelect;
