import { Button, Form, Input, Modal, Space } from "antd";
import React, { useState } from "react";
import { FileTextOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { toast } from "react-toastify";

const AddPostModal = () => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [post, setPost] = useState([
    {
      userId: "",
      title: "",
      body: "",
    },
  ]);

  const notify = () => toast("Thêm thành công");

  const handlePost = (e) => {
    const newPost = { ...post };
    newPost[e.target.id] = e.target.value;
    setPost(newPost);
  };

  const submitPost = () => {
    axios
      .post(url, {
        userId: post.userId,
        title: post.title,
        body: post.body,
      })
      .then((res) => {
        notify();
        console.log(" Thêm thành công : " + res.data.title);
      });

    setPost("");
    setIsModalOpenAdd(false);
  };

  const onAddPost = () => {
    setIsModalOpenAdd(true);
  };
  return (
    <>
      <Space size="middle">
        <Button type="primary" onClick={onAddPost}>
          <FileTextOutlined /> Thêm mới
        </Button>
      </Space>
      <Modal
        open={isModalOpenAdd}
        onCancel={() => {
          setIsModalOpenAdd(false);
        }}
        okText="Thêm mới"
        cancelText="Hủy"
        onOk={() => submitPost()}
      >
        <h3>Thêm mới</h3>
        <Form
          id="post-form"
          name="wrap"
          labelCol={{
            flex: "110px",
          }}
          labelAlign="left"
          labelWrap
          wrapperCol={{
            flex: 1,
          }}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            label="User ID"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              value={post.userId}
              id="userId"
              onChange={(e) => handlePost(e)}
            />
          </Form.Item>
          <Form.Item
            label="Tiêu đề"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              value={post.title}
              id="title"
              onChange={(e) => handlePost(e)}
            />
          </Form.Item>
          <Form.Item label="Nội dung" rules={[{ required: true }]}>
            <TextArea
              id="body"
              value={post.body}
              onChange={(e) => handlePost(e)}
              showCount
              maxLength={100}
              style={{ height: 200, resize: "none" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddPostModal;
