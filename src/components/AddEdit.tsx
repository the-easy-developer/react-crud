import { useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";

import type { ShipmentType } from "../types";
import { createShipment, editShipment } from "../service";
import {
  useCreateShipmentMutation,
  useEditShipmentMutation,
} from "../store/api";

type ModalProps = {
  onCancel: () => void;
  onSubmit: (obj: ShipmentType) => void;
  isProcessing: boolean;
  shipmentObj?: ShipmentType;
};

type AddEditProps = {
  shipmentObj?: ShipmentType;
  show: boolean;
  close: () => void;
};

function Modal({ onCancel, onSubmit, isProcessing, shipmentObj }: ModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShipmentType>({ defaultValues: shipmentObj });

  const isEdit = Boolean(shipmentObj);

  return createPortal(
    <div className="absolute top-0 h-[100vh] w-[100vw] flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white border rounded-md shadow overflow-auto">
        <h1 className="text-3xl mx-2 my-1">{isEdit ? "Edit" : "Add"}</h1>
        <div className="flex flex-col gap-5 p-5 h-[500px] w-[400px] overflow-auto">
          <div>
            <div className="flex gap-1">
              <label htmlFor="id" className="w-16 break-all">
                ID
              </label>
              <input
                className="border grow"
                id="id"
                disabled={isEdit}
                {...register("id", { required: true, pattern: /^S[0-9]{4}$/ })}
              />
            </div>
            <div className="text-red-600">
              {errors?.id?.type === "required" && <p> ID is required. </p>}
              {errors?.id?.type === "pattern" && (
                <p> ID format must be S000 </p>
              )}
            </div>
          </div>
          <div>
            <div className="flex gap-1">
              <label htmlFor="name" className="w-16 break-all">
                Name
              </label>
              <input
                className="border grow"
                id="name"
                {...register("name", {
                  required: true,
                  pattern: /^(\w+ ?)+\w$/,
                })}
              />
            </div>
            <div className="text-red-600">
              {errors?.name?.type === "required" && <p> Name is required. </p>}
              {errors?.name?.type === "pattern" && (
                <p> Name can only contain alphanumeric characters </p>
              )}
            </div>
          </div>
          <div>
            <div className="flex gap-1">
              <label htmlFor="mode" className="w-16 break-all">
                Mode
              </label>
              <input
                className="border grow"
                id="mode"
                {...register("mode", { required: true, pattern: /[a-zA-Z]+/ })}
              />
            </div>
            <div className="text-red-600">
              {errors?.mode?.type === "required" && <p> Mode is required </p>}
              {errors?.mode?.type === "pattern" && (
                <p> Mode can contain only alphabets </p>
              )}
            </div>
          </div>
          <div>
            <div className="flex gap-1">
              <label htmlFor="type" className="w-16 break-all">
                Type
              </label>
              <input
                className="border grow"
                id="type"
                {...register("type", { required: true, pattern: /[a-zA-Z]+/ })}
              />
            </div>
            <div className="text-red-600">
              {errors?.type?.type === "required" && <p> Type is required </p>}
              {errors?.type?.type === "pattern" && (
                <p> Type can contain only alphabets </p>
              )}
            </div>
          </div>
          <div>
            <div className="flex gap-1">
              <label htmlFor="destination" className="w-16 break-all">
                Destination
              </label>
              <input
                className="border grow"
                id="destination"
                {...register("destination", {
                  required: true,
                  pattern: /([a-zA-Z]+ ?)[a-zA-Z]/,
                })}
              />
            </div>
            <div className="text-red-600">
              {errors?.destination?.type === "required" && (
                <p> Destination is required </p>
              )}
              {errors?.destination?.type === "pattern" && (
                <p> Destination can contain only alphabets </p>
              )}
            </div>
          </div>
          <div>
            <div className="flex gap-1">
              <label htmlFor="origin" className="w-16 break-all">
                Origin
              </label>
              <input
                className="border grow"
                id="origin"
                {...register("origin", {
                  required: true,
                  pattern: /([a-zA-Z]+ ?)[a-zA-Z]/,
                })}
              />
            </div>
            <div className="text-red-600">
              {errors?.origin?.type === "required" && (
                <p> Origin is required </p>
              )}
              {errors?.origin?.type === "pattern" && (
                <p> Origin can contain only alphabets </p>
              )}
            </div>
          </div>
          <div>
            <div className="flex gap-1">
              <label htmlFor="total" className="w-16 break-all">
                Total
              </label>
              <input
                className="border grow"
                id="total"
                {...register("total", {
                  required: true,
                  pattern: /[0-9]+/,
                })}
              />
            </div>
            <div className="text-red-600">
              {errors?.total?.type === "required" && <p> Total is required </p>}
              {errors?.total?.type === "pattern" && (
                <p> Total can contain only digits </p>
              )}
            </div>
          </div>
          <div>
            <div className="flex gap-1">
              <label htmlFor="status" className="w-16 break-all">
                Status
              </label>
              <input
                className="border grow"
                id="status"
                {...register("status", {
                  required: true,
                  pattern: /[a-zA-Z]+/,
                })}
              />
            </div>
            <div className="text-red-600">
              {errors?.status?.type === "required" && (
                <p> Status is required </p>
              )}
              {errors?.status?.type === "pattern" && (
                <p> Status can contain only alphabets </p>
              )}
            </div>
          </div>
          <div>
            <div className="flex gap-1">
              <label htmlFor="user-id" className="w-16 break-all">
                User ID
              </label>
              <input
                className="border grow"
                id="user-id"
                {...register("userId", {
                  required: true,
                  pattern: /^U[0-9]{4}$/,
                })}
              />
            </div>
            <div className="text-red-600">
              {errors?.userId?.type === "required" && (
                <p> User ID is required </p>
              )}
              {errors?.userId?.type === "pattern" && (
                <p> User ID must be of the form U0000 </p>
              )}
            </div>
          </div>
          <div className="flex justify-center gap-2">
            <button
              type="button"
              className="border p-1"
              onClick={handleSubmit((data) => onSubmit(data))}
              disabled={isProcessing}
            >
              {isEdit ? "Edit" : "Add"}
            </button>
            <button type="button" className="border p-1" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function Add({ show, close }: AddEditProps) {
  const [createShipment, { isLoading }] = useCreateShipmentMutation();

  if (show) {
    return (
      <Modal
        onCancel={close}
        isProcessing={isLoading}
        onSubmit={async (obj) => {
          try {
            await createShipment(obj).unwrap();
            close();
          } catch (e) {
            console.error(e);
          }
        }}
      />
    );
  }
  return null;
}

function Edit({ shipmentObj, show, close }: AddEditProps) {
  const [editShipment, { isLoading }] = useEditShipmentMutation();

  if (show) {
    return (
      <Modal
        onSubmit={async (obj) => {
          try {
            await editShipment(obj).unwrap();
            close();
          } catch (e) {
            console.error(e);
          }
        }}
        onCancel={close}
        isProcessing={isLoading}
        shipmentObj={shipmentObj}
      />
    );
  }

  return null;
}

export default function AddEdit(props: AddEditProps) {
  if (props.shipmentObj) {
    return <Edit {...props} />;
  }
  return <Add {...props} />;
}
