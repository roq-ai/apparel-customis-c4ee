import * as yup from 'yup';

export const orderValidationSchema = yup.object().shape({
  customer_name: yup.string().required(),
  customer_email: yup.string().required(),
  customer_phone: yup.string().required(),
  body_measurements: yup.string().required(),
  customizations: yup.string().required(),
  status: yup.string().required(),
  organization_id: yup.string().nullable().required(),
});
