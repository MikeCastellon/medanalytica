import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { DisplayWrapper } from "../Common/DisplayWrapper";
import {
  GetWholeBodyCompByOwnerQuery,
  Order_By,
  Whole_Body_Comp,
  useDeleteWholeBodyCompTitleMutation,
  useGetAllHeartDataForOwnerQuery,
  useGetWholeBodyCompByOwnerQuery,
  useInsertOneWholeBodyCompMutation,
  useUpdateWholeBodyCompTitleMutation,
  // useGetDescriptionByKeyQuery,
} from "../generated/graphql";
import ReactToPrint from "react-to-print";
import { Print } from "../Common/icons/Print";
import { useMatch } from "@tanstack/react-location";
import { LocationGenerics } from "../Router/CustomRouter";
import { differenceInYears, format } from "date-fns";
import useRJLDevice from "../Services/useRJLDevice";
import { useFormik } from "formik";
import * as Dialog from "@radix-ui/react-dialog";
import { Loader } from "../Common/Loader";
import * as Yup from "yup";
import { SubjectContextBox } from "../Common/SubjectContextBox";

const BodyCompFormValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  height_cm: Yup.number().not([0], "Can't be 0").required("Height is required"),
  weight_kg: Yup.number().not([0], "Can't be 0").required("Height is required"),
});

type BodyCompFormData = {
  id: string | null;
  name: string;
  units: "metric" | "imperial";
  age: number;
  gender: 0 | 1;
  height_in: number;
  weight_lb: number;
  height_cm: number;
  weight_kg: number;
  icw: number;
  ecw: number;
  pa: number;
  tbw: number;
};

type SaveResponseMessage = {
  message: string;
  type: "success" | "error";
};

const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      "X-Hasura-Admin-Secret": import.meta.env.VITE_GRAPHQL_HEADER,
    },
  },
};

const BodyCompAnalysis = () => {
  const unitLengthStrings = {
    metric: "cm",
    imperial: "in",
  };
  const unitWeigthStrings = {
    metric: "Kg",
    imperial: "lbs",
  };
  const componentRef = useRef(null);
  const recordingMenuRef = useRef<BodyCompRecordingMenuRef | null>(null);

  const [
    { message: saveResponseMessage, type: saveResponseType },
    setSaveResponseMessage,
  ] = useState<SaveResponseMessage>({
    message: "",
    type: "success",
  });
  const {
    params: { userId, subjectId },
    data: {},
  } = useMatch<LocationGenerics>();

  const [gender, setGender] = useState<string>("");
  const { read, phaseAngle, reactance, resistance, resetValues } =
    useRJLDevice();
  const [selectedReactance, setSelectedReactance] = useState<number | null>(
    null
  );
  const [selectedResistance, setSelectedResistance] = useState<number | null>(
    null
  );

  const [recordingDate, setRecordingDate] = useState<string>("");

  const bodyCompForm = useFormik<BodyCompFormData>({
    initialValues: {
      id: null,
      name: "Recording",
      units: "metric",
      age: 0,
      gender: 0,
      height_in: 0,
      weight_lb: 0,
      height_cm: 0,
      weight_kg: 0,
      icw: 0,
      ecw: 0,
      pa: 0,
      tbw: 0,
    },
    validationSchema: BodyCompFormValidationSchema,
    onSubmit: (values) => {
      mutate({
        title: values.name,
        owner: subjectId,

        reactance: reactance,
        resistance: resistance,

        age: values.age,
        gender: values.gender,
        height: values.height_cm,
        weight: values.weight_kg,

        ecw: values.ecw,
        icw: values.icw,
        tbw: values.tbw,
        phase_angle: values.pa,
      });
    },
  });

  const { data: subject } = useGetAllHeartDataForOwnerQuery(
    dataSource,
    {
      _eq: subjectId || "",
      id: subjectId,
      where: {
        owner: { _eq: subjectId },
        deleted_on: { _is_null: true },
      },
      order_by: Order_By.Desc,
    },
    {
      enabled: !!subjectId,
      refetchInterval: 3000,
    }
  );

  const { data: bodyCompSubmitData, mutate } =
    useInsertOneWholeBodyCompMutation(dataSource, {
      onSuccess(data, variables, context) {
        setSaveResponseMessage({
          message: "Data saved successfully",
          type: "success",
        });
        bodyCompForm.resetForm();
        recordingMenuRef.current?.refreshAndSelect(
          data?.insert_whole_body_comp_one?.id
        );
        // recordingMenuRef.current?.setMenuOpen(false);
      },
      onError(error, variables, context) {
        console.log("Error", error);
        setSaveResponseMessage({
          message: "Error saving data, please try again later",
          type: "error",
        });
      },
    });

  const { data: bodyCompUpdateData, mutate: updateTilte } =
    useUpdateWholeBodyCompTitleMutation(dataSource, {
      onSuccess(data, variables, context) {
        setSaveResponseMessage({
          message: "Data updated successfully",
          type: "success",
        });
        bodyCompForm.resetForm();
        recordingMenuRef.current?.refreshAndSelect(
          data?.update_whole_body_comp_by_pk?.id
        );
      },
    });

  useEffect(() => {
    if (subject && subject.users_by_pk && subject.users_by_pk.data) {
      let userGender = JSON.parse(subject.users_by_pk.data).data.gender;

      if (userGender === "male") {
        setGender("male");
        bodyCompForm.setFieldValue("gender", 1);
      }

      if (userGender === "female") {
        setGender("female");
        bodyCompForm.setFieldValue("gender", 0);
      }

      bodyCompForm.setFieldValue(
        "age",
        differenceInYears(new Date(), new Date(subject.users_by_pk.birth_date))
      );
    }

    if (bodyCompForm.values.units === "imperial") {
      bodyCompForm.setFieldValue(
        "height_cm",
        (bodyCompForm.values.height_in * 2.54).toFixed()
      );
      bodyCompForm.setFieldValue(
        "weight_kg",
        (bodyCompForm.values.weight_lb * 0.453592).toFixed()
      );
    }

    if (bodyCompForm.values.units === "metric") {
      bodyCompForm.setFieldValue(
        "height_in",
        (bodyCompForm.values.height_cm / 2.54).toFixed()
      );
      bodyCompForm.setFieldValue(
        "weight_lb",
        (bodyCompForm.values.weight_kg / 0.453592).toFixed()
      );
    }

    if (reactance && resistance && phaseAngle) {
      let height = bodyCompForm.values.height_cm;
      let weight = bodyCompForm.values.weight_kg;
      let gender = bodyCompForm.values.gender;
      if (!height || !weight || gender < 0) return;
      let heightInCm2 = height * height;
      const ecw = calculateECW(
        gender,
        heightInCm2,
        weight,
        resistance,
        reactance
      );

      const tbw = calculateTBW(gender, heightInCm2, weight, resistance);
      bodyCompForm.setFieldValue("tbw", tbw?.toFixed(2));

      const icw = tbw - ecw;
      const icw_percent = (icw / tbw) * 100;
      const ecw_percent = (ecw / tbw) * 100;
      bodyCompForm.setFieldValue("icw", icw_percent?.toFixed(2));
      bodyCompForm.setFieldValue("ecw", ecw_percent?.toFixed(2));
      bodyCompForm.setFieldValue("pa", phaseAngle?.toFixed(1));
    }
  }, [
    phaseAngle,
    reactance,
    resistance,
    subject,
    bodyCompForm.values.gender,
    bodyCompForm.values.height_cm,
    bodyCompForm.values.weight_kg,
    bodyCompForm.values.height_in,
    bodyCompForm.values.weight_lb,
    bodyCompForm.values.units,
  ]);

  const onBodyCompClick = (bca: Whole_Body_Comp | null) => {
    setSaveResponseMessage({
      message: "",
      type: "success",
    });
    setRecordingDate(format(new Date(bca?.created_at), "yyyy-MM-dd"));
    if (bca === null) {
      resetFormData();
      return;
    }
    bodyCompForm.setValues({
      id: bca.id,
      name: bca.title,
      age: bca.age,
      gender: bca.gender as 0 | 1,
      units: "metric",
      height_in: bca.height / 2.54,
      weight_lb: bca.weight / 0.453592,
      height_cm: bca.height,
      weight_kg: bca.weight,
      icw: bca.icw,
      ecw: bca.ecw,
      pa: bca.phase_angle,
      tbw: bca.tbw,
    });
    setSelectedReactance(bca.reactance);
    setSelectedResistance(bca.resistance);
  };

  const resetFormData = () => {
    setRecordingDate("");
    resetValues();
    bodyCompForm.setValues({
      id: null,
      name: "Recording",
      age: bodyCompForm.values.age,
      gender: bodyCompForm.values.gender as 0 | 1,
      units: bodyCompForm.values.units,
      height_in: bodyCompForm.values.height_cm / 2.54,
      weight_lb: bodyCompForm.values.weight_kg / 0.453592,
      height_cm: bodyCompForm.values.height_cm,
      weight_kg: bodyCompForm.values.weight_kg,
      icw: 0,
      ecw: 0,
      pa: 0,
      tbw: 0,
    });
  };

  const getReportUrlParams = () => {
    const base_url = "https://rjl.heartquest-global.com";
    const values = {
      height_in: (bodyCompForm.values.height_cm / 2.54).toFixed(),
      weight_lb: (bodyCompForm.values.weight_kg / 0.453592).toFixed(),
      height_cm: bodyCompForm.values.height_cm.toString(),
      weight_kg: bodyCompForm.values.weight_kg.toString(),
    };
    const metric = bodyCompForm.values.units === "metric";

    if (bodyCompForm.values.id) {
      const params = new URLSearchParams({
        Fname: subject?.users_by_pk?.first_name
          ? subject?.users_by_pk?.first_name[0]
          : "",
        Lname: subject?.users_by_pk?.last_name
          ? subject?.users_by_pk?.last_name[0]
          : "",
        age: bodyCompForm.values.age.toString(),
        sex: bodyCompForm.values.gender === 0 ? "female" : "male",
        units: metric ? "Metric" : "English",
        weight: metric ? values.weight_kg : values.weight_lb,
        height: metric ? values.height_cm : values.height_in,
        resistance: selectedResistance ? selectedResistance.toString() : "500",
        reactance: selectedReactance ? selectedReactance.toString() : "50",
      });
      return base_url + "?" + params.toString();
    } else {
      return base_url;
    }
  };

  return (
    <div className="flex flex-row h-full justify-items-stretch">
      <div className="ml-[83px] w-[297px] h-full ">
        <SubjectContextBox userId={userId} subjectId={subjectId} />  
        <BodyCompRecordingMenu
          ref={recordingMenuRef}
          owner={subjectId}
          onItemClick={(item) => {
            onBodyCompClick(item);
          }}
        />
      </div>
      <div className="flex flex-col flex-1 ml-6">
      <div className="flex  ">
        <div className="flex-1"></div>
        <div className="flex flex-row items-center gap-4 pr-3 pt-3">
          {bodyCompForm.values.id && (
            <ReactToPrint
              content={() => componentRef.current}
              documentTitle={"Body Composition"}
              removeAfterPrint
              trigger={() => (
                <button className="flex inline-block ">
                  <Print /> Print
                </button>
              )}
            />
          )}
        </div>
      </div>
      <div className="text-2xl mt-4">Body Composition</div>
      <div className="h-12"></div>
      <form className="flex flex-col gap-2">
        <div className="flex flex-col">
          <label>Recording name</label>
          <div className="">
            <input
              type="text"
              name="name"
              className="flex-1 p-2 font-bold text-lg border-2 border-black rounded-md "
              onChange={bodyCompForm.handleChange}
              value={bodyCompForm.values.name}
            />
          </div>
          {recordingDate && <div>Date: {recordingDate}</div>}
          <div className="text-sm text-red-500">
            {bodyCompForm.errors.name ? (
              <div>{bodyCompForm.errors.name}</div>
            ) : null}
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col">
            <label>Age</label>
            <div className="">
              <input
                type="number"
                name="age"
                className=" p-2 text-center font-bold text-lg border-2 border-black rounded-md disabled:cursor-not-allowed disabled:bg-gray-200 disabled:border-gray-200"
                // disabled={bodyCompForm.values.id ? true : false}
                disabled
                onChange={bodyCompForm.handleChange}
                value={bodyCompForm.values.age}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label>Gender</label>
            <div className="">
              <select
                name="gender"
                className=" p-2 text-center font-bold text-lg border-2 border-black rounded-md disabled:cursor-not-allowed disabled:bg-gray-200 disabled:border-gray-200"
                // disabled={bodyCompForm.values.id ? true : false}
                disabled
                onChange={bodyCompForm.handleChange}
                value={bodyCompForm.values.gender}
              >
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>
          </div>
        </div>

        <div
          id="my-radio-group"
          className="flex flex-row gap-2 items-center mt-2"
        >
          {/* <div>Units in</div> */}
          {
            <div>
              <div
                role="group"
                aria-labelledby="units-group"
                className="flex flex-row gap-2"
              >
                <div>
                  <input
                    className="hidden peer"
                    type="radio"
                    id="unit_metric"
                    name="units"
                    onChange={bodyCompForm.handleChange}
                    value="metric"
                    checked={bodyCompForm.values.units === "metric"}
                  />
                  <label
                    className="flex flex-col px-3 py-1 border-2 border-gray-400 cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white rounded-md"
                    htmlFor="unit_metric"
                  >
                    <div>Metric</div>
                  </label>
                </div>
                <div>
                  <input
                    className="hidden peer"
                    type="radio"
                    id="unit_imperial"
                    name="units"
                    onChange={bodyCompForm.handleChange}
                    value="imperial"
                    checked={bodyCompForm.values.units === "imperial"}
                  />

                  <label
                    className="flex flex-col px-3 py-1 border-2 border-gray-400 cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white rounded-md"
                    htmlFor="unit_imperial"
                  >
                    <div>Imperial</div>
                  </label>
                </div>
              </div>
            </div>
          }
        </div>

        <div className="flex flex-row gap-4">
          <div className="flex flex-col">
            <label>
              Height ({unitLengthStrings[bodyCompForm.values.units]})
            </label>
            <div className="">
              <input
                type="number"
                name={
                  bodyCompForm.values.units === "metric"
                    ? "height_cm"
                    : "height_in"
                }
                className=" p-2 text-center font-bold text-lg border-2 border-black rounded-md disabled:cursor-not-allowed disabled:bg-gray-200 disabled:border-gray-200"
                disabled={bodyCompForm.values.id ? true : false}
                onChange={bodyCompForm.handleChange}
                value={
                  bodyCompForm.values.units === "metric"
                    ? bodyCompForm.values.height_cm
                    : bodyCompForm.values.height_in
                }
              />
            </div>
            <div className="text-sm text-red-500">
              {bodyCompForm.errors.height_cm ? (
                <div>{bodyCompForm.errors.height_cm}</div>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col">
            <label>
              Weight ({unitWeigthStrings[bodyCompForm.values.units]})
            </label>
            <div className="">
              <input
                type="number"
                name={
                  bodyCompForm.values.units === "metric"
                    ? "weight_kg"
                    : "weight_lb"
                }
                className=" p-2 text-center font-bold text-lg border-2 border-black rounded-md disabled:cursor-not-allowed disabled:bg-gray-200 disabled:border-gray-200"
                disabled={bodyCompForm.values.id ? true : false}
                onChange={bodyCompForm.handleChange}
                value={
                  bodyCompForm.values.units === "metric"
                    ? bodyCompForm.values.weight_kg
                    : bodyCompForm.values.weight_lb
                }
              />
            </div>
            <div className="text-sm text-red-500">
              {bodyCompForm.errors.weight_kg ? (
                <div>{bodyCompForm.errors.weight_kg}</div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
          <div className="flex flex-1 flex-col">
            <input
              value={bodyCompForm.values.icw}
              onChange={bodyCompForm.handleChange}
              type="number"
              name="icw"
              id="icw"
              className=" p-2 text-center font-bold text-lg border-2 border-black rounded-md disabled:cursor-not-allowed disabled:bg-gray-200 disabled:border-gray-200"
              disabled={bodyCompForm.values.id ? true : false}
            />
            <div className="text-center">ICW%</div>
          </div>
          <div className="flex flex-1 flex-col">
            <input
              value={bodyCompForm.values.ecw}
              onChange={bodyCompForm.handleChange}
              type="number"
              name="ecw"
              id="ecw"
              className=" p-2 text-center font-bold text-lg border-2 border-black rounded-md disabled:cursor-not-allowed disabled:bg-gray-200 disabled:border-gray-200"
              disabled={bodyCompForm.values.id ? true : false}
            />
            <div className="text-center">ECW%</div>
          </div>
          <div className="flex flex-1 flex-col">
            <input
              value={bodyCompForm.values.tbw}
              onChange={bodyCompForm.handleChange}
              type="number"
              name="tbw"
              id="tbw"
              className=" p-2 text-center font-bold text-lg border-2 border-black rounded-md disabled:cursor-not-allowed disabled:bg-gray-200 disabled:border-gray-200"
              disabled={bodyCompForm.values.id ? true : false}
            />
            <div className="text-center">TBW</div>
          </div>
          <div className="flex flex-1 flex-col">
            <input
              value={bodyCompForm.values.pa}
              onChange={bodyCompForm.handleChange}
              type="number"
              name="pa"
              id="pa"
              className=" p-2 text-center font-bold text-lg border-2 border-black rounded-md disabled:cursor-not-allowed disabled:bg-gray-200 disabled:border-gray-200"
              disabled={bodyCompForm.values.id ? true : false}
            />
            <div className="text-center">PA</div>
          </div>
        </div>
        {reactance && resistance && !bodyCompForm.values.id ? (
          <div className="flex flex-col text-gray-500">
            <span>Reactance: {reactance}</span>
            <span>Resistance: {resistance}</span>
          </div>
        ) : null}
        <div className="flex flex-row gap-4">
          {bodyCompForm.values.id || (reactance && reactance) ? (
            ""
          ) : (
            <button
              className="bg-charcoal rounded-md text-white py-2 px-5 mt-4"
              type="button"
              onClick={read}
            >
              Get Values
            </button>
          )}
          {!bodyCompForm.values.id && bodyCompForm.isValid && reactance ? (
            <button
              type="submit"
              className={`bg-green-500 rounded-md text-white py-2 px-5 mt-4 `}
              onClick={(event: any) => bodyCompForm.handleSubmit(event)}
            >
              Save
            </button>
          ) : null}
          {bodyCompForm.values.id && (
            <button
              type="button"
              className="bg-charcoal rounded-md text-white py-2 px-5 mt-4"
              onClick={() => {
                updateTilte({
                  id: bodyCompForm.values.id,
                  title: bodyCompForm.values.name,
                });
              }}
            >
              Update
            </button>
          )}
          <button
            type="button"
            className="bg-charcoal rounded-md text-white py-2 px-5 mt-4"
            onClick={(event: any) => {
              resetFormData();
              setSaveResponseMessage({
                message: "",
                type: "success",
              });
            }}
          >
            New
          </button>
          <a
            href={getReportUrlParams()}
            target="_blank"
            className="bg-charcoal rounded-md text-white py-2 px-5 mt-4"
          >
            Extended Report
          </a>
        </div>
        <div
          className={
            saveResponseType === "error" ? "text-red-500" : "text-green-500"
          }
        >
          {saveResponseMessage}
        </div>
      </form>
      {/* <div className="flex w-full flex-row">
        <div className="text-xl mr-6  items-center">Actual Values</div>
        <BcaComponent bcaData={bcaData} setBcaData={setBcaData} />
      </div> */}
      {gender === "female" && (
        <>
          <div className="flex justify-end mb-8">Optimal for female 55%</div>
          <FemaleTable age={bodyCompForm.values.age} />
        </>
      )}
      {gender === "male" && (
        <>
          <div className="flex justify-end mb-8">Optimal for male 60%</div>
          <MaleTable age={bodyCompForm.values.age} />
        </>
      )}

      <div className="mt-16 px-16">
        <div className="text-xl font-bold">
          Explanation of the Findings on the Body Composition Analysis
        </div>
        <div>
          <p>
            <span className="font-bold text-lg">
              ICW (Intracellular Water) = &nbsp;
            </span>
            A sensitive indicator of cellular nutritional health and higher is
            better. This number should be higher than extracellular water.
            Increased ICW as a result of exercise is a sign of increased Lean
            Body Mass, which is a very good thing and has positive health
            benefits, including: increased energy.
          </p>
          <p>
            <span className="font-bold text-lg">
              ECW (Extracellular Water) = &nbsp;
            </span>
            Indicator of toxicity. Increased levels of ECW can compress
            capillaries and thus diminish oxygen transport to all cells. This
            can result in fatigue, sleep problems, headaches, confusion, and
            anxiety. Less is best. One of the reasons that ECW is greater than
            ICW is that the answer to pollution is dilution and this is how the
            body is dealing with toxicity. Excess water outside your cells can
            indicate health risks such as inflammation.
          </p>
          <p>
            <span className="font-bold text-lg">
              TBW (Total Body Water) = &nbsp;
            </span>
            Used to estimate hydration status. The normal range for adult women
            varies between 45% and 60%. For men, the ideal body water percentage
            fluctuates between 50% and 65% of the total body. In babies, that
            number is much higher.
          </p>
          <p>
            <span className="font-bold text-lg">Phase Angle = &nbsp;</span>A
            sensitive indicator and predictor of Total Health. Phase Angle
            measures the strength and resiliency of the cell membrane itself.
            The cell membrane is the brains of the cell and tells the nuclear
            DNA what to transcribe. Imbedded in the cell membrane are receptors
            such as the hormone receptors. If the membrane is too fluid or too
            stiff then the hormone messages could be less than optimal. There
            are several studies that show the Phase Angle to be an accurate and
            sensitive predictor of long-term prognosis in many chronic health
            issues. Higher is better. Your health provider may talk to you about
            adding in healthy Omega Fatty Acids into your program and reducing
            processed fats found in processed foods. Sometimes there can be an
            issue in digesting fats and your health provider can address this
            issue.
          </p>
        </div>
      </div>

      <div
        style={{
          width: "210mm",
          height: "297mm",
          display: "none",
        }}
      >
        <div ref={componentRef}>
          <div
            className="flex flex-col justify-center items-start w-full  mt-2"
            style={{
              width: "210",
            }}
          >
            <div className="text-charcoal text-md">
              {subject?.users_by_pk?.first_name}{" "}
              {subject?.users_by_pk?.last_name}
            </div>
            {subject && (
              <div className="text-charcoal text-md">
                Age:{" "}
                {differenceInYears(
                  new Date(),
                  new Date(subject.users_by_pk?.birth_date)
                )}{" "}
              </div>
            )}
            {subject && subject.users_by_pk && subject.users_by_pk.data ? (
              <div className="text-charcoal text-md">
                {" "}
                Gender:
                <span className=" capitalize ">
                  {" " + JSON.parse(subject.users_by_pk?.data).data.gender}
                </span>
              </div>
            ) : null}
          </div>

          <div className="mt-16"></div>
          <div className="text-lg font-bold">{bodyCompForm.values.name}</div>
          <div className="text-charcoal text-sm">
            Date:
            <span className=" capitalize ">{" " + recordingDate}</span>
          </div>
          <div className="flex w-full flex-row">
            <BcaComponent
              height={bodyCompForm.values.height_cm.toString()}
              weight={bodyCompForm.values.weight_kg.toString()}
              age={bodyCompForm.values.age.toString()}
              ecw={bodyCompForm.values.ecw.toString()}
              icw={bodyCompForm.values.icw.toString()}
              tbw={bodyCompForm.values.tbw.toString()}
              pa={bodyCompForm.values.pa.toString()}
            />
          </div>
          {gender === "female" && (
            <>
              <div className="flex justify-end">Optimal for female 55%</div>
              <FemaleTable age={bodyCompForm.values.age} />
            </>
          )}
          {gender === "male" && (
            <>
              <div className="flex justify-end">Optimal for male 60%</div>
              <MaleTable age={bodyCompForm.values.age} />
            </>
          )}
          <div className="mt-16 px-16">
            <div className="text-xl font-bold">
              Explanation of the Findings on the Body Composition Analysis
            </div>
            <div>
              <p>
                <span className="font-bold text-lg">
                  ICW (Intracellular Water) = &nbsp;
                </span>
                A sensitive indicator of cellular nutritional health and higher
                is better. This number should be higher than extracellular
                water. Increased ICW as a result of exercise is a sign of
                increased Lean Body Mass, which is a very good thing and has
                positive health benefits, including: increased energy.
              </p>
              <p>
                <span className="font-bold text-lg">
                  ECW (Extracellular Water) = &nbsp;
                </span>
                Indicator of toxicity. Increased levels of ECW can compress
                capillaries and thus diminish oxygen transport to all cells.
                This can result in fatigue, sleep problems, headaches,
                confusion, and anxiety. Less is best. One of the reasons that
                ECW is greater than ICW is that the answer to pollution is
                dilution and this is how the body is dealing with toxicity.
                Excess water outside your cells can indicate health risks such
                as inflammation.
              </p>
              <p>
                <span className="font-bold text-lg">
                  TBW (Total Body Water) = &nbsp;
                </span>
                Used to estimate hydration status. The normal range for adult
                women varies between 45% and 60%. For men, the ideal body water
                percentage fluctuates between 50% and 65% of the total body. In
                babies, that number is much higher.
              </p>
              <p>
                <span className="font-bold text-lg">Phase Angle = &nbsp;</span>A
                sensitive indicator and predictor of Total Health. Phase Angle
                measures the strength and resiliency of the cell membrane
                itself. The cell membrane is the brains of the cell and tells
                the nuclear DNA what to transcribe. Imbedded in the cell
                membrane are receptors such as the hormone receptors. If the
                membrane is too fluid or too stiff then the hormone messages
                could be less than optimal. There are several studies that show
                the Phase Angle to be an accurate and sensitive predictor of
                long-term prognosis in many chronic health issues. Higher is
                better. Your health provider may talk to you about adding in
                healthy Omega Fatty Acids into your program and reducing
                processed fats found in processed foods. Sometimes there can be
                an issue in digesting fats and your health provider can address
                this issue.
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

interface TbcaCompProps {
  height: string;
  weight: string;
  age: string;
  icw: string;
  ecw: string;
  pa: string;
  tbw: string;
}

const BcaComponent = ({
  height,
  weight,
  age,
  icw,
  ecw,
  pa,
  tbw,
}: TbcaCompProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 my-8">
      <div className="flex flex-1 flex-col">
        <input
          readOnly
          value={height}
          type="number"
          name="age"
          id="age"
          className="flex-1 p-2 text-center font-bold text-lg border-2 border-black rounded-md "
        />
        <div className="text-center">Height</div>
      </div>
      <div className="flex flex-1 flex-col">
        <input
          readOnly
          value={weight}
          type="number"
          name="age"
          id="age"
          className="flex-1 p-2 text-center font-bold text-lg border-2 border-black rounded-md "
        />
        <div className="text-center">Weight</div>
      </div>
      <div className="flex flex-1 flex-col">
        <input
          readOnly
          value={icw}
          type="number"
          name="icw"
          id="icw"
          className=" p-2 text-center font-bold text-lg border-2 border-black rounded-md "
        />
        <div className="text-center">ICW</div>
      </div>
      <div className="flex flex-1 flex-col">
        <input
          readOnly
          value={ecw}
          type="number"
          name="ecw"
          id="ecw"
          className=" p-2 text-center font-bold text-lg border-2 border-black rounded-md "
        />
        <div className="text-center">ECW</div>
      </div>
      <div className="flex flex-1 flex-col">
        <input
          readOnly
          value={tbw}
          type="number"
          name="tbw"
          id="tbw"
          className=" p-2 text-center font-bold text-lg border-2 border-black rounded-md "
        />
        <div className="text-center">TBW</div>
      </div>
      <div className="flex flex-1 flex-col">
        <input
          readOnly
          value={pa}
          type="number"
          name="pa"
          id="pa"
          className=" p-2 text-center font-bold text-lg border-2 border-black rounded-md "
        />
        <div className="text-center">PA</div>
      </div>
    </div>
  );
};

export default BodyCompAnalysis;

function FemaleTable({ age }: { age: number }) {
  return (
    <table className="text-center w-full">
      <thead>
        <tr>
          <th>AGE</th>
          <th>ICW</th>
          <th>ECW</th>
          <th>PA</th>
        </tr>
      </thead>
      <tbody>
        <tr className={age <= 30 ? " bg-slate-200 " : ""}>
          <td>20-29</td>
          <td>61%</td>
          <td>39%</td>
          <td>7.3</td>
        </tr>
        <tr className={age > 30 && age <= 40 ? " bg-slate-200 " : ""}>
          <td>30-39</td>
          <td>60%</td>
          <td>40%</td>
          <td>7.0</td>
        </tr>
        <tr className={age > 40 && age <= 50 ? " bg-slate-200 " : ""}>
          <td>40-49</td>
          <td>59%</td>
          <td>41%</td>
          <td>6.7</td>
        </tr>
        <tr className={age > 50 && age <= 60 ? " bg-slate-200 " : ""}>
          <td>50-59</td>
          <td>57%</td>
          <td>43%</td>
          <td>6.3</td>
        </tr>
        <tr className={age > 60 && age <= 70 ? " bg-slate-200 " : ""}>
          <td>60-69</td>
          <td>55%</td>
          <td>43%</td>
          <td>5.8</td>
        </tr>
        <tr className={age > 70 && age <= 80 ? " bg-slate-200 " : ""}>
          <td>70-79</td>
          <td>53%</td>
          <td>47%</td>
          <td>5.2</td>
        </tr>
        <tr className={age > 80 ? " bg-slate-200 " : ""}>
          <td>80+</td>
          <td>51%</td>
          <td>49%</td>
          <td>4.5</td>
        </tr>
      </tbody>
    </table>
  );
}
function MaleTable({ age }: { age: number }) {
  return (
    <table className="text-center w-full">
      <thead>
        <tr>
          <th>AGE</th>
          <th>ICW</th>
          <th>ECW</th>
          <th>PA</th>
        </tr>
      </thead>
      <tbody>
        <tr className={age <= 30 ? " bg-slate-200 " : ""}>
          <td>20-29</td>
          <td>66%</td>
          <td>34%</td>
          <td>7.9</td>
        </tr>
        <tr className={age > 30 && age <= 40 ? " bg-slate-200 " : ""}>
          <td>30-39</td>
          <td>65%</td>
          <td>35%</td>
          <td>7.6</td>
        </tr>
        <tr className={age > 40 && age <= 50 ? " bg-slate-200 " : ""}>
          <td>40-49</td>
          <td>64%</td>
          <td>36%</td>
          <td>7.3</td>
        </tr>
        <tr className={age > 50 && age <= 60 ? " bg-slate-200 " : ""}>
          <td>50-59</td>
          <td>62%</td>
          <td>38%</td>
          <td>6.9</td>
        </tr>
        <tr className={age > 60 && age <= 70 ? " bg-slate-200 " : ""}>
          <td>60-69</td>
          <td>60%</td>
          <td>43%</td>
          <td>6.4</td>
        </tr>
        <tr className={age > 70 && age <= 80 ? " bg-slate-200 " : ""}>
          <td>70-79</td>
          <td>58%</td>
          <td>42%</td>
          <td>5.8</td>
        </tr>
        <tr className={age > 80 ? " bg-slate-200 " : ""}>
          <td>80+</td>
          <td>56%</td>
          <td>48%</td>
          <td>5.1</td>
        </tr>
      </tbody>
    </table>
  );
}

const calculateECW = (
  gender: 0 | 1,
  heightInCm2: number,
  weightInKg: number,
  resistance: number,
  reactance: number
): number => {
  var ecw = 0;
  if (gender === 1) {
    ecw =
      -5.22 +
      (0.2 * heightInCm2) / resistance +
      (0.005 * heightInCm2) / reactance +
      0.08 * weightInKg +
      1.9;
  }
  if (gender === 0) {
    ecw =
      -5.22 +
      (0.2 * heightInCm2) / resistance +
      (0.005 * heightInCm2) / reactance +
      0.08 * weightInKg +
      3.76;
  }
  return ecw;
};

const calculateTBW = (
  gender: 0 | 1,
  heightInCm2: number,
  weightInKg: number,
  resistance: number
) => {
  let tbw = 0;
  if (gender === 1) {
    tbw = 1.203 + 0.176 * weightInKg + (0.449 * heightInCm2) / resistance;
  }
  if (gender === 0) {
    tbw = 3.747 + 0.113 * weightInKg + (0.45 * heightInCm2) / resistance;
  }
  return tbw;
};

type BodyCompRecordingMenuProps = {
  owner: string;
  onItemClick: (wbc: Whole_Body_Comp | null) => void;
};

type BodyCompRecordingMenuRef = {
  refresh: () => void;
  refreshAndSelect: (id: string) => void;
  setMenuOpen: (open: boolean) => void;
};

const BodyCompRecordingMenu = forwardRef<
  BodyCompRecordingMenuRef,
  BodyCompRecordingMenuProps
>((props, ref) => {
  const [listOpen, setListOpen] = useState(false);
  const [initDeleteItem, setInitDeleteItem] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Whole_Body_Comp | null>(
    null
  );

  const { data, refetch } = useGetWholeBodyCompByOwnerQuery(dataSource, {
    owner: props.owner,
  });

  const { isLoading, mutate } = useDeleteWholeBodyCompTitleMutation(
    dataSource,
    {
      onSuccess(data, variables, context) {
        setInitDeleteItem(false);
        setSelectedItem(null);
        props.onItemClick(null);
        refetch();
      },
    }
  );

  useEffect(() => {
    if (data) {
      refetch();
    }
  }, [listOpen]);

  useImperativeHandle(ref, () => ({
    refresh: runRefresh,
    refreshAndSelect: refreshAndSelect,
    setMenuOpen: setListOpen,
  }));

  const runRefresh = () => {
    refetch();
  };

  const refreshAndSelect = (id: string) => {
    refetch().then((data) => {
      if (data.data) {
        setActiveRecordingById(data.data, id);
      }
    });
  };

  const setActiveRecordingById = (
    data: GetWholeBodyCompByOwnerQuery,
    id: string
  ) => {
    let item = data?.whole_body_comp.find((item) => item.id === id);

    if (item) {
      setSelectedItem(item);
      props.onItemClick(item as Whole_Body_Comp);
    }
  };

  const deleteItem = () => {
    if (selectedItem) {
      mutate({
        id: selectedItem.id,
      });
    }
  };

  return (
    <>
    <div
            onClick={(e) => e.stopPropagation()}
            className={`h-full flex flex-col min-h-40 bg-white mt-6 `}
          >
            <div className="text-charcoal text-lg border-desaturated-grey border-b-[1px] mb-3 uppercase p-3">
              Body Comp Recordings
            </div>
            <div className="flex flex-col overflow-y-scroll ">
              {data?.whole_body_comp.map((item) => (
                <div
                  key={item.id}
                  className={`flex flex-col border-b-[1px] border-desaturated-grey py-2 px-3 ${
                    item.id === selectedItem?.id && "bg-light-grey"
                  }`}
                >
                  <div className="flex flex-row justify-between">
                    <button
                      key={item.id}
                      className={`flex-1 flex flex-col justify-between items-start `}
                      onClick={() => {
                        setSelectedItem(item);
                        props.onItemClick(item);
                      }}
                    >
                      <div>{item.title}</div>
                      <div className=" text-xs text-primary-grey ">
                        {format(
                          new Date(item.created_at),
                          "dd MMM yyyy  kk:mm"
                        )}
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedItem(item);
                        props.onItemClick(item);
                        setInitDeleteItem(true);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 hover:stroke-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                  {selectedItem?.id === item.id && initDeleteItem && (
                    <div className="flex flex-row mt-2 border-t-[1px] border-gray-400">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold mt-2">
                          Delete this item
                        </span>
                        <div className="flex flex-row justify-end text-sm gap-2 mt-2">
                          {isLoading && <Loader className="w-5 h-5" />}
                          <button
                            className="bg-red-500 hover:bg-red-700 px-2 py-1 rounded-sm text-white"
                            onClick={() => deleteItem()}
                          >
                            Delete
                          </button>
                          <button
                            className=" bg-charcoal px-2 py-1 rounded-sm text-white"
                            onClick={() => {
                              setInitDeleteItem(false);
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
    </>
  );
});
