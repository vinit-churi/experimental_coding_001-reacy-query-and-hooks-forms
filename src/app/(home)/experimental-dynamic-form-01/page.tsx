"use client";
import React, { useCallback } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Autocomplete from "@mui/material/Autocomplete";
import {
  Select,
  MenuItem,
  Divider,
  TextField,
  Checkbox,
  Radio,
  FormControlLabel,
  Box,
  Grid,
  Typography,
  InputLabel,
  FormControl,
  Button,
  SelectChangeEvent,
  RadioGroup,
} from "@mui/material";

import ExperimentalDragAndSort from "@/components/common/ExperimentalDragAndSort";

import { prettyPrintJson } from "pretty-print-json";

type FieldAttributes = "helperText" | "options";
type TFieldTypes =
  | "text"
  | "number"
  | "checkbox"
  | "radio"
  | "select"
  | "autocomplete";

type FieldTypeFieldsType = {
  text: FieldAttributes[];
  number: FieldAttributes[];
  checkbox: FieldAttributes[];
  radio: FieldAttributes[];
  select: FieldAttributes[];
  autocomplete: FieldAttributes[];
};

const FieldTypeFields: FieldTypeFieldsType = {
  text: ["helperText"],
  number: ["helperText"],
  checkbox: ["helperText"],
  radio: ["helperText", "options"], // options for the radio button
  select: ["helperText", "options"], // options for the radio button
  autocomplete: ["helperText", "options"], // schema of the options and the url (don't include the base url) from which I will fetch this options | options json for the autocomplete.
};

const Page = () => {
  const [fields, setFields] = React.useState<Record<string, string>[]>([]);
  const [fieldType, setFieldType] = React.useState<TFieldTypes>("text");
  const [fieldLabel, setFieldLabel] = React.useState<string>("");
  const [options, setOptions] = React.useState<string[]>([]);
  const [helperText, setHelperText] = React.useState<string>("");
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [editIndex, setEditIndex] = React.useState<number>(0);

  const handleAdd = () => {
    setFields((prev) => [
      ...prev,
      {
        fieldType,
        label: fieldLabel,
        helperText,
        options: options.join(";"),
      },
    ]);
    setFieldType("text");
    setOptions([]);
    setHelperText("");
    setFieldLabel("");
  };

  const handleUpdateField = useCallback(() => {
    const index = editIndex;
    setFields((prev) => {
      prev[index] = {
        fieldType,
        label: fieldLabel,
        helperText,
        options: options.join(";"),
      };
      return prev;
    });
    setIsEdit(false);
    setFieldType("text");
    setOptions([]);
    setHelperText("");
    setFieldLabel("");
  }, [editIndex, fieldLabel, fieldType, helperText, options]);

  function handleCancelEdit() {
    setIsEdit(false);
    setFieldType("text");
    setOptions([]);
    setHelperText("");
    setFieldLabel("");
  }

  function makeEditAble(index: number) {
    const field = fields[index];
    setFieldType(field.fieldType as TFieldTypes);
    setFieldLabel(field.label);
    setHelperText(field.helperText);
    setOptions(field.options.split(";"));
    setIsEdit(true);
    setEditIndex(index);
  }

  function handleDeleteField(index: number) {
    setFields((prev) => {
      const newList = prev.filter((_, i) => i !== index);
      //   prev.splice(index, 1);
      //   return prev;
      return newList;
    });
  }

  return (
    <div>
      <h2 className="text-center text-xl font-bold my-3 mt-5">
        Dynamic form generation by admin ver 1
      </h2>
      <div className="bg-blue-200 rounded-md w-auto p-5 m-5 text-blue-600">
        <h2>Form builder</h2>
        <Divider color="blue" />
        <div className="flex gap-2 mt-3">
          <div className="flex flex-[1_1_70%] bg-blue-50 rounded-md p-4">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label="From Title" variant="filled" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <Divider color="blue" />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Field details</Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Field type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Field type"
                    value={fieldType}
                    onChange={(e: SelectChangeEvent<TFieldTypes>) =>
                      setFieldType(e.target.value as TFieldTypes)
                    }
                  >
                    <MenuItem value="text">Text</MenuItem>
                    <MenuItem value="number">Number</MenuItem>
                    <MenuItem value="checkbox">Checkbox</MenuItem>
                    <MenuItem value="radio">Radio</MenuItem>
                    <MenuItem value="select">Select</MenuItem>
                    <MenuItem value="autocomplete">Auto complete</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={fieldLabel}
                  onChange={(e) => setFieldLabel(e.target.value)}
                  label="Field label"
                  variant="filled"
                  fullWidth
                />
              </Grid>
              {FieldTypeFields[fieldType]
                ? FieldTypeFields[fieldType].map((field, index) => (
                    <Grid item xs={12} key={index}>
                      <TextField
                        label={field}
                        variant="filled"
                        value={
                          field === "helperText"
                            ? helperText
                            : options.join(";")
                        }
                        onChange={(e) =>
                          field === "helperText"
                            ? setHelperText(e.target.value)
                            : setOptions(e.target.value.split(";"))
                        }
                        helperText={
                          field === "helperText"
                            ? helperText
                            : "provide ; separated options for the select, radio, and autocomplete fields."
                        }
                        fullWidth
                        multiline
                      />
                    </Grid>
                  ))
                : null}
              <Grid item xs={12}>
                {!isEdit ? (
                  <Button variant="outlined" onClick={handleAdd}>
                    Add field
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={handleUpdateField}
                    >
                      Update field
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleCancelEdit}
                    >
                      Cancel edit
                    </Button>
                  </div>
                )}
              </Grid>
            </Grid>
          </div>
          <div className="flex flex-[1_1_30%] bg-blue-50 rounded-md">
            <ExperimentalDragAndSort fields={fields} setFields={setFields} />
          </div>
        </div>
      </div>
      <div className="bg-blue-200 rounded-md w-auto p-5 m-5 text-blue-600 flex gap-4">
        <div className="flex-[1_1_50%] bg-blue-50 rounded-md">
          <h2 className="p-5 pb-0">Form preview</h2>
          <Divider color="blue" sx={{ mx: "20px", mb: "10px" }} />
          <div className="mx-5 my-2">
            {fields && fields.length > 0
              ? fields.map((field, index) => {
                  return (
                    <div key={index}>
                      <div className="flex gap-4 items-center">
                        <h3 className="w-max text-xl">{field.label}</h3>
                        <div className="flex w-max ">
                          <IconButton onClick={() => makeEditAble(index)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteField(index)}>
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </div>
                      {/* <p>{field.helperText}</p> */}
                      {field.fieldType === "text" ? (
                        <TextField
                          label={field.label}
                          variant="filled"
                          fullWidth
                        />
                      ) : field.fieldType === "number" ? (
                        <TextField
                          label={field.label}
                          variant="filled"
                          fullWidth
                          type="number"
                        />
                      ) : field.fieldType === "checkbox" ? (
                        <FormControlLabel
                          control={<Checkbox />}
                          label={field.label}
                        />
                      ) : field.fieldType === "radio" ? (
                        <RadioGroup>
                          {field.options.split(";").map((option, index) => (
                            <FormControlLabel
                              key={option}
                              value={option}
                              control={<Radio />}
                              label={option}
                            />
                          ))}
                        </RadioGroup>
                      ) : field.fieldType === "select" ? (
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label={field.label}
                          value=""
                          onChange={() => {}}
                        >
                          {field.options.split(";").map((option, index) => (
                            <MenuItem key={index} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      ) : field.fieldType === "autocomplete" ? (
                        <Autocomplete
                          options={field.options.split(";")}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label={field.label}
                              variant="filled"
                            />
                          )}
                        />
                      ) : null}
                    </div>
                  );
                })
              : null}
          </div>
        </div>
        <div className="flex-[1_1_50%] bg-blue-50 rounded-md">
          <h2 className="p-5 pb-0">JSON payload structure preview</h2>
          <Divider color="blue" sx={{ mx: "20px", mb: "10px" }} />
          <div className="mx-5 my-2">
            {fields && fields.length > 0
              ? fields.map((field, index) => (
                  <div key={field.label} className="flex gap-2 items-start">
                    <div>{index + 1}.</div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: prettyPrintJson.toHtml(field, {
                          indent: 5,
                          lineNumbers: true,
                          linkUrls: true,
                        }),
                      }}
                    />
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
