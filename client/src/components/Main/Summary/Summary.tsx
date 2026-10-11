interface Props {
  furnitureFrequencies: Map<string, number>;
}

const Summary = ({ furnitureFrequencies }: Props) => {
  const arr_frequencies = [...furnitureFrequencies];
  return (
    <div className="my-8 flex items-center justify-center">
      <table className="w-1/2 table-auto border-separate border border-slate-700 text-left">
        <tr>
          <th className="rounded border-2 border-slate-400 bg-taupe-100 p-4 text-lg">
            Furniture Type
          </th>
          <th className="rounded border-2 border-slate-400 bg-taupe-100 p-4 text-lg">
            Frequency
          </th>
        </tr>
        {arr_frequencies.map(([key, value]) => {
          return (
            <tr>
              <td className="rounded border-2 border-slate-400 bg-taupe-100 p-4">
                {key}
              </td>
              <td className="rounded border-2 border-slate-400 bg-taupe-100 p-4">
                {value}
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Summary;
