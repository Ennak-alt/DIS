
/*
    type
    price
    color
    odometer
    year
    drive
    size
    condition
    fuel
    trans


*/

interface props {
    category: string,
    categories: string[],
    usedCategories: CarCategories,
    setCategories: React.Dispatch<React.SetStateAction<CarCategories>>,
}


export const Filter: : React.FC<props> = ({category, categories, usedCategories, setCategories}: props) => {

    const setCategory (catname) => {
        let c = usedCategories[category]
        if (c.includes(catname)) {
            c = c.splice(c.indexof(catname), 1)
        } else {
            c.push(catname)
        }
        setCategories(...usedCategories, cateogory: c)
    }

    return (
    <div className="relative">
        <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary
                className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
            >
                <span className="text-sm font-medium"> {name} </span>

                <span className="transition group-open:-rotate-180">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-4 w-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                    </svg>
                </span>
            </summary>

            <div
                className="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2"
            >
                <div className="w-96 rounded border border-gray-200 bg-white">
                    <header className="flex items-center justify-between p-4">
                        <span className="text-sm text-gray-700"> 0 Selected </span>

                        <button
                            type="button"
                            className="text-sm text-gray-900 underline underline-offset-4"
                        >
                            Reset
                        </button>
                    </header>

                    <ul className="space-y-1 border-t border-gray-200 p-4">
                        {categories.map(categoryName) => {
                            <li>
                                <label htmlFor={categoryName} className="inline-flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id={categoryName}
                                        checked={usedCategories[name].includes(categoryName)}
                                        onChange={() => setCategory(categoryName)}
                                    />

                                    <span className="text-sm font-medium text-gray-700">
                                        {categoryName}
                                    </span>
                                </label>
                            </li>
                        }}
                    </ul>
                </div>
            </div>
        </details>
    </div>
    )

}