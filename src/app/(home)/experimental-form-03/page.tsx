"use client";
import DraggableExample from "@/components/common/DraggableExample";
import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

const initialData = [
  {
    type: "text",
    name: "firstName",
    label: "First Name",
    defaultValue: "",
    rules: { required: "First Name is required" },
    style: "full", // "full" | "half"
    order: 1,
  },
  {
    type: "autocomplete",
    name: "employees",
    defaultValue: "",
    label: "Employees",
    optionsProvided: false,
    options: null, // null | [option1, option2] ... etc structure { value: 'value', label: 'label', id: 'id'}
    // if options is null, optionsFetchUrl is required
    optionsFetchUrl: "https://jsonplaceholder.typicode.com/users",
    rules: { required: "Employees is required" },
    style: "full", // "full" | "half"
  },
  {
    type: "select",
    name: "department",
    defaultValue: "",
    label: "Department",
    options: [
      { value: "engineering", label: "Engineering" },
      { value: "hr", label: "HR" },
      { value: "finance", label: "Finance" },
    ],
    style: "full", // "full" | "half"
  },
  {
    type: "checkbox",
    name: "isDirector",
    defaultValue: false,
    label: "Is Director",
    style: "full", // "full" | "half"
  },
  {
    type: "radio",
    name: "paymentType",
    defaultValue: "",
    label: "Payment Type",
    options: [
      { value: "monthly", label: "Monthly" },
      { value: "yearly", label: "Yearly" },
    ],
    rules: { required: "Payment Type is required" },
    style: "full", // "full" | "half"
  },
  {
    type: "date",
    name: "joiningDate",
    defaultValue: "",
    label: "Joining Date",
    rules: { required: "Joining Date is required" },
    style: "full", // "full" | "half"
  },
  {
    type: "text",
    name: "lastName",
    label: "Last Name",
    defaultValue: "",
    rules: { required: "Last Name is required" },
    style: "full", // "full" | "half"
  },
  {
    type: "email",
    name: "email",
    label: "Email",
    defaultValue: "",
    rules: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "invalid email address",
      },
    },
    style: "full", // "full" | "half"
  },
  {
    type: "password",
    name: "password",
    label: "Password",
    defaultValue: "",
    rules: { required: "Password is required" },
    style: "full", // "full" | "half"
  },
  {
    type: "select",
    name: "gender",
    label: "Gender",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
    ],
    defaultValue: "",
    rules: { required: "Gender is required" },
    style: "full", // "full" | "half"
  },
];

const Page = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm();

  const submit: SubmitHandler<Record<string, unknown>> = (data) => {
    console.log(data);
  };

  return (
    <div onSubmit={handleSubmit(submit)}>
      <h2 className="text-2xl font-bold text-center my-4">
        Experimental form 3
      </h2>
      <form></form>
      <DraggableExample />
    </div>
  );
};

export default Page;
