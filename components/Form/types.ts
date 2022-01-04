export enum FormFieldNames {
  BaseInput ='BaseInput',
  BaseSelect ='BaseSelect',
  BaseTextArea ='BaseTextArea',
  BaseCalendar= 'BaseCalendar',
}
export interface IValidate {
  params: string | number | null;
  message: string;
}

export interface ISchemaItem {
  component: string;
  label: string;
  validations?: {
    [key: string]: IValidate;
  };
}
export interface ISchema {
  [key: string]: ISchemaItem;
}
