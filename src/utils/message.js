import { notification } from 'antd';
import { messageType } from '@constants/constants'

const showMessage = (type, description) => {
    const t = messageType[type.toUpperCase()];
    notification[t.msgType]({
        message: t.title,
        description
    });
}

export {
    showMessage
}