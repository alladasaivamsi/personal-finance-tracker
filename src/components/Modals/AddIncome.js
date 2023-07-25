import React from "react";
import { Button, Modal, Form, Input, DatePicker, Select } from "antd";

function AddIncome({ isIncomeModalVisible, handleIncomeCancel, onFinish }) {
  const [form] = Form.useForm();
  return (
    <Modal
      style={{ fontWeight: "600", width: "100%" }}
      title="Add Income"
      open={isIncomeModalVisible}
      onCancel={handleIncomeCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "income");
          form.resetFields();
        }}
      >
        <Form.Item
          style={{ fontWeight: "600", width: "100%" }}
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input the name of the transaction!",
            },
          ]}
        >
          <Input
            style={{
              border: "none",
              borderRadius: "0px",
              borderBottom: "1px solid black",
              outline: "none",
            }}
            type="text"
            className="custom-input"
          />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: "600", width: "100%" }}
          label="Amount"
          name="amount"
          rules={[
            { required: true, message: "Please input the income amount!" },
          ]}
        >
          <Input
            style={{
              border: "none",
              borderRadius: "0px",
              borderBottom: "1px solid black",
              outline: "none",
            }}
            type="number"
            className="custom-input"
          />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: "600", width: "100%" }}
          label="Date"
          name="date"
          rules={[
            { required: true, message: "Please select the income date!" },
          ]}
        >
          <DatePicker
            style={{
              border: "none",
              borderRadius: "0px",
              borderBottom: "1px solid black",
              outline: "none",
              width: "100%",
            }}
            format="YYYY-MM-DD"
            className="custom-input"
          />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: "600", width: "100%" }}
          label="Tag"
          name="tag"
          rules={[{ required: true, message: "Please select a tag!" }]}
        >
          <Select className="select-input-2">
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="freelance">Freelance</Select.Option>
            <Select.Option value="investment">Investment</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button className="btn btn-blue" type="primary" htmlType="submit">
            Add Income
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddIncome;
