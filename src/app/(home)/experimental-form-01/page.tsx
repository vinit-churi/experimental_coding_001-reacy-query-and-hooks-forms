"use client";
import React from "react";
// import { prettyPrintJson } from "pretty-print-json";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";

type inputs = {
  name: string;
  checkbox: false;
};

const Page = () => {
  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
  } = useForm<inputs>();

  const onSubmit: SubmitHandler<inputs> = (data) => {
    console.log(data);
    console.log(dirtyFields);
  };

  // console.log(watch("name"));

  // const data = {
  //   name: watch("name"),
  // };
  // const prettifiedOutput = prettyPrintJson.toHtml(data, {});
  return (
    <div>
      <h3 className="text-center text-xl py-4">Experimental Form 01</h3>
      <p className="text-center">
        Form with a single input field and a submit button.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          className="block mx-auto border-2 border-gray-300 p-2 my-4"
          placeholder="Enter your name"
          {...register("name", { required: true })}
        ></input>
        {errors.name && (
          <p className="text-red-500 text-center">This field is required</p>
        )}
        <Controller
          name="checkbox"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <Checkbox
              checked={field.value}
              sx={{
                width: "max-content",
                display: "block",
                margin: "0px auto",
              }}
              onChange={(
                event: React.ChangeEvent<HTMLInputElement>,
                checked: boolean
              ) => field.onChange(event)}
            />
          )}
        />
        <input
          type="submit"
          className="block mx-auto bg-blue-500 text-white p-2 my-4"
          value="Submit"
        ></input>
      </form>
      {/* <div
        className="text-center"
        dangerouslySetInnerHTML={{ __html: prettifiedOutput }}
      /> */}
      <div className="bg-blue-100 text-blue-600 p-5 rounded-lg mx-auto w-max">
        <p className="uppercase underline">My learning</p>
        <p>understood the basic features of react hooks forms</p>
      </div>
    </div>
  );
};

export default Page;
