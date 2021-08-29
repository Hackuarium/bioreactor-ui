import { useRef, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { isEmpty } from 'lodash';
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
} from '../../components/tailwind-ui';

import { testDeviceConnection } from '../../services/broadCastDeviceService';
import {
  DEFAULT_PORT,
  DEFAULT_PROTOCOL,
  DEVICE_KINDS,
  DEVICE_PROTOCOLS,
} from '../../services/devicesOptions';

//
// Pre-defined Vars
const protocolOptions = DEVICE_PROTOCOLS.map((val) => {
  return { label: val.toUpperCase(), value: val };
});
const kindOptions = DEVICE_KINDS.map((option) => {
  return { ...option, label: option.name, value: option.kind };
});
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(50, 'Name too Long!')
    .matches(
      /^[A-z0-9_-]*$/,
      'Field supports only : letters / numbers / _ / - ',
    )
    .required('Required'),
  url: Yup.string().required('Required'),
  port: Yup.number().positive().integer(),
  protocol: Yup.string(),
  kind: Yup.string().required('Required'),
  topic: Yup.string().required('Required'),
  username: Yup.string().required('Required'),
});
//

const DeviceModal = ({ isOpen, onClose, onSave, onUpdate, initialValues }) => {
  const updateMode = !isEmpty(initialValues); // if initialValues defined : updates the recode; else: add the record
  const [footerMessage, setFooterMessage] = useState(<div />);
  const formRef = useRef(null); // Ref the Form

  const _initialValues = updateMode
    ? {
        ...initialValues,
        kind: initialValues.kind.kind,
      }
    : {
        name: 'Computer',
        url: 'mqtt.hackuarium.org',
        protocol: protocolOptions.filter((v) => v.value === DEFAULT_PROTOCOL)[0]
          .value,
        port: DEFAULT_PORT,
        kind: 'Computer',
        topic: 'lpatiny/Computer/server',
        username: 'testUser',
        password: 'word',
      };

  useEffect(() => {
    // clear footer when modal is closed
    !isOpen && setTimeout(() => setFooterMessage(<div />), 500);
  }, [isOpen]);

  // events functions
  const onSubmit = async (values) => {
    try {
      const { kind, ...deviceInfo } = values;
      const _kind = DEVICE_KINDS.filter((k) => k.kind === kind)[0];
      updateMode
        ? await onUpdate({ ...deviceInfo, kind: _kind })
        : await onSave({ ...deviceInfo, kind: _kind });
      onClose();
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const testConnection = (e) => {
    e.stopPropagation();
    renderFooterMessage('connecting', 'Connecting ...');
    setTimeout(() => {
      testDeviceConnection(formRef.current.values)
        .then(() => {
          renderFooterMessage('success', 'Connected');
        })
        .catch((err) => {
          renderFooterMessage('error', `Connection Error: ${err.message}`);
        });
    }, 500);
  };

  // helper function for testConnection event
  const renderFooterMessage = (state, message) => {
    switch (state) {
      case 'connecting':
        setFooterMessage(
          <div className="mx-6 flex flex-row items-center text-sm text-left text-neutral-500">
            <Spinner className="w-6 h-6 mr-2" />
            <span>{message}</span>
          </div>,
        );
        break;

      case 'success':
        setFooterMessage(
          <div className="mx-4 flex flex-row items-center text-sm text-left text-success-500">
            <SvgOutlineCheck className="h-6 w-6 mr-4" />
            <span>{message}</span>
          </div>,
        );
        break;

      case 'error':
        setFooterMessage(
          <div className="mx-4 flex flex-row items-center text-sm text-left text-danger-500">
            <SvgOutlineX className="h-6 w-6 mr-4" />
            <span>{message}</span>
          </div>,
        );
        break;

      default:
        setFooterMessage(<div />);
        break;
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
        innerRef: formRef,
        initialValues: _initialValues,
        validationSchema,
        onSubmit: onSubmit,
        className: 'h-full',
      }}
    >
      <Modal.Header>
        {updateMode ? 'Update Device' : 'Connect New Device'}
      </Modal.Header>
      <Modal.Body>
        <div className="p-2 mt-2">
          <InputField
            name="name"
            id="name"
            label="Custom name"
            placeholder="Device name"
            disabled={updateMode}
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
            <div className="flex flex-row justify-between items-start flex-1">
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
          <div className="flex flex-row justify-between items-start">
            <SelectField
              name="kind"
              id="kind"
              label="Kind"
              options={kindOptions}
              renderOption={(o) => `${o.label}`}
              getValue={(o) => o.value}
              required
              className="mt-4 mr-4 w-1/2 "
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
        <div className="flex flex-col sm:flex-row items-center">
          {footerMessage}
          <button
            onClick={testConnection}
            type="button"
            className="w-full sm:w-max mt-2 sm:my-0 px-4 py-2 sm:mr-4 text-sm font-semibold text-neutral-700 border rounded-md shadow bg-neutral-200 focus:outline-none flex-1 sm:flex-none"
          >
            Test connection
          </button>
          <SubmitButton className="w-full my-2 sm:my-0 sm:w-max ">
            {updateMode ? 'Update' : 'Add'}
          </SubmitButton>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default DeviceModal;
