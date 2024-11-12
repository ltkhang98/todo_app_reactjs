import React from "react";
import { Input, Layout, theme, Button, Card, List, Row, Col } from "antd";
import TextArea from "antd/es/input/TextArea";

const { Content } = Layout;

const tasks = [
  {
    title: "Tên công việc",
    description: "Nội dung công việc",
    status: "Chưa bắt đầu",
  },
];

function TodoApp() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <div>
      <Layout>
        <Content style={{ padding: "100px 48px", height: "1050px" }}>
          <div
            style={{
              margin: 0,
              padding: 24,
              minHeight: 900,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Row gutter={16}>
              <Col span={6}>
                <h3>Thêm mới công việc</h3>
                <Input
                  placeholder="Tên công việc"
                  style={{ width: "300px", marginBottom: 10 }}
                />{" "}
                <br />
                <TextArea
                  placeholder="Mô tả công việc"
                  style={{ width: "300px", marginBottom: 10 }}
                />{" "}
                <br />
                <Button type="primary">Thêm mới</Button>
              </Col>
              <Col span={18}>
                <Row gutter={16}>
                  {/* Công việc mới */}
                  <Col span={8}>
                    <List
                      style={{ marginTop: 20 }}
                      grid={{ gutter: 16, column: 1 }}
                      dataSource={tasks}
                      renderItem={(item) => (
                        <List.Item>
                          <Card title={"Công việc mới"}>
                            <List>
                              <List.Item>
                                <Card
                                  style={{ width: "100%" }}
                                  title={item.title}
                                >
                                  {item.description}
                                </Card>
                              </List.Item>
                            </List>
                          </Card>
                        </List.Item>
                      )}
                    />
                  </Col>
                  {/* Công việc đang thực hiện */}
                  <Col span={8}>
                    <List
                      style={{ marginTop: 20 }}
                      grid={{ gutter: 16, column: 1 }}
                      dataSource={tasks}
                      renderItem={(item) => (
                        <List.Item>
                          <Card title={"Đang thực hiện"}>
                            <List>
                              <List.Item>
                                <Card
                                  style={{ width: "100%" }}
                                  title={item.title}
                                >
                                  {item.description}
                                </Card>
                              </List.Item>
                            </List>
                          </Card>
                        </List.Item>
                      )}
                    />
                  </Col>
                  {/* Công việc đã hoàn thành */}
                  <Col span={8}>
                    <List
                      style={{ marginTop: 20 }}
                      grid={{ gutter: 16, column: 1 }}
                      dataSource={tasks}
                      renderItem={(item) => (
                        <List.Item>
                          <Card title={"Hoàn thành"}>
                            <List>
                              <List.Item>
                                <Card
                                  style={{ width: "100%" }}
                                  title={item.title}
                                >
                                  {item.description}
                                </Card>
                              </List.Item>
                            </List>
                          </Card>
                        </List.Item>
                      )}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default TodoApp;
