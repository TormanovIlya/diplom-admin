import {Button, Form, Input, Space, Table} from 'antd';
import * as React from 'react'
import {FunctionComponent, useEffect, useState} from "react";
import TextArea from "antd/es/input/TextArea";
import axios from 'axios';
import {config} from "../config";
import {ErrorNotifications, SuccessNotifications} from "../norifications/notifications";
import {DeleteOutlined} from "@ant-design/icons";
import {useModal} from "../App";

export interface NavlinksI {
    id: number,
    title: string,
    description: string
}

export const Navlinks: FunctionComponent = () => {
    const [navlinks,setNavLinks] = useState<NavlinksI[]>([]);
    const modal = useModal()
    const [form] = Form.useForm();
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Заголовок',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Описание',
            dataIndex: 'description',
            key: 'description',
            render: (data:NavlinksI) => <div style={{overflow: 'hidden'}}>{data}</div>
        },
        {
            dataIndex: 'id',
            render: (id: number) => <Button shape="circle" onClick={() => deleteLinks([id])} icon={<DeleteOutlined/>}/>
        },
        {
            render: (data: NavlinksI) => <Button onClick={() => {
                modal.setShowModal(true)
                modal.setData({target: data, key: 'editLinks'})
            }}>Edit</Button>
        },
    ]

    useEffect(()=>{
        axios.get<NavlinksI[]>(`${config.host}:${config.api_port}/${config.endpoints.navlinks}`).then(res=>{
            setNavLinks(res.data)
        })
            .catch(()=>ErrorNotifications('Произошла ошибка при получении списка ссылок'))
    },[])

    const deleteLinks = async (arr: number[])=>{
        await axios.delete(`${config.host}:${config.api_port}/${config.endpoints.navlinks}`,{data: {ids: arr}}).then(res=>{
            if(res.status === 200){
                SuccessNotifications('Ссылка успешно удалена')
            }
        }).catch(()=>ErrorNotifications('Произошла ошибка при удалении ссылки'))
    }
    const submit = async () => {
        try{
            await form.validateFields();
            const data = await form.validateFields();
            console.log(data);
            const body = {title: data.title, description: data.description};
            await axios.post(`${config.host}:${config.api_port}/${config.endpoints.navlinks}`,body).then(res=>{
                if(res.status === 201){
                    SuccessNotifications('Навигационная ссылка успешно создана')
                }
            })
        }
        catch (e) {
            ErrorNotifications('Произошла ошибка при создании навигационной ссылки')
        }
    }
    return(
        <div style={{height: '100vh'}}>
            <Form form={form} initialValues={{title: '', description: ''}}>
                <Space style={{padding: '30px'}} direction={'vertical'}>
                    <Form.Item name={'title'} label={'Заголовок'} rules={[{required: true}]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={'description'} label={'Описание'} rules={[{required: true}]}>
                        <TextArea/>
                    </Form.Item>
                    <Button type={'primary'} onClick={submit}>Создать ссылку</Button>
                </Space>
            </Form>
            <Table dataSource={navlinks} columns={columns}/>
        </div>
    )
}