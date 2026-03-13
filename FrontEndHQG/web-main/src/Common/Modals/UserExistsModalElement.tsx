import { useAuth } from "../../Hooks/AuthContext";

type UserExistsModalElementProps = {
  close: () => void;
};

export const UserExistsModalElement = ({
  close,
}: UserExistsModalElementProps) => {
  return (
    <div
      className={` flex flex-col w-full md:w-1/2   min-h-40 bg-white shadow-md rounded-lg  overflow-y-auto p-3 z-50`}
    >
      <div className="text-charcoal text-lg border-desaturated-grey border-b-[1px] mb-3 uppercase">
        User Already Registered
      </div>
      <p>
        The user you are trying to register is already registered on the
        platform. <br /> Please reach out to your administrator to assist you in
        connecting with this user.
      </p>
      <div className="flex flex-row justify-end mt-8">
        <button
          onClick={close}
          className="text-sm text-charcoal hover:bg-charcoal border-charcoal border-2 rounded-md hover:text-white py-1 px-2  mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};
