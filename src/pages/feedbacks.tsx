import * as React from 'react'
import {Table} from "antd";
import {useEffect, useState} from "react";
import {changeFeedbackStatus, FeedbackI, getFeedbacksList} from "./messages.service";
import {Checkbox} from 'antd';

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Имя пользователя',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'Id',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
    },
    {
        title: 'Сообщение',
        dataIndex: 'text',
        key: 'text',
    },
    {
        title: 'Статус заявки',
        dataIndex: 'status',
        key: 'status',
        render: (status: boolean, source: FeedbackI) => <Checkbox
            defaultChecked={status}
            onChange={(e) => changeFeedbackStatus({id: source.id, status: e.target.checked})}/>
    }

]
export const Feedbacks = () => {
    const [feedbacks, setFeedbacks] = useState<FeedbackI[]>([])

    useEffect(() => {
        getFeedbacksList().then(res => {
            if (res.status === 200) {
                setFeedbacks(res.data)
            }
        })
    }, [])
    return (
        <div style={{height: '100vh'}}>
            <Table dataSource={feedbacks} columns={columns}/>
        </div>
    )
}