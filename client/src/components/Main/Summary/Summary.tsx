interface Props {
  furnitureFrequencies: Map<string, number>;
}

function downloadAsCsv(furnitureFrequencies: Map<string, number>) {
  // Converting the map of frequencies to a CSV string
  let csvString = "Furniture Type,Frequency\n";
  for (const [key, value] of furnitureFrequencies) {
    csvString = csvString + key + "," + value + "\n";
  }

  const csvBlob = new Blob([csvString], { type: "text/csv" });
  const urlCsv = URL.createObjectURL(csvBlob);

  // Creating a temporary element to facilitate the download of the csv file
  const downloadElement = document.createElement("a");
  downloadElement.style.display = "none";
  downloadElement.href = urlCsv;
  // Using the date to differentiate between different files downloaded through Home Analyzer
  const date = new Date();
  const strDate = date.toISOString();
  downloadElement.download =
    "home-analyzer-" +
    strDate.substring(0, 4) +
    strDate.substring(5, 7) +
    strDate.substring(8, 10) +
    ".csv";
  document.body.appendChild(downloadElement);
  downloadElement.click();
  document.body.removeChild(downloadElement);
  URL.revokeObjectURL(urlCsv);
}

const Summary = ({ furnitureFrequencies }: Props) => {
  const arr_frequencies = [...furnitureFrequencies];
  return (
    <div className="my-8 flex flex-col items-center justify-center">
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
      <button
        onClick={() => {
          downloadAsCsv(furnitureFrequencies);
        }}
        className="m-4 rounded bg-gray-400 px-12 py-4 hover:cursor-pointer hover:bg-gray-500"
      >
        Export as CSV
      </button>
    </div>
  );
};

export default Summary;
