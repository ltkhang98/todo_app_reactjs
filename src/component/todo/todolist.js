import React, { useState } from "react";
import { Space, Table, Modal } from "antd";
import { Button, Tag } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { TaskData } from "./data";

const Todolist = () => {
  const [TaskList, setTaskList] = useState(TaskData);
  const [TaskDetail, setTaskDetail] = useState(null);
  const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "TASK",
      dataIndex: "task",
      key: "task",
    },
    {
      title: "DEALINE",
      dataIndex: "dealine",
      key: "dealine",
    },
    {
      title: "TAG",
      dataIndex: "tag",
      key: "tag",
    },

    {
      title: "ACTION",
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              onViewModalTask(record);
            }}
          >
            <FileTextOutlined /> View
          </Button>
          <Button>
            <EditOutlined /> Edit
          </Button>
          <Button>
            <DeleteOutlined type="dange" /> Delete
          </Button>
        </Space>
      ),
    },
  ];
  const onViewModalTask = (record) => {
    setIsModalOpenDetail(true);
    setTaskDetail({ ...record });
  };
  return (
    <>
      <Table rowKey="id" dataSource={TaskList} columns={columns}></Table>
      <Modal
        open={isModalOpenDetail}
        onCancel={() => {
          setIsModalOpenDetail(false);
        }}
      >
        <h3>Task : {TaskDetail?.task}</h3>
        <p>Description : {TaskDetail?.description}</p>
        <p>Deadline : {TaskDetail?.dealine}</p>
        {TaskDetail?.tag === "Success" ? (
          <Tag color="#87d068">{TaskDetail?.tag}</Tag>
        ) : (
          <Tag color="red">{TaskDetail?.tag}</Tag>
        )}
      </Modal>
    </>
  );
};

export default Todolist;
