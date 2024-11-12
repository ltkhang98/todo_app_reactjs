import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";

function NameList() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    getUserAPI();
    getUserById();
  }, []);

  // get all users
  const getUserAPI = async () => {
    const res = await axios.get("https://dummyjson.com/users");
    setData(res.data.users);
  };

  // get user by ID
  const getUserById = async () => {
    const res = await axios.get("https://dummyjson.com/users/3");
    setUser(res.data);
  };
  // console.log(user);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "NAME",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "AGE",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "PHONE",
      dataIndex: "phone",
      key: "phone",
    },
  ];
  return (
    <div>
      <Table rowKey="id" dataSource={data} columns={columns}></Table>
      <div>
        <header>User by ID</header>
        <p>ID: {user.id}</p>
        <p>Name: {user.firstName}</p>
        <p>Age: {user.age}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
      </div>
    </div>
  );
}

export default NameList;
