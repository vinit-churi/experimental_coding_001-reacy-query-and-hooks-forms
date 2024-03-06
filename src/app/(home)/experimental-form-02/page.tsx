"use client";
import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Checkbox from "@mui/material/Checkbox";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required(),
  isValid: yup.boolean().required().oneOf([true], "This field is required"),
  isInvalid: yup.boolean().required(),
  isDirector: yup.boolean().required(),
  isMonthly: yup.boolean().required(),
  isYearly: yup.boolean().required(),
});

type TFormInputs = {
  name: string;
  isValid: boolean;
  isInvalid: boolean;
  isDirector: boolean;
  isMonthly: boolean;
  isYearly: boolean;
};

const Page = () => {
  const {
    control,
    register,
    formState: { errors, dirtyFields, isSubmitting },
    handleSubmit,
  } = useForm<TFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      isValid: false,
      isInvalid: false,
      isDirector: false,
      isMonthly: false,
      isYearly: false,
    },
  });

  const submit: SubmitHandler<TFormInputs> = (data) => {
    console.log(data);
    console.log(dirtyFields);
  };

  return (
    <div className="h-full w-full flex items-center flex-col gap-2">
      <h3 className="text-center text-xl py-4">Experimental Form 02</h3>
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-2">
        <input
          type="text"
          {...register("name")}
          className="border h-8 rounded-md px-2 w-52 mx-auto"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <div className="flex gap-2 mx-auto items-center w-56 justify-between">
          <label>Is valid</label>
          <Controller
            name="isValid"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
        </div>
        {errors.isValid && (
          <p className="text-red-500">{errors.isValid.message}</p>
        )}
        <div className="flex gap-2 mx-auto items-center w-56 justify-between">
          <label>Is invalid</label>
          <Controller
            name="isInvalid"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
        </div>
        <div className="flex gap-2 mx-auto items-center w-56 justify-between">
          <label>is director</label>
          <Controller
            name="isDirector"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
        </div>
        <div className="flex gap-2 mx-auto items-center w-56 justify-between">
          <label>is monthly</label>
          <Controller
            name="isMonthly"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
        </div>
        <div className="flex gap-2 mx-auto items-center w-56 justify-between">
          <label>Is yearly</label>
          <Controller
            name="isYearly"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
        </div>
        <input
          type="submit"
          className="bg-blue-500 text-white rounded-lg w-max px-4 text-sm py-1 mx-auto cursor-pointer outline-dotted border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:border-blue-500 transition-colors duration-300 ease-in-out"
        />
      </form>
      <div className="bg-blue-100 text-blue-600 p-5 rounded-lg mx-auto w-max">
        <p className="uppercase underline">My learning</p>
        <p className="max-w-56">
          Understanding how to use react-hook-form with yup for validation with
          controlled and uncontrolled components
        </p>
      </div>
    </div>
  );
};

export default Page;
