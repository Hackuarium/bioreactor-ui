import {
  Form,
  InputField,
  Modal,
  SvgOutlinePlus,
  FormError,
  SubmitButton,
  SvgOutlineUser,
  SvgOutlineKey,
  SvgOutlineLink,
  SelectField,
} from '../components/tailwind-ui';

import * as Yup from 'yup';

const AddDeviceModal = ({
  isOpen,
  onClose,
  initialValues = {},
  submitedValues,
}) => {
  const _initialValues = {
    name: '',
    url: '',
    protocol: 'tcp',
    port: '8883',
    type: 'computer',
    topic: '',
    username: '',
    password: '',
    ...initialValues,
  };
  const protocolOptions = [
    { label: 'TCP', value: 'tcp' },
    { label: 'HTTP', value: 'http' },
  ];
  const typeOptions = [
    { label: 'Computer', value: 'computer' },
    { label: 'Beemos', value: 'beemos' },
  ];

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(50, 'Name too Long!')
      .matches(
        /^[A-z0-9_-]*$/,
        'Field supports only : letters / numbers / _ / - ',
      )
      .required('Required'),
    url: Yup.string().required('Required'),
    port: Yup.number().positive().integer().required('Required'),
    protocol: Yup.string().required('Required'),
    username: Yup.string().required('Required'),
  });

  const onConnect = (values) => {
    console.log(values);
    submitedValues = values;
  };
  const testConnection = (e) => {
    e.stopPropagation();
    console.log('test connection');
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
        onSubmit: onConnect,
        className: 'h-full',
      }}
    >
      <Modal.Header>Connect New Device</Modal.Header>
      <Modal.Body>
        <div className="p-2 mt-2">
          <InputField
            name="name"
            id="name"
            label="Custom name"
            placeholder="device_123"
            required
            className="w-full"
            inputClassName="w-full"
          ></InputField>
          <div className="flex flex-col sm:flex-row sm:justify-between mt-4 sm:mt-0 border-t border-neutral sm:border-0">
            <InputField
              name="url"
              id="url"
              label="URL"
              placeholder="mqtt.domain.com"
              required
              leadingInlineAddon={<SvgOutlineLink />}
              className="mt-4 sm:mr-4 w-full sm:w-1/2"
              inputClassName="w-full"
            ></InputField>
            <div className="flex flex-row justify-between flex-1">
              <SelectField
                name="protocol"
                id="protocol"
                label="Protocol"
                options={protocolOptions}
                renderOption={(o) => `${o.label}`}
                getValue={(o) => o.value}
                className="mt-4 mr-4 w-1/2"
                inputClassName="w-full"
              ></SelectField>
              <InputField
                name="port"
                id="port"
                label="Port"
                className="mt-4 flex-1"
                inputClassName="w-full"
              ></InputField>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <SelectField
              name="type"
              id="type"
              label="Type"
              options={typeOptions}
              renderOption={(o) => `${o.label}`}
              getValue={(o) => o.value}
              required
              className="mt-4 mr-4 w-1/3 "
              inputClassName="w-full bg-gray-500"
            ></SelectField>
            <InputField
              name="topic"
              id="topic"
              label="Topic"
              required
              className="mt-4 flex-1"
              inputClassName="w-full"
            ></InputField>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between mt-4 sm:mt-0 border-t border-neutral sm:border-0">
            <InputField
              name="username"
              id="username"
              label="Username"
              placeholder="Username"
              required
              leadingInlineAddon={<SvgOutlineUser />}
              className="mt-4 w-full sm:mr-4 sm:w-1/2"
              inputClassName="w-full"
            ></InputField>
            <InputField
              name="password"
              id="password"
              label="Password"
              type="password"
              placeholder="********"
              required
              leadingInlineAddon={<SvgOutlineKey />}
              className="mt-4 w-full sm:flex-1"
              inputClassName="w-full"
            ></InputField>
          </div>
        </div>
        <FormError />
      </Modal.Body>
      <Modal.Footer>
        <div className="flex flex-row">
          <button
            onClick={testConnection}
            type="button"
            className="px-4 mr-4 text-neutral-700 border rounded-md shadow bg-neutral-200 focus:outline-none flex-1 sm:flex-none"
          >
            Test connection
          </button>
          <SubmitButton className="w-1/3 sm:w-max">Add</SubmitButton>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default AddDeviceModal;
