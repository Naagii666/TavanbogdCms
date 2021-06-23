import { Form, Checkbox } from "antd";
import { useState } from "react";

const CustomCheckbox = ({ label, name, fieldKey, layout, restField }) => {
    const [isChecked, setIsChecked] = useState(false);

    const onChange = e => {
        setIsChecked(e.target.checked);
    };

    return (
        <Form.Item
            {...layout}
            {...restField}
            name={name}
            fieldKey={fieldKey}
            valuePropName="checked"
        >
            <Checkbox onChange={onChange} checked={isChecked}>{label}</Checkbox>
        </Form.Item>
    );
};

export default CustomCheckbox;
