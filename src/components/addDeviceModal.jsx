import { useRef, useState } from 'react';
import * as Yup from 'yup';
import { isFunction } from 'lodash';
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
  SvgOutlineX,
  SelectField,
  Spinner,
  SvgOutlineCheck,
} from '../components/tailwind-ui';

import {
  addDevice,
  connectDevice,
  DEVICE_KINDS,
  DEVICE_PROTOCOLS,
} from '../services/deviceService';

//
//

const AddDeviceModal = ({ isOpen, onClose, initialValues = {} }) => {
  const [footerMessage, setFooterMessage] = useState(<div />);
  const ref = useRef(null); // Ref the Form

  // init initial values
  const protocolOptions = Object.values(DEVICE_PROTOCOLS).map((val) => {
    return { label: val.toUpperCase(), value: val };
  });
  const kindOptions = Object.values(DEVICE_KINDS).map((val) => {
    return { label: val.toUpperCase(), value: val };
  });
  const _initialValues = {
    name: '123',
    url: 'mqtt.beemos.org',
    protocol: protocolOptions[0].value,
    port: '9001',
    kind: kindOptions[0].value,
    topic: 'test',
    username: 'testuser',
    password: 'word',
    ...initialValues,
  };

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

  // events functions
  const onSubmit = async (values) => {
    try {
      await addDevice(values);
      isFunction(onClose) && onClose();
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const testConnection = (e) => {
    e.stopPropagation();
    setFooterMessage(renderFooterMessage('connecting', 'Connecting ...'));
    setTimeout(() => {
      connectDevice(ref.current.values)
        .then((client) => {
          setFooterMessage(renderFooterMessage('success', 'Connected'));
          // TO DO : disconnect client
        })
        .catch((err) => {
          setFooterMessage(
            renderFooterMessage('error', `Connection Error: ${err.message}`),
          );
        });
    }, 500);
  };

  const renderFooterMessage = (state, message) => {
    switch (state) {
      case 'connecting':
        return (
          <div className="h-full mx-6 flex flex-row items-center text-sm text-neutral-500">
            <Spinner className="w-5 h-5 mr-2" />
            <span>{message}</span>
          </div>
        );
      case 'success':
        return (
          <div className="h-full mx-4 flex flex-row items-center text-sm text-success-500">
            <SvgOutlineCheck className="h-5 w-5 mr-4" />
            <span>{message}</span>
          </div>
        );
      case 'error':
        return (
          <div className="h-full mx-4 flex flex-row items-center text-sm text-danger-500">
            <SvgOutlineX className="h-5 w-5 mr-4" />
            <span>{message}</span>
          </div>
        );
      default:
        return <div />;
    }
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
        innerRef: ref,
        initialValues: _initialValues,
        validationSchema,
        onSubmit: onSubmit,
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
              name="kind"
              id="kind"
              label="Device kind"
              options={kindOptions}
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
        <div className="flex flex-row items-center">
          {footerMessage}
          <button
            onClick={testConnection}
            type="button"
            className="px-4 py-2 mr-4 text-sm font-semibold text-neutral-700 border rounded-md shadow bg-neutral-200 focus:outline-none flex-1 sm:flex-none"
          >
            Test connection
          </button>
          <SubmitButton className="w-1/3 sm:w-max ">Add</SubmitButton>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default AddDeviceModal;
