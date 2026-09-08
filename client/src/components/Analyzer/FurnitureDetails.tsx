import type { Furniture } from "./types";

interface Props {
  hoveredDetails: Furniture | null;
}

const Annotations = ({ hoveredDetails }: Props) => {
  return (
    <figcaption className="mt-4 mb-8 flex h-auto lg:w-1/4">
      {hoveredDetails ? (
        <ul>
          <li className="text-base">Furniture Name: {hoveredDetails.name}</li>
          <li className="text-base">Confidence: {hoveredDetails.confidence}</li>
        </ul>
      ) : (
        <p className="text-base">Hover over a box to get an analysis</p>
      )}
    </figcaption>
  );
};

export default Annotations;
