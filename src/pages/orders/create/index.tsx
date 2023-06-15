import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createOrder } from 'apiSdk/orders';
import { Error } from 'components/error';
import { orderValidationSchema } from 'validationSchema/orders';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';
import { OrderInterface } from 'interfaces/order';

function OrderCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: OrderInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createOrder(values);
      resetForm();
      router.push('/orders');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<OrderInterface>({
    initialValues: {
      customer_name: '',
      customer_email: '',
      customer_phone: '',
      body_measurements: '',
      customizations: '',
      status: '',
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: orderValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Order
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="customer_name" mb="4" isInvalid={!!formik.errors?.customer_name}>
            <FormLabel>Customer Name</FormLabel>
            <Input
              type="text"
              name="customer_name"
              value={formik.values?.customer_name}
              onChange={formik.handleChange}
            />
            {formik.errors.customer_name && <FormErrorMessage>{formik.errors?.customer_name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="customer_email" mb="4" isInvalid={!!formik.errors?.customer_email}>
            <FormLabel>Customer Email</FormLabel>
            <Input
              type="text"
              name="customer_email"
              value={formik.values?.customer_email}
              onChange={formik.handleChange}
            />
            {formik.errors.customer_email && <FormErrorMessage>{formik.errors?.customer_email}</FormErrorMessage>}
          </FormControl>
          <FormControl id="customer_phone" mb="4" isInvalid={!!formik.errors?.customer_phone}>
            <FormLabel>Customer Phone</FormLabel>
            <Input
              type="text"
              name="customer_phone"
              value={formik.values?.customer_phone}
              onChange={formik.handleChange}
            />
            {formik.errors.customer_phone && <FormErrorMessage>{formik.errors?.customer_phone}</FormErrorMessage>}
          </FormControl>
          <FormControl id="body_measurements" mb="4" isInvalid={!!formik.errors?.body_measurements}>
            <FormLabel>Body Measurements</FormLabel>
            <Input
              type="text"
              name="body_measurements"
              value={formik.values?.body_measurements}
              onChange={formik.handleChange}
            />
            {formik.errors.body_measurements && <FormErrorMessage>{formik.errors?.body_measurements}</FormErrorMessage>}
          </FormControl>
          <FormControl id="customizations" mb="4" isInvalid={!!formik.errors?.customizations}>
            <FormLabel>Customizations</FormLabel>
            <Input
              type="text"
              name="customizations"
              value={formik.values?.customizations}
              onChange={formik.handleChange}
            />
            {formik.errors.customizations && <FormErrorMessage>{formik.errors?.customizations}</FormErrorMessage>}
          </FormControl>
          <FormControl id="status" mb="4" isInvalid={!!formik.errors?.status}>
            <FormLabel>Status</FormLabel>
            <Input type="text" name="status" value={formik.values?.status} onChange={formik.handleChange} />
            {formik.errors.status && <FormErrorMessage>{formik.errors?.status}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'order',
  operation: AccessOperationEnum.CREATE,
})(OrderCreatePage);
