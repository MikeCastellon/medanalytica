// Import the SDNNSummaryDescription component we created
export const SDNNSummaryDescription = ({
  age,
  gender,
}: {
  age: number;
  gender: 'male' | 'female';
}) => {
  // Function to determine if a row should be highlighted based on the user's age
  const isHighlightedRow = (rowAgeRange: string) => {
    // Extract min and max age from the range (e.g., "25-34" becomes min=25, max=34)
    const [minAge, maxAge] = rowAgeRange.split('-').map(Number);
    return age >= minAge && age <= maxAge;
  };

  // Function to determine the appropriate table styling based on gender
  const getTableHeadingClass = (tableGender: 'male' | 'female') => {
    const baseClass = 'text-center py-1 px-1 border border-gray-300';

    if (gender === tableGender.toLowerCase()) {
      return `${baseClass} bg-yellow-200 font-bold`;
    }

    return `${baseClass} bg-gray-100`;
  };

  return (
    <div className="text-xs max-w-4xl mx-auto">
      <div className="mb-2">
        <p className="mb-1 leading-tight">
          Stress Resiliency Score (SDNN) is the most important parameter and the
          most researched in the scientific literature. When stressors become
          greater than your ability to adapt to them symptoms appear. If the
          downward force of stress is not dealt with, health will decline. All
          of these things affect your Stress Resiliency Score: Emotional/Mental
          Stress, Environmental toxins, Virus, Bacteria, Fungal, lack of
          exercise, poor diet, lack of sleep, dehydration, poor digestion, etc.
          The higher these numbers, the better.
        </p>
      </div>

      {/* SDNN Male Table */}
      <div className="mb-2">
        <table className="w-full border-collapse border border-gray-300 text-xs">
          <colgroup>
            <col className="w-1/8" />
            <col className="w-3/12" />
            <col className="w-3/12" />
            <col className="w-3/12" />
          </colgroup>
          <thead>
            <tr>
              <th className={getTableHeadingClass('male')} colSpan={4}>
                SDNN Male {gender === 'male' && '(Your Category)'}
              </th>
            </tr>
            <tr className="bg-gray-100">
              <th className="text-right py-1 px-1 border border-gray-300">
                Age
              </th>
              <th className="text-center py-1 px-1 border border-gray-300">
                Below Average
              </th>
              <th className="text-center py-1 px-1 border border-gray-300">
                Average
              </th>
              <th className="text-center py-1 px-1 border border-gray-300">
                Above Average
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              className={
                gender === 'male' && isHighlightedRow('25-34')
                  ? 'bg-yellow-100'
                  : ''
              }
            >
              <td className="text-right py-1 px-1 border border-gray-300">
                25-34{' '}
                {gender === 'male' &&
                  isHighlightedRow('25-34') &&
                  '← Your Age Range'}
              </td>
              <td className="text-center py-1 px-1 border border-gray-300 bg-red-600 text-white">
                29.1
              </td>
              <td className="text-center py-1 px-1 border border-gray-300 bg-blue-600 text-white">
                29.2 - 70.8
              </td>
              <td className="text-center py-1 px-1 border border-gray-300 bg-green-500 text-white">
                70.9 - UP
              </td>
            </tr>
            <tr
              className={
                gender === 'male' && isHighlightedRow('35-44')
                  ? 'bg-yellow-100'
                  : ''
              }
            >
              <td className="text-right py-1 px-1 border border-gray-300">
                35-44{' '}
                {gender === 'male' &&
                  isHighlightedRow('35-44') &&
                  '← Your Age Range'}
              </td>
              <td className="text-center py-1 px-1 border border-gray-300 bg-red-600 text-white">
                27.8
              </td>
              <td className="text-center py-1 px-1 border border-gray-300 bg-blue-600 text-white">
                27.9 - 61.3
              </td>
              <td className="text-center py-1 px-1 border border-gray-300 bg-green-500 text-white">
                61.4 - UP
              </td>
            </tr>
            <tr
              className={
                gender === 'male' && isHighlightedRow('45-54')
                  ? 'bg-yellow-100'
                  : ''
              }
            >
              <td className="text-right py-1 px-1 border border-gray-300">
                45-54{' '}
                {gender === 'male' &&
                  isHighlightedRow('45-54') &&
                  '← Your Age Range'}
              </td>
              <td className="text-center py-1 px-1 border border-gray-300 bg-red-600 text-white">
                22.2
              </td>
              <td className="text-center py-1 px-1 border border-gray-300 bg-blue-600 text-white">
                22.3 - 51.3
              </td>
              <td className="text-center py-1 px-1 border border-gray-300 bg-green-500 text-white">
                51.4 - UP
              </td>
            </tr>
            <tr
              className={
                gender === 'male' && isHighlightedRow('55-64')
                  ? 'bg-yellow-100'
                  : ''
              }
            >
              <td className="text-right py-1 px-1 border border-gray-300">
                55-64{' '}
                {gender === 'male' &&
                  isHighlightedRow('55-64') &&
                  '← Your Age Range'}
              </td>
              <td className="text-center py-1 px-1 border border-gray-300 bg-red-600 text-white">
                18.1
              </td>
              <td className="text-center py-1 px-1 border border-gray-300 bg-blue-600 text-white">
                18.2 - 47.4
              </td>
              <td className="text-center py-1 px-1 border border-gray-300 bg-green-500 text-white">
                47.5 - UP
              </td>
            </tr>
            <tr
              className={
                gender === 'male' && isHighlightedRow('65-75')
                  ? 'bg-yellow-100'
                  : ''
              }
            >
              <td className="text-right py-1 px-1 border border-gray-300">
                65-75{' '}
                {gender === 'male' &&
                  isHighlightedRow('65-75') &&
                  '← Your Age Range'}
              </td>
              <td className="text-center py-1 px-1 border border-gray-300 bg-red-600 text-white">
                16.4
              </td>
              <td className="text-center py-1 px-1 border border-gray-300 bg-blue-600 text-white">
                16.5 - 42.7
              </td>
              <td className="text-center py-1 px-1 border border-gray-300 bg-green-500 text-white">
                42.8 - UP
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* SDNN Female Table */}
      <div>
        <table className="w-full border-collapse border border-gray-300 text-xs">
          <colgroup>
            <col className="w-1/8" />
            <col className="w-3/12" />
            <col className="w-3/12" />
            <col className="w-3/12" />
          </colgroup>
          <thead>
            <tr>
              <th className={getTableHeadingClass('female')} colSpan={4}>
                SDNN Female {gender === 'female' && '(Your Category)'}
              </th>
            </tr>
            <tr className="bg-gray-100">
              <th className="text-right py-1 px-1 border border-gray-300">
                Age
              </th>
              <th className="text-center py-1 px-1 border border-gray-300">
                Below Average
              </th>
              <th className="text-center py-1 px-1 border border-gray-300">
                Average
              </th>
              <th className="text-center py-1 px-1 border border-gray-300">
                Above Average
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              className={
                gender === 'female' && isHighlightedRow('25-34')
                  ? 'bg-yellow-100'
                  : ''
              }
            >
              <td className="text-right py-1 px-1 border border-gray-300">
                25-34{' '}
                {gender === 'female' &&
                  isHighlightedRow('25-34') &&
                  '← Your Age Range'}
              </td>
              <td className="text-center py-1 px-1 border border-gray-300 bg-red-600 text-white">
                29.7
              </td>
              <td className="text-center py-1 px-1 border border-gray-300 bg-blue-600 text-white">
                29.8 - 67.6
              </td>
              <td className="text-center py-1 px-1 border border-gray-300 bg-green-500 text-white">
                67.7 - UP
              </td>
            </tr>
            <tr
              className={
                gender === 'female' && isHighlightedRow('35-44')
                  ? 'bg-yellow-100'
                  : ''
              }
            >
              <td className="text-right py-1 px-1 border border-gray-300">
                35-44{' '}
                {gender === 'female' &&
                  isHighlightedRow('35-44') &&
                  '← Your Age Range'}
              </td>
              <td className="text-center py-1 px-1 border border-gray-300 bg-red-600 text-white">
                24.9
              </td>
              <td className="text-center py-1 px-1 border border-gray-300 bg-blue-600 text-white">
                25 - 65.8
              </td>
              <td className="text-center py-1 px-1 border border-gray-300 bg-green-500 text-white">
                65.9 - UP
              </td>
            </tr>
            <tr
              className={
                gender === 'female' && isHighlightedRow('45-54')
                  ? 'bg-yellow-100'
                  : ''
              }
            >
              <td className="text-right py-1 px-1 border border-gray-300">
                45-54{' '}
                {gender === 'female' &&
                  isHighlightedRow('45-54') &&
                  '← Your Age Range'}
              </td>
              <td className="text-center py-1 px-1 border border-gray-300 bg-red-600 text-white">
                23.1
              </td>
              <td className="text-center py-1 px-1 border border-gray-300 bg-blue-600 text-white">
                23.2 - 50.6
              </td>
              <td className="text-center py-1 px-1 border border-gray-300 bg-green-500 text-white">
                50.7 - UP
              </td>
            </tr>
            <tr
              className={
                gender === 'female' && isHighlightedRow('55-64')
                  ? 'bg-yellow-100'
                  : ''
              }
            >
              <td className="text-right py-1 px-1 border border-gray-300">
                55-64{' '}
                {gender === 'female' &&
                  isHighlightedRow('55-64') &&
                  '← Your Age Range'}
              </td>
              <td className="text-center py-1 px-1 border border-gray-300 bg-red-600 text-white">
                18.2
              </td>
              <td className="text-center py-1 px-1 border border-gray-300 bg-blue-600 text-white">
                18.2 - 42.9
              </td>
              <td className="text-center py-1 px-1 border border-gray-300 bg-green-500 text-white">
                43 - UP
              </td>
            </tr>
            <tr
              className={
                gender === 'female' && isHighlightedRow('65-75')
                  ? 'bg-yellow-100'
                  : ''
              }
            >
              <td className="text-right py-1 px-1 border border-gray-300">
                65-75{' '}
                {gender === 'female' &&
                  isHighlightedRow('65-75') &&
                  '← Your Age Range'}
              </td>
              <td className="text-center py-1 px-1 border border-gray-300 bg-red-600 text-white">
                16
              </td>
              <td className="text-center py-1 px-1 border border-gray-300 bg-blue-600 text-white">
                16.1 - 39.5
              </td>
              <td className="text-center py-1 px-1 border border-gray-300 bg-green-500 text-white">
                39.6 - UP
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
