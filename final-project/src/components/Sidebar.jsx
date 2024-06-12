export default function Sidebar() {
  return (
    <>
      <div class=" md:flex sm:hidden w-full h-full  ">
        <ul class="-my-2 divide-y divide-gray-100 w-full ">
          <li class="py-2">
            <ul class="space-y-1">
              <li>
                <a
                  href="#"
                  class="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                >
                  Dashboard
                </a>
              </li>
              <li class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                <details className="">
                  <summary>Report</summary>
                  <ul className="p-2">
                    <li class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                      <a>Overtime</a>
                    </li>
                    <li class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                      <a>Leaves</a>
                    </li>
                  </ul>
                </details>
              </li>

              <li>
                <a
                  href="#"
                  class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  History
                </a>
              </li>

              <li>
                <a
                  href="#"
                  class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Employees
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
}
