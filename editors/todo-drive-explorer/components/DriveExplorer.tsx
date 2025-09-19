import {
  setSelectedNode,
  useSelectedDriveDocuments,
} from "@powerhousedao/reactor-browser";
import { ProgressBar } from "./ProgressBar.js";
import { isTodoDocument } from "../../../utils.js";

export function DriveExplorer() {
  const documents = useSelectedDriveDocuments();
  const todoDocuments = documents?.filter(isTodoDocument) ?? [];

  return (
    <div className="flex h-full">
      {/* Main Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">ToDos:</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tasks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {todoDocuments.map((todoDocument) => (
                <tr key={todoDocument.header.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      onClick={() => setSelectedNode(todoDocument.header.id)}
                      className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                      {todoDocument.header.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {todoDocument.header.documentType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {todoDocument.state.global.stats.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {todoDocument.state.global.stats.checked}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-32">
                      <ProgressBar
                        value={todoDocument.state.global.stats.checked}
                        max={todoDocument.state.global.stats.total}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
