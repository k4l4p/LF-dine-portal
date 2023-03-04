import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";

interface IDropDown {
  list: Array<{
    id: number;
    name: string;
  }>;
  setItem: React.Dispatch<
    React.SetStateAction<{
      id: number;
      name: string;
    }>
  >;
  item: {
    id: number;
    name: string;
  };
}

const DropDown = ({ list, setItem, item }: IDropDown) => {
  return (
    <Listbox value={item} onChange={setItem}>
      <div className="relative inset-1.5">
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none">
          <span className="block truncate font-bold">{item.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              className="h-3 w-3 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute -right-full top-0 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {list.map((item, idx) => (
              <Listbox.Option
                key={idx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-4 pr-4 ${
                    active ? "bg-[#3D00B7]/10" : "text-gray-900"
                  }`
                }
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate font-bold ${
                        selected ? "text-[#3D00B7]" : "text-black"
                      }`}
                    >
                      {item.name}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default DropDown;
