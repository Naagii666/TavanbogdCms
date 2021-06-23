import { Form, Input, Select, DatePicker, Checkbox, InputNumber } from "antd";
import FormWrapper from "./FormWrapper";

const { Option } = Select;

const MultiFormBuild = ({ items, formCode }) => {

    return (
        <>
            <Form.Item style={{ margin: '0', height: '0px' }} name={formCode !== undefined ? [formCode, 'id'] : 'id'}><Input type="hidden" /></Form.Item>

            {
                items.map(el => {
                    switch (el.type) {
                        case 'text':
                            return (
                                <FormWrapper
                                    style={{ float: 'left', width: '120px' }}
                                    key={el.id}
                                    el={el}
                                    formCode={formCode}
                                    isMulti={true}>
                                    <Input placeholder={el.label} />
                                </FormWrapper>
                            );

                        case 'checkbox':
                            return (
                                <Form.Item
                                    wrapperCol={{ sm: 4 }}
                                    style={{ float: 'left', width: '100px' }}
                                    key={el.id}
                                    name={formCode !== undefined ? [formCode, el.name] : el.name}
                                    label={el.label}
                                    labelCol={{ order: 1, sm: 16 }}
                                    labelAlign="left"
                                    colon={false}
                                    valuePropName="checked"
                                >
                                    <Checkbox checked={false} />
                                </Form.Item>
                            );

                        case 'select':
                            return (
                                <FormWrapper style={{ float: 'left', width: '140px' }} key={el.id} el={el} formCode={formCode} isMulti={true}>
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
                                <FormWrapper style={{ float: 'left', width: '110px' }} key={el.id} el={el} formCode={formCode} isMulti={true}>
                                    <DatePicker placeholder="yyyy-mm-dd" style={{ display: 'block' }} />
                                </FormWrapper>
                            )

                        case 'datetime':
                            return (
                                <FormWrapper style={{ float: 'left', width: '140px' }} key={el.id} el={el} formCode={formCode} isMulti={true}>
                                    <DatePicker placeholder="yyyy-mm-dd hh24:mi:ss" showTime={true} style={{ display: 'block' }} />
                                </FormWrapper>
                            )

                        case 'password':
                            return (
                                <FormWrapper style={{ float: 'left', width: '100px' }} key={el.id} el={el} formCode={formCode} isMulti={true}>
                                    <Input.Password placeholder="******" />
                                </FormWrapper>
                            )

                        case 'amount':
                        case 'number':
                            return (
                                <FormWrapper style={{ float: 'left', width: '80px' }} key={el.id} el={el} formCode={formCode} isMulti={true}>
                                    <InputNumber placeholder={el.label} min={el.min} max={el.max} />
                                </FormWrapper>
                            )
                    }
                })
            }
        </>
    )
}

export default MultiFormBuild;