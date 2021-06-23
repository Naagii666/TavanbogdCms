import React from "react";
import MainLayout from "@components/layouts/MainLayout";
import Form from "@components/Form";
import { useRouter } from "next/router";

const CustomForm = () => {
    const router = useRouter();
    const code = router.query.code
    if (code === undefined) {
        return <></>;
    }

    return (
        <MainLayout>
            <Form code={code} />
        </MainLayout>
    );
};

export default CustomForm;
