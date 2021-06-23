import { Form, Input, Select, DatePicker, Checkbox, InputNumber, Upload, Button } from "antd";
import { SelectOutlined } from "@ant-design/icons";
import FormWrapper from "./FormWrapper";
import { dateTimePickerLocale } from "@constants/constants";

const { Option } = Select;

const FormBuild = ({ items, formCode, form }) => {

    const selectImageProps = {
        onRemove: (file) => {
          setFile(null);
        },
        beforeUpload: (file) => {
          const fileWhiteList = ["image/png", "image/jpg", "image/jpeg"];
          if (fileWhiteList.filter(el => el === file.type).length === 0) {
            message.error(`Файл нь дараах форматуудын нэг байх ёстой. ${fileWhiteList.map(el => el.split("/")[1])}`);
            return Upload.LIST_IGNORE;
          }
          
          return false;
        },
    };

    return (
        <>
            <Form.Item style={{ margin: '0', height: '0px' }} name={formCode !== undefined ? [formCode, 'id'] : 'id'}><Input type="hidden" /></Form.Item>

            {
                items.map(el => {
                    switch (el.type) {
                        case 'text':
                            return (
                                <FormWrapper key={el.id} el={el} formCode={formCode}>
                                    <Input placeholder={el.label} />
                                </FormWrapper>
                            );

                        case 'checkbox':
                            return (
                                <Form.Item
                                    wrapperCol={{ offset: 8, sm: 1, flex: 'auto' }}
                                    key={el.id}
                                    name={formCode !== undefined ? [formCode, el.name] : el.name}
                                    label={el.label}
                                    labelCol={{ order: 1, sm: 14 }}
                                    labelAlign="left"
                                    colon={false}
                                    valuePropName="checked"
                                >
                                    <Checkbox checked={false} />
                                </Form.Item>
                            );

                        case 'select':
                            return (
                                <FormWrapper key={el.id} el={el} formCode={formCode}>
                                    <Select
                                        showSearch
                                        allowClear
                                        placeholder={`-${el.label} сонгох-`}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }>
                                        {
                                            el.opts.map(opt => (
                                                <Option key={opt.id} value={opt.id}>
                                                    {opt.name}
                                                </Option>
                                            ))
                                        }
                                    </Select>
                                </FormWrapper>
                            );

                        case 'date':
                            return (
                                <FormWrapper key={el.id} el={el} formCode={formCode}>
                                    <DatePicker placeholder="yyyy-mm-dd" style={{ display: 'block' }} />
                                </FormWrapper>
                            )

                        case 'datetime':
                            return (
                                <FormWrapper key={el.id} el={el} formCode={formCode}>
                                    <DatePicker 
                                        placeholder="yyyy-mm-dd hh:mm:ss" 
                                        showTime={{ format: 'HH:mm:ss' }}
                                        format="YYYY-MM-DD HH:mm:ss" 
                                        style={{ display: 'block' }} 
                                        locale={dateTimePickerLocale}
                                    />
                                </FormWrapper>
                            )

                        case 'password':
                            return (
                                <FormWrapper key={el.id} el={el} formCode={formCode}>
                                    <Input.Password placeholder="******" />
                                </FormWrapper>
                            )

                        case 'amount':
                        case 'number':
                            return (
                                <FormWrapper key={el.id} el={el} formCode={formCode}>
                                    <InputNumber placeholder={el.label} min={el.min} max={el.max} />
                                </FormWrapper>
                            )

                        case 'textarea':
                            return (
                                <FormWrapper key={el.id} el={el} formCode={formCode}>
                                    <Input.TextArea placeholder={el.label} autoSize={{ minRows: 3, maxRows: 5 }} />
                                </FormWrapper>
                            )

                        case 'base64':
                            return (
                                <FormWrapper key={el.id} el={el} formCode={formCode} valuePropName="file" form={form}>
                                    <Upload {...selectImageProps} maxCount={1} showUploadList={{showRemoveIcon: false}} >
                                        <Button icon={<SelectOutlined />}>Сонгох</Button>
                                    </Upload>
                                </FormWrapper>
                            )
                    }
                })
            }
        </>
    )
}

export default FormBuild;