import {
    EyeOutlined,
} from '@ant-design/icons';
import { Col, Image, Row } from 'antd';
import Datatable from "@components/Datatable";
import MainLayout from "@components/layouts/MainLayout";
import MainModal from "@components/MainModal";
import { sList, apiList } from "@api/api";
import { useContext, useState } from 'react';
import Context from '@context/Context';
import { useRouter } from 'next/router';

const AccountRequest = () => {
    const router = useRouter();
    const code = router.query.code
    if (code === undefined) {
        return <></>;
    }
    const ctx = useContext(Context);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [fileList, setFileList] = useState({});

    const handleDtAction = async (type, _record) => {
        if (type === 'showImage') {
            ctx.setIsLoading(true);
            const res = await sList({ code: apiList.moreUserFileList, customFilter: [{ key: "user_id", val: _record.id }] });
            setFileList(res?.data);
            setIsModalVisible(true);
            ctx.setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setFileList({});
    };

    return (
        <MainLayout>
            <Datatable
                title={code}
                code={code}
                addOperations={ctx.state.permissions.NEWS_CREATE ? [
                    {
                        title: 'Зураг',
                        color: '#109720',
                        key: 'showImage',
                        icon: EyeOutlined
                    }
                ] : []}
                handleDtAction={handleDtAction} opWidth='10%'
            />

            <MainModal
                title='Зураг'
                visible={isModalVisible}
                footer={null}
                onCancel={handleCancel}
                width='1000px'
            >
                {fileList.length > 0 && fileList.map((file) => {
                    return (
                        <Row gutter={16}>
                            <Col span={8}>
                                <h2>{file.type_name}</h2>
                            </Col>
                            <Col span={8}>
                                <Image
                                    width={100}
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${file.image_path}`}
                                />
                            </Col>
                        </Row>
                    )
                })}
            </MainModal>
        </MainLayout>
    );
};

export default AccountRequest;
