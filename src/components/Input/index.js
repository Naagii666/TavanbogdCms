import { Form, Input } from "antd";

const CustomInput = ({ restField, label, name, fieldKey, placeholder, message }) => {
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
                },
            ]}
        >
            <Input allowClear={true} placeholder={placeholder} />
        </Form.Item>
    );
};

export default CustomInput;
