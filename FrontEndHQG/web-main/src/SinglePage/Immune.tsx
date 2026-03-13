import { useMatch } from "@tanstack/react-location";
import { DisplayWrapper } from "../Common/DisplayWrapper";
import { useUserContext } from "../Hooks/UserContext";
import {
  Order_By,
  useGetAllHeartDataForOwnerQuery,
} from "../generated/graphql";
import { LocationGenerics } from "../Router/CustomRouter";
import { SectionTwo } from "../Common/SectionTwo";
import { useDescriptionModal } from "../Hooks/DescriptionModal";
import { BasicModalElement } from "../Common/Modals/BasicModalElement";
import { HorisontalBar } from "../Common/graphs/HorisontalBar";
import { CollapsiblePanel } from "../Common/CollapsiblePanel";
import { SpecificExplanationItem } from "../Common/SpecificExplanationItem";
import { useAuth } from "../Hooks/AuthContext";
import {
  immune_balance,
  immune_power,
  immune_response,
  inflam_index,
} from "../utils/gradients";
import { useRef, useState } from "react";
import { Pie } from "../Common/graphs/Pie";
import { Switch } from "../Common/Switch";
import ReactToPrint from "react-to-print";
import { Print } from "../Common/icons/Print";
import { differenceInYears, format } from "date-fns";

const dataSource = {
  endpoint: import.meta.env.VITE_GRAPHQL_URL,
  fetchParams: {
    headers: {
      // 'Authorization': `Bearer ${auth.user?.token}`,
      "X-Hasura-Admin-Secret": import.meta.env.VITE_GRAPHQL_HEADER,
    },
  },
};

export const Immune = () => {
  const auth = useAuth();
  const {
    params: { subjectId },
    data: {},
  } = useMatch<LocationGenerics>();
  const { currentRecording } = useUserContext();
  const { setOpen } = useDescriptionModal();

  const [visualised, setVisualised] = useState(false);
  const componentRef = useRef(null);

  const {
    data: subject,
    isLoading: subjectLoading,
    refetch: subjectRefetch,
  } = useGetAllHeartDataForOwnerQuery(
    dataSource,
    {
      _eq: subjectId || "",
      id: subjectId,
      where: {
        owner: { _eq: subjectId },
        deleted_on: { _is_null: true },
        // ...(query.get('trend') ? { trend_recording: { _eq: query.get('trend') } } : { trend_recording: { _is_null: false } }),
      },
      order_by: Order_By.Desc,
    },
    {
      enabled: !!subjectId,
      refetchInterval: 3000,
    }
  );

  const total_power = currentRecording?.data?.frequencyDomain?.total_power;

  const immunePowerCalc = total_power / 3500;
  const immunePower = Math.round(immunePowerCalc * 100);

  const HF = currentRecording?.data?.frequencyDomain?.hf;
  const LF = currentRecording?.data?.frequencyDomain?.lf;
  const VLF = currentRecording?.data?.frequencyDomain?.vlf;
  const immuneBalance = (HF + LF) / VLF;

  const innateSystem = (VLF / 1500) * 100;
  const adaptiveSystem = ((HF + LF) / 2000) * 100;

  return (
    <>
      <DisplayWrapper>
        <div className="flex ">
          <div className="flex-1"></div>
          <div className="flex flex-row items-center gap-1">
            <ReactToPrint
              content={() => componentRef.current}
              documentTitle={"HeartQuest Immune Screen"}
              removeAfterPrint
              trigger={() => (
                <button>
                  <Print />
                </button>
              )}
            />
          </div>
        </div>
        <div className="text-2xl mt-8">Immune System Screen</div>
        <SectionTwo>
          <div>
            <div
              onClick={() =>
                setOpen(
                  <BasicModalElement
                    title="Immune System Power"
                    descriptionKey="immune-system-power"
                  />
                )
              }
              className="cursor-pointer mt-12"
            >
              <HorisontalBar
                refKey="immunePower"
                title="Immune System Power %"
                value={clamp(0, 100, immunePower)}
                absoluteRange={[0, 100]}
                gradientsColors={immune_power}
                expanded={auth.graphsExpanded}
                fixed={0}
              />
            </div>
            <div
              onClick={() =>
                setOpen(
                  <BasicModalElement
                    title="Immune System Response Stage"
                    descriptionKey="immune-system-response"
                  />
                )
              }
              className="cursor-pointer mt-8"
            >
              <HorisontalBar
                refKey="immuneResponse"
                title="Immune System Response Stage (25-50)"
                value={clamp(0, 100, currentRecording?.data?.amo * 100)}
                absoluteRange={[0, 100]}
                gradientsColors={immune_response}
                expanded={auth.graphsExpanded}
                fixed={0}
                markersInside={[
                  {
                    pos: 1,
                    text: "|",
                  },
                  {
                    pos: 20,
                    text: "|",
                  },
                  {
                    pos: 40,
                    text: "|",
                  },
                  {
                    pos: 65,
                    text: "|",
                  },
                  {
                    pos: 99,
                    text: "|",
                  },
                ]}
                markersBottom={[
                  {
                    pos: 2,
                    text: "Weakness",
                  },
                  {
                    pos: 20,
                    text: "Overreaction",
                  },
                  {
                    pos: 42,
                    text: "Balanced (25-50)",
                  },
                  {
                    pos: 65,
                    text: "Stressed",
                  },
                  {
                    pos: 97,
                    text: "Exhaustion",
                  },
                ]}
              />
            </div>
            <div
              onClick={() =>
                setOpen(
                  <BasicModalElement
                    title="Inflam Index"
                    descriptionKey="inflamIndex"
                  />
                )
              }
              className="cursor-pointer mt-8"
            >
              <HorisontalBar
                refKey="inflamIndex"
                title="Inflam Index"
                value={currentRecording?.data.inflamIndex}
                idealRange={[75, 300]}
                absoluteRange={[0, 1500]}
                gradientsColors={inflam_index}
                expanded={auth.graphsExpanded}
                fixed={0}
              />
            </div>
            <div
              onClick={() =>
                setOpen(
                  <BasicModalElement
                    title="Immune System Balance"
                    descriptionKey="immune-system-balance"
                  />
                )
              }
              className="cursor-pointer mt-8"
            >
              <HorisontalBar
                refKey="immuneBalance"
                title="Immune System Balance (1-3)"
                value={clamp(-2, 6, immuneBalance)}
                absoluteRange={[-2, 6]}
                gradientsColors={immune_balance}
                expanded={auth.graphsExpanded}
                fixed={0}
                markersInside={[
                  {
                    pos: -1.5,
                    text: "Innate System",
                  },
                  {
                    pos: 2,
                    text: "Balanced",
                  },
                  {
                    pos: 5.5,
                    text: "Adaptive System",
                  },
                ]}
              />
            </div>
            <div className="flex flex-row gap-4 mt-2 mb-6">
              <div className="flex-1 flex flex-row items-center justify-center">
                <svg
                  width="30"
                  height="50"
                  viewBox="0 0 30 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.9553 49.0359L29.3891 24.0359L0.521567 24.0359L14.9553 49.0359ZM12.4553 0.984589L12.4553 26.5359L17.4553 26.5359L17.4553 0.984589L12.4553 0.984589Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div className="flex-1 flex flex-row items-center justify-center">
                <svg
                  width="30"
                  height="50"
                  viewBox="0 0 30 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.9553 49.0359L29.3891 24.0359L0.521567 24.0359L14.9553 49.0359ZM12.4553 0.984589L12.4553 26.5359L17.4553 26.5359L17.4553 0.984589L12.4553 0.984589Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-row mb-4">
              <div className="flex-1 bg-primary-green text-white text-center py-1">
                <div>Innate System Power</div>
                <div>
                  {getInnateAdaptiveRange(clamp(0, 100, innateSystem))} -{" "}
                  {clamp(0, 100, innateSystem)?.toFixed()}%
                </div>
              </div>
              <div className="flex-1 bg-primary-yellow text-white text-center py-1">
                <div>Adaptive System Power</div>
                <div>
                  {getInnateAdaptiveRange(clamp(0, 100, adaptiveSystem))} -{" "}
                  {clamp(0, 100, adaptiveSystem)?.toFixed()}%
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <div>Visualize</div>
              <Switch
                defaultChecked={visualised}
                onChange={() => {
                  setVisualised(!visualised);
                }}
              />
            </div>
            <div className="flex flex-row gap-4 mt-4">
              <div className="flex-1">
                <InnateImmune
                  visualised={visualised}
                  expanded={auth.graphsExpanded}
                  antiInflamPower={{
                    value: 0,
                    percentage:
                      currentRecording?.data?.meridians?.lu +
                      currentRecording?.data?.meridians?.bl,
                  }}
                  inflamPower={{
                    value: 0,
                    percentage:
                      currentRecording?.data?.meridians?.ki +
                      currentRecording?.data?.meridians?.li,
                  }}
                />
              </div>
              <div className="flex-1">
                <AdaptiveImmune
                  visualised={visualised}
                  expanded={auth.graphsExpanded}
                  th1={{
                    value: 0,
                    percentage:
                      currentRecording?.data?.meridians?.ht +
                      currentRecording?.data?.meridians?.gb,
                  }}
                  th2={{
                    value: 0,
                    percentage:
                      currentRecording?.data?.meridians?.lv +
                      currentRecording?.data?.meridians?.si,
                  }}
                  treg={{
                    value: 0,
                    percentage:
                      currentRecording?.data?.meridians?.sp +
                      currentRecording?.data?.meridians?.tw,
                  }}
                  t17={{
                    value: 0,
                    percentage:
                      currentRecording?.data?.meridians?.st +
                      currentRecording?.data?.meridians?.pc,
                  }}
                />
              </div>
            </div>
          </div>
          <CollapsiblePanel
            title={"Immune Summary"}
            content={
              <>
                <SpecificExplanationItem
                  value={currentRecording?.data.inflamIndex}
                  refKey={"inflamIndex"}
                />
              </>
            }
          />
        </SectionTwo>
      </DisplayWrapper>

      <div
        style={{
          width: "210mm",
          height: "297mm",
          display: "none",
          // overflow: "hidden",
          //  height: 0,
        }}
      >
        <div
          ref={componentRef}
          style={{
            width: "210mm",
          }}
        >
          <div
            className="flex flex-col justify-center items-start w-full bg-opacity-10 "
            style={{
              width: "210",
            }}
          >
            <div className="mt-2">
              <div className="text-charcoal text-md ">
                {currentRecording?.title}
              </div>
              <div className="text-charcoal text-xs">
                {currentRecording?.created_on
                  ? format(
                      new Date(currentRecording?.created_on),
                      "dd MMM yyyy  kk:mm"
                    )
                  : null}
              </div>
            </div>
          </div>

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
            {subject && subject.users_by_pk && subject.users_by_pk.data && (
              <div className="text-charcoal text-md">
                {" "}
                Gender:
                <span className=" capitalize ">
                  {" " + JSON.parse(subject.users_by_pk?.data).data.gender}
                </span>
              </div>
            )}
          </div>

          <div className="mt-16"></div>
          <div>
            <div
              onClick={() =>
                setOpen(
                  <BasicModalElement
                    title="Inflam Index"
                    descriptionKey="inflamIndex"
                  />
                )
              }
              className="cursor-pointer mt-12"
            >
              <HorisontalBar
                refKey="immunePower"
                title="Immune System Power %"
                value={clamp(0, 100, immunePower)}
                absoluteRange={[0, 100]}
                gradientsColors={immune_power}
                expanded={auth.graphsExpanded}
                fixed={0}
              />
            </div>
            <div
              onClick={() =>
                setOpen(
                  <BasicModalElement
                    title="Inflam Index"
                    descriptionKey="inflamIndex"
                  />
                )
              }
              className="cursor-pointer mt-8"
            >
              <HorisontalBar
                refKey="immuneResponse"
                title="Immune System Response Stage (25-50)"
                value={clamp(0, 100, currentRecording?.data?.amo * 100)}
                absoluteRange={[0, 100]}
                gradientsColors={immune_response}
                expanded={auth.graphsExpanded}
                fixed={0}
                markersInside={[
                  {
                    pos: 1,
                    text: "|",
                  },
                  {
                    pos: 20,
                    text: "|",
                  },
                  {
                    pos: 40,
                    text: "|",
                  },
                  {
                    pos: 65,
                    text: "|",
                  },
                  {
                    pos: 99,
                    text: "|",
                  },
                ]}
                markersBottom={[
                  {
                    pos: 2,
                    text: "Weakness",
                  },
                  {
                    pos: 20,
                    text: "Overreaction",
                  },
                  {
                    pos: 42,
                    text: "Balanced (25-50)",
                  },
                  {
                    pos: 65,
                    text: "Stressed",
                  },
                  {
                    pos: 97,
                    text: "Exhaustion",
                  },
                ]}
              />
            </div>
            <div
              onClick={() =>
                setOpen(
                  <BasicModalElement
                    title="Inflam Index"
                    descriptionKey="inflamIndex"
                  />
                )
              }
              className="cursor-pointer mt-8"
            >
              <HorisontalBar
                refKey="inflamIndex"
                title="Inflam Index"
                value={currentRecording?.data.inflamIndex}
                idealRange={[75, 300]}
                absoluteRange={[0, 1500]}
                gradientsColors={inflam_index}
                expanded={auth.graphsExpanded}
                fixed={0}
              />
            </div>
            <div
              onClick={() =>
                setOpen(
                  <BasicModalElement
                    title="Inflam Index"
                    descriptionKey="inflamIndex"
                  />
                )
              }
              className="cursor-pointer mt-8"
            >
              <HorisontalBar
                refKey="immuneBalance"
                title="Immune System Balance (1-3)"
                value={clamp(-2, 6, immuneBalance)}
                absoluteRange={[-2, 6]}
                gradientsColors={immune_balance}
                expanded={auth.graphsExpanded}
                fixed={0}
                markersInside={[
                  {
                    pos: -1.5,
                    text: "Innate System",
                  },
                  {
                    pos: 2,
                    text: "Balanced",
                  },
                  {
                    pos: 5.5,
                    text: "Adaptive System",
                  },
                ]}
              />
            </div>
            <div className="flex flex-row gap-4 mt-2 mb-6">
              <div className="flex-1 flex flex-row items-center justify-center">
                <svg
                  width="30"
                  height="50"
                  viewBox="0 0 30 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.9553 49.0359L29.3891 24.0359L0.521567 24.0359L14.9553 49.0359ZM12.4553 0.984589L12.4553 26.5359L17.4553 26.5359L17.4553 0.984589L12.4553 0.984589Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div className="flex-1 flex flex-row items-center justify-center">
                <svg
                  width="30"
                  height="50"
                  viewBox="0 0 30 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.9553 49.0359L29.3891 24.0359L0.521567 24.0359L14.9553 49.0359ZM12.4553 0.984589L12.4553 26.5359L17.4553 26.5359L17.4553 0.984589L12.4553 0.984589Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-row mb-4">
              <div className="flex-1 bg-primary-green text-white text-center py-1">
                <div>Innate System Power</div>
                <div>
                  {getInnateAdaptiveRange(clamp(0, 100, innateSystem))} -{" "}
                  {clamp(0, 100, innateSystem)?.toFixed()}%
                </div>
              </div>
              <div className="flex-1 bg-primary-yellow text-white text-center py-1">
                <div>Adaptive System Power</div>
                <div>
                  {getInnateAdaptiveRange(clamp(0, 100, adaptiveSystem))} -{" "}
                  {clamp(0, 100, adaptiveSystem)?.toFixed()}%
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-4 mt-4">
              <div className="flex-1">
                <InnateImmune
                  visualised={visualised}
                  expanded={auth.graphsExpanded}
                  antiInflamPower={{
                    value: 0,
                    percentage:
                      currentRecording?.data?.meridians?.lu +
                      currentRecording?.data?.meridians?.bl,
                  }}
                  inflamPower={{
                    value: 0,
                    percentage:
                      currentRecording?.data?.meridians?.ki +
                      currentRecording?.data?.meridians?.li,
                  }}
                />
              </div>
              <div className="flex-1">
                <AdaptiveImmune
                  visualised={visualised}
                  expanded={auth.graphsExpanded}
                  th1={{
                    value: 0,
                    percentage:
                      currentRecording?.data?.meridians?.ht +
                      currentRecording?.data?.meridians?.gb,
                  }}
                  th2={{
                    value: 0,
                    percentage:
                      currentRecording?.data?.meridians?.lv +
                      currentRecording?.data?.meridians?.si,
                  }}
                  treg={{
                    value: 0,
                    percentage:
                      currentRecording?.data?.meridians?.sp +
                      currentRecording?.data?.meridians?.tw,
                  }}
                  t17={{
                    value: 0,
                    percentage:
                      currentRecording?.data?.meridians?.st +
                      currentRecording?.data?.meridians?.pc,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

type ImmuneProps = {
  expanded: boolean;
  visualised: boolean;
  antiInflamPower: {
    value: number;
    percentage: number;
  };
  inflamPower: {
    value: number;
    percentage: number;
  };
};

type AdaptiveSystemProps = {
  expanded: boolean;
  visualised: boolean;
  th1: {
    value: number;
    percentage: number;
  };
  th2: {
    value: number;
    percentage: number;
  };
  treg: {
    value: number;
    percentage: number;
  };
  t17: {
    value: number;
    percentage: number;
  };
};

const InnateImmune = (props: ImmuneProps) => {
  const { setOpen } = useDescriptionModal();
  return (
    <div className="flex flex-col ">
      {!props.visualised ? (
        <div className="flex flex-col border-2">
          <div
            className="flex flex-1 flex-row justify-between w-full border-b-2 px-2 py-2 text-white bg-primary-green cursor-pointer"
            onClick={() =>
              setOpen(
                <BasicModalElement
                  title="Anti-inflammatory"
                  descriptionKey="immune-anti-inflammatory"
                />
              )
            }
          >
            <div className="flex-1">Anti-inflammatory</div>
            <div>{props.antiInflamPower.percentage.toFixed(0)}%</div>
          </div>
          <div
            className="flex flex-row justify-between w-full px-2 py-2 text-white bg-primary-red cursor-pointer"
            onClick={() =>
              setOpen(
                <BasicModalElement
                  title="Inflammatory"
                  descriptionKey="immune-inflammatory"
                />
              )
            }
          >
            <div>Inflammatory</div>
            <div>{props.inflamPower.percentage.toFixed(0)}%</div>
          </div>
        </div>
      ) : (
        <Pie
          filled={props.expanded}
          data={[
            {
              value: props.antiInflamPower.percentage,
              text: "Anti-Inflam",
              subtext: "",
              styleClass: "stroke-primary-green fill-primary-green",
              onClick: () =>
                setOpen(
                  <BasicModalElement
                    title="Anti-inflammatory"
                    descriptionKey="immune-anti-inflammatory"
                  />
                ),
            },
            {
              value: props.inflamPower.percentage,
              text: "Inflam",
              subtext: "",
              styleClass: "stroke-primary-red fill-primary-red",
              onClick: () =>
                setOpen(
                  <BasicModalElement
                    title="Inflammatory"
                    descriptionKey="immune-inflammatory"
                  />
                ),
            },
          ]}
        />
      )}
    </div>
  );
};
const AdaptiveImmune = (props: AdaptiveSystemProps) => {
  const { setOpen } = useDescriptionModal();
  return (
    <div className="flex flex-col">
      {!props.visualised ? (
        <div className="flex flex-col border-2">
          <div
            className="flex flex-row justify-between w-full border-b-2 px-2 py-2 bg-blue-500 text-white cursor-pointer"
            onClick={() =>
              setOpen(
                <BasicModalElement title="TH 1" descriptionKey="immune-th1" />
              )
            }
          >
            <div>TH1</div>
            <div>{props.th1.percentage.toFixed(0)}%</div>
          </div>
          <div
            className="flex flex-row justify-between w-full border-b-2 px-2 py-2 bg-primary-yellow text-white cursor-pointer"
            onClick={() =>
              setOpen(
                <BasicModalElement title="TH 2" descriptionKey="immune-th2" />
              )
            }
          >
            <div>TH2</div>
            <div>{props.th2.percentage.toFixed(0)}%</div>
          </div>
          <div
            className="flex flex-row justify-between w-full border-b-2 px-2 py-2 bg-green-500 text-white cursor-pointer"
            onClick={() =>
              setOpen(
                <BasicModalElement title="T Reg" descriptionKey="immune-treg" />
              )
            }
          >
            <div>T REG</div>
            <div>{props.treg.percentage.toFixed(0)}%</div>
          </div>
          <div
            className="flex flex-row justify-between w-full px-2 py-2 bg-primary-red text-white cursor-pointer"
            onClick={() =>
              setOpen(
                <BasicModalElement title="TH 17" descriptionKey="immune-th17" />
              )
            }
          >
            <div>TH 17</div>
            <div>{props.t17.percentage.toFixed(0)}%</div>
          </div>
        </div>
      ) : (
        <Pie
          filled={props.expanded}
          data={[
            {
              value: props.th1.percentage,
              text: "TH1",
              subtext: "",
              styleClass: "stroke-blue-500 fill-blue-500",
              onClick: () =>
                setOpen(
                  <BasicModalElement title="TH 1" descriptionKey="immune-th1" />
                ),
            },
            {
              value: props.th2.percentage,
              text: "TH2",
              subtext: "",
              styleClass: "stroke-primary-yellow fill-primary-yellow",
              onClick: () =>
                setOpen(
                  <BasicModalElement title="TH 2" descriptionKey="immune-th2" />
                ),
            },
            {
              value: props.treg.percentage,
              text: "T Reg",
              subtext: "",
              styleClass: "stroke-green-500 fill-green-500",
              onClick: () =>
                setOpen(
                  <BasicModalElement
                    title="T Reg"
                    descriptionKey="immune-treg"
                  />
                ),
            },
            {
              value: props.t17.percentage,
              text: "TH 17",
              subtext: "",
              styleClass: "stroke-primary-red fill-primary-red",
              onClick: () =>
                setOpen(
                  <BasicModalElement
                    title="TH 17"
                    descriptionKey="immune-th17"
                  />
                ),
            },
          ]}
        />
      )}
    </div>
  );
};

const clamp = (min: number, max: number, value: number) => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
};

const getInnateAdaptiveRange = (value: number) => {
  switch (true) {
    case value < 24:
      return "Very Weak";
    case value < 49:
      return "Diminished";
    case value < 74:
      return "WNL";
    case value <= 100:
      return "Robust";
    default:
      return "Robust";
  }
};
