import clsx from 'clsx';
import React, { ReactNode } from 'react';

import { useOnOff } from '../hooks/useOnOff';

export type VerticalNavigationRenderOptionCallback<T> = (
  children: ReactNode,
  option: Omit<VerticalNavigationOption<T>, 'renderOption'> & {
    isSelected: boolean;
  },
) => ReactNode;
export interface VerticalNavigationGroupOption<T> {
  type: 'group';
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  options: VerticalNavigationOption<T>[];
}

export interface VerticalNavigationOption<T> {
  type: 'option';
  id: string;
  value: T;
  label?: ReactNode;
  icon?: ReactNode;
  renderOption?: VerticalNavigationRenderOptionCallback<T>;
}

export type VerticalNavigationOptions<T> =
  | VerticalNavigationGroupOption<T>
  | VerticalNavigationOption<T>;

export type VerticalNavigationSize = 'small' | 'base';

export interface VerticalNavigationProps<T> {
  options: Array<VerticalNavigationOptions<T>>;
  selected: VerticalNavigationOption<T> | undefined;
  onSelect?: SelectOptionCallback<T>;
  size?: VerticalNavigationSize;
}

type SelectOptionCallback<T> = (selected: VerticalNavigationOption<T>) => void;

const optionStyles = {
  small: 'text-neutral-200 hover:text-white text-sm',
  base: 'text-neutral-900 text-base',
};

const iconStyles = {
  small: 'text-neutral-200 mr-3',
  base: 'text-neutral-500 mr-4',
};

export function VerticalNavigation<T>(
  props: VerticalNavigationProps<T>,
): JSX.Element {
  const { onSelect, selected, options, size } = props;

  const opts = options.map((element) => {
    if (element.type === 'option') {
      return {
        ...element,
        label: element.label || element.value,
      };
    }
    return element;
  });

  let chosenSize = size ? size : 'small';
  return (
    <div className="flex flex-col flex-grow mt-5">
      <nav className="flex-1 px-1 space-y-1">
        {opts.map((element) => {
          if (element.type === 'option') {
            return (
              <Navigation
                key={element.id}
                onSelect={() => onSelect?.(element)}
                element={element}
                selected={selected}
                offset={false}
                size={chosenSize}
                renderOption={element.renderOption}
              />
            );
          } else {
            return (
              <NavigationGroup
                key={element.id}
                element={element}
                selected={selected}
                size={chosenSize}
                onSelect={onSelect}
              />
            );
          }
        })}
      </nav>
    </div>
  );
}

interface NavigationProps<T> {
  element: VerticalNavigationOption<T>;
  selected: VerticalNavigationOption<T> | undefined;
  onSelect: () => void;
  offset: boolean;
  size: VerticalNavigationSize;
  renderOption?: VerticalNavigationRenderOptionCallback<T>;
}

interface NavigationGroupProps<T> {
  element: VerticalNavigationGroupOption<T>;
  selected?: VerticalNavigationOption<T>;
  onSelect?: SelectOptionCallback<T>;
  size: VerticalNavigationSize;
}

function NavigationGroup<T>(props: NavigationGroupProps<T>): JSX.Element {
  const { element, selected, onSelect, size } = props;
  const [isOpen, , , toggle] = useOnOff(
    element.options.some((element) => element.value === selected?.value),
  );
  return (
    <div className="space-y-1">
      <button
        type="button"
        onClick={toggle}
        className={clsx(
          'flex items-center w-full pl-2 pr-1 py-2 rounded-md group hover:bg-neutral-50 hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-primary-500',
          optionStyles[size],
        )}
      >
        {element.icon && (
          <div
            className={clsx(
              'text-2xl text-neutral-200 group-hover:text-white',
              iconStyles[size],
            )}
          >
            {props.element.icon}
          </div>
        )}

        {element.label}
        <svg
          className={clsx(
            'ml-auto h-5 w-5 transform group-hover:text-white transition-colors ease-in-out duration-150',
            isOpen ? 'text-white rotate-90' : 'text-neutral-200',
          )}
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
        </svg>
      </button>
      {isOpen
        ? element.options.map((element) => (
            <Navigation
              key={element.id}
              element={element}
              selected={selected}
              onSelect={() => onSelect?.(element)}
              offset
              size={size}
              renderOption={element.renderOption}
            />
          ))
        : null}
    </div>
  );
}

function Navigation<T>(props: NavigationProps<T>): JSX.Element {
  const isSelected =
    props.selected !== undefined &&
    props.element.value === props.selected.value;

  const item = (
    <span
      onClick={props.onSelect}
      className={clsx(
        'group w-full flex items-center py-2 rounded-md cursor-pointer hover:bg-neutral-400 hover:bg-opacity-10',
        optionStyles[props.size],
        isSelected
          ? 'text-white bg-neutral-400 bg-opacity-30 hover:bg-opacity-30'
          : '',
        props.offset ? 'pl-8' : 'pl-2',
      )}
    >
      {props.element.icon && (
        <div
          className={clsx(
            'text-2xl group-hover:text-white',
            iconStyles[props.size],
            isSelected ? 'text-white' : '',
          )}
        >
          {props.element.icon}
        </div>
      )}
      {props.element.label}
    </span>
  );

  const toRender = props.renderOption
    ? props.renderOption(item, {
        ...props.element,
        isSelected,
      })
    : item;

  return <div className="space-y-1">{toRender}</div>;
}
