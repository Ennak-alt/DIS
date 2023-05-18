"use client";
import React, { useState, useEffect } from 'react';


export default function Page({ params, searchParams }) {
    const [data, setData] = useState(null);
    useEffect(() => {
        //loadDataOnlyOnce();
        fetch('http://localhost:8088/post/' + params.id)
          .then(response => response.json())
          .then(json => setData(json))
          .catch(error => console.error(error));
      }, []);

    return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
            {data && data.manufacturer && data.model ? <pre>{data.manufacturer + ", " + data.model}</pre> : 'N/A'}
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            {data && data.region && data.carstate ? <pre>{data.region + ", " + data.carstate}</pre> : 'N/A'}
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Year</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data && data.caryear ? <pre>{data.caryear}</pre> : 'N/A'}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Price</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data && data.price ? <pre>{"$" + data.price}</pre> : 'N/A'}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Number of cylinders</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data && data.cylinders ? <pre>{data.cylinders}</pre> : 'N/A'}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Size</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data && data.size ? <pre>{data.size}</pre> : 'N/A'}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Condition</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data && data.condition ? <pre>{data.condition}</pre> : 'N/A'}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Color</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data && data.paint_color ? <pre>{data.paint_color}</pre> : 'N/A'}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Type</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data && data.cartype ? <pre>{data.cartype}</pre> : 'N/A'}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Transmission</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data && data.transmission ? <pre>{data.transmission}</pre> : 'N/A'}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Odometer</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data && data.odometer ? <pre>{data.odometer + " mi"}</pre> : 'N/A'}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Fuel type</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data && data.fuel ? <pre>{data.fuel}</pre> : 'N/A'}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Posted on</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data && data.posting_date ? <pre>{data.posting_date}</pre> : 'N/A'}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">VIN</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data && data.VIN ? <pre>{data.VIN}</pre> : 'N/A'}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 max-w-xs">
            <dt className="text-sm font-medium leading-6 text-gray-900">Description</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data && data.cardescription ? <pre>{data.cardescription}</pre> : 'N/A'}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}