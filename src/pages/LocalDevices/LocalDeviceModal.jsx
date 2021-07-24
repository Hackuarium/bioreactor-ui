import React from 'react';
import * as Yup from 'yup';
import {
  Modal,
  Form,
  SvgOutlinePlus,
  SelectField,
  FormError,
  SubmitButton,
  InputField,
} from '../../components/tailwind-ui';
import { DEVICE_KINDS } from '../../services/devicesOptions';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(50, 'Name too Long!')
    .matches(
      /^[A-z0-9_-]*$/,
      'Field supports only : letters / numbers / _ / - ',
    )
    .required('Required'),
});

const kindOptions = DEVICE_KINDS.map((option) => ({
  ...option,
  label: option.name,
  value: option.kind,
}));

const LocalDeviceModal = ({ initialValues, isOpen, onClose, onSave }) => {
  const _initialValues = {
    name: initialValues?.name,
    kind: initialValues?.kind?.kind,
  };

  const onSubmit = (values) => {
    const device = {
      ...initialValues,
      name: values.name,
      kind: DEVICE_KINDS.filter((option) => option.kind === values.kind)[0],
    };
    onSave(device);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      icon={<SvgOutlinePlus />}
      iconColor="neutral"
      animated
      hasCloseButton
      requestCloseOnBackdrop
      requestCloseOnEsc
      fluid
      wrapperComponent={Form}
      wrapperProps={{
        initialValues: _initialValues,
        validationSchema,
        onSubmit: onSubmit,
        className: 'h-full',
      }}
    >
      <Modal.Header>Edit device information</Modal.Header>
      <Modal.Body>
        <div className="w-full mr-32 pr-16 mt-4 mb-20 items-center">
          <SelectField
            name="kind"
            id="kind"
            label="Kind"
            options={kindOptions}
            renderOption={(o) => `${o.label}`}
            getValue={(o) => o.value}
            required
            className="mt-4 flex-1"
          ></SelectField>
          <InputField
            name="name"
            id="name"
            label="Name"
            required
            className="mt-8 flex-1"
            inputClassName="w-full"
          ></InputField>
        </div>
        <FormError />
      </Modal.Body>
      <Modal.Footer>
        <SubmitButton className="w-full sm:w-max ">Save</SubmitButton>
      </Modal.Footer>
    </Modal>
  );
};

export default LocalDeviceModal;
