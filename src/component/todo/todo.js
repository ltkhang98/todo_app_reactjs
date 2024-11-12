import React, { useState } from "react";
import {
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import { Button, Tag } from "antd";
import { TaskData } from "./data";
import AddTodo from "./add_todo";
import {
  DeleteOutlined,
  EditOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const TodoComponent = () => {
  const [TaskList, setTaskList] = useState(TaskData);
  const [TaskDetail, setTaskDetail] = useState(null);
  const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Công việc",
      dataIndex: "task",
      key: "task",
    },
    {
      title: "Nội dung",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Thời gian",
      dataIndex: "dealine",
      key: "dealine",
    },
    {
      title: "Trạng thái",
      dataIndex: "tag",
      key: "tag",
    },

    {
      title: "Hành động",
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              onViewModalTask(record);
            }}
          >
            <FileTextOutlined /> Chi tiết
          </Button>
          <Button
            type="primary"
            onClick={() => {
              onModalEditTask(record);
            }}
          >
            <EditOutlined /> Chỉnh sửa
          </Button>
          <Popconfirm
            title="Xóa công việc"
            description="Bạn chắc chắn muốn xóa công việc này?"
            onConfirm={() => {
              handleDeleteTask(record);
            }}
            okText="Xóa"
            cancelText="Không"
          >
            <Button danger>
              <DeleteOutlined type="danger" /> Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  // Add new Task
  const handleAddTask = (todo) => {
    setTaskList([...TaskList, todo]);
  };

  // Modal View Detail Task
  const onViewModalTask = (record) => {
    setIsModalOpenDetail(true);
    setTaskDetail({ ...record });
  };
  // Delete Task
  const notify = () => toast("Xóa công việc thành công");
  const handleDeleteTask = (record) => {
    // Modal.confirm({
    //   title: "Bạn có muốn xóa công việc này không ?",
    //   onOk: () => {
    //     setTaskList((pre) => {
    //       return pre.filter((item) => item.id !== record.id);
    //     });
    //   },
    // });
    setTaskList((pre) => {
      return pre.filter((item) => item.id !== record.id);
    });
    notify();
  };

  // Modal Edit task
  const onModalEditTask = (record) => {
    setIsModalOpenEdit(true);
    setEditTask({ ...record });
  };

  const resetEdit = () => {
    setIsModalOpenEdit(false);
    setEditTask(null);
  };

  const optionTag = [
    { label: "Hoàn thành", value: "Hoàn thành" },
    { label: "Thất bại", value: "Thất bại" },
  ];

  return (
    <div>
      <Row>
        <Col span={8}>
          <h3>Thêm mới công việc</h3>
          <AddTodo handleAddTask={handleAddTask}></AddTodo>
        </Col>
        <Col span={16} style={{ paddingLeft: 20 }}>
          <Table rowKey="id" dataSource={TaskList} columns={columns}></Table>

          {/* View Detail Task */}
          <Modal
            open={isModalOpenDetail}
            onCancel={() => {
              setIsModalOpenDetail(false);
            }}
          >
            <h3>Task : {TaskDetail?.task}</h3>
            <p>Description : {TaskDetail?.description}</p>
            <p>Deadline : {TaskDetail?.dealine}</p>
            {TaskDetail?.tag === "Hoàn thành" ? (
              <Tag color="#87d068">{TaskDetail?.tag}</Tag>
            ) : (
              <Tag color="red">{TaskDetail?.tag}</Tag>
            )}
          </Modal>
          <Modal
            open={isModalOpenEdit}
            onCancel={() => {
              resetEdit(false);
            }}
            okText="Chỉnh sửa"
            onOk={() => {
              setTaskList((pre) => {
                return pre.map((task) => {
                  if (task.id === editTask.id) {
                    return editTask;
                  } else {
                    return task;
                  }
                });
              });
              resetEdit();
            }}
          >
            <h3>Chỉnh sửa Task</h3>
            <Form>
              <Form.Item label="Công việc">
                <Input
                  value={editTask?.task}
                  onChange={(e) => {
                    setEditTask((pre) => {
                      return { ...pre, task: e.target.value };
                    });
                  }}
                ></Input>
              </Form.Item>
              <Form.Item label="Nội dung">
                <TextArea
                  value={editTask?.description}
                  showCount
                  maxLength={100}
                  style={{ height: 120, resize: "none" }}
                  onChange={(e) => {
                    setEditTask((pre) => {
                      return { ...pre, description: e.target.value };
                    });
                  }}
                />
              </Form.Item>
              <Form.Item label="Trạng thái">
                <Select
                  value={editTask?.tag}
                  onChange={(e) => {
                    setEditTask((pre) => {
                      return { ...pre, tag: e };
                    });
                  }}
                >
                  {optionTag.map((option) => (
                    <Select.Option key={option.label} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Thời gian">
                <DatePicker
                  allowClear={false}
                  value={dayjs(editTask?.dealine) || null}
                  onChange={(e) => {
                    setEditTask((pre) => {
                      return {
                        ...pre,
                        dealine: e.format("YYYY-MM-DD"),
                      };
                    });
                  }}
                />
              </Form.Item>
            </Form>
          </Modal>
        </Col>
      </Row>
    </div>
  );
};

export default TodoComponent;
