import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Space, Table } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import AddPostModal from "./addPost";

const PostList = () => {
  const [dataPost, setDataPost] = useState([]);
  const [postDetail, setPostDetail] = useState(null);
  const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
  const getPostAPI = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    setDataPost(res.data);
  };

  useEffect(() => {
    getPostAPI();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "USER ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "TITLE",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "BODY",
      dataIndex: "body",
      key: "body",
    },
    {
      title: "ACTION",
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              onViewModalPost(record);
            }}
          >
            <FileTextOutlined /> Chi tiết
          </Button>
        </Space>
      ),
    },
  ];

  const onViewModalPost = (record) => {
    setIsModalOpenDetail(true);
    setPostDetail({ ...record });
  };

  return (
    <div>
      <AddPostModal />
      <Table rowKey="id" dataSource={dataPost} columns={columns}></Table>
      <Modal
        open={isModalOpenDetail}
        onCancel={() => {
          setIsModalOpenDetail(false);
        }}
      >
        <h3>ID : {postDetail?.id}</h3>
        <p>Title : {postDetail?.title}</p>
        <p>Body : {postDetail?.body}</p>
      </Modal>
    </div>
  );
};

export default PostList;
