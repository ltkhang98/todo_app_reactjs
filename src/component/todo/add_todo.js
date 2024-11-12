import { Button, DatePicker, Form, Input, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddTodo = ({ handleAddTask }) => {
  const [Task, setTask] = useState("");
  const [TagTask, setTagTask] = useState("");
  const [Dealine, setDealine] = useState("");
  const [Description, setDescription] = useState("");
  const [form] = Form.useForm();

  const optionTag = [
    { label: "Success", value: "Success" },
    { label: "Failed", value: "Failed" },
  ];

  //   SET VALIDATE SUBMIT BUTTON
  const SubmitButton = ({ form, children }) => {
    const [submittable, setSubmittable] = React.useState(false);

    // Watch all values
    const values = Form.useWatch([], form);
    React.useEffect(() => {
      form
        .validateFields({
          validateOnly: true,
        })
        .then(() => setSubmittable(true))
        .catch(() => setSubmittable(false));
    }, [form, values]);
    return (
      <Button
        type="primary"
        htmlType="submit"
        onClick={() => handleAdd()}
        disabled={!submittable}
      >
        {children}
      </Button>
    );
  };

  const ResetForm = () => {
    document.getElementById("add-todo-form").reset();
    setTagTask("");
    setDescription("");
  };

  //   ADD NEW JOB TODO
  const notify = () => toast("Thêm công việc thành công");
  const handleAdd = (e) => {
    let todoItem = {
      id: Math.floor(Math.random() * 100000) + 1,
      task: Task,
      tag: TagTask,
      dealine: Dealine.format("MM/DD/YYYY"),
      description: Description,
    };
    // console.log(todoItem);
    notify();
    handleAddTask(todoItem);
    ResetForm();
  };

  return (
    <>
      <Form
        id="add-todo-form"
        name="wrap"
        labelCol={{
          flex: "110px",
        }}
        labelAlign="left"
        labelWrap
        wrapperCol={{
          flex: 1,
        }}
        colon={false}
        style={{
          maxWidth: 600,
        }}
        form={form}
      >
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          label="Công việc"
          name="todo"
        >
          <Input
            value={Task}
            onChange={(event) => {
              setTask(event.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Nội dung">
          <TextArea
            value={Description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            showCount
            maxLength={100}
            style={{ height: 120, resize: "none" }}
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          label="Trạng thái"
        >
          <Select value={TagTask} onChange={(value) => setTagTask(value)}>
            {optionTag.map((option) => (
              <Select.Option key={option.label} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          label="Thời gian"
          name="DatePicker"
        >
          <DatePicker onChange={(value) => setDealine(value)} />
        </Form.Item>
        <Form.Item label="">
          <Space>
            <SubmitButton form={form}>Thêm mới</SubmitButton>
            <Button htmlType="reset">Đặt lại</Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddTodo;
