import React from "react";
import { useAuth } from "../../Hooks/AuthContext";
import { useDescriptionModal } from "../../Hooks/DescriptionModal";
import {
  hormones,
  inflam_index,
  tfi as tfi_gradient,
} from "../../utils/gradients";
import { HorisontalBar } from "../graphs/HorisontalBar";
import { BasicModalElement } from "../Modals/BasicModalElement";

type HormonesBarCollectionProps = {
  inflamIndex: number;
  cortisol: number;
  dhea: number;
  estradiol: number;
  pregnenolone: number;
  insulin: number;
  t3_t4: number;
  tfi: number;
};

const lowHighMarkers = [
  {
    pos: 0,
    text: "low",
  },
  {
    pos: 10,
    text: "high",
  },
];

export const HormonesBarCollection = ({
  inflamIndex,
  cortisol,
  dhea,
  estradiol,
  pregnenolone,
  insulin,
  t3_t4,
  tfi,
}: HormonesBarCollectionProps) => {
  const auth = useAuth();
  const { setOpen } = useDescriptionModal();

  return (
    <>
      <h2 className="ml-6 text-black text-xl">Hormones</h2>
      <div
        onClick={() =>
          setOpen(
            <BasicModalElement
              title="Inflam Index"
              descriptionKey="inflamIndex"
            />
          )
        }
        className="cursor-pointer"
      >
        <HorisontalBar
          refKey="inflamIndex"
          title="Inflam Index"
          value={inflamIndex}
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
            <BasicModalElement title="Cortisol" descriptionKey="cortisol" />
          )
        }
        className="cursor-pointer"
      >
        <HorisontalBar
          refKey="cortisol"
          title="Cortisol"
          value={cortisol}
          idealRange={[4, 6]}
          absoluteRange={[0, 10]}
          markersBottom={lowHighMarkers}
          gradientsColors={hormones}
          expanded={auth.graphsExpanded}
        />
      </div>
      <div
        onClick={() =>
          setOpen(<BasicModalElement title="DHEA" descriptionKey="dhea" />)
        }
        className="cursor-pointer"
      >
        <HorisontalBar
          refKey="dhea"
          title="DHEA"
          value={dhea}
          idealRange={[4, 6]}
          absoluteRange={[0, 10]}
          markersBottom={lowHighMarkers}
          gradientsColors={hormones}
          expanded={auth.graphsExpanded}
        />
      </div>
      <div
        onClick={() =>
          setOpen(
            <BasicModalElement title="Estradiol" descriptionKey="estradiol" />
          )
        }
        className="cursor-pointer"
      >
        <HorisontalBar
          refKey="estradiol"
          title="Estradiol"
          value={estradiol}
          idealRange={[4, 6]}
          absoluteRange={[0, 10]}
          markersBottom={lowHighMarkers}
          gradientsColors={hormones}
          expanded={auth.graphsExpanded}
        />
      </div>
      <div
        onClick={() =>
          setOpen(
            <BasicModalElement
              title="Pregnenolone"
              descriptionKey="pregnenolone"
            />
          )
        }
        className="cursor-pointer"
      >
        <HorisontalBar
          refKey="pregnenolone"
          title="Pregnenolone"
          value={pregnenolone}
          idealRange={[4, 6]}
          absoluteRange={[0, 10]}
          markersBottom={lowHighMarkers}
          gradientsColors={hormones}
          expanded={auth.graphsExpanded}
        />
      </div>
      <div
        onClick={() =>
          setOpen(
            <BasicModalElement title="Insulin" descriptionKey="insulin" />
          )
        }
        className="cursor-pointer"
      >
        <HorisontalBar
          refKey="insulin"
          title="Insulin"
          value={insulin}
          idealRange={[4, 6]}
          absoluteRange={[0, 10]}
          markersBottom={lowHighMarkers}
          gradientsColors={hormones}
          expanded={auth.graphsExpanded}
        />
      </div>
      <div
        onClick={() =>
          setOpen(<BasicModalElement title="T4 T3" descriptionKey="t4_t3" />)
        }
        className="cursor-pointer"
      >
        <HorisontalBar
          refKey="t4_t3"
          title="T4 - T3"
          value={t3_t4}
          idealRange={[4, 6]}
          absoluteRange={[0, 10]}
          markersBottom={lowHighMarkers}
          gradientsColors={hormones}
          expanded={auth.graphsExpanded}
        />
      </div>
      <div
        onClick={() =>
          setOpen(<BasicModalElement title="TFi" descriptionKey="tfi" />)
        }
        className="cursor-pointer"
      >
        <HorisontalBar
          refKey="tfi"
          title="TFi"
          value={tfi}
          idealRange={[-0.07, 0]}
          absoluteRange={[-0.2, 0.15]}
          gradientsColors={tfi_gradient}
          expanded={auth.graphsExpanded}
          fixed={2}
        />
      </div>
    </>
  );
};
