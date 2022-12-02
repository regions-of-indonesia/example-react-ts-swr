import { memo, useEffect, useId, useMemo } from "react";

import { machine, connect } from "@zag-js/select";
import { useMachine, normalizeProps, Portal } from "@zag-js/react";

import Loader from "./Loader";

import { cx } from "../utilities";

type SelectItem = {
  label: string;
  value: string;
  disabled?: boolean;
};

type SelectValue = {
  label: string;
  value: string;
};

type SelectProps = {
  label: string;
  placeholder?: string;
  data: SelectItem[];
  value?: SelectValue | null;
  onChange?: (details: SelectValue | null) => void;
  disabled?: boolean;
  loading?: boolean;
  empty?: boolean;
};

const Select = memo((props: SelectProps) => {
  const { label, placeholder, data, value, onChange, disabled, loading, empty } = props;

  const [state, send] = useMachine(
    machine({
      id: useId(),
      selectedOption: value,
      onChange,
      disabled,
    }),
    {
      context: useMemo(
        () => ({
          disabled,
        }),
        [disabled]
      ),
    }
  );

  const api = connect(state, send, normalizeProps);

  useEffect(() => {
    if (value) {
      api.setSelectedOption(value);
    } else {
      api.clearSelectedOption();
    }
  }, [value]);

  const classes = useMemo(() => {
    const className = {
      base: "block space-y-2 p-2 min-w-[256px]",
      label: cx(
        "block w-auto font-medium text-neutral-900 dark:text-neutral-50 select-none transition-colors",
        "data-[invalid]:text-red-600 data-[invalid]:dark:text-red-500",
        "data-[disabled]:text-neutral-500 data-[disabled]:dark:text-neutral-400 data-[disabled]:ring-neutral-100 data-[disabled]:dark:ring-neutral-800 data-[disabled]:focus-visible:ring-neutral-100 data-[disabled]:dark:focus-visible:ring-neutral-800 data-[disabled]:cursor-not-allowed"
      ),
      trigger: cx(
        "block w-full text-left bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-50 rounded-lg px-2 py-1 outline-none ring-2 ring-neutral-200 dark:ring-neutral-700 focus-visible:ring-red-500 dark:focus-visible:ring-red-400 select-none transition-colors",
        "data-[invalid]:text-red-600 data-[invalid]:dark:text-red-500 data-[invalid]:ring-red-600 data-[invalid]:dark:ring-red-500 data-[invalid]:focus-visible:ring-red-600 data-[invalid]:dark:focus-visible:ring-red-500",
        "data-[disabled]:text-neutral-500 data-[disabled]:dark:text-neutral-400 data-[disabled]:ring-neutral-100 data-[disabled]:dark:ring-neutral-800 data-[disabled]:focus-visible:ring-neutral-100 data-[disabled]:dark:focus-visible:ring-neutral-800 data-[disabled]:cursor-not-allowed"
      ),
      menu: "min-w-[256px] min-h-[24px] max-h-[512px] bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 space-y-2 p-2 rounded-lg shadow-lg overflow-auto outline-none hidden-scrollbar transition-colors",
      loading: "flex justify-center items-center px-2 py-1 rounded-md select-none transition-colors",
      loader: "w-5 h-5 text-red-600 dark:text-red-500",
      empty: "block px-2 py-1 text-center rounded-md select-none transition-colors",
      option: cx(
        "px-2 py-1 rounded-md select-none transition-colors",
        "data-[focus]:bg-red-50 data-[focus]:dark:bg-red-900 data-[focus]:text-red-900 data-[focus]:dark:text-red-50",
        "data-[selected]:bg-red-600 data-[selected]:dark:bg-red-600 data-[selected]:text-red-50 data-[selected]:dark:text-red-50",
        "data-[disabled]:text-neutral-500 data-[disabled]:dark:text-neutral-400 data-[disabled]:ring-neutral-100 data-[disabled]:dark:ring-neutral-800 data-[disabled]:focus-visible:ring-neutral-100 data-[disabled]:dark:focus-visible:ring-neutral-800 data-[disabled]:cursor-not-allowed"
      ),
    };

    return className;
  }, []);

  return (
    <>
      <div className={classes.base}>
        <label {...api.labelProps} className={classes.label}>
          {label}
        </label>
        <button {...api.triggerProps} className={classes.trigger}>
          <span>{api.selectedOption?.label ?? placeholder}</span>
        </button>
      </div>

      <Portal>
        <div {...api.positionerProps}>
          <ul {...api.menuProps} className={classes.menu}>
            {loading ? (
              <li className={classes.loading}>
                <Loader className={classes.loader} />
              </li>
            ) : empty ? (
              <li className={classes.empty}>No data</li>
            ) : (
              data.map(({ label, value, disabled }) => {
                return (
                  <li key={value} {...api.getOptionProps({ label, value, disabled })} className={classes.option}>
                    <span>{label}</span>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </Portal>
    </>
  );
});

export type { SelectItem, SelectValue };
export type { SelectProps };
export default Select;
