import React from "react";
import { Button, Modal, Form, Input, DatePicker, Select } from "antd";

function AddExpense({ isExpenseModalVisible, handleExpenseCancel, onFinish }) {
  const [form] = Form.useForm();
  return (
    <Modal
      style={{ fontWeight: "600", width: "100%" }}
      title="Add Expense"
      open={isExpenseModalVisible}
      onCancel={handleExpenseCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "expense");
          form.resetFields();
        }}
      >
        <Form.Item
          style={{
            fontWeight: "600",
            width: "100%",
            border: "none",
            outline: "none",
          }}
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
            type="text"
            className="custom-input"
            style={{
              border: "none",
              borderRadius: "0px",
              borderBottom: "1px solid black",
              outline: "none",
            }}
          />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: "600", width: "100%" }}
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              message: "Please input the expense amount!",
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
            type="number"
            className="custom-input"
          />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: "600", width: "100%" }}
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please select the expense date!",
            },
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
            className="custom-input"
            format="YYYY-MM-DD"
          />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600, width: "100%" }}
          label="Tag"
          name="tag"
          rules={[{ required: true, message: "Please select a tag!" }]}
        >
          <Select className="select-input-2">
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="education">Education</Select.Option>
            <Select.Option value="office">Office</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button className="btn btn-blue" type="primary" htmlType="submit">
            Add Expense
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddExpense;
